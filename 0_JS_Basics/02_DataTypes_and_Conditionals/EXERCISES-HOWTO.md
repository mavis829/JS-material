# How the Odin exercise repo works

Applies to every exercise lesson from here on, not just this one.

Repo: <https://github.com/TheOdinProject/javascript-exercises>
Your clone: `~/Documents/javascript-exercises`

---

## What is in each exercise folder

    01_helloWorld/
      README.md            <- the instructions. READ THIS FIRST
      helloWorld.js        <- the file YOU edit
      helloWorld.spec.js   <- the test. Do not touch it
      solution/            <- the answer. Do not open it yet

**You only ever edit the plain `.js` file.** The `.spec.js` is the grader.
The line `module.exports = ...` at the bottom is how the test reaches your code -
leave it alone.

---

## The loop

### 1. Open the file you edit

    const helloWorld = function() {
      return ''        // <- you change this
    };

    module.exports = helloWorld;   // leave this alone

### 2. Look at what the test wants

    expect(helloWorld()).toEqual('Hello, World!');

Read it as: *"when I run helloWorld(), I expect to get back 'Hello, World!'"*

### 3. Run it

    cd ~/Documents/javascript-exercises
    npm test 01_helloWorld

### 4. Read the failure

    Expected: "Hello, World!"
    Received: ""

**That is the whole game.** `Expected` is what the test wants, `Received` is what
your code gave. Make them match.

### 5. Fix one thing, run again

Red before green is correct, not failure. The lesson's own advice:
**"Read all the directions, watch the terminal, and read all the errors."**

---

## `return`, not `console.log`

The tests check **what your function hands back**.

- `console.log(x)` prints x to the screen and returns nothing
- `return x` hands x back so other code - including the test - can use it

A function that logs but does not return gives the test `undefined`, and it fails.
This catches everyone once.

---

## The five in this lesson

| exercise | what it asks |
|---|---|
| `01_helloWorld` | Trivial on purpose - proves your setup works. Return `'Hello, World!'`. |
| `02_addNumbers` | A bug to fix. `result = "a" + "b"` returns `"ab"`; it should return the number `2`. Look at the quotes. |
| `03_numberChecker` | Returns `true` only when the number is `6`. Make it `true` for anything `>= 10`. |
| `04_mathEquations` | Six variables hold descriptions as strings. Replace each with the real expression - `"one plus eight"` becomes `1 + 8`. Do not type the answer, write the sum. |
| `05_joinStrings` | Has a Learn step first: read `joinStrings-example.js`, predict the output, then run its test. |

---

## Gotchas

**Multiple tests, switched off.** Some exercises (03 is the first) have several tests
where only the first is enabled. When it passes, delete `.skip` from the next
`test.skip(...)` and keep going. **Enable one at a time.**

**Do not edit the `.spec.js` file.** If a test seems wrong, it is almost always your
code, not the test.

**The `solution/` folder is for checking, not starting.** Get it working, or get
properly stuck, first.

**Node comes from nvm.** Use your normal Terminal, where `.zshrc` loads it. Check with:

    node --version      # should print v24.21.0

---

## Commands you will use constantly

    cd ~/Documents/javascript-exercises

    npm test 01_helloWorld       # run one exercise
    npm test 03                  # partial names work too
    npm test                     # run everything (lots of red - that is fine)
