import React from 'react';
import type { Difficulty } from '../../types';

interface ProblemContextProps {
  title: string;
  difficulty: Difficulty;
  elapsedSeconds: number;
  hintCount: number;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

const difficultyColors: Record<Difficulty, string> = {
  Easy: 'bg-green-500',
  Medium: 'bg-amber-500',
  Hard: 'bg-red-500',
};

export function ProblemContext({ title, difficulty, elapsedSeconds, hintCount }: ProblemContextProps) {
  return (
    <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
      <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 truncate">{title}</p>
      <div className="flex items-center gap-3 mt-1 text-xs text-zinc-500 dark:text-zinc-400">
        <span className="flex items-center gap-1">
          <span className={`inline-block w-2 h-2 rounded-full ${difficultyColors[difficulty]}`} />
          {difficulty}
        </span>
        <span>⏱ {formatTime(elapsedSeconds)}</span>
        {hintCount > 0 && <span>💡 {hintCount} hint{hintCount !== 1 ? 's' : ''} used</span>}
      </div>
    </div>
  );
}
