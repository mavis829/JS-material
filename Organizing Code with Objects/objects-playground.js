// The Odin Project — "Organizing Code with Objects"
// Run with:  node objects-playground.js
// Uncomment / edit things and re-run. Breaking it on purpose is the point.

console.log("=== 1. Dot vs bracket notation ===");

const myObject = {
  property: "Value!",
  otherProperty: 77,
  "obnoxious property": function () {
    return "I have a space in my key, so dot notation can't reach me.";
  },
};

console.log(myObject.property);                  // "Value!"  -> dot works
console.log(myObject["obnoxious property"]());   // must use brackets: key has a space

const variable = "property";
console.log(myObject.variable);   // undefined  -> looks for a key literally named "variable"
console.log(myObject[variable]);  // "Value!"   -> brackets evaluate the variable first

// RULE OF THUMB: brackets when the key is (a) not a valid identifier, or (b) in a variable.


console.log("\n=== 2. Objects as a DATA structure (grouping) ===");

// Without objects: four loose variables that must be kept in sync by hand.
// const playerOneName = "tim"; const playerOneMarker = "X"; ...

const playerOne = { name: "tim", marker: "X" };
const playerTwo = { name: "jenn", marker: "O" };

// One parameter carries ALL the related data. Add a property later -> this still works.
function gameOver(winningPlayer) {
  console.log("Congratulations!");
  console.log(`${winningPlayer.name} (${winningPlayer.marker}) is the winner!`);
}
gameOver(playerOne);


console.log("\n=== 3. Objects as a DESIGN PATTERN (data + behaviour) ===");

const car = {
  make: "Volkswagen",
  model: "Golf",
  year: 2026,
  color: "blue",
  priceUSD: 40000,

  // a method is just a function stored in a property
  applyDiscount: function (discountPercentage) {
    const multiplier = 1 - discountPercentage / 100;
    this.priceUSD *= multiplier;   // `this` === the object the method was called ON
  },

  // shorthand method syntax — identical behaviour, less typing
  getSummary() {
    return `${this.year} ${this.make} ${this.model} in ${this.color}, priced at $${this.priceUSD} (USD).`;
  },
};

console.log(car.getSummary());
car.applyDiscount(10);
console.log(car.getSummary());   // price changed: the method mutated its own object


console.log("\n=== 4. The arrow-function trap with `this` ===");

const trap = {
  name: "I am the trap object",
  regular() {
    return this.name;          // `this` = trap
  },
  arrow: () => {
    return this?.name;         // `this` is NOT trap — arrows don't get their own `this`
  },
};

console.log("regular():", trap.regular());  // "I am the trap object"
console.log("arrow():  ", trap.arrow());    // undefined  <-- the gotcha the lesson warns about


console.log("\n=== 5. An abstract thing as an object: Rock Paper Scissors ===");

const rps = {
  playerScore: 0,
  computerScore: 0,

  // `_` prefix = convention meaning "internal, please don't touch from outside".
  // JS does not actually enforce this for object literals. It's a promise, not a lock.
  _choices: ["rock", "paper", "scissors"],

  _computerChoice() {
    const i = Math.floor(Math.random() * this._choices.length);
    return this._choices[i];
  },

  playRound(playerChoice) {
    const computerChoice = this._computerChoice();
    if (playerChoice === computerChoice) return "tie";

    const playerWins =
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissors" && computerChoice === "paper");

    if (playerWins) {
      this.playerScore++;
      return "player";
    }
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

for (let i = 0; i < 5; i++) {
  console.log("round result:", rps.playRound("rock"));
}
console.log(`score  player ${rps.playerScore} : ${rps.computerScore} computer`);
console.log("leading:", rps.getWinningPlayer());

rps.reset();
console.log("after reset:", rps.playerScore, rps.computerScore);

// Nothing stops you doing this — proof that `_` is only a convention:
console.log("reaching into a 'private' prop:", rps._choices);


console.log("\n=== 6. BONUS: `this` is decided at CALL time, not at write time ===");

const detached = car.getSummary;   // pulled the function OUT of the object
try {
  console.log(detached());         // `this` is no longer `car` -> undefined properties
} catch (e) {
  console.log("blew up:", e.message);
}
console.log("still fine when called on the object:", car.getSummary());
