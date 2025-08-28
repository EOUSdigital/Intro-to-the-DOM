"use strict";
//TODO 🟦 Module 07 - DOM Manipulation - Lesson 02: Intro to the DOM


//TODO  📝 Step 1 — Intro to the DOM

//* What you will learn (in plain language)
//  • What the DOM is and why it exists.
//  • How the browser turns your HTML into a tree of nodes.
//  • The difference between window, document, nodes, elements, attributes, and text nodes.
//  • How to peek at the DOM using the DevTools Console (no frameworks, just the platform).
//  In our roadmap, this starts with “Intro To The DOM” before we move on to selectors, traversing, creating/removing elements, and styling.

//* 1. What is the DOM?

//  DOM = Document Object Model.
//  It is a programming interface the browser creates from your HTML so that JavaScript can read and change the page. Think of your HTML file as the recipe; the DOM is the live, editable dish in the kitchen—JS can taste it, add salt, or plate it differently without rewriting the recipe.
//  • HTML → static text you wrote.
//  • DOM → live objects in memory that mirror (and can diverge from) the HTML after scripts run.
//  • CSSOM (mentioned for context) → similar object model for CSS; the browser combines DOM + CSSOM to render pixels.

//* 2. The DOM tree (mental model)

//  The DOM is a tree of nodes:

//? Document
//? └── <html> (Element node)
//?     ├── <head> (Element)
//?     │   └── #text ("...whitespace or text...")
//?     └── <body> (Element)
//?         ├── <h1> (Element)
//?         │   └── #text ("Hello")
//?         └── <p> (Element)
//?             └── #text ("Welcome to the DOM.")

//! Key idea: Elements contain other nodes. Text between tags is a Text node; attributes (like class="hero") are Attribute nodes attached to elements.

//* 3. Meet the main players
//  • window → the browser tab “global” object (timers, location, alert, etc.).
//  • document → your entry point to the DOM tree (represents the page).
//  • Node vs Element
//      • Node: any tree item (elements, text, comments, document).
//      • Element: a specific kind of node that corresponds to an HTML tag (<div>, <p>, …).
//  • Node collections
//      • NodeList: array-like collection of nodes (often static snapshots).
//      • HTMLCollection: array-like collection of elements (often live, auto-updates as DOM changes).
//  You will work with these heavily in later steps (selectors, traversing, creating elements).

//* 4. Quick console tour (hands-on)

//  Open any page → DevTools → Console and try:

//  Global objects
typeof window;                              //  "object"
document instanceof Document;               //  true

//  Top-level nodes
document.documentElement.tagName;           //  "HTML"
document.head.tagName;                      //  "HEAD"
document.body.tagName;                      //  "BODY"

//  Metadata & basics
document.title;                             //  Read title
document.title = "New Title";               //  Update title (changes tab text)

//  The document.title property gets or sets the current title of the document. When present, it defaults to the value of the <title>.

//  Nodes vs Elements
document.nodeType;                          //  9 (DOCUMENT_NODE)
document.documentElement.nodeType;          //  1 (ELEMENT_NODE)

// Children vs childNodes (elements vs all nodes)
document.body.children.length;              //  element count
document.body.childNodes.length;            //  includes text & comment nodes

//! Why this matters: understanding node types and collections prevents common surprises (like counting whitespace-only text nodes).

//* 5. Micro-exercise (5–10 minutes)

//  Create a tiny HTML file and open it in the browser:

/*
```html
<!doctype html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <title>DOM Intro</title>
    </head>
    <body>
        <h1 id="title">Hello DOM</h1>
        <p class="lead">Welcome to Lesson 01.</p>
        <!-- a friendly comment -->
    </body>
</html>
```
*/

//? Then in the Console:
//  1. Read the current title: document.title
//  2. Change it: document.title = "Lesson 01: DOM Intro"
//  3. Inspect top-level structure:
//      • document.documentElement.tagName
//      • document.head.tagName, document.body.tagName
//  4. Compare counts:
//      • document.body.childNodes.length vs document.body.children.length
//      • Identify node types:
//      • document.body.firstChild.nodeType
//  (1 = Element, 3 = Text, 8 = Comment, 9 = Document) 

//* 6) Best practices & common pitfalls (right from day 1)

//  • DOM != HTML file: after scripts run, the DOM may differ from the original source.
//  • Whitespace creates Text nodes: layout newlines can appear in childNodes.
//  • Collections differ: children (elements only) vs childNodes (all nodes).
//  • Do not mutate too early: if you plan to script during load, prefer waiting for DOMContentLoaded (we’ll formalize this in the Events module).
//! (Events are a separate module in the roadmap; we’ll stick to read-only exploration for now.)

//* 7. Quick check (answer in your own words) 

// 1. What is the DOM, and how is it different from the HTML file?
//! Answer: DOM or Document Object Model is different from an HTML file. The HTML is the code I wrote, and the DOM is the code that may differ from the original source, which will modify the code I wrote. 

// 2. Name two differences between children and childNodes.
//! Answer: 
//! 1. childNodes returns all types of child nodes, including element nodes, text nodes (such as whitespace), and comment nodes. The children return only child elements, ignoring text and comment nodes. 
//! 2. The childNodes method returns a NodeList, which can contain a mix of node types. The children return an HTMLCollection, which contains only element nodes (e.g., <div>, <p>, etc.). 

