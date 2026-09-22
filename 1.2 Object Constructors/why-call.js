// WHY IS Hero.call(this, ...) INSIDE Warrior?
// The scenario: a text RPG. Every character has a name and a level.
// Warriors also have a weapon. Healers also have a spell.

function Hero(name, level) {
  this.name = name;
  this.level = level;
}

console.log("=== Option 1: no call() — just repeat the lines ===");
function Warrior1(name, level, weapon) {
  this.name = name;     // copied from Hero
  this.level = level;   // copied from Hero
  this.weapon = weapon;
}
function Healer1(name, level, spell) {
  this.name = name;     // copied from Hero AGAIN
  this.level = level;   // copied from Hero AGAIN
  this.spell = spell;
}
console.log("  works:", JSON.stringify(new Warrior1("Bjorn", 1, "axe")));
console.log("  BUT: add hitPoints to Hero and you must edit 3 functions by hand.");

console.log("\n=== Option 2: call new Hero() inside — does NOT work ===");
function Warrior2(name, level, weapon) {
  new Hero(name, level);   // makes a SEPARATE object and throws it away
  this.weapon = weapon;
}
console.log("  result:", JSON.stringify(new Warrior2("Bjorn", 1, "axe")));
console.log("  name and level went onto a different object that nobody kept.");

console.log("\n=== Option 3: call Hero() plainly — does NOT work ===");
function Warrior3(name, level, weapon) {
  try {
    Hero(name, level);     // no `new`, no `call` -> `this` is not our object
  } catch (e) {
    console.log("  threw:", e.constructor.name);
  }
  this.weapon = weapon;
}
console.log("  result:", JSON.stringify(new Warrior3("Bjorn", 1, "axe")));
console.log("  `this` inside Hero was undefined or the global object - not our Warrior.");

console.log("\n=== Option 4: Hero.call(this, ...) — WORKS ===");
function Warrior4(name, level, weapon) {
  Hero.call(this, name, level);   // "run Hero's body, but `this` means MY object"
  this.weapon = weapon;
}
const w = new Warrior4("Bjorn", 1, "axe");
console.log("  result:", JSON.stringify(w));
console.log("  Hero's two lines ran, aimed at our Warrior. No duplication.");

console.log("\n=== Proof that .call() is just 'choose what `this` will be' ===");
function show() { return this.label; }
console.log("  show.call({label:'A'}) ->", show.call({ label: "A" }));
console.log("  show.call({label:'B'}) ->", show.call({ label: "B" }));

console.log("\n=== And now Q13 makes sense ===");
Hero.prototype.greet = function () { return this.name + " says hello."; };
console.log("  w.name (from the BODY, via call) ->", w.name);
console.log("  w.greet (on the PROTOTYPE)       ->", typeof w.greet);
console.log("  call() ran the body. greet was never in the body.");
