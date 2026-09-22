// THE ODIN PROJECT — "Object Constructors"
// The lesson's OWN examples, in the lesson's own order, made runnable.
// Anything added to make it run is marked [FILLED IN].
// Run:  ./run.sh odin-constructors-examples.js

/* ===================================================================
   OBJECT CONSTRUCTORS
   =================================================================== */
console.log("--- Object constructors ---");

function Player(name, marker) {
  this.name = name;
  this.marker = marker;
  this.sayName = function () {
    console.log(this.name);
  };
}

const player1 = new Player("steve", "X");
const player2 = new Player("also steve", "O");
player1.sayName();  // logs "steve"
player2.sayName();  // logs "also steve"

// Calling WITHOUT new is not the same thing. With `new`, JavaScript:
//   1. creates a new object
//   2. makes `this` inside the function refer to that object
//   3. makes that object inherit from the function's .prototype
//   4. returns the new object (even with no return statement)
const notAPlayer = Player("steve", "X");          // [FILLED IN] to show the result
console.log("without new:", notAPlayer);          // undefined


/* --- Safeguarding constructors -------------------------------------- */
console.log("\n--- Safeguarding constructors ---");

function SafePlayer(name, marker) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.name = name;
  this.marker = marker;
}

try {
  SafePlayer("steve", "X");                        // no `new`
} catch (e) {
  console.log("caught:", e.message);
}
console.log("with new:", new SafePlayer("steve", "X").name);


/* --- Exercise: the Book constructor --------------------------------- */
console.log("\n--- Exercise: Book constructor ---");
// [FILLED IN] the lesson leaves this as an exercise. Try it yourself first.

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ` +
      (this.read ? "already read" : "not read yet");
  };
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
console.log(theHobbit.info());
// Note it RETURNS a string rather than logging it — see the lesson's
// "console.log vs return" note.


/* ===================================================================
   THE PROTOTYPE
   =================================================================== */
console.log("\n--- The prototype ---");

console.log(Object.getPrototypeOf(player1) === Player.prototype);  // true
console.log(Object.getPrototypeOf(player2) === Player.prototype);  // true

// Defining a function 'on' the prototype makes it available to every instance
Player.prototype.sayHello = function () {
  console.log("Hello, I'm a player!");
};
player1.sayHello();  // "Hello, I'm a player!"
player2.sayHello();  // "Hello, I'm a player!"

// .prototype is a property OF FUNCTIONS that sets what a new instance's
// [[Prototype]] will be. It is NOT how you read an object's [[Prototype]] —
// that is Object.getPrototypeOf().


/* ===================================================================
   PROTOTYPAL INHERITANCE — walking the chain
   =================================================================== */
console.log("\n--- Prototypal inheritance ---");

console.log(Object.getPrototypeOf(Player.prototype) === Object.prototype);  // true

// .valueOf was never defined by us — it comes from Object.prototype
console.log("player1.valueOf():", player1.valueOf());

// How do we know where it lives? hasOwnProperty (which itself comes from the chain)
console.log(player1.hasOwnProperty("valueOf"));                  // false
console.log(Object.prototype.hasOwnProperty("valueOf"));         // true
console.log(Object.prototype.hasOwnProperty("hasOwnProperty"));  // true

// The lesson's three-step traversal, spelled out:
//   1. Is .valueOf part of player1?                       No.
//   2. Is it part of player1's [[Prototype]]              No, only .sayHello.
//      (=== Player.prototype)?
//   3. Is it part of Object.getPrototypeOf(Player.prototype)  Yes!
//      (=== Object.prototype)?

// The chain does not go on forever:
console.log("end of chain:", Object.getPrototypeOf(Object.prototype));  // null
console.log("not found   :", player1.nope);                             // undefined

// [FILLED IN] print the whole chain for this object
let node = player1, hop = 0;
while (node !== null) {
  const label = hop === 0 ? "player1" :
    node === Player.prototype ? "Player.prototype" :
    node === Object.prototype ? "Object.prototype" : "(?)";
  console.log(`  chain[${hop}] ${label}`);
  node = Object.getPrototypeOf(node);
  hop++;
}
console.log(`  chain[${hop}] null  <- end`);


/* ===================================================================
   RECOMMENDED METHOD FOR PROTOTYPAL INHERITANCE  — the DO
   =================================================================== */
console.log("\n--- DO: Object.setPrototypeOf ---");

function Person(name) {
  this.name = name;
}
Person.prototype.sayName = function () {
  console.log(`Hello, I'm ${this.name}!`);
};

