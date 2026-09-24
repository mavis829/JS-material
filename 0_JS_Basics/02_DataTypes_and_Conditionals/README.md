# 0.2 - Data Types and Conditionals

The Odin Project, Foundations
<https://www.theodinproject.com/lessons/foundations-data-types-and-conditionals>

Unofficial study material. Not affiliated with The Odin Project.

## Files

| File | |
|---|---|
| `companion.html` | **Start here.** All nine overview points, a console in every section, a truthy/falsy tester, a live if/else branch demo, and a 12-question quiz. |
| `EXERCISES-HOWTO.md` | How the Odin exercise repo works - folder layout, the run/read/fix loop, `return` vs `console.log`, and what each of the five exercises asks. Applies to every exercise lesson from here on. |

Double-click it. Standalone document, works offline.

## Heads-up about this lesson

The lesson page itself **teaches almost nothing directly** - it is a reading list.
But its overview promises nine specific things:

1. Name the eight data types
2. The difference between single, double and backtick quotes
3. Embed a variable/expression in a string
4. What a method is
5. Name the three logical operators
6. What the comparison operators are
7. What conditionals are
8. What nesting is
9. What truthy and falsy values are

The companion covers all nine, section by section, so nothing is missing if the
articles do not land.

## The assignment is different this time

This is the first lesson using **TheOdinProject/javascript-exercises**, which runs
automated tests against your code.

    # fork it on GitHub first, then:
    git clone https://github.com/YOUR-USERNAME/javascript-exercises.git
    cd javascript-exercises
    npm install

Then work in `foundations/data_types_and_conditionals`, in this order:

1. `01_helloWorld`  - trivial on purpose, proves your setup works
2. `02_addNumbers`
3. `03_numberChecker`
4. `04_mathEquations`
5. `05_joinStrings`

Run one with `npm test 01_helloWorld`. Read each README first.

These run in **Node from the terminal**, not a browser - so you need Node installed.
Red failing tests come before green passing ones; that is the workflow, not a problem.

## The eight falsy values - worth memorising

    false    0    -0    0n    ""    null    undefined    NaN

**Everything else is truthy** - including `"0"`, `[]` and `{}`. Learn these eight and
you know the whole rule.