// 3. Which objects give you access to the page and the browser tab, respectively?
//! Answer: The document object gives access to the page’s content and structure (the DOM), while the window object gives access to the browser tab itself, including tab controls, browser APIs, and global properties.


//TODO  📝 Step 2 — Document & Top-Level Properties

//* 🎯 Goal
//  Get comfortable reading key document-level properties and using the built-in HTML collections (forms, links, images, scripts). These give you structured entry points into the DOM before we dive into CSS-style selectors in the next step.

//* 1. The document’s “identity card”

//  Useful read-only (or mostly read-only) properties you’ll use a lot:

/*
document.URL                                // Full page URL (read-only)
document.baseURI                            // Base URL used to resolve relative links
document.title                              // Tab title (read/write)
document.characterSet                       // "UTF-8" (most modern pages)
document.contentType                        // "text/html" for HTML docs
document.lastModified                       // Last modified timestamp (string)
document.referrer                           // The URL of the page that linked here (if any)
document.readyState                         // "loading" | "interactive" | "complete"
document.compatMode                         // "CSS1Compat" (Standards) or "BackCompat" (Quirks)
document.doctype                            // DocumentType node (may be null in some docs)
*/

//? Why they matter
//  • readyState helps you know how far along the parser is (we’ll formalize event timing later).
//  • title is quick UX polish and can be changed dynamically.
//  • baseURI influences how relative paths resolve.
//  • compatMode warns you if you accidentally triggered quirks mode (old layout rules).
//! Avoid legacy properties like document.domain (deprecated).

//* 2. Top-level structural handles

//  Quick references to the big three nodes:

/*
document.documentElement                    // <html> element
document.head                               // <head> element
document.body                               // <body> element
*/

//! Use these when you need to append global assets, tweak meta info, or add elements to the page body.

//* 3. Built-in HTML collections

//  The document exposes convenient, structured lists:

/*
document.links                              // All <a> and <area> with href
document.images                             // All <img>
document.forms                              // All <form>
document.scripts                            // All <script>
*/

//  • These are typically live HTMLCollections—they update as the DOM changes.
//  • Each collection supports index access and length: document.images[0], document.forms.length.
//  • Forms (and their controls) also have a legacy name/index map:

/*
```html
<form name="signup">
    <input name="email">
</form>
```
*/

/*
```js
document.forms.signup === document.forms[0];   // true (legacy mapping)
document.forms.signup.elements.email;          // the input
```
*/

//! It’s handy to know this exists, but for clarity and resilience, you’ll usually prefer selectors (coming next step).

//* 4. Quick console tour (try these now)

//  Open DevTools → Console on any page (or your test file from Step 1):

/*
//  Identify
document.URL;
document.baseURI;
document.title;                             //  then try;
document.title = "Lesson 01 - Step 2";

//  Status & parsing
document.readyState;                        //  "complete" on a fully loaded pages
document.compatMode;                        //  "CSS1Compact" (good)

//  Structure
document.documentElement.tagName;           //  "HTML"
document.head.childElementCount;
document.body.childElementCount;

//  Collections
document.images.length;
document.links.length;
document.forms.length;

//  Peek at the first form (if present)
const firstForm = document.forms[0];
firstForm?.tagName;                         //  "FORM"
firstForm?.elements.length;

//  Inspect a link
const firstLink = document.links[0];
firstLink?.href;                            //  absolute URL
firstLink?.text;                            //  link text
*/

//* 5. Micro-exercise (10 minutes)

// Create this minimal page and play with the properties:

/*
```html
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>DOM Step 2</title>
    </head>
    <body>
        <h1>Welcome</h1>
        <p>Learn the DOM.</p>

        <a href="/about">About</a>
        <a href="https://example.com">External</a>

        <img src="https://via.placeholder.com/80" alt="Placeholder">

        <form id="contact" name="contact">
            <input name="email" type="email" placeholder="you@example.com" />
            <button type="submit">Send</button>
        </form>

        <script>
            console.log('readyState in inline script:', document.readyState);
        </script>
    </body>
</html>
```
*/

//? Then in the Console:
//  1. Read/modify document.title.
//  2. Compare document.URL vs document.baseURI (navigate to a subpage if needed).
//  3. Count document.links, inspect the first one’s href and text.
//  4. Count document.images, check document.images[0].naturalWidth.
//  5. Inspect document.forms.contact.elements.email.placeholder.

//* 6. Pro tips

//  • Live vs static: document.images/forms are live. If you append a new <img>, the collection’s length changes immediately. Many selector methods you will learn next return static NodeLists.
//  • Referrer can be empty: Do not rely on document.referrer—users can navigate directly or block it.
//  • readyState is not an event: It is just a snapshot string. For timing, you will use events like DOMContentLoaded/load later.
//  • Use selectors for targeting: Collections are broad. For precise grabs (e.g., “the .btn inside #contact”), selectors are clearer and less brittle.

//* 7. Quick check (answer in your own words)

// 1. What’s the difference between document.URL and document.baseURI?
//! Answer: The document.URL read-only property of the Document interface returns the document location as a string, and the read-only baseURI property of the Node interface returns the absolute base URL of the document containing the node.

