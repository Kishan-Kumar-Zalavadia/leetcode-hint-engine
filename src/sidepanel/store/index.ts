import { create } from 'zustand';
import type { EscalationLevel, HintSession, HintTurn, ProblemContext, UserPreferences } from '../../types';

interface SidePanelState {
  // Problem
  problemContext: ProblemContext | null;
  setProblemContext: (ctx: ProblemContext) => void;

  // Session
  session: HintSession | null;
  setSession: (session: HintSession | null) => void;

  // Escalation
  currentLevel: EscalationLevel;
  setLevel: (level: EscalationLevel) => void;

  // Streaming
  streamingText: string;
  isStreaming: boolean;
  appendChunk: (chunk: string) => void;
  clearStream: () => void;

  // UI
  showRevealModal: boolean;
  setShowRevealModal: (v: boolean) => void;
  showCelebration: boolean;
  setShowCelebration: (v: boolean) => void;

  // Hints
  addHint: (turn: HintTurn) => void;
  rateHint: (id: string, rating: 'up' | 'down') => void;

  // Prefs
  preferences: UserPreferences;
  setPreferences: (p: UserPreferences) => void;

  // Timer
  elapsedSeconds: number;
  setElapsedSeconds: (s: number) => void;
}

const DEFAULT_PREFS: UserPreferences = {
  coachStyle: 'coach',
  model: 'claude-sonnet-4-6',
  theme: 'auto',
  showStreakInPanel: false,
};

export const useSidePanelStore = create<SidePanelState>((set) => ({
  problemContext: null,
  setProblemContext: (ctx) => set({ problemContext: ctx }),

  session: null,
  setSession: (session) => set({ session }),

  currentLevel: 1,
  setLevel: (level) => set({ currentLevel: level }),

  streamingText: '',
  isStreaming: false,
  appendChunk: (chunk) => set((s) => ({ streamingText: s.streamingText + chunk, isStreaming: true })),
  clearStream: () => set({ streamingText: '', isStreaming: false }),

  showRevealModal: false,
  setShowRevealModal: (v) => set({ showRevealModal: v }),
  showCelebration: false,
  setShowCelebration: (v) => set({ showCelebration: v }),

  addHint: (turn) =>
    set((s) => ({
      session: s.session
        ? {
            ...s.session,
            hints: [...s.session.hints, turn],
            highestLevelReached: Math.max(s.session.highestLevelReached, turn.level) as EscalationLevel,
          }
        : null,
    })),

  rateHint: (id, rating) =>
    set((s) => ({
      session: s.session
        ? {
            ...s.session,
            hints: s.session.hints.map((h) => (h.id === id ? { ...h, rating } : h)),
          }
        : null,
    })),

  preferences: DEFAULT_PREFS,
  setPreferences: (p) => set({ preferences: p }),

  elapsedSeconds: 0,
  setElapsedSeconds: (s) => set({ elapsedSeconds: s }),
}));
