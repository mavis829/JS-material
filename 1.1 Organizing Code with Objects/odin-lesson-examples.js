// THE ODIN PROJECT — "Organizing Code with Objects"
// The lesson's OWN examples, in the lesson's own order, made runnable.
// Anything I had to add to make it run is marked [FILLED IN].
// Run:  ./run.sh odin-lesson-examples.js

/* ===================================================================
   REFRESHER — object literal syntax
   =================================================================== */
console.log("--- Refresher: object literal syntax ---");

const myObject = {
  property: "Value!",
  otherProperty: 77,
  "obnoxious property": function () {
    // do stuff!
    return "[Function]";                       // [FILLED IN] so it prints something
  },
};

// Two ways to get information out of an object:
console.log(myObject.property);                // dot notation    -> "Value!"
console.log(myObject["obnoxious property"]);   // bracket notation -> [Function]

// Dot notation is cleaner and usually preferred, but is not always possible.
// myObject."obnoxious property"  <- SyntaxError: the key is a string with a space.

// You also cannot use variables in dot notation:
const variable = "property";
console.log(myObject.variable);   // undefined - looks for a property named "variable"
console.log(myObject[variable]);  // "Value!"  - equivalent to myObject["property"]


/* ===================================================================
   OBJECTS AS A DATA STRUCTURE  (using objects to organize DATA)
   =================================================================== */
console.log("\n--- Objects as a data structure ---");

// without objects
const playerOneName = "tim";
const playerTwoName = "jenn";
const playerOneMarker = "X";
const playerTwoMarker = "O";
console.log("without objects:", playerOneName, playerOneMarker, playerTwoName, playerTwoMarker);

// with objects
const playerOne = {
  name: "tim",
  marker: "X",
};
const playerTwo = {
  name: "jenn",
  marker: "O",
};

// NAMESPACING: `name` and `marker` would not normally be reusable in the same
// scope, but as playerOne.name and playerTwo.name they can be.

// Grouping related data lets you pass all the data around more easily:
function gameOver(winningPlayer) {
  console.log("Congratulations!");
  console.log(`${winningPlayer.name} (${winningPlayer.marker}) is the winner!`);
}
gameOver(playerOne);


/* ===================================================================
   OBJECTS AS A DESIGN PATTERN  (using objects to organize FUNCTIONALITY)
   =================================================================== */
console.log("\n--- Objects as a design pattern ---");

// "What properties (physical or conceptual) does my thing have?" -> properties
// "How can I interact with it?"                                  -> methods

const car = {
  make: "Volkswagen",
  model: "Golf",
  year: 2026,
  color: "blue",
  priceUSD: 40000,

  // a method is just a function assigned to a property
  applyDiscount: function (discountPercentage) {
    const multiplier = 1 - discountPercentage / 100;
    this.priceUSD *= multiplier;
  },

  // shorthand way to add a method to an object literal
  getSummary() {
    return `${this.year} ${this.make} ${this.model} in ${this.color}, priced at $${this.priceUSD} (USD).`;
  },
};

console.log(car.getSummary());
car.applyDiscount(10);
console.log(car.getSummary());

// NOTE FROM THE LESSON — "Arrow functions and this"
// `this` behaves differently inside arrow functions than in traditional
// function expressions (and the shorthand syntax). If the methods above were
// written as arrow functions they would NOT behave as you expect:
const carArrow = {
  make: "Volkswagen",
  getSummary: () => `make is ${this && this.make}`,   // arrow function
};
console.log("arrow version:", carArrow.getSummary()); // make is undefined


/* ===================================================================
   OBJECTS FOR MORE ABSTRACT CONCEPTS
   =================================================================== */
console.log("\n--- Objects for more abstract concepts: rock paper scissors ---");

// The lesson's skeleton:
//   const rps = {
//     playerScore: 0,
//     computerScore: 0,
//     playRound(playerChoice) { /* play round, update score, return result */ },
//     getWinningPlayer()      { /* "player", "computer", or "tie" */ },
//     reset()                 { /* reset both scores to 0 */ },
//   };

const rps = {
  playerScore: 0,
  computerScore: 0,

  // [FILLED IN] the lesson leaves these as comments
  playRound(playerChoice) {
    const options = ["rock", "paper", "scissors"];
    const computerChoice = options[Math.floor(Math.random() * 3)];
    if (playerChoice === computerChoice) return "tie";
    const playerWins =
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissors" && computerChoice === "paper");
    if (playerWins) { this.playerScore++; return "player"; }
    this.computerScore++;
    return "computer";
  },

  getWinningPlayer() {
    if (this.playerScore > this.computerScore) return "player";
    if (this.computerScore > this.playerScore) return "computer";
    return "tie";
  },

  reset() {
    this.playerScore = 0;
    this.computerScore = 0;
  },
};

// The lesson's usage example:
console.log("round:", rps.playRound("rock"));
console.log("playerScore:", rps.playerScore);
console.log("round:", rps.playRound("rock"));
console.log("computerScore:", rps.computerScore);
console.log("round:", rps.playRound("scissors"));
console.log("playerScore:", rps.playerScore);
console.log("getWinningPlayer():", rps.getWinningPlayer());

rps.reset();
console.log("after reset:", rps.playerScore, rps.computerScore);

// NOTE FROM THE LESSON — "Underscore properties"
// A leading _ is purely a developer CONVENTION meaning "intended to be private"
// (internal use, not meant to be read or called outside the object). JavaScript
// object literals have no real private properties - they are still "public".
const withPrivate = {
  _helper() { return "I am only meant for internal use"; },
  publicMethod() { return this._helper(); },
};
console.log(withPrivate.publicMethod());
console.log("but nothing stops this:", withPrivate._helper());


/* ===================================================================
   OBJECTS AS MACHINES
   =================================================================== */
console.log("\n--- Objects as machines ---");

// The lesson's first example: "an object that manages other objects, such as an
// 'inventory' object that contains item objects in an array, and methods that
// can be done to interact with that array of items."
// Properties = the machine's DISPLAYS. Methods = the machine's BUTTONS.

const inventory = {
  items: [],          // display: a list of the items you've collected
  maxItems: 3,        // display: the maximum number of items you can carry

  addItem(item) {     // button: add new items
    if (this.items.length >= this.maxItems) return "Can't carry any more";
    this.items.push(item);
    return `Picked up ${item.name}`;
  },
  removeItem(name) {  // button: remove an item you own from the list
    this.items = this.items.filter((item) => item.name !== name);
    return `Dropped ${name}`;
  },
  list() {
    return this.items.map((item) => item.name).join(", ") || "(empty)";
  },
};

console.log(inventory.addItem({ name: "sword" }));
console.log(inventory.addItem({ name: "shield" }));
console.log(inventory.addItem({ name: "potion" }));
console.log(inventory.addItem({ name: "helmet" }));
console.log("carrying:", inventory.list());
console.log(inventory.removeItem("shield"));
console.log("carrying:", inventory.list());
