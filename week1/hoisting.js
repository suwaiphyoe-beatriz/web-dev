// Solution for refactoring the functions to function expressions

// 1. function cube(x) { ... }
const cube = function(x) {
  return x * x * x;
};

// 2. function fullName(first, last) { ... }
const fullName = function(first, last) {
  return first + " " + last;
};

// 3. function power(base, exp) { ... }
const power = function(base, exp) {
  if (exp === 0) {
    return 1;
  }
  return base * power(base, exp - 1);
};

// 4. function sumCubes(numbers) { ... }
const sumCubes = function(numbers) {
  let total = 0;
  for (let i = 0; i < numbers.length; i++) {
    total = total + cube(numbers[i]);
  }
  return total;
};

// Solution for code restructuring

// 1. The variable `values` needs to be declared before the loop.
let values = [10, 20, 30];
for (let i = 0; i < values.length; i++) {
  console.log(values[i]);
}

// 2. The `lastLogin` variable and the `welcome` function need to be available
// before the console.log statement.
// Since `welcome` is a function declaration, it's already hoisted.
// We just need to move `lastLogin` before the call.

let lastLogin = '1/1/1970';
function welcome(first, last) {
  return `Welcome, ${first} ${last}! You last logged in on ${lastLogin}.`;
}
console.log(welcome('Charlie', 'Munger'));