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
//! Answer: // 1. childNodes returns all types of child nodes, including element nodes, text nodes (such as whitespace), and comment nodes. The children return only child elements, ignoring text and comment nodes. // 2. The childNodes method returns a NodeList, which can contain a mix of node types. The children return an HTMLCollection, which contains only element nodes (e.g., <div>, <p>, etc.). 

// 3. Which objects give you access to the page and the browser tab, respectively?
//! Answer: The document object gives access to the page’s content and structure (the DOM), while the window object gives access to the browser tab itself, including tab controls, browser APIs, and global properties.


//TODO  🧾 Step 2 — Document & Top-Level Properties

//* 🎯 Goal
//  Get comfortable reading key document-level properties and using the built-in HTML collections (forms, links, images, scripts). These give you structured entry points into the DOM before we dive into CSS-style selectors in the next step.

//* 1. The document’s “identity card”
//  Useful read-only (or mostly read-only) properties you’ll use a lot:

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

//? Why they matter
//  • readyState helps you know how far along the parser is (we’ll formalize event timing later).
//  • title is quick UX polish and can be changed dynamically.
//  • baseURI influences how relative paths resolve.
//  • compatMode warns you if you accidentally triggered quirks mode (old layout rules).
//! Avoid legacy properties like document.domain (deprecated).

//* 2. Top-level structural handles
//  Quick references to the big three nodes:

document.documentElement                    // <html> element
document.head                               // <head> element
document.body                               // <body> element

//! Use these when you need to append global assets, tweak meta info, or add elements to the page body.

//* 3. Built-in HTML collections
//  The document exposes convenient, structured lists:

document.links                              // All <a> and <area> with href
document.images                             // All <img>
document.forms                              // All <form>
document.scripts                            // All <script>

//  • These are typically live HTMLCollections—they update as the DOM changes.
//  • Each collection supports index access and length: document.images[0], document.forms.length.
//  • Forms (and their controls) also have a legacy name/index map:

```html
<form name="signup">
    <input name="email">
</form>
```

```js
document.forms.signup === document.forms[0];   // true (legacy mapping)
document.forms.signup.elements.email;          // the input
```

//! It’s handy to know this exists, but for clarity and resilience, you’ll usually prefer selectors (coming next step).

//* 4. Quick console tour (try these now)
//  Open DevTools → Console on any page (or your test file from Step 1):

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

//* 5. Micro-exercise (10 minutes)
// Create this minimal page and play with the properties:

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

//? Then in the Console:
//  1. Read/modify document.title.
//  2. Compare document.URL vs document.baseURI (navigate to a subpage if needed).
//  3. Count document.links, inspect the first one’s href and text.
//  4. Count document.images, check document.images[0].naturalWidth.
//  5. Inspect document.forms.contact.elements.email.placeholder.

//* 6. Pro tips
//  • Live vs static: document.images/forms are live. If you append a new <img>, the collection’s length changes immediately. Many selector methods you’ll learn next return static NodeLists.
//  • Referrer can be empty: Don’t rely on document.referrer—users can navigate directly or block it.
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


//TODO  ❇️ Step 3 — DOM Selectors

//* 🎯 Goal
//  Select elements precisely and reliably using modern APIs, understand return types (Element vs NodeList), and know when to scope your queries.

//* 1. The core selector methods

// Modern, CSS-style
document.querySelector(selector)            // first match (Element or null)
document.querySelectorAll(selector)         // all matches (static NodeList)

// Legacy, fast, less flexible
document.getElementById(id)                 // Element or null
document.getElementsByClassName(name)       // live HTMLCollection
document.getElementsByTagName(tag)          // live HTMLCollection

//? Key differences
//  • CSS power: querySelector(All) supports full CSS selectors (#id, .class, [name=email], ul > li:first-child, etc.).
//  • Return type:
//      • querySelector → a single Element
//      • querySelectorAll → static NodeList (does not auto-update)
//      • getElementsBy* → live HTMLCollection (auto-updates)
//  • Scoping: You can call these on any Element, not just document—great for narrowing searches:

```js
const form = document.querySelector('#signup');
const email = form.querySelector('input[name=email]');
```

//* 2) CSS selector mini-cheatsheet (most useful 10%)

```js
#id                                             /* id */
.class                                          /* class */
tag                                             /* tag (e.g., button, input, li) */
[parent] [child]                                /* descendant */
parent > child                                  /* direct child */
a[href^="/"]                                    /* attribute starts with */
input[required]                                 /* has attribute */
button.primary: hover;                          /* pseudo-classes (in CSS; in JS you query without :hover) */
ul li:first-child                               /* structural pseudo-classes (JS can query these) */
.container .btn.primary[data-action = "save"]   /* combine freely */
```

//! In JavaScript strings, just pass the CSS selector to querySelector(All).

//* 3. Practical patterns
//  Grab one element

```js
const title = document.querySelector('#title');   // or getElementById('title')
```

//  Grab many, then iterate:

```js
const items = document.querySelectorAll('.todo-item');   // NodeList (static)
items.forEach(li => li.classList.add('ready'));
```

//  Scope to reduce ambiguity & speed

```js
const card = document.querySelector('.card[data-id="42"]');
const saveBtn = card.querySelector('.btn.save');
```

//  Pick between live vs static
//  • Need a snapshot you will iterate once? → querySelectorAll.
//  • Need a live view that tracks DOM changes? → getElementsByClassName/TagName.

//  Convert to real arrays (when you need array methods)

```js
const list = document.querySelectorAll('li');           // NodeList
const arr  = Array.from(list);                          // Array

// or

const live = document.getElementsByClassName('row');    // HTMLCollection (live)
const arr2 = [...live];                                 // Array
```

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

```js
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
```

//? Tasks (in Console)
//  1. Select the About nav link three ways:
//      • # by text is not supported; instead use:
//      document.querySelector('nav a.primary')
//      document.querySelector('nav a[href="/about"]')
//      document.querySelectorAll('nav a')[1]

//  2. Select the featured product card, then grab its Add button scoped to that card only.

```js
const featured = document.querySelector('.card.featured');
const addBtn = featured.querySelector('[data-action="add"]');
```

//  3. Get all product names (.name) and log their text.
//  4. Count images using a live collection, then dynamically create and append a new <img> to verify the count changes.

//* 6. Gotchas & pro tips
//  • Special characters in IDs/classes: If an id has : or . (e.g., from frameworks), escape them in CSS selectors ('#my\\.id'). Safer alternative: [id="my.id"].
//  • Don’t rely on text content in selectors (CSS has no :contains() in standard). Grab an element, then check textContent.
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

//? 1. The traversal toolkit

//  Parents

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
































