import React, { useState } from 'react';
import type { CoachStyle } from '../types';

const COACH_STYLES: { id: CoachStyle; label: string; desc: string }[] = [
  { id: 'coach', label: 'Coach', desc: 'Warm and encouraging. Celebrates your wins.' },
  { id: 'professor', label: 'Professor', desc: 'Precise and formal. Pure technical clarity.' },
  { id: 'peer', label: 'Peer', desc: 'Casual and friendly. Debugs with you like a friend.' },
];

export function OnboardingApp() {
  const [step, setStep] = useState(0);
  const [apiKey, setApiKey] = useState('');
  const [keyValid, setKeyValid] = useState<boolean | null>(null);
  const [validating, setValidating] = useState(false);
  const [coachStyle, setCoachStyle] = useState<CoachStyle>('coach');

  // Apply theme from saved preferences, fallback to system preference
  React.useEffect(() => {
    chrome.storage.local.get(['preferences']).then(({ preferences: p }) => {
      const theme = p?.theme ?? 'auto';
      if (theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });
  }, []);

  async function validateKey(key: string) {
    setValidating(true);
    try {
      const { ok } = await chrome.runtime.sendMessage({ type: 'TEST_API_KEY', payload: key });
      setKeyValid(ok);
    } catch {
      setKeyValid(false);
    }
    setValidating(false);
  }

  async function finish() {
    await chrome.storage.local.set({ preferences: { coachStyle, model: 'claude-sonnet-4-6', theme: 'auto', showStreakInPanel: false } });
    await chrome.storage.sync.set({ preferences: { coachStyle, model: 'claude-sonnet-4-6', theme: 'auto', showStreakInPanel: false } });
    window.location.href = 'https://leetcode.com/problems/two-sum/';
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0F0F0F] text-zinc-900 dark:text-zinc-100 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <span className="text-amber-500 text-2xl font-bold">◆</span>
          <span className="text-xl font-semibold">LeetCoach</span>
        </div>

        {/* Progress strip */}
        <div className="flex gap-2 mb-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? 'bg-amber-500' : 'bg-zinc-200 dark:bg-zinc-800'}`}
            />
          ))}
        </div>

        {/* Step 0: Get your key */}
        {step === 0 && (
          <div>
            <h1 className="text-xl font-semibold mb-2">Get your Anthropic key</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
              LeetCoach uses your own Anthropic API key — your key stays on your device. Hints cost under a cent each.
            </p>
            <a
              href="https://console.anthropic.com/settings/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-lg bg-amber-500 py-3 text-center text-sm font-semibold text-white hover:bg-amber-600 transition-colors mb-4"
            >
              Open Anthropic Console
            </a>
            <button
              onClick={() => setStep(1)}
              className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 py-3 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
            >
              I already have a key →
            </button>
          </div>
        )}

        {/* Step 1: Paste your key */}
        {step === 1 && (
          <div>
            <h1 className="text-xl font-semibold mb-2">Paste your API key</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
              Stored only in your browser. Never sent anywhere except Anthropic.
            </p>
            <div className="relative mb-4">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => { setApiKey(e.target.value); setKeyValid(null); }}
                placeholder="sk-ant-…"
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2.5 text-sm pr-10 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              {keyValid === true && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">✓</span>
              )}
              {keyValid === false && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">✗</span>
              )}
            </div>
            <button
              onClick={() => validateKey(apiKey)}
              disabled={!apiKey || validating}
              className="w-full rounded-lg bg-amber-500 py-3 text-sm font-semibold text-white hover:bg-amber-600 transition-colors disabled:opacity-50 mb-2"
            >
              {validating ? 'Validating…' : 'Validate key'}
            </button>
            {keyValid === true && (
              <button
                onClick={() => setStep(2)}
                className="w-full rounded-lg border border-amber-500 py-3 text-sm font-medium text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950 transition-colors"
              >
                Next →
              </button>
            )}
          </div>
        )}

        {/* Step 2: Pick coach style */}
        {step === 2 && (
          <div>
            <h1 className="text-xl font-semibold mb-2">Pick your coach style</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
              You can change this in settings, but not more than once a week.
            </p>
            <div className="flex flex-col gap-3 mb-6">
              {COACH_STYLES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setCoachStyle(s.id)}
                  className={`text-left rounded-[12px] border p-4 transition-all ${
                    coachStyle === s.id
                      ? 'border-amber-500 bg-amber-50 dark:bg-amber-950'
                      : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  <p className="text-sm font-semibold">{s.label}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{s.desc}</p>
                </button>
              ))}
            </div>
            <button
              onClick={finish}
              className="w-full rounded-lg bg-amber-500 py-3 text-sm font-semibold text-white hover:bg-amber-600 transition-colors"
            >
              Open LeetCode →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
