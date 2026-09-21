# Organizing Code with Objects — study archive

Notes and interactive pages for The Odin Project lesson
<https://www.theodinproject.com/lessons/node-path-javascript-organizing-code-with-objects>

Unofficial study material. Not affiliated with The Odin Project.

## The pages — just double-click to open in a browser

| File | What it is |
|---|---|
| `lesson-companion.html` | **Start here.** The lesson's own sections, terms and code, made runnable. Ends with an 11-question scored quiz. |
| `objects-visual.html` | The same ideas in plain language, using everyday examples instead of the lesson's. Six click-through demos. |

Both are fully self-contained. They work offline — the only outside reference
is Google Fonts, so with no internet they fall back to system fonts and still
run perfectly.

Also published online (private unless shared from the page's share menu):
- Lesson companion: https://claude.ai/artifact/AWL2b6WqiuqAXDCKFD5Efy
- Objects you can click: https://claude.ai/artifact/26dgjMsLa9qiTim9JVojVr

## The scripts — run them in a terminal

| File | What it is |
|---|---|
| `odin-lesson-examples.js` | The lesson's own examples, in the lesson's order. Additions marked `[FILLED IN]`. |
| `why-objects.js` | A 7-act build-up: loose variables → objects → methods → why `this` must exist. Act 5 reproduces the bug that makes `this` necessary. |
| `objects-playground.js` | Dot vs bracket notation, the arrow-function trap, and a detached-method demo. |

Run any of them:

    ./run.sh odin-lesson-examples.js

`run.sh` uses Node if you have it, and otherwise falls back to macOS's built-in
JavaScriptCore engine via `_jsc-shim.js` (which only supplies a `console.log`).

Once Node is installed — which the Odin Node path expects — you can drop the
script entirely and use:

    node odin-lesson-examples.js

## The three things the lesson is actually teaching

1. **Objects as a data structure** — grouping data, which gives you *namespacing*
   and lets you pass one object instead of many parameters.
2. **Objects as a design pattern** — grouping *functionality* too, storing logic
   as *methods*. A core tenet of OOP: data as **fields/properties**, code as
   **procedures/methods**.
3. **`this`** — refers to the object a method is called from; used to **read and
   assign** that object's properties.

Next lesson covers constructors and prototypes.
