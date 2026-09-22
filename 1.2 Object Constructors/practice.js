

function Book(title,author,pages,read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    return '${this.title}' by ${this.author}, ${this.pages} pages,' + ${this.read ? 'already read' : 'not read yet'} ;
  };
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);

theHobbit.info()

Write it as an ordinary function, capitalised by convention, that assigns to this. 
  Instantiate it by calling that function with new. 
  
function Player(name, marker) {
  this.name = name;
  this.marker = marker;
}
const player = new Player("steve", "X");

Use the new.target meta-property to safeguard it. When the function is called without new, new.target is undefined, so you can throw. 
  
  if (!new.target) {
  throw Error("You must use the 'new' operator to call the constructor");
}
