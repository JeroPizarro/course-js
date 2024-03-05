// for loop, use it if you already know many iterations do you need
const randomTen = Math.floor(Math.random() * 10);

for (let a = 0; a <= randomTen; a++) {
  console.log(`Loop a: ${a}, random: ${randomTen}`);
}

//nested loop
for (let b = 0; b <= 2; b++) {
  console.log(`loop b: ${b * -1}`);
  for (let c = 0; c <= 2; c++) {
    console.log(`loop c: ${c}`);
  }
}

const fruits = ['banana', 'apple', 'mango', 'orange'];
for (let d = 0; d < fruits.length; d++) {
  let element = fruits[d];
  element === 'mango' && (element = 'mango is the best');
  console.log(`loop d: ${element}`);
}

//break & continue
let d, stop;
for (d = 0, stop = 20; d <= stop; d++) {
  if (d === 13) {
    console.log('Skipping 13...');
    continue;
  } else if (d === 15) {
    console.log('Breaking at 15...');
    break;
  }
  console.log(`loop d: ${d}, stop: ${stop}`);
}

//while, use it if you don't know many iterations do you need
let e = 20;
while (e >= 5) {
  console.log(`loop e: ${e}`);
  e--;
}

//runs at least one time
do {
  console.log(`loop do e: ${e}`);
} while (e === 20);

//Challenge
for (let f = 1; f <= 100; f++) {
  if (f % 3 === 0 && f % 5 === 0) {
    console.log(`loop f: ${f} FIZZ-BUZZ`);
  } else if (f % 5 === 0) {
    console.log(`loop f: ${f} BUZZ`);
  } else if (f % 3 === 0) {
    console.log(`loop f: ${f} FIZZ`);
  } else {
    console.log(`loop f: ${f}`);
  }
}

//For of (use it in any iterable obj)
fruits.push('lemon', 'melon', 'strawberry', 'blueberry', 'raspberry');
const str = 'Some string in the valley.';
const map = new Map();
map.set('name', 'Jero');
map.set('age', '29');
map.set('city', 'Valencia');

for (let fruit of fruits) {
  console.log(fruit);
}

// for (let letter of str){
//   console.log(letter);
// }

for (let [key, value] of map) {
  console.log(key, value);
}

//For in (preferred for object literals)
const colorObj = {
  color1: 'red',
  color2: 'black',
  color3: 'white',
  color4: 'yellow',
  color5: 'blue',
};

for (let key in colorObj) {
  console.log(key, colorObj[key]);
}

//High order array methods (it uses callbacks as argument)

//For each
fruits.forEach((fruit) => console.log(`Foreach fruit ${fruit}`));

//Filter - return a new array after the filter
const shortFruits = fruits.filter((fruit) => fruit.length < 6);
console.log(`shortFruits: ${shortFruits}`);

const persons = [
  {
    name: 'John',
    age: 11,
  },
  {
    name: 'Johnny',
    age: 64,
  },
  {
    name: 'Joel',
    age: 18,
  },
  {
    name: 'Joseph',
    age: 9,
  },
  {
    name: 'George',
    age: 30,
  },
];

const canVote = persons.filter((person) => person.age >= 18);
console.log(canVote);

//Map - transform each element
const capitalFruits = fruits.map((fruit) => fruit.toUpperCase());
console.log(capitalFruits);

const capitalizeFruits = fruits
  .map((fruit) => fruit.toLowerCase())
  .map(
    (lowerCaseFruit) =>
      lowerCaseFruit[0].toUpperCase() + lowerCaseFruit.slice(1)
  );

console.log(capitalizeFruits);

//Reduce - reduce multiple values to a single expression
const cart = [
  { id: 1, product: 'Product 1', price: 130 },
  { id: 2, product: 'Product 2', price: 150 },
  { id: 3, product: 'Product 3', price: 175 },
];

const total = cart.reduce((acc, product) => (acc += product.price), 0);

console.log(total);

//Challenges
//1
const people = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@gmail.com',
    phone: '111-111-1111',
    age: 30,
  },
  {
    firstName: 'Jane',
    lastName: 'Poe',
    email: 'jane@gmail.com',
    phone: '222-222-2222',
    age: 25,
  },
  {
    firstName: 'Bob',
    lastName: 'Foe',
    email: 'bob@gmail.com',
    phone: '333-333-3333',
    age: 45,
  },
  {
    firstName: 'Sara',
    lastName: 'Soe',
    email: 'Sara@gmail.com',
    phone: '444-444-4444',
    age: 19,
  },
  {
    firstName: 'Jose',
    lastName: 'Koe',
    email: 'jose@gmail.com',
    phone: '555-555-5555',
    age: 23,
  },
];

const youngPeople = people
  .filter((person) => person.age <= 25)
  .map((youngPerson) => ({
    name: `${youngPerson.firstName} ${youngPerson.lastName}`,
    email: youngPerson.email,
  }));

console.log(youngPeople);

//2
const numbers = [2, -30, 50, 20, -12, -9, 7];
const positiveSum = numbers
  .filter((num) => num > 0)
  .reduce((acc, curr) => (acc += curr), 0);
console.log(positiveSum);

//3
const words = ['coder', 'programmer', 'developer'];
const capitalizedWords = words.map((word) => `${word[0].toUpperCase() + word.slice(1)}`);
console.log(capitalizedWords);