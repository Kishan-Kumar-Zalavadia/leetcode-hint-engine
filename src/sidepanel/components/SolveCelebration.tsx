import React, { useEffect, useState } from 'react';

interface SolveCelebrationProps {
  elapsedSeconds: number;
  hintCount: number;
  highestLevel: number;
  onDone: () => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function SolveCelebration({ elapsedSeconds, hintCount, highestLevel, onDone }: SolveCelebrationProps) {
  const [visible, setVisible] = useState(true);

  function dismiss() {
    setVisible(false);
    setTimeout(onDone, 300);
  }

  useEffect(() => {
    const timer = setTimeout(dismiss, 8000);
    return () => clearTimeout(timer);
  }, []);

  const noHints = hintCount === 0;
  const heldOut = highestLevel <= 1;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="mx-3 mb-3 rounded-[12px] border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950 p-4 shadow-lg">
        <div className="flex items-start justify-between">
          <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">Problem solved ◆</p>
          <button
            onClick={dismiss}
            className="text-amber-400 hover:text-amber-700 dark:hover:text-amber-200 transition-colors ml-2 leading-none"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
        <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
          Solved in {formatTime(elapsedSeconds)} with {hintCount} hint{hintCount !== 1 ? 's' : ''}.
          {noHints && ' No hints needed.'}
          {!noHints && heldOut && ' You held out at level 1.'}
        </p>
      </div>
    </div>
  );
}
