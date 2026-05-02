import React from 'react';
import type { EscalationLevel } from '../../types';

interface EscalationStripProps {
  level: EscalationLevel;
  onLevelChange: (level: EscalationLevel) => void;
}

const levelLabels: Record<EscalationLevel, string> = {
  1: 'Nudge',
  2: 'Hint',
  3: 'Reveal',
};

export function EscalationStrip({ level, onLevelChange }: EscalationStripProps) {
  return (
    <div className="flex items-center gap-2 px-4 h-10 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400">
      <span>Level:</span>

      <button
        onClick={() => level > 1 && onLevelChange((level - 1) as EscalationLevel)}
        disabled={level <= 1}
        className="w-4 h-4 flex items-center justify-center rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 transition-colors"
        title="Lower hint level"
      >
        −
      </button>

      <div className="flex gap-1">
        {([1, 2, 3] as EscalationLevel[]).map((l) => (
          <button
            key={l}
            onClick={() => onLevelChange(l)}
            title={levelLabels[l]}
            className={`w-2 h-2 rounded-full transition-colors hover:scale-125 ${
              l <= level ? 'bg-amber-500' : 'bg-zinc-300 dark:bg-zinc-700'
            }`}
          />
        ))}
      </div>

      <button
        onClick={() => level < 3 && onLevelChange((level + 1) as EscalationLevel)}
        disabled={level >= 3}
        className="w-4 h-4 flex items-center justify-center rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 transition-colors"
        title="Raise hint level"
      >
        +
      </button>

      <span>{levelLabels[level]}</span>
    </div>
  );
}
