import { j as jsxRuntimeExports, r as reactExports, R as React$2, g as getDefaultExportFromCjs, c as createRoot } from "./index-DHxqnmwF.js";
function Header({ onSettings }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-10 flex items-center justify-between px-4 h-12 border-b border-zinc-200 dark:border-zinc-800 bg-[#FAFAF9] dark:bg-[#0F0F0F]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-500 text-lg font-bold leading-none", children: "◆" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm tracking-tight text-zinc-900 dark:text-zinc-100", children: "LeetCoach" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: onSettings,
        className: "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors",
        title: "Settings",
        "aria-label": "Settings",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-4 h-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" })
        ] })
      }
    ) })
  ] });
}
function formatTime$1(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
const difficultyColors = {
  Easy: "bg-green-500",
  Medium: "bg-amber-500",
  Hard: "bg-red-500"
};
function ProblemContext({ title, difficulty, elapsedSeconds, hintCount }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-b border-zinc-200 dark:border-zinc-800", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-zinc-900 dark:text-zinc-100 truncate", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-1 text-xs text-zinc-500 dark:text-zinc-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-block w-2 h-2 rounded-full ${difficultyColors[difficulty]}` }),
        difficulty
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "⏱ ",
        formatTime$1(elapsedSeconds)
      ] }),
      hintCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "💡 ",
        hintCount,
        " hint",
        hintCount !== 1 ? "s" : "",
        " used"
      ] })
    ] })
  ] });
}
const coachLabel = {
  coach: "Coach",
  professor: "Professor",
  peer: "Peer"
};
function HintCard({ turn, coachStyle, onRate }) {
  const label = coachLabel[turn.coachStyle ?? coachStyle];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[12px] border-l-2 border-amber-500 bg-white dark:bg-zinc-900 p-3 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-amber-500 mb-1", children: [
      "◆ ",
      label
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed", children: turn.question }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => onRate(turn.id, "up"),
          className: `text-base transition-opacity ${turn.rating === "up" ? "opacity-100" : "opacity-40 hover:opacity-80"}`,
          disabled: !!turn.rating,
          title: "Helpful",
          children: "👍"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => onRate(turn.id, "down"),
          className: `text-base transition-opacity ${turn.rating === "down" ? "opacity-100" : "opacity-40 hover:opacity-80"}`,
          disabled: !!turn.rating,
          title: "Not helpful",
          children: "👎"
        }
      )
    ] })
  ] });
}
function UserCard({ message }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[12px] bg-zinc-100 dark:bg-zinc-800 p-3 self-end ml-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1", children: "You" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-zinc-800 dark:text-zinc-200", children: message })
  ] });
}
function ConversationThread({ turns, streamingText, isStreaming, coachStyle, onRate }) {
  const bottomRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    var _a;
    (_a = bottomRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  }, [turns, streamingText]);
  if (turns.length === 0 && !isStreaming) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-zinc-400 dark:text-zinc-500 text-center italic", children: "Start coding. I will jump in when you ask." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3", children: [
    turns.map((turn) => /* @__PURE__ */ jsxRuntimeExports.jsxs(React$2.Fragment, { children: [
      turn.userMessage && /* @__PURE__ */ jsxRuntimeExports.jsx(UserCard, { message: turn.userMessage }),
      !turn.streaming && /* @__PURE__ */ jsxRuntimeExports.jsx(HintCard, { turn, coachStyle, onRate })
    ] }, turn.id)),
    isStreaming && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[12px] border-l-2 border-amber-500 bg-white dark:bg-zinc-900 p-3 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-amber-500 mb-1", children: [
        "◆ ",
        coachLabel[coachStyle]
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed", children: [
        streamingText,
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-0.5 h-4 bg-amber-500 ml-0.5 animate-pulse align-text-bottom" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: bottomRef })
  ] });
}
const levelLabels = {
  1: "Nudge",
  2: "Hint",
  3: "Reveal"
};
function EscalationStrip({ level, onLevelChange }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 h-10 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Level:" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => level > 1 && onLevelChange(level - 1),
        disabled: level <= 1,
        className: "w-4 h-4 flex items-center justify-center rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 transition-colors",
        title: "Lower hint level",
        children: "−"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: [1, 2, 3].map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => onLevelChange(l),
        title: levelLabels[l],
        className: `w-2 h-2 rounded-full transition-colors hover:scale-125 ${l <= level ? "bg-amber-500" : "bg-zinc-300 dark:bg-zinc-700"}`
      },
      l
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => level < 3 && onLevelChange(level + 1),
        disabled: level >= 3,
        className: "w-4 h-4 flex items-center justify-center rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 transition-colors",
        title: "Raise hint level",
        children: "+"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: levelLabels[level] })
  ] });
}
function InputArea({ level, isStreaming, idleSeconds, onStuck, onEscalate, onReveal }) {
  const [text, setText] = reactExports.useState("");
  const inputRef = reactExports.useRef(null);
  const isIdle = idleSeconds >= 90;
  function handleStuck() {
    const msg = text.trim() || void 0;
    setText("");
    onStuck(msg);
  }
  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isStreaming) handleStuck();
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky bottom-0 px-4 pb-4 pt-2 border-t border-zinc-200 dark:border-zinc-800 bg-[#FAFAF9] dark:bg-[#0F0F0F]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        ref: inputRef,
        value: text,
        onChange: (e) => setText(e.target.value),
        onKeyDown: handleKeyDown,
        rows: 2,
        placeholder: "Type a follow-up question…",
        disabled: isStreaming,
        className: "w-full resize-none rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-amber-500 disabled:opacity-50 mb-2"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleStuck,
          disabled: isStreaming,
          className: `flex-1 rounded-lg py-2 text-sm font-medium transition-all active:scale-95 disabled:opacity-50 ${isIdle ? "bg-amber-500 text-white animate-pulse" : "bg-amber-500 text-white hover:bg-amber-600"}`,
          children: "I'm stuck"
        }
      ),
      level < 3 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onEscalate,
          disabled: isStreaming,
          className: "flex-1 rounded-lg border border-zinc-200 dark:border-zinc-700 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all active:scale-95 disabled:opacity-50",
          children: "Need a bigger hint"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onReveal,
          disabled: isStreaming,
          className: "flex-1 rounded-lg border border-red-200 dark:border-red-900 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-all active:scale-95 disabled:opacity-50",
          children: "Reveal"
        }
      )
    ] })
  ] });
}
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
function SolveCelebration({ elapsedSeconds, hintCount, highestLevel, onDone }) {
  const [visible, setVisible] = reactExports.useState(true);
  function dismiss() {
    setVisible(false);
    setTimeout(onDone, 300);
  }
  reactExports.useEffect(() => {
    const timer = setTimeout(dismiss, 8e3);
    return () => clearTimeout(timer);
  }, []);
  const noHints = hintCount === 0;
  const heldOut = highestLevel <= 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `fixed inset-x-0 bottom-0 z-50 transition-transform duration-300 ${visible ? "translate-y-0" : "translate-y-full"}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-3 mb-3 rounded-[12px] border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950 p-4 shadow-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-amber-800 dark:text-amber-200", children: "Problem solved ◆" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: dismiss,
              className: "text-amber-400 hover:text-amber-700 dark:hover:text-amber-200 transition-colors ml-2 leading-none",
              "aria-label": "Dismiss",
              children: "✕"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-amber-700 dark:text-amber-300 mt-1", children: [
          "Solved in ",
          formatTime(elapsedSeconds),
          " with ",
          hintCount,
          " hint",
          hintCount !== 1 ? "s" : "",
          ".",
          noHints && " No hints needed.",
          !noHints && heldOut && " You held out at level 1."
        ] })
      ] })
    }
  );
}
function RevealModal({ onConfirm, onCancel }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full rounded-[12px] bg-white dark:bg-zinc-900 p-5 shadow-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2", children: "You have done real work." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed", children: "Are you sure you want the answer now? You can also try one more level 2 hint." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onCancel,
          className: "w-full rounded-lg bg-amber-500 py-2.5 text-sm font-medium text-white hover:bg-amber-600 transition-colors active:scale-95",
          children: "Try another hint"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onConfirm,
          className: "w-full rounded-lg border border-zinc-200 dark:border-zinc-700 py-2.5 text-sm font-medium text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors active:scale-95",
          children: "Reveal anyway"
        }
      )
    ] })
  ] }) });
}
const __vite_import_meta_env__$1 = {};
const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const destroy = () => {
    if ((__vite_import_meta_env__$1 ? "production" : void 0) !== "production") {
      console.warn(
        "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
      );
    }
    listeners.clear();
  };
  const api = { setState, getState, getInitialState, subscribe, destroy };
  const initialState = state = createState(setState, getState, api);
  return api;
};
const createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;
var withSelector = { exports: {} };
var withSelector_production = {};
var shim$2 = { exports: {} };
var useSyncExternalStoreShim_production = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var React$1 = reactExports;
function is$1(x, y) {
  return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
}
var objectIs$1 = "function" === typeof Object.is ? Object.is : is$1, useState = React$1.useState, useEffect$1 = React$1.useEffect, useLayoutEffect = React$1.useLayoutEffect, useDebugValue$2 = React$1.useDebugValue;
function useSyncExternalStore$2(subscribe, getSnapshot) {
  var value = getSnapshot(), _useState = useState({ inst: { value, getSnapshot } }), inst = _useState[0].inst, forceUpdate = _useState[1];
  useLayoutEffect(
    function() {
      inst.value = value;
      inst.getSnapshot = getSnapshot;
      checkIfSnapshotChanged(inst) && forceUpdate({ inst });
    },
    [subscribe, value, getSnapshot]
  );
  useEffect$1(
    function() {
      checkIfSnapshotChanged(inst) && forceUpdate({ inst });
      return subscribe(function() {
        checkIfSnapshotChanged(inst) && forceUpdate({ inst });
      });
    },
    [subscribe]
  );
  useDebugValue$2(value);
  return value;
}
function checkIfSnapshotChanged(inst) {
  var latestGetSnapshot = inst.getSnapshot;
  inst = inst.value;
  try {
    var nextValue = latestGetSnapshot();
    return !objectIs$1(inst, nextValue);
  } catch (error) {
    return true;
  }
}
function useSyncExternalStore$1(subscribe, getSnapshot) {
  return getSnapshot();
}
var shim$1 = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
useSyncExternalStoreShim_production.useSyncExternalStore = void 0 !== React$1.useSyncExternalStore ? React$1.useSyncExternalStore : shim$1;
{
  shim$2.exports = useSyncExternalStoreShim_production;
}
var shimExports = shim$2.exports;
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var React = reactExports, shim = shimExports;
function is(x, y) {
  return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
}
var objectIs = "function" === typeof Object.is ? Object.is : is, useSyncExternalStore = shim.useSyncExternalStore, useRef = React.useRef, useEffect = React.useEffect, useMemo = React.useMemo, useDebugValue$1 = React.useDebugValue;
withSelector_production.useSyncExternalStoreWithSelector = function(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
  var instRef = useRef(null);
  if (null === instRef.current) {
    var inst = { hasValue: false, value: null };
    instRef.current = inst;
  } else inst = instRef.current;
  instRef = useMemo(
    function() {
      function memoizedSelector(nextSnapshot) {
        if (!hasMemo) {
          hasMemo = true;
          memoizedSnapshot = nextSnapshot;
          nextSnapshot = selector(nextSnapshot);
          if (void 0 !== isEqual && inst.hasValue) {
            var currentSelection = inst.value;
            if (isEqual(currentSelection, nextSnapshot))
              return memoizedSelection = currentSelection;
          }
          return memoizedSelection = nextSnapshot;
        }
        currentSelection = memoizedSelection;
        if (objectIs(memoizedSnapshot, nextSnapshot)) return currentSelection;
        var nextSelection = selector(nextSnapshot);
        if (void 0 !== isEqual && isEqual(currentSelection, nextSelection))
          return memoizedSnapshot = nextSnapshot, currentSelection;
        memoizedSnapshot = nextSnapshot;
        return memoizedSelection = nextSelection;
      }
      var hasMemo = false, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
      return [
        function() {
          return memoizedSelector(getSnapshot());
        },
        null === maybeGetServerSnapshot ? void 0 : function() {
          return memoizedSelector(maybeGetServerSnapshot());
        }
      ];
    },
    [getSnapshot, getServerSnapshot, selector, isEqual]
  );
  var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
  useEffect(
    function() {
      inst.hasValue = true;
      inst.value = value;
    },
    [value]
  );
  useDebugValue$1(value);
  return value;
};
{
  withSelector.exports = withSelector_production;
}
var withSelectorExports = withSelector.exports;
const useSyncExternalStoreExports = /* @__PURE__ */ getDefaultExportFromCjs(withSelectorExports);
const __vite_import_meta_env__ = {};
const { useDebugValue } = React$2;
const { useSyncExternalStoreWithSelector } = useSyncExternalStoreExports;
let didWarnAboutEqualityFn = false;
const identity = (arg) => arg;
function useStore(api, selector = identity, equalityFn) {
  if ((__vite_import_meta_env__ ? "production" : void 0) !== "production" && equalityFn && !didWarnAboutEqualityFn) {
    console.warn(
      "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"
    );
    didWarnAboutEqualityFn = true;
  }
  const slice = useSyncExternalStoreWithSelector(
    api.subscribe,
    api.getState,
    api.getServerState || api.getInitialState,
    selector,
    equalityFn
  );
  useDebugValue(slice);
  return slice;
}
const createImpl = (createState) => {
  if ((__vite_import_meta_env__ ? "production" : void 0) !== "production" && typeof createState !== "function") {
    console.warn(
      "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`."
    );
  }
  const api = typeof createState === "function" ? createStore(createState) : createState;
  const useBoundStore = (selector, equalityFn) => useStore(api, selector, equalityFn);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
const create = (createState) => createState ? createImpl(createState) : createImpl;
const DEFAULT_PREFS = {
  coachStyle: "coach",
  model: "claude-sonnet-4-6",
  theme: "auto",
  showStreakInPanel: false
};
const useSidePanelStore = create((set) => ({
  problemContext: null,
  setProblemContext: (ctx) => set({ problemContext: ctx }),
  session: null,
  setSession: (session) => set({ session }),
  currentLevel: 1,
  setLevel: (level) => set({ currentLevel: level }),
  streamingText: "",
  isStreaming: false,
  appendChunk: (chunk) => set((s) => ({ streamingText: s.streamingText + chunk, isStreaming: true })),
  clearStream: () => set({ streamingText: "", isStreaming: false }),
  showRevealModal: false,
  setShowRevealModal: (v) => set({ showRevealModal: v }),
  showCelebration: false,
  setShowCelebration: (v) => set({ showCelebration: v }),
  addHint: (turn) => set((s) => ({
    session: s.session ? {
      ...s.session,
      hints: [...s.session.hints, turn],
      highestLevelReached: Math.max(s.session.highestLevelReached, turn.level)
    } : null
  })),
  rateHint: (id, rating) => set((s) => ({
    session: s.session ? {
      ...s.session,
      hints: s.session.hints.map((h) => h.id === id ? { ...h, rating } : h)
    } : null
  })),
  preferences: DEFAULT_PREFS,
  setPreferences: (p) => set({ preferences: p }),
  elapsedSeconds: 0,
  setElapsedSeconds: (s) => set({ elapsedSeconds: s })
}));
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
function App() {
  const {
    problemContext,
    setProblemContext,
    session,
    setSession,
    currentLevel,
    setLevel,
    streamingText,
    isStreaming,
    appendChunk,
    clearStream,
    showRevealModal,
    setShowRevealModal,
    showCelebration,
    setShowCelebration,
    addHint,
    rateHint,
    preferences,
    setPreferences,
    elapsedSeconds,
    setElapsedSeconds
  } = useSidePanelStore();
  const streamBuffer = reactExports.useRef("");
  const pendingTurnRef = reactExports.useRef(null);
  const timerRef = reactExports.useRef(null);
  const idleTimerRef = reactExports.useRef(null);
  const idleSecondsRef = reactExports.useRef(0);
  const [idleSeconds, setIdleSeconds] = React$2.useState(0);
  const [currentTabUrl, setCurrentTabUrl] = React$2.useState("");
  const [hasApiKey, setHasApiKey] = React$2.useState(null);
  reactExports.useEffect(() => {
    chrome.storage.local.get(["preferences", "apiKey"]).then(({ preferences: p, apiKey }) => {
      if (p) setPreferences(p);
      setHasApiKey(!!apiKey);
    });
    chrome.storage.sync.get(["preferences"]).then(({ preferences: p }) => {
      if (p) setPreferences(p);
    });
    const onStorageChange = (changes) => {
      var _a, _b;
      if ((_a = changes.preferences) == null ? void 0 : _a.newValue) setPreferences(changes.preferences.newValue);
      if ("apiKey" in changes) setHasApiKey(!!((_b = changes.apiKey) == null ? void 0 : _b.newValue));
    };
    chrome.storage.onChanged.addListener(onStorageChange);
    return () => chrome.storage.onChanged.removeListener(onStorageChange);
  }, [setPreferences]);
  const activeSlugRef = reactExports.useRef("");
  reactExports.useEffect(() => {
    let retryTimer = null;
    let retryCount = 0;
    function fetchFromTab() {
      chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        var _a;
        const tab = tabs[0];
        setCurrentTabUrl((tab == null ? void 0 : tab.url) ?? "");
        if (!(tab == null ? void 0 : tab.id) || !((_a = tab.url) == null ? void 0 : _a.includes("leetcode.com/problems/"))) {
          if (activeSlugRef.current) {
            activeSlugRef.current = "";
            setProblemContext(null);
            setSession(null);
            if (timerRef.current) clearInterval(timerRef.current);
          }
          return;
        }
        chrome.tabs.sendMessage(tab.id, { type: "GET_SESSION" }, (ctx) => {
          if (chrome.runtime.lastError || !ctx || !ctx.slug) {
            if (retryCount++ < 20) retryTimer = setTimeout(fetchFromTab, 500);
            return;
          }
          retryCount = 0;
          if (ctx.slug !== activeSlugRef.current) {
            activeSlugRef.current = ctx.slug;
            loadContext(ctx);
          }
        });
      });
    }
    fetchFromTab();
    const interval = setInterval(fetchFromTab, 1e3);
    return () => {
      clearInterval(interval);
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, []);
  reactExports.useEffect(() => {
    const applyTheme = (theme) => {
      if (theme === "dark" || theme === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };
    applyTheme(preferences.theme);
  }, [preferences.theme]);
  function startTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setElapsedSeconds((s) => s + 1);
    }, 1e3);
  }
  reactExports.useEffect(() => {
    idleTimerRef.current = setInterval(() => {
      idleSecondsRef.current += 1;
      setIdleSeconds(idleSecondsRef.current);
    }, 1e3);
    const reset = () => {
      idleSecondsRef.current = 0;
      setIdleSeconds(0);
    };
    window.addEventListener("keydown", reset);
    window.addEventListener("mousedown", reset);
    return () => {
      if (idleTimerRef.current) clearInterval(idleTimerRef.current);
      window.removeEventListener("keydown", reset);
      window.removeEventListener("mousedown", reset);
    };
  }, []);
  function loadContext(ctx) {
    setProblemContext(ctx);
    chrome.storage.local.get([`session_${ctx.slug}`]).then((result) => {
      const existing = result[`session_${ctx.slug}`];
      if (existing) {
        setSession(existing);
        setLevel(existing.highestLevelReached);
        setElapsedSeconds(Math.floor((Date.now() - existing.startedAt) / 1e3));
      } else {
        const newSession = {
          problemSlug: ctx.slug,
          problemTitle: ctx.title,
          difficulty: ctx.difficulty,
          startedAt: Date.now(),
          resolved: false,
          hints: [],
          highestLevelReached: 1
        };
        setSession(newSession);
        setLevel(1);
        setElapsedSeconds(0);
      }
    });
    startTimer();
  }
  reactExports.useEffect(() => {
    const handler = (msg) => {
      if (msg.type === "PROBLEM_CONTEXT" && msg.payload) {
        loadContext(msg.payload);
      }
      if (msg.type === "HINT_CHUNK") {
        streamBuffer.current += msg.payload;
        appendChunk(msg.payload);
      }
      if (msg.type === "HINT_COMPLETE") {
        const text = streamBuffer.current;
        streamBuffer.current = "";
        clearStream();
        if (pendingTurnRef.current) {
          const turn = {
            id: generateId(),
            level: pendingTurnRef.current.level,
            userMessage: pendingTurnRef.current.userMessage,
            question: text,
            createdAt: Date.now(),
            coachStyle: useSidePanelStore.getState().preferences.coachStyle
          };
          pendingTurnRef.current = null;
          addHint(turn);
          persistSession(turn);
        }
      }
      if (msg.type === "HINT_ERROR") {
        streamBuffer.current = "";
        clearStream();
        console.error("Hint error:", msg.payload);
      }
      if (msg.type === "SUBMISSION_ACCEPTED") {
        setShowCelebration(true);
        if (timerRef.current) clearInterval(timerRef.current);
      }
    };
    chrome.runtime.onMessage.addListener(handler);
    return () => chrome.runtime.onMessage.removeListener(handler);
  }, [setProblemContext, setSession, setLevel, appendChunk, clearStream, addHint, setShowCelebration, setElapsedSeconds]);
  function persistSession(newTurn) {
    const store = useSidePanelStore.getState();
    const s = store.session;
    if (!s) return;
    const updated = newTurn ? {
      ...s,
      hints: [...s.hints, newTurn],
      highestLevelReached: Math.max(s.highestLevelReached, newTurn.level)
    } : s;
    chrome.storage.local.set({ [`session_${s.problemSlug}`]: updated });
    chrome.storage.local.get(["sessionKeys"]).then(({ sessionKeys }) => {
      const keys = sessionKeys ?? [];
      const key = `session_${s.problemSlug}`;
      const newKeys = [key, ...keys.filter((k) => k !== key)].slice(0, 200);
      if (newKeys.length >= 200) {
        const toRemove = keys.slice(199);
        chrome.storage.local.remove(toRemove);
      }
      chrome.storage.local.set({ sessionKeys: newKeys });
    });
  }
  function sendHintRequest(currentCode, userMessage, levelOverride) {
    var _a;
    if (!problemContext) return;
    const level = levelOverride ?? currentLevel;
    pendingTurnRef.current = { level, userMessage };
    const store = useSidePanelStore.getState();
    const hints = ((_a = store.session) == null ? void 0 : _a.hints) ?? [];
    const lastDownvoted = [...hints].reverse().find((h) => h.rating === "down");
    chrome.runtime.sendMessage({
      type: "REQUEST_HINT",
      payload: {
        problemTitle: problemContext.title,
        description: problemContext.description,
        currentCode,
        level,
        priorHints: hints,
        userMessage,
        previousHintToAvoid: lastDownvoted == null ? void 0 : lastDownvoted.question
      }
    });
  }
  function requestHint(userMessage, levelOverride) {
    if (!problemContext || isStreaming) return;
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (!(tab == null ? void 0 : tab.id)) {
        sendHintRequest(problemContext.currentCode, userMessage, levelOverride);
        return;
      }
      chrome.tabs.sendMessage(tab.id, { type: "GET_SESSION" }, (ctx) => {
        const code = !chrome.runtime.lastError && (ctx == null ? void 0 : ctx.currentCode) ? ctx.currentCode : problemContext.currentCode;
        sendHintRequest(code, userMessage, levelOverride);
      });
    });
  }
  function handleStuck(userMessage) {
    requestHint(userMessage);
  }
  function handleEscalate() {
    if (currentLevel === 2) {
      setShowRevealModal(true);
      return;
    }
    const next = Math.min(currentLevel + 1, 3);
    setLevel(next);
    requestHint(void 0, next);
  }
  function handleRevealConfirm() {
    setShowRevealModal(false);
    setLevel(3);
    requestHint(void 0, 3);
  }
  function handleRevealCancel() {
    setShowRevealModal(false);
    requestHint(void 0, 2);
  }
  function handleRevealButton() {
    setShowRevealModal(true);
  }
  function handleRate(id, rating) {
    rateHint(id, rating);
  }
  if (!problemContext || !session) {
    const isOnProblemPage = currentTabUrl.includes("leetcode.com/problems/");
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-screen bg-[#FAFAF9] dark:bg-[#0F0F0F] text-zinc-900 dark:text-zinc-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { onSettings: () => chrome.runtime.openOptionsPage() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center px-6", children: isOnProblemPage ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-zinc-500 dark:text-zinc-400 mb-1", children: "Loading problem…" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-zinc-400 dark:text-zinc-500", children: [
          "If this takes too long,",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
                var _a;
                if ((_a = tabs[0]) == null ? void 0 : _a.id) chrome.tabs.reload(tabs[0].id);
              }),
              className: "underline hover:text-amber-500 transition-colors",
              children: "reload the page"
            }
          ),
          "."
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-zinc-500 dark:text-zinc-400 mb-1", children: "No problem open." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-zinc-400 dark:text-zinc-500", children: [
          "Navigate to a",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => chrome.tabs.create({ url: "https://leetcode.com/problemset/" }),
              className: "underline hover:text-amber-500 transition-colors",
              children: "LeetCode problem"
            }
          ),
          " ",
          "to get started."
        ] })
      ] }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-screen bg-[#FAFAF9] dark:bg-[#0F0F0F] text-zinc-900 dark:text-zinc-100 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { onSettings: () => chrome.runtime.openOptionsPage() }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProblemContext,
      {
        title: session.problemTitle,
        difficulty: session.difficulty,
        elapsedSeconds,
        hintCount: session.hints.length
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConversationThread,
      {
        turns: session.hints,
        streamingText,
        isStreaming,
        coachStyle: preferences.coachStyle,
        onRate: handleRate
      }
    ),
    hasApiKey === false ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-4 border-t border-zinc-200 dark:border-zinc-800", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-zinc-400 dark:text-zinc-500 mb-3 text-center", children: "An API key is required to get hints." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => chrome.runtime.openOptionsPage(),
          className: "w-full rounded-lg bg-amber-500 py-2.5 text-sm font-semibold text-white hover:bg-amber-600 transition-colors active:scale-95",
          children: "Add API Key →"
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(EscalationStrip, { level: currentLevel, onLevelChange: setLevel }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InputArea,
        {
          level: currentLevel,
          isStreaming,
          idleSeconds,
          onStuck: handleStuck,
          onEscalate: handleEscalate,
          onReveal: handleRevealButton
        }
      )
    ] }),
    showRevealModal && /* @__PURE__ */ jsxRuntimeExports.jsx(RevealModal, { onConfirm: handleRevealConfirm, onCancel: handleRevealCancel }),
    showCelebration && /* @__PURE__ */ jsxRuntimeExports.jsx(
      SolveCelebration,
      {
        elapsedSeconds,
        hintCount: session.hints.length,
        highestLevel: session.highestLevelReached,
        onDone: () => setShowCelebration(false)
      }
    )
  ] });
}
const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    /* @__PURE__ */ jsxRuntimeExports.jsx(React$2.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
  );
}
//# sourceMappingURL=index.html-DIBd905X.js.map
