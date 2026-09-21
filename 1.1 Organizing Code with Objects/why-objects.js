// WHY OBJECTS? — a story in 7 acts.
// Each act creates a problem. The next act fixes it.
// Run:  ./run.sh why-objects.js

console.log("################ ACT 1 — loose variables ################");

// We're building a shop. Two products.
let laptopName = "Laptop";
let laptopPrice = 1000;
let phoneName = "Phone";
let phonePrice = 500;

// A function that describes a product needs every piece passed separately.
function describe1(name, price) {
  return name + " costs $" + price;
}
console.log(describe1(laptopName, laptopPrice));
console.log(describe1(phoneName, phonePrice));

// THE PAIN: the boss says "also track stock quantity".
// Now EVERY variable, EVERY function signature, EVERY call site must change.
//   let laptopStock = 3;  let phoneStock = 8;
//   function describe1(name, price, stock) { ... }
//   describe1(laptopName, laptopPrice, laptopStock)   <- update every call
// With 8 products and 12 functions this is a genuinely bad afternoon.


console.log("\n################ ACT 2 — group the data ################");

// An object is a labelled box. Everything about one product goes in one box.
const laptop2 = { name: "Laptop", price: 1000, stock: 3 };
const phone2  = { name: "Phone",  price: 500,  stock: 8 };

function describe2(product) {              // ONE parameter, forever
  return product.name + " costs $" + product.price + " (" + product.stock + " left)";
}
console.log(describe2(laptop2));
console.log(describe2(phone2));

// THE WIN: adding `color` later changes NOTHING about describe2's signature.
// The box already travels as one unit. That is the entire point of Act 2.


console.log("\n################ ACT 3 — the functions drift away ################");

// Our shop grows. Functions that are ABOUT products live somewhere else entirely.
function applyDiscount3(product, pct) { product.price *= 1 - pct / 100; }
function sell3(product)               { product.stock -= 1; }
function describe3(product)           { return product.name + ": $" + product.price; }

const laptop3 = { name: "Laptop", price: 1000, stock: 3 };
applyDiscount3(laptop3, 10);
sell3(laptop3);
console.log(describe3(laptop3));

// THE PAIN, part 1: the data is in one place, the things you can DO to it are
// scattered across the file. Nothing tells you these belong together.
//
// THE PAIN, part 2: now add customers. They also need a discount concept.
//   function applyDiscount(product, pct)   <- collision!
//   function applyDiscountToCustomer(...)  <- ugly workaround
// Loose function names all compete for the same global space.


console.log("\n################ ACT 4 — put the functions IN the box ################");

// If the data lives in the box, the buttons that operate on it should too.
// A "method" is nothing more exotic than: a function stored in an object.

const laptop4 = {
  name: "Laptop",
  price: 1000,
  stock: 3,

  sell: function () { /* ...what goes here? see Act 5... */ },
};

// Now the name collision is gone, because names live inside their own box:
//   laptop.applyDiscount(10)
//   customer.applyDiscount(10)
// Both can be called `applyDiscount`. The box in front of the dot disambiguates.
console.log("laptop4 has keys:", Object.keys(laptop4));

// But we hit a real question: inside `sell`, how does the function refer to
// the very object it is sitting inside? That is Act 5.


console.log("\n################ ACT 5 — WHY `this` has to exist ################");

// ATTEMPT A: hardcode the object's name. It works... once.
const laptopA = {
  name: "Laptop",
  stock: 3,
  sell() { laptopA.stock -= 1; },     // hardcoded reference to laptopA
};
laptopA.sell();
console.log("attempt A, laptopA.stock:", laptopA.stock);  // 2 — looks fine!

// Now we need a second product. Copy-paste the object and rename it:
const phoneA = {
  name: "Phone",
  stock: 8,
  sell() { laptopA.stock -= 1; },     // OOPS. Forgot to change this line.
};
phoneA.sell();
console.log("attempt A, phoneA.stock:", phoneA.stock);    // 8 — did not change!
console.log("attempt A, laptopA.stock:", laptopA.stock);  // 1 — WRONG box got sold!

// That bug is the reason `this` exists.
// You need a word that means "whatever object I'm currently attached to"
// WITHOUT naming it. That word is `this`.

// ATTEMPT B: use `this`.
const laptopB = { name: "Laptop", stock: 3, sell() { this.stock -= 1; } };
const phoneB  = { name: "Phone",  stock: 8, sell() { this.stock -= 1; } };

laptopB.sell();
phoneB.sell();
console.log("attempt B, laptopB.stock:", laptopB.stock);  // 2
console.log("attempt B, phoneB.stock:",  phoneB.stock);   // 7

// IDENTICAL code inside both methods, yet each one touched its own data.
// `this` means "me" — and who "me" is depends on who is speaking.


console.log("\n################ ACT 6 — `this` is whatever is left of the dot ################");

// The rule, in five words: LOOK LEFT OF THE DOT.
const alice = { name: "Alice", greet() { return "Hi, I'm " + this.name; } };
const bob   = { name: "Bob",   greet() { return "Hi, I'm " + this.name; } };

console.log(alice.greet());   // `alice` is left of the dot -> this = alice
console.log(bob.greet());     // `bob`   is left of the dot -> this = bob

// So what if there IS no dot? `this` has nobody to point at.
const orphan = alice.greet;   // we pulled the sentence out of Alice's mouth
console.log("orphaned call:", orphan());   // "Hi, I'm undefined" — no speaker

// And arrow functions refuse to play this game at all.
// They never get their own `this`; they borrow the surrounding one.
const broken = {
  name: "Broken",
  greet: () => "Hi, I'm " + (this && this.name),   // arrow -> not the object
};
console.log("arrow method:", broken.greet());      // "Hi, I'm undefined"

// RULE FOR NOW: object methods use `method() {}` shorthand. Never `=>`.


console.log("\n################ ACT 7 — objects that manage other objects ################");

// This is the "objects as machines" idea the lesson ends on, made concrete.
// Think of a vending machine:
//    properties = the display readouts  (what's inside, how much money)
//    methods    = the buttons           (add item, sell item, restock)
//    _private   = the wiring in the case (you're not supposed to reach in)

const inventory = {
  items: [],                                   // holds OTHER objects

  add(name, price, stock) {
    this.items.push({ name: name, price: price, stock: stock });
    return this;                               // returning `this` allows chaining
  },

  sell(name) {
    const item = this._find(name);
    if (!item)          return name + " not stocked";
    if (item.stock === 0) return name + " is sold out";
    item.stock -= 1;
    return "Sold one " + name + ", " + item.stock + " left";
  },

  totalValue() {
    return this.items.reduce(function (sum, item) {
      return sum + item.price * item.stock;
    }, 0);
  },

  report() {
    return this.items
      .map(function (i) { return "  " + i.name + " x" + i.stock + " @ $" + i.price; })
      .join("\n");
  },

  _find(name) {                                // `_` = internal helper, don't call from outside
    return this.items.filter(function (i) { return i.name === name; })[0];
  },
};

inventory.add("Laptop", 1000, 3).add("Phone", 500, 8);   // chaining, thanks to `return this`

console.log("Stock:");
console.log(inventory.report());
console.log(inventory.sell("Phone"));
console.log(inventory.sell("Tablet"));
console.log("Total inventory value: $" + inventory.totalValue());

// Notice what you can now do from the outside. You never touch `items` directly.
// You press buttons: .add() .sell() .totalValue() .report()
// The object is a self-contained machine. THAT is what "organizing code
// with objects" actually buys you.