//  ‼️ Feedback: Correct. Add: baseURI can be changed by a <base href="..."> tag; document.URL is the full current address.

// 2. Are document.images and document.forms live or static collections? What does that imply?
//! Answer: The document.images and document.forms live collections. If I append a new <img>, the collection's length changes immediately.

//  ‼️ Feedback: Correct—document.images and document.forms are live HTMLCollections.

// 3. If document.readyState is "interactive", what does that tell you about the parse/load progress?
//! Answer: If document.readyState is "interactive," does this mean it's just a snapshot string, and for events, I must use a different loader later.  

//  ‼️ Feedback: readyState === "interactive" → the HTML has been fully parsed (DOM is usable), but subresources (images, stylesheets) may still be loading. It’s a snapshot string; for timing you’ll use events like DOMContentLoaded/load.

// 4. When would you prefer using document.forms over querySelector/querySelectorAll?
//! Answer: I prefer to use the read-only property of the Document interface that returns an HTMLCollection listing all the <form> elements contained in the document over querySelector/querySelectorAll.

//  ‼️ Feedback: Use document.forms for a quick inventory or legacy name access (e.g., document.forms.signup). Prefer querySelector(All) for precise, CSS-like targeting.


//TODO  📝 Step 3 — DOM Selectors

//* 🎯 Goal
//  Select elements precisely and reliably using modern APIs, understand return types (Element vs NodeList), and know when to scope your queries.

//* 1. The core selector methods

/*
// Modern, CSS-style
document.querySelector(selector)            // first match (Element or null)
document.querySelectorAll(selector)         // all matches (static NodeList)

// Legacy, fast, less flexible
document.getElementById(id)                 // Element or null
document.getElementsByClassName(name)       // live HTMLCollection
document.getElementsByTagName(tag)          // live HTMLCollection
*/

//? Key differences
//  • CSS power: querySelector(All) supports full CSS selectors (#id, .class, [name=email], ul > li:first-child, etc.).
//  • Return type:
//      • querySelector → a single Element
//      • querySelectorAll → static NodeList (does not auto-update)
//      • getElementsBy* → live HTMLCollection (auto-updates)
//  • Scoping: You can call these on any Element, not just document—great for narrowing searches:

/*
```js
const form = document.querySelector('#signup');
const email = form.querySelector('input[name=email]');
```
*/

//* 2) CSS selector mini-cheatsheet (most useful 10%)

/*
#id                                             /* id */
//  .class                                          /* class */
//  tag                                             /* tag (e.g., button, input, li) */
//  [parent] [child]                                /* descendant */
//  parent > child                                  /* direct child */
//  a[href^="/"]                                    /* attribute starts with */
//  input[required]                                 /* has attribute */
//  button.primary: hover;                          /* pseudo-classes (in CSS; in JS you query without :hover) */
//  ul li:first-child                               /* structural pseudo-classes (JS can query these) */
//  .container .btn.primary[data-action = "save"]   /* combine freely */

//! In JavaScript strings, just pass the CSS selector to querySelector(All).

//* 3. Practical patterns
//  Grab one element

const title = document.querySelector('#title');   // or getElementById('title')

//  Grab many, then iterate:

const items = document.querySelectorAll('.todo-item');   // NodeList (static)
items.forEach(li => li.classList.add('ready'));

//  Scope to reduce ambiguity & speed

//  const card = document.querySelector('.card[data-id="42"]');
//  const saveBtn = card.querySelector('.btn.save');

//  Pick between live vs static
//  • Need a snapshot you will iterate once? → querySelectorAll.
//  • Need a live view that tracks DOM changes? → getElementsByClassName/TagName.

//  Convert to real arrays (when you need array methods)


const list = document.querySelectorAll('li');           // NodeList
const arr  = Array.from(list);                          // Array

// or

const live = document.getElementsByClassName('row');    // HTMLCollection (live)
const arr2 = [...live];                                 // Array

//* 4. Console tour (try these)

//  Use a test page with a few cards, buttons, and forms, or paste the micro-exercise HTML below.

// Singles
document.querySelector('#hero');                        // by id
document.querySelector('.btn.primary');                 // by classes
document.querySelector('nav a[href^="/"]');             // attribute prefix

// All matches (static NodeList)
const links = document.querySelectorAll('nav a');
links.forEach(a => console.log(a.textContent));

// Legacy (live)
const liveImgs = document.getElementsByTagName('img');
console.log(liveImgs.length);                           // changes if new <img> added

// Scoping
const modal = document.querySelector('.modal.open');
const close = modal?.querySelector('[data-close]');

//* 5. Micro-exercise (10–15 minutes)

//  HTML

/*
<!doctype html>
<html lang="en">
    <head>
    <meta charset="utf-8" />
    <title>Selectors Practice</title>
    </head>
    <body>
        <nav>
            <a href="/">Home</a>
            <a href="/about" class="primary">About</a>
            <a href="https://example.com" target="_blank">Docs</a>
        </nav>

        <section id="products">
            <article class="card" data-id="1">
                <h2 class="name">Notebook</h2>
                <button class="btn add" data-action="add">Add to cart</button>
            </article>
            <article class="card featured" data-id="2">
                <h2 class="name">Backpack</h2>
                <button class="btn add" data-action="add">Add to cart</button>
            </article>
        </section>

        <form id="signup" name="signup">
            <input name="email" type="email" placeholder="you@example.com" required />
            <button class="btn primary" type="submit">Join</button>
        </form>
    </body>
</html>
*/

