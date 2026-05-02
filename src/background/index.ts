import Anthropic from '@anthropic-ai/sdk';
import type { ChromeMessage, EscalationLevel, CoachStyle, HintTurn, UserPreferences, HintSession } from '../types';

const DEFAULT_PREFS: UserPreferences = {
  coachStyle: 'coach',
  model: 'claude-sonnet-4-6',
  theme: 'auto',
  showStreakInPanel: false,
};

function getSystemPrompt(coachStyle: CoachStyle, level: EscalationLevel): string {
  const styleModifiers: Record<CoachStyle, string> = {
    coach: 'Be warm and encouraging. Celebrate small wins. Use "you" naturally.',
    professor: 'Be precise and formal. Speak in technical terms. Avoid colloquialisms.',
    peer: 'Be casual and friendly. Occasionally use light humor. Speak like a friend debugging together.',
  };

  return `You are LeetCoach, a coding mentor who teaches LeetCode users using the Socratic method.

Your sole job is to ask the next question a great mentor would ask.
You will receive: a problem statement, the user's current code, and any prior conversation. You will respond with exactly one guiding question.

Code awareness rules (apply these first before anything else):
- Always read the user's current code carefully before responding.
- If the code has a syntax or compilation error, guide them to find it without naming it directly. Example: "Look at line X — what does that expression evaluate to when Y is empty?"
- If the code produces wrong answers, reason about what the code actually does versus what the problem requires, then ask a question that surfaces the discrepancy. Never say "your code is wrong." Instead ask what a specific part does on a given input.
- If the code is empty or minimal, ask about their initial approach rather than the code itself.
- Reference the user's actual variable names, logic, or structure in your question — make it clear you have read their code.

Hard rules:
- Never name the optimal algorithm or data structure.
- Never write code in your response.
- Never reveal the time or space complexity of the optimal solution.
- Ask exactly one question. No preamble. No summary.
- Acknowledge what the user has done right in at most one short sentence before the question, only if it is genuinely insightful.
- If the user has clearly solved it and is asking for confirmation, say so in one sentence and ask them to submit.

Escalation level guides your specificity:
- Level 1 (Nudge): Point at a category of insight without naming it. Example: "What information are you computing repeatedly?"
- Level 2 (Hint): Point at the structural shape of the optimal approach without naming it. Example: "If you could remember what you have seen in one pass, what would you store, and how would you look it up?"
- Level 3 (Reveal): Name the technique family but not the exact code. Example: "Consider a single pass with a hash map mapping value to index. What would you check on each element?"

Coach style: ${styleModifiers[coachStyle]}
Current escalation level: ${level}`;
}

function buildMessages(
  problemTitle: string,
  description: string,
  currentCode: string,
  level: EscalationLevel,
  priorHints: HintTurn[],
  userMessage?: string,
  previousHintToAvoid?: string,
) {
  const messages: Anthropic.MessageParam[] = [];

  // Add prior conversation turns
  for (const turn of priorHints) {
    if (turn.userMessage) {
      messages.push({ role: 'user', content: turn.userMessage });
    } else {
      messages.push({
        role: 'user',
        content: `[Level ${turn.level}] I'm stuck on ${problemTitle}.`,
      });
    }
    messages.push({ role: 'assistant', content: turn.question });
  }

  // Build the new user turn
  let userContent = `Problem: ${problemTitle}\n\n${description}\n\nMy current code:\n\`\`\`\n${currentCode || '// (no code yet)'}\n\`\`\`\n\nEscalation level: ${level}`;

  if (userMessage) {
    userContent += `\n\nMy question: ${userMessage}`;
  } else {
    userContent += `\n\nI'm stuck. Give me a level ${level} hint.`;
  }

  if (previousHintToAvoid) {
    userContent += `\n\n[Note: Your previous hint was: "${previousHintToAvoid}". Please approach from a different angle.]`;
  }

  messages.push({ role: 'user', content: userContent });

  return messages;
}

async function streamHint(
  tabId: number,
  problemTitle: string,
  description: string,
  currentCode: string,
  level: EscalationLevel,
  priorHints: HintTurn[],
  userMessage?: string,
  previousHintToAvoid?: string,
) {
  // Get API key and prefs
  const { apiKey, preferences } = await chrome.storage.local.get(['apiKey', 'preferences']);
  const prefs: UserPreferences = preferences ?? DEFAULT_PREFS;

  if (!apiKey) {
    chrome.tabs.sendMessage(tabId, { type: 'HINT_ERROR', payload: 'No API key configured. Please open settings.' });
    return;
  }

  const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });

  try {
    const stream = await client.messages.stream({
      model: prefs.model,
      max_tokens: 300,
      system: [
        {
          type: 'text',
          text: getSystemPrompt(prefs.coachStyle, level),
          // @ts-ignore - cache_control is valid in Anthropic SDK
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: buildMessages(problemTitle, description, currentCode, level, priorHints, userMessage, previousHintToAvoid),
    });

    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
        chrome.runtime.sendMessage({ type: 'HINT_CHUNK', payload: chunk.delta.text });
      }
    }

    chrome.runtime.sendMessage({ type: 'HINT_COMPLETE', payload: null });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    chrome.runtime.sendMessage({ type: 'HINT_ERROR', payload: message });
  }
}

// Open side panel when action button clicked (user gesture — allowed)
chrome.action.onClicked.addListener(async (tab) => {
  if (tab.id) {
    await chrome.sidePanel.open({ tabId: tab.id });
  }
});


// Auto-open on action click for any LeetCode problem tab
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(() => {});

// Message router
chrome.runtime.onMessage.addListener((message: ChromeMessage, sender, sendResponse) => {
  const tabId = sender.tab?.id;

  if (message.type === 'TEST_API_KEY') {
    const key = message.payload as string;
    fetch('https://api.anthropic.com/v1/models', {
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01' },
    })
      .then((res) => {
        if (res.ok) {
          chrome.storage.local.set({ apiKey: key });
        }
        sendResponse({ ok: res.ok });
      })
      .catch(() => sendResponse({ ok: false }));
    return true;
  }

  if (message.type === 'REQUEST_HINT') {
    const { problemTitle, description, currentCode, level, priorHints, userMessage, previousHintToAvoid } =
      message.payload as {
        problemTitle: string;
        description: string;
        currentCode: string;
        level: EscalationLevel;
        priorHints: HintTurn[];
        userMessage?: string;
        previousHintToAvoid?: string;
      };

    streamHint(
      tabId ?? 0,
      problemTitle,
      description,
      currentCode,
      level,
      priorHints,
      userMessage,
      previousHintToAvoid,
    ).catch(console.error);

    sendResponse({ ok: true });
    return true;
  }

  return false;
});
