# Module 07 — DOM Manipulation
## The DOM, Selection, Traversal & Content

> **Goal:** Learn how the browser represents HTML as a live *Document Object Model* (DOM), how to **find** things, **move** around the tree, **create/insert** nodes, and **safely** change text/HTML, attributes, classes, data-attributes, and inline styles.

---

## Table of Contents
- [Module 07 — DOM Manipulation](#module-07--dom-manipulation)
  - [The DOM, Selection, Traversal \& Content](#the-dom-selection-traversal--content)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites \& Setup](#prerequisites--setup)
  - [📝 Step 1 — Intro to the DOM](#-step-1--intro-to-the-dom)
  - [📝 Step 2 — Document \& Top-Level Properties](#-step-2--document--top-level-properties)
  - [📝 Step 3 — DOM Selectors](#-step-3--dom-selectors)
  - [📝 Step 4 — Traversing the DOM](#-step-4--traversing-the-dom)
  - [📝 Step 5 — Creating \& Inserting Elements](#-step-5--creating--inserting-elements)
  - [📝 Step 6 — Attributes, Classes, Data \& Styles](#-step-6--attributes-classes-data--styles)
  - [📝 Step 7 — Text \& HTML Content](#-step-7--text--html-content)
  - [🧮 Playground Markup (copy/paste)](#-playground-markup-copypaste)
  - [🔍 Cheat Sheets \& Gotchas](#-cheat-sheets--gotchas)
  - [⁉️ Mini Quizzes](#️-mini-quizzes)

---

## Prerequisites & Setup

- A modern browser (Chrome, Edge, Firefox, Safari).
- Open **DevTools** → **Console** on any page (Right-click → Inspect → Console).
- Basic HTML & JavaScript comfort.

> Tip: Keep a scratch page (e.g. `playground.html`) open so you can try snippets quickly.

---

## 📝 Step 1 — Intro to the DOM

**DOM = Document Object Model.** The browser parses your HTML into a live **tree** of **nodes** in memory that JavaScript can read and change.

- **HTML**: static source you wrote.
- **DOM**: live objects; can **differ** from the original HTML once scripts run.
- **CSSOM**: object model for CSS; combined with DOM to render pixels.

**Key players**
- `window`: the tab/global object (timers, location, etc.).
- `document`: entry point to the DOM tree.
- **Node vs Element**: every item in the tree is a **Node**; a specific kind of node that corresponds to an HTML tag is an **Element**.

**Quick Console tour**
```js
typeof window;
document instanceof Document;
document.documentElement.tagName;       // "HTML"
document.head.tagName;                  // "HEAD"
document.body.tagName;                  // "BODY"
document.title = "Lesson 01: DOM Intro";
document.nodeType;                      // 9 (DOCUMENT_NODE)
document.body.children.length;          // elements only
document.body.childNodes.length;        // elements + text + comments
```

**Micro-exercise**
1. Make a small HTML page with an `<h1>` and `<p>`.
2. Compare `childNodes.length` vs `children.length`.
3. Check node types (`1=Element, 3=Text, 8=Comment, 9=Document`).

---

## 📝 Step 2 — Document & Top-Level Properties

**“Identity card”**
```js
document.URL;                         // full page URL (read-only)
document.baseURI;                     // may be affected by <base href="...">
document.title;                       // read/write tab title
document.characterSet;                // "UTF-8"
document.contentType;                 // "text/html"
document.lastModified;                // string timestamp
document.referrer;                    // previous page (may be "")
document.readyState;                  // "loading" | "interactive" | "complete"
document.compatMode;                  // "CSS1Compat" (Standards) or "BackCompat" (Quirks)
document.doctype;                     // DocumentType or null
```

**Structural handles**
```js
document.documentElement;             // <html>
document.head;                        // <head>
document.body;                        // <body>
```

**Built-in collections** (usually **live** `HTMLCollection`s)
```js
document.links;                       // <a>/<area> with href
document.images;                      // <img>
document.forms;                       // <form>
document.scripts;                     // <script>
```

**Micro-exercise**
1. Log `document.URL` and `document.baseURI`.
2. Count `document.links` and inspect `document.links[0].href`.
3. Check `document.readyState`.
4. Access a form by name: `document.forms.signup?.elements.email` (legacy) — prefer selectors in new code.

---

## 📝 Step 3 — DOM Selectors

Modern CSS-style:
```js
document.querySelector(sel);        // first match (Element|null)
document.querySelectorAll(sel);     // all matches (static NodeList)
```

Legacy (live collections):
```js
document.getElementById(id);
document.getElementsByClassName(cls); // live HTMLCollection
document.getElementsByTagName(tag);   // live HTMLCollection
```

**Return types**
- `querySelector` → Element or `null`
- `querySelectorAll` → **static** NodeList (doesn’t auto-update)
- `getElementsBy*` → **live** `HTMLCollection` (auto-updates)

**Scoping**
```js
const form = document.querySelector('#signup');
const email = form.querySelector('input[name=email]'); // scoped query
```

**Micro-exercise**
1. Select `.card.featured` and then **within it** `[data-action="add"]`.
2. Get all nav links with `document.querySelectorAll('nav a')` and log their text.
3. Compare a **live** collection (e.g. `getElementsByTagName('img')`) versus a **static** `NodeList` after adding a new `<img>` dynamically.

---

## 📝 Step 4 — Traversing the DOM

**Parents**
```js
el.parentElement;               // Element|null
el.parentNode;                  // Node|null
el.closest(selector);           // climbs self→ancestors; returns match or null
```

**Children**
```js
el.children;                    // elements only (live)
el.childNodes;                  // all nodes (may include whitespace Text)
el.firstElementChild;
el.lastElementChild;
el.childElementCount;           // element-only count
el.firstChild;                  // may be Text
el.lastChild;
```

**Siblings**
```js
el.previousElementSibling;
el.nextElementSibling;
el.previousSibling;           // may be Text/Comment
el.nextSibling;
```

**Why “Element” variants?**  
Avoid landing on whitespace Text nodes: prefer `firstElementChild` / `nextElementSibling` when you mean elements.

**Micro-exercise**
1. From `.current` menu item, mark neighbors via `previousElementSibling` and `nextElementSibling`.
2. From `[data-id="2"]`, climb to `.grid` and add `edge-first`/`edge-last` on the first/last cards.
3. Verify: `.grid.contains(document.querySelector('[data-id="3"]'))` is `true`.
4. Stretch: loop from first to last and toggle class `between` on the in-between siblings.

---

## 📝 Step 5 — Creating & Inserting Elements

**Create nodes**
```js
const li = document.createElement('li');
li.className = 'menu-item';
li.textContent = 'Blog';        // safe text
```

**Insert positions (modern)**
```js
parent.append(nodeOrString);   // end
parent.prepend(nodeOrString);  // start
ref.before(nodeOrString);      // before sibling
ref.after(nodeOrString);       // after sibling
```

**insertAdjacent***
```js
// 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend'
el.insertAdjacentHTML('beforeend', '<li class="menu-item">Blog</li>');
el.insertAdjacentElement('afterend', document.createElement('hr'));
el.insertAdjacentText('afterbegin', 'Hello ');
```

**Move vs clone**
```js
parent.append(existingNode);               // moves it (not a copy)
const copy = existingNode.cloneNode(true); // deep clone
```

**Batching with DocumentFragment**
```js
const frag = document.createDocumentFragment();
for (let i = 1; i <= 3; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  frag.append(li);
}
document.querySelector('.menu').append(frag);
```

**Replace & remove**
```js
el.replaceWith(newNode);
el.remove();
```

**Micro-exercise**
1. Append `"Blog"` to `.menu` with `createElement` + `append`.
2. Prepend `"Home 🏠"` using `insertAdjacentHTML('afterbegin', '...')` on the `<ul>`.
3. Add a new card `"Four"` to `.grid` via `DocumentFragment`.
4. Clone `[data-id="2"]` and insert it after the last card with `after()`.
5. Update `.current` text with `textContent` and remove the `"About"` item.

---

## 📝 Step 6 — Attributes, Classes, Data & Styles

**Attributes vs Properties**
- Attributes: markup-level (strings). Use `getAttribute/setAttribute/hasAttribute/removeAttribute`.
- Properties: live DOM state (typed values). Use `el.value`, `el.checked`, etc.

```js
input.getAttribute('value');        // initial string
input.value;                        // current value
```

**Classes**
```js
el.classList.add('active', 'primary');
el.classList.remove('primary');
el.classList.toggle('open');
el.classList.replace('old', 'new');
```

**Data attributes (`data-*`)**
```html
<article class="card" data-id="42" data-user-name="alex"></article>
```
```js
card.dataset.id;                    // "42"
card.dataset.userName;              // "alex"
card.dataset.state = 'selected';    // sets data-state
delete card.dataset.userName;       // removes attribute
```

**Inline styles (use sparingly)**
```js
Object.assign(el.style, {
  padding: '8px 12px',
  borderRadius: '8px',
});
const cs = getComputedStyle(el);
```

**Micro-exercise**
1. Add `rel="noopener noreferrer"` to all links with `target="_blank"`.
2. Add class `selected` to even `data-id` cards.
3. Set `data-count` on `.grid` to `childElementCount`.
4. Style `.card.featured` with an inline border (or, better, via class).

---

## 📝 Step 7 — Text & HTML Content

**`textContent` vs `innerText` vs `innerHTML`**
- `textContent`: fast, returns all text nodes, **ignores CSS visibility**, no layout.
- `innerText`: **visible text only**, respects CSS/layout, slower.
- `innerHTML`: parses/produces HTML; **trusted strings only** (XSS risk).

```js
title.textContent = 'Hello <em>DOM</em>'; // shows literal tags
title.innerHTML   = 'Hello <em>DOM</em>'; // renders italic
```

**Safer templating**
- Prefer `createElement` + `textContent`.
- Or `insertAdjacentText`/`insertAdjacentElement` for precise placement.
- Use `<template>` + `cloneNode(true)` to author HTML once and fill safely.

**Replace vs append**
```js
el.replaceChildren(node1, 'plain text'); // atomic replace (no HTML parsing unless strings contain markup)
```

**Micro-exercise**
1. Rename `.card .name` → `Product #<data-id>` using `textContent`.
2. Append a **badge** to `.card.featured` using DOM APIs (no `innerHTML`).
3. Insert a trusted tip under `<nav>` using `insertAdjacentHTML('afterend', ...)`.
4. Hide a card and compare `grid.textContent.length` vs `grid.innerText.length`.

---

## 🧮 Playground Markup (copy/paste)

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>DOM Traversal Playground</title>
  <style>
    .menu { display: flex; gap: 1rem; list-style: none; padding: 0; }
    .menu-item { padding: 0.25rem 0.5rem; }
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1rem; }
    .card { border: 1px solid #ccc; padding: 1rem; border-radius: 8px; }
    .neighbor { outline: 2px dashed orange; }
    .edge-first { outline: 2px solid green; }
    .edge-last  { outline: 2px solid red; }
    .between    { background: rgba(255, 200, 0, 0.15); }
    .badge { margin-left: .5rem; padding: .125rem .375rem; border: 1px solid currentColor; border-radius: 999px; font-size: .75rem; line-height: 1; }
    .hidden { display: none; }
  </style>
</head>
<body>
  <nav>
    <a href="/">Home</a>
    <a href="/about" class="primary">About</a>
    <a href="https://example.com" target="_blank">Docs</a>
  </nav>

  <ul class="menu">
    <li class="menu-item">Home</li>
    <li class="menu-item current">Products</li>
    <li class="menu-item">About</li>
    <li class="menu-item">Contact</li>
  </ul>

  <section class="grid">
    <article class="card" data-id="1"><h2 class="name">One</h2></article>
    <article class="card featured" data-id="2"><h2 class="name">Two</h2></article>
    <article class="card" data-id="3"><h2 class="name">Three</h2></article>
  </section>
</body>
</html>
```

---

## 🔍 Cheat Sheets & Gotchas

**Node types (common)**
- `1` Element, `3` Text, `8` Comment, `9` Document

**Collections**
- **Static**: `querySelectorAll` (NodeList)
- **Live**: `children`, `getElementsBy*` (HTMLCollection)

**Common pitfalls**
- Whitespace → Text nodes: prefer `*Element*` variants for children/siblings.
- `innerHTML` re-parses & **drops child listeners**; avoid for untrusted strings.
- Prefer **class toggles** over many inline style mutations.
- Use **data-attributes** for stable JS hooks (e.g., `[data-id="42"]`).

**Performance tips**
- Minimize reflow/repaint by batching mutations (DocumentFragment).
- Scope selectors (`container.querySelector`) to avoid global scans.
- Cache results reused inside loops.

---

## ⁉️ Mini Quizzes

**A. Step 3 Quick Check**
1. Two advantages of `querySelector/All` over `getElementsBy*`?
2. Static `NodeList` vs live `HTMLCollection`—what changes after DOM updates?
3. Why prefer `container.querySelector` over long global selectors?
4. Write a selector for: `<article class="card featured" data-id="2">…</article>` using a data-attribute.

**B. Step 4 Quick Check**
1. Why might `firstChild` be a Text node? How to avoid?
2. `el.closest('.panel')` vs `el.parentElement`?
3. Add class `active` to the element immediately after `.current`.
4. Count only **element** children.

**C. Step 5 Quick Check**
1. When prefer `textContent` over `innerHTML`?
2. What is a `DocumentFragment` good for?
3. Positions for `insertAdjacentHTML`?
4. Does `append()` copy or move a node? How to copy?

**D. Step 6 Quick Check**
1. When prefer **properties** (`el.value`, `el.checked`) over attributes?
2. Two ways to add classes `active` and `primary`.
3. Read/write `data-user-id` using `dataset` and `get/setAttribute`.
4. Why classes are better than inline styles for state toggles?

**E. Step 7 Quick Check**
1. When is `innerText` preferable to `textContent`?
2. Why can setting `innerHTML` break component behavior?
3. Add `<em>Hot</em>` next to a title safely and in trusted-only fashion.
4. What does `replaceChildren()` do vs `innerHTML = ''` then `append(...)`?

---
