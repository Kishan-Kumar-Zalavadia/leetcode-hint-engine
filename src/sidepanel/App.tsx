import React, { useEffect, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { ProblemContext } from './components/ProblemContext';
import { ConversationThread } from './components/ConversationThread';
import { EscalationStrip } from './components/EscalationStrip';
import { InputArea } from './components/InputArea';
import { SolveCelebration } from './components/SolveCelebration';
import { RevealModal } from './components/RevealModal';
import { useSidePanelStore } from './store';
import type { ChromeMessage, EscalationLevel, HintTurn, HintSession } from '../types';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function App() {
  const {
    problemContext,
    setProblemContext,
    session,
    setSession,
    currentLevel,
    setLevel,
    streamingText,
    isStreaming,
    appendChunk,
    clearStream,
    showRevealModal,
    setShowRevealModal,
    showCelebration,
    setShowCelebration,
    addHint,
    rateHint,
    preferences,
    setPreferences,
    elapsedSeconds,
    setElapsedSeconds,
  } = useSidePanelStore();

  const streamBuffer = useRef('');
  const pendingTurnRef = useRef<{ level: EscalationLevel; userMessage?: string } | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const idleTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const idleSecondsRef = useRef(0);
  const [idleSeconds, setIdleSeconds] = React.useState(0);
  const [currentTabUrl, setCurrentTabUrl] = React.useState('');
  const [hasApiKey, setHasApiKey] = React.useState<boolean | null>(null);

  // Load preferences and react to changes made in settings
  useEffect(() => {
    chrome.storage.local.get(['preferences', 'apiKey']).then(({ preferences: p, apiKey }) => {
      if (p) setPreferences(p);
      setHasApiKey(!!apiKey);
    });
    chrome.storage.sync.get(['preferences']).then(({ preferences: p }) => {
      if (p) setPreferences(p);
    });

    const onStorageChange = (changes: Record<string, chrome.storage.StorageChange>) => {
      if (changes.preferences?.newValue) setPreferences(changes.preferences.newValue);
      if ('apiKey' in changes) setHasApiKey(!!changes.apiKey?.newValue);
    };
    chrome.storage.onChanged.addListener(onStorageChange);
    return () => chrome.storage.onChanged.removeListener(onStorageChange);
  }, [setPreferences]);

  // Watch the active tab continuously. Re-fetches whenever the slug changes
  // (handles first open AND SPA navigation to new problems).
  const activeSlugRef = useRef('');
  useEffect(() => {
    let retryTimer: ReturnType<typeof setTimeout> | null = null;
    let retryCount = 0;

    function fetchFromTab() {
      chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        const tab = tabs[0];
        setCurrentTabUrl(tab?.url ?? '');
        if (!tab?.id || !tab.url?.includes('leetcode.com/problems/')) {
          // Left the problem page — clear state so default screen shows
          if (activeSlugRef.current) {
            activeSlugRef.current = '';
            setProblemContext(null);
            setSession(null);
            if (timerRef.current) clearInterval(timerRef.current);
          }
          return;
        }
        chrome.tabs.sendMessage(tab.id, { type: 'GET_SESSION' }, (ctx) => {
          if (chrome.runtime.lastError || !ctx || !ctx.slug) {
            if (retryCount++ < 20) retryTimer = setTimeout(fetchFromTab, 500);
            return;
          }
          retryCount = 0;
          if (ctx.slug !== activeSlugRef.current) {
            activeSlugRef.current = ctx.slug;
            loadContext(ctx);
          }
        });
      });
    }

    // Poll every second to catch SPA navigations
    fetchFromTab();
    const interval = setInterval(fetchFromTab, 1000);
    return () => {
      clearInterval(interval);
      if (retryTimer) clearTimeout(retryTimer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Apply theme
  useEffect(() => {
    const applyTheme = (theme: string) => {
      if (theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    applyTheme(preferences.theme);
  }, [preferences.theme]);

  // Start timer
  function startTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setElapsedSeconds((s: number) => s + 1);
    }, 1000);
  }

  // Idle tracker
  useEffect(() => {
    idleTimerRef.current = setInterval(() => {
      idleSecondsRef.current += 1;
      setIdleSeconds(idleSecondsRef.current);
    }, 1000);

    const reset = () => {
      idleSecondsRef.current = 0;
      setIdleSeconds(0);
    };

    window.addEventListener('keydown', reset);
    window.addEventListener('mousedown', reset);

    return () => {
      if (idleTimerRef.current) clearInterval(idleTimerRef.current);
      window.removeEventListener('keydown', reset);
      window.removeEventListener('mousedown', reset);
    };
  }, []);

  function loadContext(ctx: NonNullable<typeof problemContext>) {
    setProblemContext(ctx);
    chrome.storage.local.get([`session_${ctx.slug}`]).then((result) => {
      const existing: HintSession | undefined = result[`session_${ctx.slug}`];
      if (existing) {
        setSession(existing);
        setLevel(existing.highestLevelReached);
        setElapsedSeconds(Math.floor((Date.now() - existing.startedAt) / 1000));
      } else {
        const newSession: HintSession = {
          problemSlug: ctx.slug,
          problemTitle: ctx.title,
          difficulty: ctx.difficulty,
          startedAt: Date.now(),
          resolved: false,
          hints: [],
          highestLevelReached: 1,
        };
        setSession(newSession);
        setLevel(1);
        setElapsedSeconds(0);
      }
    });
    startTimer();
  }

  // Listen to Chrome messages
  useEffect(() => {
    const handler = (msg: ChromeMessage) => {
      if (msg.type === 'PROBLEM_CONTEXT' && msg.payload) {
        loadContext(msg.payload as NonNullable<typeof problemContext>);
      }

      if (msg.type === 'HINT_CHUNK') {
        streamBuffer.current += msg.payload as string;
        appendChunk(msg.payload as string);
      }

      if (msg.type === 'HINT_COMPLETE') {
        const text = streamBuffer.current;
        streamBuffer.current = '';
        clearStream();

        if (pendingTurnRef.current) {
          const turn: HintTurn = {
            id: generateId(),
            level: pendingTurnRef.current.level,
            userMessage: pendingTurnRef.current.userMessage,
            question: text,
            createdAt: Date.now(),
            coachStyle: useSidePanelStore.getState().preferences.coachStyle,
          };
          pendingTurnRef.current = null;
          addHint(turn);

          // Persist session
          persistSession(turn);
        }
      }

      if (msg.type === 'HINT_ERROR') {
        streamBuffer.current = '';
        clearStream();
        console.error('Hint error:', msg.payload);
      }

      if (msg.type === 'SUBMISSION_ACCEPTED') {
        setShowCelebration(true);
        if (timerRef.current) clearInterval(timerRef.current);
      }
    };

    chrome.runtime.onMessage.addListener(handler);
    return () => chrome.runtime.onMessage.removeListener(handler);
  }, [setProblemContext, setSession, setLevel, appendChunk, clearStream, addHint, setShowCelebration, setElapsedSeconds]);

  function persistSession(newTurn?: HintTurn) {
    const store = useSidePanelStore.getState();
    const s = store.session;
    if (!s) return;

    const updated: HintSession = newTurn
      ? {
          ...s,
          hints: [...s.hints, newTurn],
          highestLevelReached: Math.max(s.highestLevelReached, newTurn.level) as EscalationLevel,
        }
      : s;

    chrome.storage.local.set({ [`session_${s.problemSlug}`]: updated });

    // FIFO cap at 200
    chrome.storage.local.get(['sessionKeys']).then(({ sessionKeys }) => {
      const keys: string[] = sessionKeys ?? [];
      const key = `session_${s.problemSlug}`;
      const newKeys = [key, ...keys.filter((k) => k !== key)].slice(0, 200);
      if (newKeys.length >= 200) {
        const toRemove = keys.slice(199);
        chrome.storage.local.remove(toRemove);
      }
      chrome.storage.local.set({ sessionKeys: newKeys });
    });
  }

  function sendHintRequest(currentCode: string, userMessage?: string, levelOverride?: EscalationLevel) {
    if (!problemContext) return;
    const level = levelOverride ?? currentLevel;
    pendingTurnRef.current = { level, userMessage };

    const store = useSidePanelStore.getState();
    const hints = store.session?.hints ?? [];
    const lastDownvoted = [...hints].reverse().find((h) => h.rating === 'down');

    chrome.runtime.sendMessage({
      type: 'REQUEST_HINT',
      payload: {
        problemTitle: problemContext.title,
        description: problemContext.description,
        currentCode,
        level,
        priorHints: hints,
        userMessage,
        previousHintToAvoid: lastDownvoted?.question,
      },
    });
  }

  function requestHint(userMessage?: string, levelOverride?: EscalationLevel) {
    if (!problemContext || isStreaming) return;

    // Always fetch the latest code from the editor right before sending
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (!tab?.id) {
        sendHintRequest(problemContext.currentCode, userMessage, levelOverride);
        return;
      }
      chrome.tabs.sendMessage(tab.id, { type: 'GET_SESSION' }, (ctx) => {
        const code = (!chrome.runtime.lastError && ctx?.currentCode) ? ctx.currentCode : problemContext.currentCode;
        sendHintRequest(code, userMessage, levelOverride);
      });
    });
  }

  function handleStuck(userMessage?: string) {
    requestHint(userMessage);
  }

  function handleEscalate() {
    if (currentLevel === 2) {
      setShowRevealModal(true);
      return;
    }
    const next = Math.min(currentLevel + 1, 3) as EscalationLevel;
    setLevel(next);
    requestHint(undefined, next);
  }

  function handleRevealConfirm() {
    setShowRevealModal(false);
    setLevel(3);
    requestHint(undefined, 3);
  }

  function handleRevealCancel() {
    setShowRevealModal(false);
    requestHint(undefined, 2);
  }

  function handleRevealButton() {
    setShowRevealModal(true);
  }

  function handleRate(id: string, rating: 'up' | 'down') {
    rateHint(id, rating);
  }

  if (!problemContext || !session) {
    const isOnProblemPage = currentTabUrl.includes('leetcode.com/problems/');
    return (
      <div className="flex flex-col h-screen bg-[#FAFAF9] dark:bg-[#0F0F0F] text-zinc-900 dark:text-zinc-100">
        <Header onSettings={() => chrome.runtime.openOptionsPage()} />
        <div className="flex-1 flex items-center justify-center px-6">
          {isOnProblemPage ? (
            <div className="text-center">
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Loading problem…</p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500">
                If this takes too long,{' '}
                <button
                  onClick={() => chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
                    if (tabs[0]?.id) chrome.tabs.reload(tabs[0].id);
                  })}
                  className="underline hover:text-amber-500 transition-colors"
                >
                  reload the page
                </button>
                .
              </p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">No problem open.</p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500">
                Navigate to a{' '}
                <button
                  onClick={() => chrome.tabs.create({ url: 'https://leetcode.com/problemset/' })}
                  className="underline hover:text-amber-500 transition-colors"
                >
                  LeetCode problem
                </button>
                {' '}to get started.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#FAFAF9] dark:bg-[#0F0F0F] text-zinc-900 dark:text-zinc-100 relative overflow-hidden">
      <Header onSettings={() => chrome.runtime.openOptionsPage()} />

      <ProblemContext
        title={session.problemTitle}
        difficulty={session.difficulty}
        elapsedSeconds={elapsedSeconds}
        hintCount={session.hints.length}
      />

      <ConversationThread
        turns={session.hints}
        streamingText={streamingText}
        isStreaming={isStreaming}
        coachStyle={preferences.coachStyle}
        onRate={handleRate}
      />

      {hasApiKey === false ? (
        <div className="px-4 py-4 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-3 text-center">
            An API key is required to get hints.
          </p>
          <button
            onClick={() => chrome.runtime.openOptionsPage()}
            className="w-full rounded-lg bg-amber-500 py-2.5 text-sm font-semibold text-white hover:bg-amber-600 transition-colors active:scale-95"
          >
            Add API Key →
          </button>
        </div>
      ) : (
        <>
          <EscalationStrip level={currentLevel} onLevelChange={setLevel} />
          <InputArea
            level={currentLevel}
            isStreaming={isStreaming}
            idleSeconds={idleSeconds}
            onStuck={handleStuck}
            onEscalate={handleEscalate}
            onReveal={handleRevealButton}
          />
        </>
      )}

      {showRevealModal && (
        <RevealModal onConfirm={handleRevealConfirm} onCancel={handleRevealCancel} />
      )}

      {showCelebration && (
        <SolveCelebration
          elapsedSeconds={elapsedSeconds}
          hintCount={session.hints.length}
          highestLevel={session.highestLevelReached}
          onDone={() => setShowCelebration(false)}
        />
      )}
    </div>
  );
}
