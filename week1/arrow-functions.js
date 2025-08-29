// Scenario 1: Basic Function
// Regular function
function sayHello() {
  return "Hello, world!";
}

// Solution
const sayHelloArrow = () => "Hello, world!";


// Scenario 2: Single Parameter
// Regular function
function double(x) {
  return x * 2;
}

// Solution
const doubleArrow = x => x * 2;


// Scenario 3: Multiple Parameters
// Regular function
function add(x, y) {
  return x + y;
}

// Solution
const addArrow = (x, y) => x + y;


// Scenario 4: Function Inside an Object
// Regular function
const person = {
  name: "Alice",
  sayHi: function() {
    return "Hi, " + this.name + "!";
  }
};

// Solution
const personArrow = {
  name: "Alice",
  sayHi: () => "Hi, " + this.name + "!" // 'this' will not work as expected here
};


// Scenario 5: Callback Functions
// Regular function with forEach
const numbers = [1, 2, 3, 4, 5];
const doubled = [];
numbers.forEach(function(num) {
  doubled.push(num * 2);
});

// Solution with forEach and arrow function
const numbersArrow = [1, 2, 3, 4, 5];
const doubledArrow = [];
numbersArrow.forEach(num => doubledArrow.push(num * 2));