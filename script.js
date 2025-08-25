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





















































