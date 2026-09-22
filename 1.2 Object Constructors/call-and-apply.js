console.log("=== 1. A function that uses `this` but sits on its own ===");
function introduce() {
  return "I am " + this.name;
}
// It is written, but it has no object yet. `this.name` has nothing to point at.

const alice = { name: "Alice" };
const bob   = { name: "Bob" };

console.log("=== 2. The usual way: put it IN the object, use the dot ===");
const alice2 = { name: "Alice", introduce: introduce };
console.log("  alice2.introduce() ->", alice2.introduce());
console.log("  ...but that means attaching the function to every object.");

console.log("\n=== 3. call(): run it WITHOUT attaching it ===");
console.log("  introduce.call(alice) ->", introduce.call(alice));
console.log("  introduce.call(bob)   ->", introduce.call(bob));
console.log("  alice owns nothing:", Object.keys(alice).join(","));   // just name

console.log("\n=== 4. Passing arguments: call vs apply ===");
function greet(greeting, punctuation) {
  return greeting + ", I am " + this.name + punctuation;
}
const byCall  = greet.call(alice, "Hello", "!");        // Commas
const byApply = greet.apply(alice, ["Hello", "!"]);     // Array
console.log("  greet.call (alice, 'Hello', '!')  ->", byCall);
console.log("  greet.apply(alice, ['Hello','!']) ->", byApply);
console.log("  identical?", byCall === byApply);
console.log("  C = Commas.  A = Array.  That is the ONLY difference.");

console.log("\n=== 5. bind(): does not run it now, hands you a new function ===");
const aliceGreet = greet.bind(alice);
console.log("  typeof greet.bind(alice) ->", typeof aliceGreet);
console.log("  call it later ->", aliceGreet("Hi", "."));

console.log("\n=== 6. Where apply() is genuinely handy ===");
const scores = [3, 9, 4, 1];
console.log("  Math.max.apply(null, scores) ->", Math.max.apply(null, scores));
console.log("  (an array where separate arguments were expected)");

console.log("\n=== 7. Reading Hero.call(this, name, level) left to right ===");
function Hero(name, level) {
  this.name = name;
  this.level = level;
}
Hero.prototype.greet = function () { return this.name + " says hello."; };

function Warrior(name, level, weapon) {
  Hero.call(this, name, level);
  this.weapon = weapon;
}
const hero1 = new Warrior("Bjorn", 1, "axe");
console.log("  run Hero | with this = our Warrior | passing name, level");
console.log("  hero1 own properties ->", Object.keys(hero1).join(", "));
console.log("  hero1.greet          ->", typeof hero1.greet, "  <- never ran, it is not in the body");
