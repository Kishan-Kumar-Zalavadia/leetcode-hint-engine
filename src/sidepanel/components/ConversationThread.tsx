import React, { useEffect, useRef } from 'react';
import type { HintTurn, CoachStyle } from '../../types';

interface ConversationThreadProps {
  turns: HintTurn[];
  streamingText: string;
  isStreaming: boolean;
  coachStyle: CoachStyle;
  onRate: (id: string, rating: 'up' | 'down') => void;
}

const coachLabel: Record<CoachStyle, string> = {
  coach: 'Coach',
  professor: 'Professor',
  peer: 'Peer',
};

function HintCard({ turn, coachStyle, onRate }: { turn: HintTurn; coachStyle: CoachStyle; onRate: (id: string, rating: 'up' | 'down') => void }) {
  const label = coachLabel[turn.coachStyle ?? coachStyle];
  return (
    <div className="rounded-[12px] border-l-2 border-amber-500 bg-white dark:bg-zinc-900 p-3 shadow-sm">
      <p className="text-xs font-semibold text-amber-500 mb-1">◆ {label}</p>
      <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">{turn.question}</p>
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onRate(turn.id, 'up')}
          className={`text-base transition-opacity ${turn.rating === 'up' ? 'opacity-100' : 'opacity-40 hover:opacity-80'}`}
          disabled={!!turn.rating}
          title="Helpful"
        >
          👍
        </button>
        <button
          onClick={() => onRate(turn.id, 'down')}
          className={`text-base transition-opacity ${turn.rating === 'down' ? 'opacity-100' : 'opacity-40 hover:opacity-80'}`}
          disabled={!!turn.rating}
          title="Not helpful"
        >
          👎
        </button>
      </div>
    </div>
  );
}

function UserCard({ message }: { message: string }) {
  return (
    <div className="rounded-[12px] bg-zinc-100 dark:bg-zinc-800 p-3 self-end ml-6">
      <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">You</p>
      <p className="text-sm text-zinc-800 dark:text-zinc-200">{message}</p>
    </div>
  );
}

export function ConversationThread({ turns, streamingText, isStreaming, coachStyle, onRate }: ConversationThreadProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [turns, streamingText]);

  if (turns.length === 0 && !isStreaming) {
    return (
      <div className="flex-1 flex items-center justify-center px-6">
        <p className="text-sm text-zinc-400 dark:text-zinc-500 text-center italic">
          Start coding. I will jump in when you ask.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
      {turns.map((turn) => (
        <React.Fragment key={turn.id}>
          {turn.userMessage && <UserCard message={turn.userMessage} />}
          {!turn.streaming && <HintCard turn={turn} coachStyle={coachStyle} onRate={onRate} />}
        </React.Fragment>
      ))}

      {isStreaming && (
        <div className="rounded-[12px] border-l-2 border-amber-500 bg-white dark:bg-zinc-900 p-3 shadow-sm">
          <p className="text-xs font-semibold text-amber-500 mb-1">◆ {coachLabel[coachStyle]}</p>
          <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
            {streamingText}
            <span className="inline-block w-0.5 h-4 bg-amber-500 ml-0.5 animate-pulse align-text-bottom" />
          </p>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
