import React from 'react';

interface RevealModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function RevealModal({ onConfirm, onCancel }: RevealModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full rounded-[12px] bg-white dark:bg-zinc-900 p-5 shadow-xl">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
          You have done real work.
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
          Are you sure you want the answer now? You can also try one more level 2 hint.
        </p>
        <div className="flex flex-col gap-2">
          <button
            onClick={onCancel}
            className="w-full rounded-lg bg-amber-500 py-2.5 text-sm font-medium text-white hover:bg-amber-600 transition-colors active:scale-95"
          >
            Try another hint
          </button>
          <button
            onClick={onConfirm}
            className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 py-2.5 text-sm font-medium text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors active:scale-95"
          >
            Reveal anyway
          </button>
        </div>
      </div>
    </div>
  );
}