//? Tasks (in Console)
//  1. Select the About nav link three ways:
//      • # by text is not supported; instead use:
//      document.querySelector('nav a.primary')
//      document.querySelector('nav a[href="/about"]')
//      document.querySelectorAll('nav a')[1]

//  2. Select the featured product card, then grab its Add button scoped to that card only.

//  const featured = document.querySelector('.card.featured');
//  const addBtn = featured.querySelector('[data-action="add"]');

//  3. Get all product names (.name) and log their text.
//  4. Count images using a live collection, then dynamically create and append a new <img> to verify the count changes.

//* 6. Gotchas & pro tips

//  • Special characters in IDs/classes: If an id has : or . (e.g., from frameworks), escape them in CSS selectors ('#my\\.id'). Safer alternative: [id="my.id"].
//  • Do not rely on text content in selectors (CSS has no :contains() in standard). Grab an element, then check textContent.
//  • Prefer scoping (element.querySelector) over long global selectors; it’s clearer and often faster.
//  • Cache results you reuse inside loops to avoid repeated DOM queries.
//  • Use data-attributes (data-*) for stable hooks: document.querySelector('[data-test="save"]').

//* 7. Quick check (answer in your own words)

// 1. What are two advantages of querySelector/querySelectorAll over getElementsBy*?
//! Answer:
//  1. The Document method querySelector() returns the first Element within the document. 
//  2. The Document method querySelectorAll() returns a static (not live) NodeList. 

//  The Document method querySelector() returns the first Element within the document that matches the specified CSS selector, or group of CSS selectors. If no matches are found, null is returned. 
//  The Document method querySelectorAll() returns a static (not live) NodeList representing a list of the document's elements that match the specified group of selectors. 
//  The getElementsByClassName method of Document interface returns an array-like object of all child elements which have all of the given class name(s).

//  ‼️ Feedback: True that querySelector returns the first match and querySelectorAll returns a static NodeList. The advantages you can call out explicitly are: 
// (a) full CSS selector power (attribute selectors, combinators, pseudo-classes like :first-child), and 
// (b) consistent return types (single Element vs static NodeList) that don’t unexpectedly change as the DOM updates.

// 2. What’s the difference between a static NodeList and a live HTMLCollection in practice?
//! Answer: A static (not live) NodeList represents a list of the document's elements that match the specified group of selectors. The HTMLCollection interface represents a generic collection (array-like object similar to arguments) of elements (in document order) and offers methods and properties for selecting from the list.

//  ‼️ Feedback: Nicely put. Add that a static NodeList does not auto-update after DOM changes, while a live HTMLCollection does.

// 3. Why is scoping (container.querySelector) often better than document.querySelector with a long selector?
//! Answer: The querySelector() method is often better than document.querySelector because it returns the first element that is a descendant of the element on which it is invoked that matches the specified group of selectors.

//  ‼️ Feedback: Yes—scoping (container.querySelector) reduces selector length, avoids accidental matches elsewhere, and can be faster and clearer.

// 4. Given: <article class="card featured" data-id="2">...</article>
//    Write one selector to get that exact card using a data-attribute.
//! Answer: const one = document.querySelector('[data-id="2"]');

//  ‼️ Feedback: Perfect selector with [data-id="2"].


//TODO  📝 Step 4 — Traversing the DOM (parents, children, siblings)

//* 🎯 Goal
//  Move around the DOM confidently: up to parents, down to children, and across siblings—while avoiding common “text node” surprises.

//* 1. The traversal toolkit

//  Parents

/*
el.parentElement                                        // Element or null (skips non-element parents)
el.parentNode                                           // Node or null (could be Document, DocumentFragment, etc.)
el.closest(selector)                                    // climbs up until it finds a matching ancestor (or itself), else null

//  Children

el.children                                             // HTMLCollection (elements only, live)
el.childNodes                                           // NodeList (elements + text + comments, can include whitespace)
el.firstElementChild                                    // first child element (ignores text/comments)
el.lastElementChild                                     // last child element (ignores text/comments)
el.childElementCount                                    // number of element children
el.firstChild                                           // could be a Text node (whitespace!)
el.lastChild                                            // could be a Text node

//  Siblings

el.previousElementSibling                               // previous element sibling (null if none)
el.nextElementSibling                                   // next element sibling
el.previousSibling                                      // could be Text/Comment/etc.
el.nextSibling                                          // could be Text/Comment/etc.

//  Containment & matching

ancestor.contains(descendant)                           // boolean
el.matches(selector)                                    // does el itself match the selector?
*/

//* 2. Why “Element” variants matter

//  Whitespace between tags creates Text nodes. If you use firstChild/nextSibling, you may land on a Text node and your element-specific operations will fail. Prefer the Element variants when you mean elements:
//  • ✅ firstElementChild, nextElementSibling
//  • 🟨 firstChild, nextSibling (only when you want all node types)

//* 3. Practical patterns

