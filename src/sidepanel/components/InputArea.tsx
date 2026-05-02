import React, { useState, useRef } from 'react';
import type { EscalationLevel } from '../../types';

interface InputAreaProps {
  level: EscalationLevel;
  isStreaming: boolean;
  idleSeconds: number;
  onStuck: (userMessage?: string) => void;
  onEscalate: () => void;
  onReveal: () => void;
}

export function InputArea({ level, isStreaming, idleSeconds, onStuck, onEscalate, onReveal }: InputAreaProps) {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isIdle = idleSeconds >= 90;

  function handleStuck() {
    const msg = text.trim() || undefined;
    setText('');
    onStuck(msg);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isStreaming) handleStuck();
    }
  }

  return (
    <div className="sticky bottom-0 px-4 pb-4 pt-2 border-t border-zinc-200 dark:border-zinc-800 bg-[#FAFAF9] dark:bg-[#0F0F0F]">
      <textarea
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={2}
        placeholder="Type a follow-up question…"
        disabled={isStreaming}
        className="w-full resize-none rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-amber-500 disabled:opacity-50 mb-2"
      />
      <div className="flex gap-2">
        <button
          onClick={handleStuck}
          disabled={isStreaming}
          className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all active:scale-95 disabled:opacity-50 ${
            isIdle
              ? 'bg-amber-500 text-white animate-pulse'
              : 'bg-amber-500 text-white hover:bg-amber-600'
          }`}
        >
          I&apos;m stuck
        </button>

        {level < 3 ? (
          <button
            onClick={onEscalate}
            disabled={isStreaming}
            className="flex-1 rounded-lg border border-zinc-200 dark:border-zinc-700 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all active:scale-95 disabled:opacity-50"
          >
            Need a bigger hint
          </button>
        ) : (
          <button
            onClick={onReveal}
            disabled={isStreaming}
            className="flex-1 rounded-lg border border-red-200 dark:border-red-900 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-all active:scale-95 disabled:opacity-50"
          >
            Reveal
          </button>
        )}
      </div>
    </div>
  );
}
