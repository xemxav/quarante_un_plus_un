(() => {
  "use strict";

  // A 42 that is not part of a bigger number or a decimal (1942, 420, 0.42, 42,5).
  const STANDALONE_42 = /(?<!\d)(?<!\d[.,])42(?!\d)(?![.,]\d)/g;
  const REPLACEMENT = "41 + 1";
  const WARNING = "attention au 41 + 1";
  const SKIP_TAGS = new Set(["script", "style", "noscript", "textarea"]);
  const TYPED_INPUTS = new Set(["text", "search", "email", "url", "tel", "number"]);

  const has42 = (s) => s.includes("42") && s.search(STANDALONE_42) !== -1;
  const fix = (s) => s.replace(STANDALONE_42, REPLACEMENT);

  // ---- Page text, tab title and tooltips ----

  function fixText(node) {
    const parent = node.parentElement;
    if (!parent || SKIP_TAGS.has(parent.localName) || parent.isContentEditable) return;
    const value = node.nodeValue;
    if (has42(value)) node.nodeValue = fix(value);
  }

  function fixTooltip(el) {
    const title = el.getAttribute("title");
    if (title && has42(title)) el.setAttribute("title", fix(title));
  }

  function fixTree(root) {
    if (root.nodeType === Node.TEXT_NODE) return fixText(root);
    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode(); n; n = walker.nextNode()) fixText(n);
    if (root.nodeType === Node.ELEMENT_NODE && root.hasAttribute("title")) fixTooltip(root);
    root.querySelectorAll("[title]").forEach(fixTooltip);
  }

  new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === "childList") m.addedNodes.forEach(fixTree);
      else if (m.type === "characterData") fixTree(m.target);
      else if (m.type === "attributes") fixTooltip(m.target);
    }
  }).observe(document, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ["title"],
  });

  // ---- "attention au 42" under fields ----

  const notes = new Map(); // field -> note element
  let frame = 0;

  function editableField(target) {
    if (!target || target.nodeType !== Node.ELEMENT_NODE) return null;
    if (target.localName === "textarea") return target;
    if (target.localName === "input") return TYPED_INPUTS.has(target.type) ? target : null;
    if (!target.isContentEditable) return null;
    let host = target;
    while (host.parentElement && host.parentElement.isContentEditable) host = host.parentElement;
    return host;
  }

  const fieldText = (field) =>
    field.localName === "input" || field.localName === "textarea" ? field.value : field.innerText;

  function createNote() {
    const note = document.createElement("attention-42");
    note.style.cssText =
      "all: initial !important; position: fixed !important; z-index: 2147483647 !important;" +
      "pointer-events: none !important; display: block !important;";
    const shadow = note.attachShadow({ mode: "closed" });
    const style = document.createElement("style");
    style.textContent = `.note {
      font: bold 12px/1.4 system-ui, sans-serif;
      color: #fff;
      background: #da291c;
      border-left: 4px solid #1a3d8f;
      padding: 2px 8px;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      white-space: nowrap;
    }`;
    const label = document.createElement("div");
    label.className = "note";
    label.textContent = WARNING;
    shadow.append(style, label);
    return note;
  }

  function hideNote(field) {
    notes.get(field)?.remove();
    notes.delete(field);
  }

  function checkField(field) {
    if (!has42(fieldText(field))) return hideNote(field);
    if (notes.has(field)) return;
    notes.set(field, createNote());
    if (!frame) frame = requestAnimationFrame(tick);
  }

  // While notes are shown, keep them under their field and drop them once the 42 is gone
  // (covers scrolling, layout changes and fields cleared by the page itself).
  function tick() {
    frame = 0;
    for (const [field, note] of notes) {
      if (!field.isConnected || !has42(fieldText(field))) {
        hideNote(field);
        continue;
      }
      if (!note.isConnected) document.documentElement.append(note);
      const r = field.getBoundingClientRect();
      const visible = r.width > 0 || r.height > 0;
      note.style.setProperty("display", visible ? "block" : "none", "important");
      note.style.setProperty("top", `${r.bottom + 4}px`, "important");
      note.style.setProperty("left", `${r.left}px`, "important");
    }
    if (notes.size) frame = requestAnimationFrame(tick);
  }

  document.addEventListener(
    "input",
    (e) => {
      const field = editableField(e.composedPath()[0]);
      if (field) checkField(field);
    },
    true,
  );

  // ---- Start ----

  function start() {
    fixTree(document);
    document.querySelectorAll("input, textarea, [contenteditable]").forEach((el) => {
      const field = editableField(el);
      if (field) checkField(field);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