//  Find a card’s container from a button click

document.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const card = btn.closest('.card');  // walk upward
    if (card) card.classList.add('active');
});

//  Walk children safely

// const list2 = document.querySelector('ul.items');
// for (const li of list.children) {
//     li.classList.toggle('highlight');
// }

//  Hop across siblings

const active = document.querySelector('.tab.active');
active?.nextElementSibling?.classList.add('active');
active?.classList.remove('active');

//  Guard against nulls

const hero = document.querySelector('#hero');
const title2 = hero?.firstElementChild;                      // optional chaining prevents errors

//  Check containment

let someNode;
if (document.body.contains(someNode)) {
    // safe to operate on it in the current document
}

//* 4. Console tour (try these on a page with cards/lists)

const item = document.querySelector('.item');               // item.parentElement?.classList.add('has-selected');

const list3 = item?.closest('ul');                           // find nearest ancestor <ul>
list?.firstElementChild?.classList.add('first');
list?.lastElementChild?.classList.add('last');

const second = list3?.firstElementChild?.nextElementSibling;
second?.classList.add('second');

item?.previousElementSibling?.classList.add('prev');
item?.nextElementSibling?.classList.add('next');


//* 5. Micro-exercise (10–15 minutes)

/*
<ul class="menu">
    <li class="menu-item">Home</li>
    <li class="menu-item current">Products</li>
    <li class="menu-item">About</li>
    <li class="menu-item">Contact</li>
</ul>

<section class="grid">
    <article class="card" data-id="1"><h2>One</h2></article>
    <article class="card" data-id="2"><h2>Two</h2></article>
    <article class="card" data-id="3"><h2>Three</h2></article>
</section>
*/

//? Tasks (in Console)
//  1. Starting at the .current menu item, add a class neighbor to both its previous and next element siblings.

/*
const current = document.querySelector('.menu .current');
current?.previousElementSibling?.classList.add('neighbor');
current?.nextElementSibling?.classList.add('neighbor');
*/

//  ‼️ Feedback: 
// const current = document.querySelector('.menu .current');
// [current?.previousElementSibling, current?.nextElementSibling]
//     .filter(Boolean)
//     .forEach(el => el.classList.add('neighbor'));


//  2. From the middle card ([data-id="2"]), climb to .grid, then mark its first and last card with classes edge-first and edge-last.

/*
const middleCard = document.querySelector('[data-id = "2"]');
const grid = middleCard?.closest('.grid');
const firstCard = grid?.querySelector('.card:first-child');
const lastCard = grid?.querySelector('.card:last-child');
firstCard?.classList.add('edge-first');
lastCard?.classList.add('edge-last');
*/

//  ‼️ Feedback:
// const middleCard = document.querySelector('[data-id="2"]'); // no spaces around = is conventional
// const grid = middleCard?.closest('.grid');

// grid?.firstElementChild?.classList.add('edge-first');
// grid?.lastElementChild?.classList.add('edge-last');

//  3. Verify that .grid.contains(document.querySelector('[data-id="3"]')) is true.

/*
let grid = document.querySelector('.grid');
let card = document.querySelector('[data-id="3"]');
const isContained = grid.contains(card);
*/

//  ‼️ Feedback:
// const grid = document.querySelector('.grid');
// const card = document.querySelector('[data-id="3"]');
// const isContained = grid?.contains(card);
// console.log('Contained?', isContained);                     // should be true


//  4. (Stretch) Toggle a class between every element sibling between the first and last card (loop using nextElementSibling).

const grid = document.querySelector('.grid');
const firstCard = grid.querySelector('.card:first-child');
const lastCard = grid.querySelector('.card:last-child');

let current = firstCard.nextElementSibling;

while (current && current !== lastCard) {
    current.classList.toggle('between');
    current = current.nextElementSibling;
}

//  ‼️ Feedback:
// const grid = document.querySelector('.grid');
// const cards = Array.from(grid?.querySelectorAll('.card') ?? []);
// cards.slice(1, -1).forEach(el => el.classList.toggle('between'));


//* 6. Gotchas & pro tips

//  • Text nodes strike again: If you must use *Child/*Sibling without “Element” variants, check nodeType === 1 (element) or guard with optional chaining.
//  • Do not over-traverse: If a single selector can grab what you want, use it (.grid > .card:nth-child(2))—traversal is for when you already have a reference and want relative movement.
//  • closest() includes self: If the starting element matches the selector, closest() returns the element itself.
//  • Document & Shadow DOM: parentElement is null at the document root; inside Shadow DOM, traversal boundaries may differ (advanced topic).

//* 7. Quick check (answer in your own words)

// 1) Why might firstChild give you a Text node, and how do you avoid that?
//! Answer: I might firstChild give me a Text node because it will count the first whitespace-only text node.

// 2) What does el.closest('.panel') do compared to el.parentElement?
//! Answer: The does el.closest('.panel') will close the ".panel" compared to el.parentElement, which will log an element or null (skips non-element parents). 

// 3) Write code to add class "active" to the sibling immediately after an element with class "current".
//! Answer:

const add = document.querySelector('.current');
add?.nextElementSibling?.classList.add('active');

// 4) How can you count only element children (not text/comment nodes)?
//! Answer: I can count only the element children with "node.childElementCount".

