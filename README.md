# ◆ LeetCoach

> **The coding mentor that lives in your browser — asks the right question instead of giving you the answer.**

[![Built with TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React 18](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Manifest V3](https://img.shields.io/badge/Chrome-Manifest%20V3-4285F4?style=flat&logo=googlechrome&logoColor=white)](https://developer.chrome.com/docs/extensions/mv3/)
[![Powered by Claude](https://img.shields.io/badge/Powered%20by-Claude%20Sonnet-D97706?style=flat)](https://anthropic.com/)

---

## 🤔 What is this?

You're stuck on a LeetCode problem. You have two options:

- 😤 Grind for 90 minutes and quit
- 😞 Peek at the solution and feel terrible about it

**LeetCoach is the third option.**

It's a Chrome extension that sits in a side panel while you solve LeetCode problems. When you're stuck, instead of handing you the answer, it asks you *the next question a great mentor would ask* — Socratic method, not spoilers.

```
You:     "I'm trying nested loops but it feels slow."

Coach:   "Notice that for each element you check, you are scanning
          the rest of the list. What information are you computing
          and then forgetting?"
```

You keep the dignity of solving it yourself. 🏆

---

## ✨ Features

| Feature | Description |
|---|---|
| 💬 **Socratic hints** | 3 escalation levels — Nudge → Hint → Reveal |
| 🧠 **Code-aware** | Reads your Monaco editor code in real time |
| 🎭 **3 coach styles** | Coach (warm), Professor (precise), Peer (casual) |
| 🌊 **Streaming responses** | Hints appear word-by-word, like a human typing |
| 🌗 **Light & dark mode** | Auto-matches LeetCode's current theme |
| 💾 **Per-problem history** | Every conversation saved locally, up to 200 problems |
| 🎉 **Solve celebration** | A quiet, elegant card when you submit Accepted |
| 👍 **Hint feedback** | Thumbs up/down — thumbs down regenerates from a new angle |
| 🔑 **Bring your own key** | Your Anthropic API key, stored only on your device |

---

## 🚀 Getting Started

### Prerequisites

- Google Chrome (or any Chromium browser)
- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com/settings/keys) — new accounts get free trial credits, and hints cost under $0.01 each

### 1. Clone & install

```bash
git clone https://github.com/yourusername/leetcode-hint-engine.git
cd leetcode-hint-engine
npm install
```

### 2. Build

```bash
npm run build
```

This generates a `dist/` folder — that's your extension.

> 💡 For live rebuilding during development, use `npm run dev` instead.

### 3. Load in Chrome

1. Open Chrome and go to `chrome://extensions`
2. Toggle **Developer mode** on (top-right corner)
3. Click **Load unpacked**
4. Select the `dist/` folder

You should see the ◆ LeetCoach icon appear in your toolbar.

### 4. Add your API key

1. Click the LeetCoach icon to open the side panel
2. Click **Settings** (⚙ gear icon) → paste your Anthropic API key → **Test connection**
3. Pick your coach style and you're ready

### 5. Start solving

Navigate to any `leetcode.com/problems/...` page. The panel loads automatically. Click **"I'm stuck"** whenever you need a nudge. 🎯

---

## 🎭 Coach Styles

Choose the voice that keeps you motivated:

| Style | Personality | Best for |
|---|---|---|
| 🤝 **Coach** | Warm, encouraging, celebrates small wins | Most people — the default |
| 🎓 **Professor** | Precise, formal, technical | When you want zero fluff |
| 👥 **Peer** | Casual, occasionally jokes, like a friend pairing | When you want it to feel human |

---

## 💡 Hint Levels

LeetCoach never skips straight to the answer. It escalates slowly:

```
Level 1 — Nudge 🟡○○
"What information are you computing repeatedly?"

Level 2 — Hint 🟡🟡○
"If you could remember what you've seen in one pass,
 what would you store, and how would you look it up?"

Level 3 — Reveal 🟡🟡🟡
"Consider a single pass with a hash map mapping value
 to index. What would you check on each element?"
```

Level 3 is gated behind a confirmation modal — because you've done real work and we want you to be sure.

---

## 🏗️ Tech Stack

```
Chrome Extension (Manifest V3)
├── Background service worker  →  All Anthropic API calls live here
├── Content script             →  Scrapes LeetCode DOM + Monaco editor
├── Side panel (React 18)      →  The chat UI
├── Onboarding page            →  First-time setup flow
└── Settings page              →  API key, model, coach style, theme

Stack:
  TypeScript 5    Vite + @crxjs/vite-plugin    React 18
  Tailwind CSS    Zustand    @anthropic-ai/sdk
```

### Why the background worker owns all API calls

The API key never touches the content script or the React panel. It lives in `chrome.storage.local` and is only accessed by the service worker — a deliberate security boundary. ✅

---

## 📁 Project Structure

```
src/
├── background/        # Service worker — API calls, message routing
├── content/           # LeetCode DOM scraper, Monaco reader
├── sidepanel/         # Main React app (chat UI)
│   ├── components/    # Header, ConversationThread, InputArea, etc.
│   └── store/         # Zustand state
├── onboarding/        # First-time setup flow
├── settings/          # Settings page
└── types/             # Shared TypeScript types
```

---

## 💸 Cost

Hints are cheap. Genuinely cheap.

| Model | Cost per hint (approx.) |
|---|---|
| Claude Haiku 4.5 | ~$0.001 |
| Claude Sonnet 4.6 *(default)* | ~$0.005 |
| Claude Opus 4.6 | ~$0.03 |

Solving 100 problems with 2 hints each on Sonnet costs roughly **$1**. Prompt caching cuts repeat costs by ~90% within a session.

---

## 🔒 Privacy

- Your API key is stored in `chrome.storage.local` **only** — never synced to any server
- Problem data and conversations never leave your machine
- The only outbound connection is directly to `api.anthropic.com`
- Zero analytics, zero telemetry, zero tracking

---

## 🛠️ Development

```bash
npm run dev      # Watch mode — rebuilds on every file save
npm run build    # Production build
```

After any rebuild, go to `chrome://extensions` and click the **refresh icon** on the LeetCoach card to hot-reload.

---

## 🗺️ Roadmap

- [x] v1 — Socratic hints, 3 coach styles, code awareness, streaming
- [ ] v2 — Pattern mastery dashboard (track which topics you struggle with)
- [ ] v2 — Pre-code verbalization gate ("explain your approach before coding")
- [ ] v2 — Failed submission analyzer
- [ ] v3 — HackerRank / Codeforces support

---

## 🤝 Contributing

PRs welcome. If you find a bug or have an idea, open an issue first so we can discuss it.

---

## 📄 License

MIT — do whatever you want with it.

---

<p align="center">
  Built for engineers who want to actually get better, not just get the answer.
  <br/>
  <strong>◆ LeetCoach</strong>
</p>
