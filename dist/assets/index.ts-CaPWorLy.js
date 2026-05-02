(function(){function getProblemSlug() {
  const match = window.location.pathname.match(/\/problems\/([^/]+)/);
  return (match == null ? void 0 : match[1]) ?? "";
}
function getProblemTitle() {
  var _a;
  const el = document.querySelector('[data-cy="question-title"]') ?? document.querySelector(".text-title-large") ?? document.querySelector("h4.text-lg") ?? document.querySelector('div[class*="title"]');
  return ((_a = el == null ? void 0 : el.textContent) == null ? void 0 : _a.trim()) ?? getProblemSlug().replace(/-/g, " ");
}
function getDifficulty() {
  var _a;
  const el = document.querySelector("[diff]") ?? document.querySelector(".text-difficulty-easy, .text-difficulty-medium, .text-difficulty-hard") ?? document.querySelector('[class*="difficulty"]');
  const text = ((_a = el == null ? void 0 : el.textContent) == null ? void 0 : _a.trim().toLowerCase()) ?? "";
  if (text.includes("easy")) return "Easy";
  if (text.includes("hard")) return "Hard";
  return "Medium";
}
function getProblemDescription() {
  var _a;
  const el = document.querySelector('[data-track-load="description_content"]') ?? document.querySelector(".elfjS") ?? document.querySelector('[class*="description"]');
  return ((_a = el == null ? void 0 : el.textContent) == null ? void 0 : _a.trim().slice(0, 3e3)) ?? "";
}
function getCurrentCode() {
  var _a, _b, _c, _d;
  try {
    const models = (_c = (_b = (_a = window.monaco) == null ? void 0 : _a.editor) == null ? void 0 : _b.getModels) == null ? void 0 : _c.call(_b);
    if (models && models.length > 0) {
      return models[0].getValue();
    }
  } catch {
  }
  const ta = document.querySelector(".view-lines");
  return ((_d = ta == null ? void 0 : ta.textContent) == null ? void 0 : _d.trim()) ?? "";
}
function scrapeProblemContext() {
  return {
    slug: getProblemSlug(),
    title: getProblemTitle(),
    difficulty: getDifficulty(),
    description: getProblemDescription(),
    currentCode: getCurrentCode()
  };
}
function safeSend(msg) {
  try {
    chrome.runtime.sendMessage(msg);
  } catch {
  }
}
function listenForAcceptedSubmission() {
  const observer = new MutationObserver(() => {
    var _a;
    const result = document.querySelector('[data-e2e-locator="submission-result"]') ?? document.querySelector(".text-green-s") ?? document.querySelector('[class*="accepted"]');
    if ((_a = result == null ? void 0 : result.textContent) == null ? void 0 : _a.toLowerCase().includes("accepted")) {
      safeSend({ type: "SUBMISSION_ACCEPTED", payload: getProblemSlug() });
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}
try {
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.type === "GET_SESSION") {
      sendResponse(scrapeProblemContext());
      return true;
    }
    return false;
  });
} catch {
}
listenForAcceptedSubmission();
let lastSlug = "";
let broadcastAttempts = 0;
function broadcastWhenReady() {
  const ctx = scrapeProblemContext();
  if (ctx.slug && ctx.title && ctx.title !== ctx.slug.replace(/-/g, " ")) {
    lastSlug = ctx.slug;
    safeSend({ type: "PROBLEM_CONTEXT", payload: ctx });
  } else if (broadcastAttempts++ < 20) {
    setTimeout(broadcastWhenReady, 500);
  }
}
broadcastWhenReady();
setInterval(() => {
  const slug = getProblemSlug();
  if (slug && slug !== lastSlug) {
    lastSlug = slug;
    broadcastAttempts = 0;
    broadcastWhenReady();
  }
}, 1e3);
//# sourceMappingURL=index.ts-CaPWorLy.js.map
})()
