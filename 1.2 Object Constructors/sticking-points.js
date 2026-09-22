// Verify the three claims the new section makes, by running them.
console.log("Q7 — the chain really does end at null:");
function Player(n,m){ this.name=n; this.marker=m; }
const player1 = new Player("steve","X");
console.log("  0:", "player1 own keys =", Object.keys(player1).join(","));
console.log("  1:", Object.getPrototypeOf(player1) === Player.prototype ? "Player.prototype" : "?");
console.log("  2:", Object.getPrototypeOf(Player.prototype) === Object.prototype ? "Object.prototype" : "?");
console.log("  3:", Object.getPrototypeOf(Object.prototype));            // null
console.log("  lookup off the end:", player1.nope);                      // undefined

console.log("\nQ12 — one shared method, different `this`:");
const sleeper = { sleep(){ return this.name + " sleeps"; } };
const rabbit = { name:"Rabbit" }, hare = { name:"Hare" };
Object.setPrototypeOf(rabbit, sleeper);
Object.setPrototypeOf(hare, sleeper);
console.log(" ", rabbit.sleep(), "|", hare.sleep());
console.log("  same function object?", rabbit.sleep === hare.sleep);     // true
console.log("  does rabbit own sleep?", rabbit.hasOwnProperty("sleep")); // false

console.log("\nQ13 — call() copies data, setPrototypeOf links behaviour:");
function Hero(name, level){ this.name = name; this.level = level; }
Hero.prototype.greet = function(){ return `${this.name} says hello.`; };
function Warrior(name, level, weapon){ Hero.call(this,name,level); this.weapon = weapon; }
Warrior.prototype.attack = function(){ return `${this.name} attacks with the ${this.weapon}.`; };
const h = new Warrior("Bjorn",1,"axe");
console.log("  after call() — own props:", Object.keys(h).join(","));    // name,level,weapon
console.log("  attack():", h.attack());
console.log("  greet()  :", typeof h.greet);                             // undefined
Object.setPrototypeOf(Warrior.prototype, Hero.prototype);
console.log("  after setPrototypeOf, greet():", h.greet());              // works — same object!