//  ‼️ Feedback
//  • Q1: Exactly: firstChild can be a Text node created by whitespace. Avoid it with firstElementChild (elements only) or by checking nodeType === 1.
//  • Q2: el.parentElement goes one level up (no selector). el.closest('.panel') climbs self → parent → grandparent... until it finds an ancestor that matches the selector, or returns null. Much more flexible.
//  • Q3: Your code is perfect. One-liner is fine too:
document.querySelector('.current')?.nextElementSibling?.classList.add('active')
//  • Q4: Correct. You can also use element.children.length for an element-only count.


//TODO  📝 Step 6 — Attributes, Classes, Data & Styles

//* 🎯 Goal
//  Read and write attributes and properties, manage classes, use data-attributes via dataset, and apply styles safely and cleanly.

//* 1) Attributes vs Properties (they’re related but not the same)

//  • Attributes live in the HTML markup (strings).
//  Read/write with: getAttribute, setAttribute, hasAttribute, removeAttribute.
//  • Properties live on the DOM objects (typed values).
//  Read/write with direct JS: el.id, el.value, el.checked, etc.

//  HTML
// <input id="email" value="from-markup" />

const input = document.querySelector('#email');

//  Attribute (string snapshot from markup)
//  input.getAttribute('value');                        //  "from-markup"

//  Property (live current value in UI)
//  input.ariaValueMax;                                 //  e.g., "" if user cleared it

//  Boolean attributes
const btn = document.createElement('button');
btn.setAttribute('disabled', '');                   //  present = true
btn.disabled === true;                              //  property reflects it
btn.removeAttribute('disabled');                    //  now false

//! Common gotcha: href/src properties are resolved to absolute URLs, while attributes return the literal string you wrote.

//* 2. Working with attributes

/*
el.getAttribute('aria-label');
el.setAttribute('aria-label', 'Close dialog');
el.hasAttribute('data-state'); // boolean
el.removeAttribute('hidden');
*/

//  • Prefer attributes for ARIA and data- hooks*.
//  • For form values/state (value, checked, selected), use properties.

//* 3. Classes: className vs classList

/*
el.className = 'card featured';                     // overwrite string
el.classList.add('active', 'highlight');            // add multiple
el.classList.remove('highlight');
el.classList.toggle('open');                        // toggle
el.classList.toggle('open', true);                  // force on
el.classList.replace('old', 'new');
el.classList.contains('active');                    // check
*/

//  • Use classList for almost everything—clear, safe, and supports multiple tokens.

//* 4. Data attributes: data-* ↔ dataset

//  HTML
//  <article class="card" data-id="42" data-user-name="alex"></article>

//  js
const card = document.querySelector('.card');
card.dataset.id;                                    //  "42"            (always strings)
card.dataset.userName;                              //  "alex"          (kebab-case → camelCase)

card.dataset.state = 'selected';                    //  sets data-state="selected"
delete card.dataset.userName;                       //  removes the attribute

//  Numbers/booleans: convert yourself
card.dataset.count = String(3);
const count = Number(card.dataset.count);           //  3

//* 5. Styles: inline vs CSS classes

//  Prefer CSS classes for presentation and theme. Use inline styles for one-off scriptable tweaks.

//  Inline style property
// el.style.backgroundColor = 'papayawhip';
// el.style.borderRadius = '8px';

//  Custom properties (CSS variables)
// el.style.setProperty('--accent', '#ff0077');
// el.style.removeProperty('--accent');

//  Multiple changes at once
// Object.assign(el.style, {
//     padding: '8px  12px',
//     outline: '2px solid currentColor',
// });

// Read computed (final) styles
//  const cs = getComputedStyle(el);
//  cs.display;                                         // e.g., "block"
//  cs.marginTop;                                       // returns computed px value

//  Best practices
//  • Toggle classes (e.g., .is-open) instead of flipping many inline styles.
//  • Batch DOM writes (e.g., via DocumentFragment) to minimize layout thrash.
//  • Keep state in data-* or JS, not encoded in class names when possible.

//* 6. Micro-exercise (10–15 minutes)

//  Using your playground:
//? 1. Mark external links
//  Add rel="noopener noreferrer" to all links with target="_blank":

//  js
document.querySelectorAll('a[target="_blank"] [rel="noopener noreferrer"]').forEach(a => {
    a.setAttribute('rel', 'noopener noreferrer');
});

//? 2. Toggle selection via classes
//  For every .card with an even data-id, add class selected:

document.querySelectorAll('.card').forEach(card => {
    if (Number(card.dataset.id) % 2 === 0) card.classList.add('selected');
});

//? 3. Expose counts via dataset
//  Set data-count on .grid to the number of element children:

const grid = document.querySelector('.grid');
grid.dataset.count = String(grid.childElementCount);

//? 4. Style a featured card
//  Give .card.featured a subtle inline border and read it back:

const featured = document.querySelector('.card.featured');
if (featured) {
    Object.assign(featured.style, { border: '2px solid', padding: '12px' });
    console.log(getComputedStyle(featured).borderTopWidth);                 //  e.g., "2px"
}

//* 7. Quick check (answer in your own words)