function Player2(name, marker) {
  this.name = name;
  this.marker = marker;
}
Player2.prototype.getMarker = function () {
  console.log(`My marker is "${this.marker}"`);
};

// Set the chain up BEFORE creating any objects — doing it after can cause
// performance issues.
Object.setPrototypeOf(Player2.prototype, Person.prototype);

const p1 = new Player2("steve", "X");
const p2 = new Player2("also steve", "O");
p1.sayName();    // Hello, I'm steve!          (from Person.prototype)
p2.sayName();    // Hello, I'm also steve!
p1.getMarker();  // My marker is "X"           (from Player2.prototype)
p2.getMarker();  // My marker is "O"


/* ===================================================================
   THE WARNING — the DON'T
   =================================================================== */
console.log("\n--- DON'T: Player.prototype = Person.prototype ---");

function Person2(name) { this.name = name; }
Person2.prototype.sayName = function () {
  console.log(`Hello, I'm ${this.name}!`);
};

function BadPlayer(name, marker) {
  this.name = name;
  this.marker = marker;
}
// Don't do this!
// Use Object.setPrototypeOf(BadPlayer.prototype, Person2.prototype)
BadPlayer.prototype = Person2.prototype;

function Enemy(name) {
  this.name = name;
  this.marker = "^";
}
// Not again!
Enemy.prototype = Person2.prototype;

Enemy.prototype.sayName = function () {
  console.log("HAHAHAHAHAHA");
};

const carl = new BadPlayer("carl", "X");
carl.sayName();  // Uh oh! logs "HAHAHAHAHAHA" — we only edited Enemy.

console.log("same object in memory?",
  BadPlayer.prototype === Person2.prototype && Enemy.prototype === Person2.prototype);


/* ===================================================================
   ASSIGNMENT READING — the points worth running
   =================================================================== */
console.log("\n--- From the assignment articles ---");

// JavaScript.info: WRITING does not use the prototype. Reading walks the
// chain; assignment always creates an OWN property on the object itself.
const animal = { eats: true };
const rabbit = {};
Object.setPrototypeOf(rabbit, animal);
console.log("rabbit.eats (inherited):", rabbit.eats);   // true
rabbit.eats = false;                                     // own property created
console.log("rabbit.eats (own)      :", rabbit.eats);    // false
console.log("animal.eats unchanged  :", animal.eats);    // true  <- the point

// JavaScript.info: in a method call, `this` is always the object before the
// dot — never the prototype that stores the method.
const proto = { whoAmI() { return this.tag; } };
const a = { tag: "A" }, b = { tag: "B" };
Object.setPrototypeOf(a, proto);
Object.setPrototypeOf(b, proto);
console.log("shared method, own this:", a.whoAmI(), b.whoAmI());  // A B

// JavaScript.info: for..in sees inherited properties, Object.keys does not.
// (Use a fresh object that inherits without shadowing, so the difference shows.)
const hare = { hops: true };
Object.setPrototypeOf(hare, animal);          // animal has .eats
console.log("Object.keys(hare) :", Object.keys(hare));   // own only    -> ["hops"]
const seen = [];
for (const k in hare) seen.push(k);
console.log("for..in hare      :", seen);                // own + inherited -> ["hops","eats"]
console.log("hare.hasOwnProperty('eats'):", hare.hasOwnProperty("eats"));  // false

// DigitalOcean: call() copies own properties but does NOT link prototypes.
function Hero(name, level) {
  this.name = name;
  this.level = level;
}
Hero.prototype.greet = function () { return `${this.name} says hello.`; };

function Warrior(name, level, weapon) {
  Hero.call(this, name, level);   // chains the constructor
  this.weapon = weapon;
}
Warrior.prototype.attack = function () {
  return `${this.name} attacks with the ${this.weapon}.`;
};

const noLink = new Warrior("Bjorn", 1, "axe");
console.log("attack works       :", noLink.attack());
console.log("greet before link  :", typeof noLink.greet);   // "undefined"

// The fix — and it must come BEFORE any additional prototype methods.
Object.setPrototypeOf(Warrior.prototype, Hero.prototype);
console.log("greet after link   :", new Warrior("Bjorn", 1, "axe").greet());
