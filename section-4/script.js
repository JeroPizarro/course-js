//Default param, user == parameter
function registerUser(user = 'Bot') {
  return user + ' is registered.';
}

//Bob == argument
console.log(registerUser('Bob'));

//Rest params, n params
function total(...numbers) {
  let total = 0;
  for (const num of numbers) {
    total += num;
  }
  return total;
}

console.log(total(10, 30, 50, 15));

//Obj as param
function sayHello(user) {
  return `Hello to ${user.name} with the id number ${user.id}`;
}

console.log(
  sayHello({
    id: 1,
    name: 'Johnny Dogs',
  })
);

//Array as param
function countFruits(fruitsArray) {
  return `You have ${fruitsArray.length} kind of fruits`;
}

console.log(countFruits(['banana', 'apple', 'watermelon']));
console.log(['banana', 'apple', 'watermelon']);

function getRandom(...numbers) {
  let randomIndex = Math.floor(Math.random() * numbers.length);
  const selected = numbers[randomIndex];
  return selected;
}

console.log(`selected: ${getRandom(1, 4, 6, 78, 4, 2, 54, 52, 98)}`);

//Function declaration, only this way of declaration uses hoisting. You can use the function previous to its declaration
function addDollarSign(value) {
  return '$' + value;
}

console.log(addDollarSign(122));

//Function expression. You can use this way previous to its declaration
const addEuroSign = function (value) {
  return '€' + value;
};

console.log(addEuroSign(1556));

//Arrow function. More compact, implicit return, lexical scope.

//Normal way
const add = (a, b) => {
  return a + b;
};

//Compact with implicit return
const subtract = (a, b) => a - b;

//Compact with single param
//const powTwo = a => Math.pow(a, 2);
const powTwo = (a) => Math.pow(a, 2); //Prettier will add the parenthesis

//Return obj
const createObj = () => ({
  name: 'John',
}); //wrap {} with () to return objects

console.log(add(5, 8));
console.log(subtract(8, 5));
console.log(powTwo(3));
console.log(createObj());

//Arrow fcn in call back
const array = [1, 2, 3, 4, 5];

array.forEach((number) => console.log(number));

//IIFE (immediately invoked function expression) used to avoid global scope pollution. Ex: two scripts with the same const variable.

(function () {
  //Varibles previously declared in this script
  const add = 1 + 2;
  const subtract = 5 - 2;
  const powTwo = 3 ** 2;
  console.log(`add: ${add}, subtract: ${subtract}, powTwo: ${powTwo}`);
})();

(function (name) {
  console.log(`Hello ${name}`);
})('Jero');

//Challenges
//1
const getCelcius = (farenheitDegrees) =>
  `C\xB0: ${Math.floor(((farenheitDegrees - 32) * 5) / 9)}`;

console.log(getCelcius(50));

//2
const minMax = (numArray) => {
  const max = Math.max(...numArray);
  const min = Math.min(...numArray);
  return {
    min,
    max,
  };
};

console.log(minMax([99, 88, 1, 44, 2, 46, 7, 3]));

//3
((length, width) => {
  console.log(
    `Rectangle: length (${length}cm), width (${width}cm), area (${
      length * width
    }cm²)`
  );
})(10, 5);
