# 1.2 — Object Constructors

Study companion for The Odin Project lesson
<https://www.theodinproject.com/lessons/node-path-javascript-object-constructors>

Unofficial study material. Not affiliated with The Odin Project.

## Files

| File | What it is |
|---|---|
| `constructors-companion.html` | **Start here.** The lesson made runnable: an animated prototype-chain walker, the `new` stepper, the do/don't toggle, `this` in six situations, the three assignment articles distilled (§5), the knowledge check (§7), a 14-question scored quiz (§8), and **§9 Sticking points** — the three that catch everyone, plus a `call()`/`apply()` primer built from scratch. |
| `call-and-apply.js` | `call`, `apply` and `bind` from zero. **C**all = **C**ommas, **A**pply = **A**rray. |
| `why-call.js` | The four ways you might reuse `Hero`'s setup lines, and why only `Hero.call(this, …)` works. |
| `sticking-points.js` | Runnable proofs for the three sticking points: where the chain ends, `this` in shared methods, and `call()` vs `setPrototypeOf`. |
| `odin-constructors-examples.js` | The lesson's own examples plus the runnable points from the assignment reading. Additions marked `[FILLED IN]`. |
| `run.sh`, `_jsc-shim.js` | Runner that works with or without Node installed. |

Online: <https://claude.ai/artifact/VD4mzUmXiLw67ye62PkHrR>

**The HTML** is fully self-contained — double-click it. Works offline, just
falling back to system fonts without internet.

**The script:**

    ./run.sh odin-constructors-examples.js

Once Node is installed: `node odin-constructors-examples.js`.

## Required reading (this lesson has an assignment)

Summarised in §5 of the companion, but the summaries are not a substitute:

1. **DigitalOcean** — [Understanding Prototypes and Inheritance in JavaScript](https://www.digitalocean.com/community/tutorials/understanding-prototypes-and-inheritance-in-javascript)
   Constructor functions, the chain, chaining with `call()` — and why `call()`
   alone leaves `greet()` undefined until you also `Object.setPrototypeOf`.
2. **JavaScript.info** — [Prototypal Inheritance](https://javascript.info/prototype-inheritance)
   Do the exercises; the lesson says don't skip them. Note Odin's warning: the
   article leans heavily on `__proto__`, which is not recommended.
3. **JavaScript Tutorial** — [the `this` keyword](https://www.javascripttutorial.net/javascript-this/)
   Six call contexts and the pitfall in each. This is lesson overview point 5.

## The six things to carry out of this lesson

1. A **constructor** is just a function, capitalised by convention, called with `new`.
2. **`new`** creates an object, binds `this` to it, links it to the function's
   `.prototype`, and returns it — even with no return statement.
3. **Safeguard** with `if (!new.target) throw Error(...)`.
4. A **prototype** is another object you inherit from. `.prototype` is a property
   of *functions*; `Object.getPrototypeOf()` reads an *object's* actual `[[Prototype]]`.
5. The **chain** is walked on read and ends at `null`. Writes never touch it —
   assignment always creates an own property.
6. **DO** `Object.setPrototypeOf(Child.prototype, Parent.prototype)`, before creating
   any objects. **DON'T** `Child.prototype = Parent.prototype` — that is one object,
   and editing it edits both. **DON'T** use `.__proto__`.

## Exercise carried forward

Write the **Book constructor** (title, author, pages, read, plus `info()`).
The lesson says you will revisit it in the next project.

Next lesson: classes, and factory functions with closures.
