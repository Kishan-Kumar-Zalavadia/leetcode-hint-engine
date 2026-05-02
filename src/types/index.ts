export type CoachStyle = 'coach' | 'professor' | 'peer';
export type EscalationLevel = 1 | 2 | 3;
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type ModelOption = 'claude-sonnet-4-6' | 'claude-haiku-4-5-20251001' | 'claude-opus-4-6';
export type Theme = 'auto' | 'light' | 'dark';

export interface HintTurn {
  id: string;
  level: EscalationLevel;
  userMessage?: string;
  question: string;
  rating?: 'up' | 'down';
  createdAt: number;
  streaming?: boolean;
  coachStyle?: CoachStyle;
}

export interface HintSession {
  problemSlug: string;
  problemTitle: string;
  difficulty: Difficulty;
  startedAt: number;
  endedAt?: number;
  resolved: boolean;
  hints: HintTurn[];
  highestLevelReached: EscalationLevel;
}

export interface UserPreferences {
  coachStyle: CoachStyle;
  model: ModelOption;
  theme: Theme;
  showStreakInPanel: boolean;
}

export interface ProblemContext {
  slug: string;
  title: string;
  difficulty: Difficulty;
  description: string;
  currentCode: string;
}

// Chrome message types
export type MessageType =
  | 'PROBLEM_CONTEXT'
  | 'REQUEST_HINT'
  | 'HINT_CHUNK'
  | 'HINT_COMPLETE'
  | 'HINT_ERROR'
  | 'SUBMISSION_ACCEPTED'
  | 'GET_SESSION'
  | 'RATE_HINT'
  | 'OPEN_SIDE_PANEL'
  | 'TEST_API_KEY';

export interface ChromeMessage {
  type: MessageType;
  payload?: unknown;
}
