import { r as reactExports, j as jsxRuntimeExports, c as createRoot, R as React } from "./index-DHxqnmwF.js";
const DEFAULT_PREFS = {
  coachStyle: "coach",
  model: "claude-sonnet-4-6",
  theme: "auto",
  showStreakInPanel: false
};
const COACH_STYLES = [
  { id: "coach", label: "Coach", desc: "Warm and encouraging." },
  { id: "professor", label: "Professor", desc: "Precise and formal." },
  { id: "peer", label: "Peer", desc: "Casual and friendly." }
];
const MODELS = [
  { id: "claude-sonnet-4-6", label: "Sonnet 4.6", cost: "~$0.005 / hint" },
  { id: "claude-haiku-4-5-20251001", label: "Haiku 4.5", cost: "~$0.001 / hint" },
  { id: "claude-opus-4-6", label: "Opus 4.6", cost: "~$0.03 / hint" }
];
function SettingsApp() {
  const [apiKey, setApiKey] = reactExports.useState("");
  const [prefs, setPrefs] = reactExports.useState(DEFAULT_PREFS);
  const [keyStatus, setKeyStatus] = reactExports.useState("idle");
  const [lastTested, setLastTested] = reactExports.useState(null);
  const [resetConfirm, setResetConfirm] = reactExports.useState(false);
  const [saved, setSaved] = reactExports.useState(false);
  function applyTheme(theme) {
    if (theme === "dark" || theme === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
  reactExports.useEffect(() => {
    chrome.storage.local.get(["apiKey", "preferences", "lastKeyTest"]).then((res) => {
      if (res.apiKey) setApiKey(res.apiKey);
      if (res.preferences) {
        const p = res.preferences;
        setPrefs(p);
        applyTheme(p.theme);
      } else {
        applyTheme("auto");
      }
      if (res.lastKeyTest) setLastTested(res.lastKeyTest);
    });
  }, []);
  async function testKey() {
    setKeyStatus("testing");
    try {
      const { ok } = await chrome.runtime.sendMessage({ type: "TEST_API_KEY", payload: apiKey });
      setKeyStatus(ok ? "ok" : "fail");
      if (ok) {
        const ts = (/* @__PURE__ */ new Date()).toLocaleString();
        setLastTested(ts);
        await chrome.storage.local.set({ lastKeyTest: ts });
      }
    } catch {
      setKeyStatus("fail");
    }
  }
  async function savePrefs(updated) {
    setPrefs(updated);
    applyTheme(updated.theme);
    await chrome.storage.local.set({ preferences: updated });
    await chrome.storage.sync.set({ preferences: updated });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }
  async function resetHistory() {
    const { sessionKeys } = await chrome.storage.local.get(["sessionKeys"]);
    if (sessionKeys) {
      await chrome.storage.local.remove(sessionKeys);
    }
    await chrome.storage.local.remove(["sessionKeys"]);
    setResetConfirm(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-[#FAFAF9] dark:bg-[#0F0F0F] text-zinc-900 dark:text-zinc-100 px-6 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-500 text-xl font-bold", children: "◆" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-semibold", children: "LeetCoach Settings" }),
      saved && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-xs text-green-500", children: "Saved" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold mb-3 text-zinc-700 dark:text-zinc-300 uppercase tracking-wide", children: "API Key" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "password",
          value: apiKey,
          onChange: (e) => {
            setApiKey(e.target.value);
            setKeyStatus("idle");
          },
          placeholder: "sk-ant-…",
          className: "w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 mb-2"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: testKey,
            disabled: !apiKey || keyStatus === "testing",
            className: "rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600 disabled:opacity-50 transition-colors",
            children: keyStatus === "testing" ? "Testing…" : "Test connection"
          }
        ),
        keyStatus === "ok" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-green-500", children: "Connected ✓" }),
        keyStatus === "fail" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-red-500", children: "Failed ✗" }),
        lastTested && keyStatus === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-zinc-400", children: [
          "Last tested: ",
          lastTested
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold mb-3 text-zinc-700 dark:text-zinc-300 uppercase tracking-wide", children: "Model" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: MODELS.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "label",
        {
          className: `flex items-center justify-between rounded-[12px] border p-3 cursor-pointer transition-all ${prefs.model === m.id ? "border-amber-500 bg-amber-50 dark:bg-amber-950" : "border-zinc-200 dark:border-zinc-800"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "radio",
                  name: "model",
                  value: m.id,
                  checked: prefs.model === m.id,
                  onChange: () => savePrefs({ ...prefs, model: m.id }),
                  className: "accent-amber-500"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: m.label })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-zinc-400", children: m.cost })
          ]
        },
        m.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold mb-3 text-zinc-700 dark:text-zinc-300 uppercase tracking-wide", children: "Coach Style" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: COACH_STYLES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "label",
        {
          className: `flex items-center gap-3 rounded-[12px] border p-3 cursor-pointer transition-all ${prefs.coachStyle === s.id ? "border-amber-500 bg-amber-50 dark:bg-amber-950" : "border-zinc-200 dark:border-zinc-800"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "radio",
                name: "coachStyle",
                value: s.id,
                checked: prefs.coachStyle === s.id,
                onChange: () => savePrefs({ ...prefs, coachStyle: s.id }),
                className: "accent-amber-500"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: s.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-zinc-400", children: s.desc })
            ] })
          ]
        },
        s.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold mb-3 text-zinc-700 dark:text-zinc-300 uppercase tracking-wide", children: "Theme" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["auto", "light", "dark"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => savePrefs({ ...prefs, theme: t }),
          className: `flex-1 rounded-lg border py-2 text-sm font-medium capitalize transition-all ${prefs.theme === t ? "border-amber-500 bg-amber-50 dark:bg-amber-950 text-amber-600" : "border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:border-zinc-300"}`,
          children: t
        },
        t
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold mb-3 text-zinc-700 dark:text-zinc-300 uppercase tracking-wide", children: "Data" }),
      !resetConfirm ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setResetConfirm(true),
          className: "rounded-lg border border-red-200 dark:border-red-900 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors",
          children: "Reset hint history"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: resetHistory,
            className: "rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition-colors",
            children: "Confirm reset"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setResetConfirm(false),
            className: "rounded-lg border border-zinc-200 dark:border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors",
            children: "Cancel"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold mb-3 text-zinc-700 dark:text-zinc-300 uppercase tracking-wide", children: "About" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-zinc-500 dark:text-zinc-400 mb-1", children: "Version 1.0.0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-zinc-400 leading-relaxed", children: "Zero data leaves your device except direct calls to Anthropic's API. Your API key is stored in chrome.storage.local only." })
    ] })
  ] }) });
}
const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsApp, {}) })
  );
}
//# sourceMappingURL=index.html-BKEFZS7l.js.map
