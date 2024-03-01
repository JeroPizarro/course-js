let fruits = ['pear', 'peach', 'grape'];
let arr2 = new Array(1, 2, 3, 4, 5);

//Nested Arrays
//fruits.push(arr2);
//fruits = fruits[fruits[3][1]];

//Array concatenation
//fruits = fruits.concat(arr2);

//Spread operator
const arr3 = [...fruits, ...arr2];

//Flatten array
fruits.push(arr2);
fruits = fruits.flat();

console.log(fruits, typeof fruits);
console.log(arr3, typeof fruits);

//Static methods in Array obj
let x = Array.isArray(fruits);

x = Array.from('9876');

const a = 'a';
const b = 'b';
const c = 'c';

x = Array.of(a, b, c);

console.log(x);

//Array challenge 1, exp result [6,5,4,3,2,1,0]
const arr1 = [1, 2, 3, 4, 5];
arr1.push(6);
arr1.unshift(0);
arr1.reverse();

console.log(arr1);

//Array challenge 2, concat array1 and array2 in array3 without repeated values. Array3 = [1...10]
const array1 = [1, 2, 3, 4, 5];
const array2 = [5, 6, 7, 8, 9, 10];
const array3 = array1.concat(array2.splice(1));

console.log('array3:', array3);

//Object literals

const person = {
  name: 'John Doe',
  age: 29,
  isAdmin: true,
};

console.log(person);

person.hasChildren = false;
person.name = 'Johnny Doe';
delete person.age;

person.greet = function () {
  return `Hello my name is ${this.name}`;
};

console.log(person, `greeting: ${person.greet()}`);

//Spread operator with obj
const objA = { a: 1, b: 2 };
const objB = { c: 3, d: 4 };
const objC = { ...objA, ...objB }; //Similar than Object.assing();

x = objC;

console.log(x);

//Methods
const todos = [
  { id: 1, title: 'Buy Milk' },
  { id: 2, title: 'Buy Eggs' },
  { id: 3, title: 'Buy Flour' },
];

x = Object.keys(todos);
x = Object.keys(todos).length;

x = Object.values(todos[0]);

x = Object.entries(todos[0]);

x = todos[0].hasOwnProperty('id');

console.log(x);

//Direct variable injection
const firstName = 'John';
const lastName = 'Day';
const age = 30;

const persona = {
  firstName,
  lastName,
  age,
};

console.log(`persona's age: ${persona.age}`);

//Object literal destructuring

const todo = {
  id: 1,
  heading: 'Buy groceries',
  user: {
    name: 'Charles',
    lastName: 'Xavier',
  },
};

const {
  id: todoID,
  heading,
  user: { name, lastName: todoUserLastName },
} = todo;

console.log(todoID, heading, name, todoUserLastName);

//Array literal destructuring

const numbers = [22, 33, 55, 66, 77];
const [first, second, thrid, ...rest] = numbers; //...rest operator can use any name

console.log(first, second, thrid, rest);

//JSON - js object notation, store data in human readable format

const post = {
  id: 1,
  title: 'How to play Minecraft',
  content:
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus natus voluptas quis modi ducimus nisi aperiam ullam molestias autem illo!',
};

//json to string
const str = JSON.stringify(post);

//string to object
const obj = JSON.parse(str);

console.log(obj);

//Challenge

const library = [
  {
    title: 'Harry Potter I',
    author: 'J K Rowling',
    status: {
      own: true,
      reading: false,
      read: false,
    },
  },
  {
    title: 'The Lord of the Rings',
    author: 'J R R Tolkien',
    status: {
      own: true,
      reading: false,
      read: false,
    },
  },
  {
    title: 'The Emperor Rises',
    author: 'Henry Cavill',
    status: {
      own: true,
      reading: false,
      read: false,
    },
  },
];

library[0].status.read = true;
library[1].status.read = true;
library[2].status.read = true;

const { title: firstBook } = library[0];

const objectStr = JSON.stringify(library);

console.log(firstBook);
