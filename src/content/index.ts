import type { ChromeMessage, Difficulty, ProblemContext } from '../types';

function getProblemSlug(): string {
  const match = window.location.pathname.match(/\/problems\/([^/]+)/);
  return match?.[1] ?? '';
}

function getProblemTitle(): string {
  // Try the heading element LeetCode uses
  const el =
    document.querySelector('[data-cy="question-title"]') ??
    document.querySelector('.text-title-large') ??
    document.querySelector('h4.text-lg') ??
    document.querySelector('div[class*="title"]');
  return el?.textContent?.trim() ?? getProblemSlug().replace(/-/g, ' ');
}

function getDifficulty(): Difficulty {
  const el =
    document.querySelector('[diff]') ??
    document.querySelector('.text-difficulty-easy, .text-difficulty-medium, .text-difficulty-hard') ??
    document.querySelector('[class*="difficulty"]');
  const text = el?.textContent?.trim().toLowerCase() ?? '';
  if (text.includes('easy')) return 'Easy';
  if (text.includes('hard')) return 'Hard';
  return 'Medium';
}

function getProblemDescription(): string {
  const el =
    document.querySelector('[data-track-load="description_content"]') ??
    document.querySelector('.elfjS') ??
    document.querySelector('[class*="description"]');
  return el?.textContent?.trim().slice(0, 3000) ?? '';
}

function getCurrentCode(): string {
  try {
    // Monaco editor instance
    const models = (window as unknown as { monaco?: { editor?: { getModels?: () => Array<{ getValue: () => string }> } } }).monaco?.editor?.getModels?.();
    if (models && models.length > 0) {
      return models[0].getValue();
    }
  } catch {
    // Fallback: try CodeMirror or textarea
  }

  // Fallback: textarea
  const ta = document.querySelector('.view-lines') as HTMLElement;
  return ta?.textContent?.trim() ?? '';
}

function scrapeProblemContext(): ProblemContext {
  return {
    slug: getProblemSlug(),
    title: getProblemTitle(),
    difficulty: getDifficulty(),
    description: getProblemDescription(),
    currentCode: getCurrentCode(),
  };
}

function safeSend(msg: ChromeMessage) {
  try {
    chrome.runtime.sendMessage(msg);
  } catch {
    // Extension context invalidated — stale content script, ignore
  }
}

// Listen for submission accepted result
function listenForAcceptedSubmission() {
  const observer = new MutationObserver(() => {
    const result =
      document.querySelector('[data-e2e-locator="submission-result"]') ??
      document.querySelector('.text-green-s') ??
      document.querySelector('[class*="accepted"]');

    if (result?.textContent?.toLowerCase().includes('accepted')) {
      safeSend({ type: 'SUBMISSION_ACCEPTED', payload: getProblemSlug() });
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

// Send context to side panel on demand
try {
  chrome.runtime.onMessage.addListener((message: ChromeMessage, _sender, sendResponse) => {
    if (message.type === 'GET_SESSION') {
      sendResponse(scrapeProblemContext());
      return true;
    }
    return false;
  });
} catch {
  // Stale context — do nothing
}

listenForAcceptedSubmission();

// Broadcast once the problem DOM is ready, retrying until we get a valid slug + title
let lastSlug = '';
let broadcastAttempts = 0;

function broadcastWhenReady() {
  const ctx = scrapeProblemContext();
  if (ctx.slug && ctx.title && ctx.title !== ctx.slug.replace(/-/g, ' ')) {
    lastSlug = ctx.slug;
    safeSend({ type: 'PROBLEM_CONTEXT', payload: ctx });
  } else if (broadcastAttempts++ < 20) {
    setTimeout(broadcastWhenReady, 500);
  }
}

broadcastWhenReady();

// Re-broadcast on SPA navigation (problem changes without full page reload)
setInterval(() => {
  const slug = getProblemSlug();
  if (slug && slug !== lastSlug) {
    lastSlug = slug;
    broadcastAttempts = 0;
    broadcastWhenReady();
  }
}, 1000);