// 1) When should you prefer properties (el.value, el.checked) over getAttribute/setAttribute?
//! Answer: It is preferable to use el.value or el.checked when properties live on the DOM objects (typed values) and can be read/write with direct JS.

// 2) Show two different ways to add the classes "active" and "primary" to an element.
//! Answer: 
//  1: Using classList.add() with multiple argument.
//  2: Using className and string concatenation

// 3) How do you read and write data attributes for data-user-id?
//! Answer: To read and write data attributes, I can use getAttribute() with their full HTML name to read them, but the standard defines a simpler way: a DOMStringMap I can read out via a dataset property.

// 4) Why are CSS classes usually better than inline styles for UI state toggles?
//! Answer: The CSS classes are usually better than inline styles for UI state toggles because 


//TODO  Step 7 — Text & HTML Content (textContent, innerText, innerHTML) + Safe Templating

//* 🎯 Goal
//  Read and write content correctly, choose the right API (textContent, innerText, innerHTML), avoid XSS, and use simple templating patterns.

//? 1. textContent vs innerText vs innerHTML

el.textContent                                      // raw text nodes (no style/layout awareness)
el.innerText                                        // visible text as rendered (honors CSS like display:none)
el.innerHTML                                        // serialized HTML inside the element

//! When to use which
//  • textContent (default choice)
//      • Fast, doesn’t trigger layout.
//      • Escapes everything automatically (no HTML parsing).
//      • Use for untrusted or dynamic text.
//  • innerText (when you need “what the user can see”)
//      • Forces layout; slower.
//      • Respects CSS (display:none, text-transform, etc.).
//      • Useful for copy/search features where visual text matters.
//  • innerHTML (for trusted markup only)
//      • Parses HTML; can inject elements.
//      • Never pass untrusted/user-generated strings—XSS risk.
//      • Prefer createElement + textContent for untrusted data.

//! Examples

title.textContent = 'Hello <em>DOM</em>';           // shows literal <em>…</em>
title.innerHTML   = 'Hello <em>DOM</em>';           // renders italic DOM
console.log(title.innerText);                       // what appears to user

//? 2. Safer alternatives to innerHTML for structured UI

//  • DOM building (safe, explicit):

//  js
const badge = document.createElement('span');
badge.className = 'badge';
badge.textContent = 'NEW';
el.append(badge);

//  • insertAdjacentText / insertAdjacentElement (precise positions):

//  js
el.insertAdjacentText('afterbegin', 'Hello ');
el.insertAdjacentElement('beforeend', badge);

//  • <template> cloning (author HTML once, inject safely):

```html
<template id="item-tpl">
    <li class="item"><strong class="name"></strong></li>
</template>
```
//  js
const tpl = document.querySelector('#item-tpl');
const node = tpl.content.cloneNode(true);
node.querySelector('.name').textContent = 'Notebook';   //  safe text
list.append(node);

//! If you must turn a known-safe HTML string into nodes without touching innerHTML on your live element, you can parse in a sandbox element (const tmp = document.createElement('div'); tmp.innerHTML = html;) and then move the nodes. But the safety rule (trusted only) still applies.

//? 3. Replacing vs appending content

//  Replace all children:

//  js
el.textContent = '';                                // clears quickly and safely
// or
el.replaceChildren(node1, node2, 'plain text');     // one-shot replace

//! Append without nuking listeners: prefer append, before, after, insertAdjacent* to avoid reassigning innerHTML (which re-parses and drops event listeners inside).

//? 4. Dealing with whitespace & visibility

//  • textContent returns all text, including hidden elements.
//  • innerText returns only visible text (and normalizes whitespace like the user sees).
//  • If you only want element children text, iterate el.children and read each child’s textContent.

//? 5) Micro-exercise (10–15 minutes)

//  Using your playground:
//  1. Rename product titles safely
//  Change each .card .name to Product #<data-id> using textContent.

//  js
document.querySelectorAll('.card').forEach(c => {
    const id = c.dataset.id;
    let nameEl = c.querySelector('.name');
    if (!nameEl) {
        nameEl = document.createElement('h2');
        nameEl.className = 'name';
        card.prepend(nameEl);
    }
    nameEl.textContent = `Product #${id}`;
});

//  2. Add a trustworthy badge
//  For the featured card (.card.featured), append a small badge element built via DOM APIs (no innerHTML):

//js
const featured = document.querySelector('.card.featured');
if (featured && !featured.querySelector('.badge')) {
    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = 'Featured';
    featured.append(badge);                                     // no literal ' ' — use CSS for spacing
}

```css
.badge {
    margin-left: .5rem;
    padding: .125rem .375rem;
    border: 1px solid currentColor;
    border-radius: 999px;
    font-size: .75rem;
    line-height: 1;
}
```

//  js
badge.setAttribute('aria-label', 'Featured');               // helpful if you later replace text with an icon


//  3. Insert HTML only where safe
//  Under the nav, add a trusted tip line using insertAdjacentHTML:

//  js
const nav = document.querySelector('nav');
nav.insertAdjacentHTML('afterend', '<p class="tip">Tip: Use <code>querySelector</code> for precision.</p>');

//! Tiny polish suggestions:
//  • Guard and avoid duplicates if the snippet runs more than once.
//  • Optionally add semantics (role="note") and style via CSS (not a literal space).

//  js
const nav = document.querySelector('nav');
if (nav && !nav.nextElementSibling?.matches('.tip')) {
    nav.insertAdjacentHTML(
        'afterend',
        '<p class="tip" role="note">Tip: Use <code>querySelector</code> for precision.</p>'
    );
}

//! Prefer a no-HTML alternative? Build it via DOM APIs (safe by default):

const nav = document.querySelector('nav');
if (nav && !nav.nextElementSibling?.matches('.tip')) {
    const p = document.createElement('p');
    p.className = 'tip';
    p.setAttribute('role', 'note');
    p.append('Tip: Use ');
    const code = document.createElement('code');
    code.textContent = 'querySelector';
    p.append(code, ' for precision.');
    nav.after(p);
}

```js
.tip { 
    margin: .5rem 0 1rem; 
    font-size: .9rem; 
    opacity: .85; 
}
```

//  4. Compare innerText vs textContent
//  Hide one card via CSS (style="display:none" or classList.add('hidden')), then compare:

//  js
const grid = document.querySelector('.grid');
console.log('textContent length:', grid.textContent.length);
console.log('innerText length:',  grid.innerText.length);               // should be smaller if things are hidden

//! Solution

const card = document.querySelector('.card');
card.style.display = 'none';                                            // or card.classList.add('hidden') with CSS `.hidden { display: none; }`

//  When a card is hidden with display:none, its text is still included in textContent but omitted from innerText because innerText respects visual rendering and layout.

//  ‼️ Feedback:
//  Pro tips:
//  • Prefer toggling a class (e.g., .hidden { display:none }) over inline styles:

firstCard.classList.add('hidden'); // cleaner and CSS-controllable

//  • visibility: hidden still shows space in layout—innerText will still omit its text, but the element’s footprint remains.
//  • If content is hidden visually and should be ignored by assistive tech, pair with aria-hidden="true" (when appropriate).

//? 6. Gotchas & pro tips

//  • Event listeners vanish if you reassign innerHTML on a container that had listeners attached to its children. Prefer incremental DOM methods.
//  • Sanitize or avoid HTML from users. Use textContent for user-provided text.
//  • innerText triggers layout; avoid in hot loops.
//  • replaceChildren() is a clean, single-call way to swap content (including plain strings).

//? 7. Quick check (answer in your own words)

// 1. When is innerText preferable to textContent?
//! Answer: The innerText is preferable to textContent when I need “what the user can see”.

// 2. Why can setting innerHTML break existing behavior in a component?
//! Answer: Setting innerHTML breaks existing behavior because it throws away and recreates all the existing elements inside, including their event listeners and state, disrupting how the component operates. This can lead to bugs, data loss, and security risks if not handled properly. 

// 3. Show one safe and one “trusted-only” way to add the markup: <em>Hot</em> next to a title.
//! Answer: 
//  1. Safe

const title = document.querySelector('.title');                 // Select the title element
const em = document.createElement('em');                        // Create <em> element
em.textContent = 'Hot';                                         // Set the text content safely
title.appendChild(em);                                          // Append <em> to the title element

//  2. Trusted-only

const title = document.querySelector('.title');
title.insertAdjacentHTML('beforeend', '<em>Hot</em>');          // Insert <em>Hot</em> inside the title at the end

// 4. What does replaceChildren() do, and how does it differ from innerHTML = '' then append(...) ?
//! Answer: The replaceChildren() is a clean, single-call way to swap content (including plain strings).

//  ‼️ Feedback

//? 1. `innerText` vs `textContent`
//  Your take is right: use **`innerText`** when you need the **visibly rendered** text (it ignores `display:none`, respects CSS, and normalizes whitespace). Note it’s layout-aware and can be slower than `textContent`.

//? 2. Why `innerHTML` can break behavior
//  Exactly. Setting `innerHTML` **recreates** the subtree → child event listeners, form state, selection, and references are lost. Also, passing **untrusted** strings risks XSS.

//  3. Add `<em>Hot</em>` next to a title
//  Both solutions are correct.
//  • Safe (no HTML parsing):


const title = document.querySelector('.title');
const em = document.createElement('em');
em.textContent = 'Hot';
title.append(em); // (appendChild also fine)

//! Spacing tip: prefer CSS (`.title em { margin-left: .25rem; }`) instead of appending a literal space.

//  • Trusted-only (parses HTML):

const title = document.querySelector('.title');
title.insertAdjacentHTML('beforeend', '<em>Hot</em>');

//  4. `replaceChildren()` vs `innerHTML = ''` then `append(...)`
//  Your answer is on track—here’s the full picture:
//  • element.replaceChildren(...nodesOrStrings)` removes all existing children and inserts the provided nodes/strings in one atomic operation (no HTML parsing required unless you pass strings containing markup). It preserves the element itself (and any listeners on it) and tends to be clean and efficient.
//  • element.innerHTML = '' → element.append(...) does the same in two steps. The first step clears by parsing/serializing HTML (string-based API), then you append. It’s more verbose and can be less efficient, and if you later use `innerHTML` with markup, it will parse HTML.

//! Rule of thumb: prefer `replaceChildren()` when you’re working with nodes; use `innerHTML` only for known-trusted HTML strings.
