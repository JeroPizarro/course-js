// Type conversion

let num = '100';
let str = 121;

//Str to number
//Parse: num = parseInt(num), parseFloat for decimals.
Unary: num = +num;
//Number constr: num = Number(num);

//Num to str
//Method: str = str.toString(); (uses a temp wrapper over the primitive number)
//String constr: str = String(str);

//Num to boolean t/f == 1/0
//str = Boolean(str);

console.log(num, typeof num);
console.log(str, typeof str);

// Type Cohersion
let x = str + num; // cohersion to number
x = 5 + '5'; // cohersion to string

console.log(x, typeof x);

// Strings
x = 'Hello';
let name = 'Jero';

//template literals
let msg = `msg: ${x} my name is ${name},`;
let msgPrototype = msg.__proto__;
//props and methods

console.log(
  msg,
  `msg lenght: ${msg.length}//`,
  `firstChar: ${msg[5]}//`,
  `J char position: ${msg.indexOf('J')}//`,
  `substring: ${msg.substring(22, 26)}//`,
  `split: ${msg.split(' ')}`
);
console.log(msgPrototype);

//Capitalize challenge
let myString = 'developer';
let myNewString = `${myString[0].toUpperCase() + myString.slice(1)}`;
console.log(myNewString);

//Numbers
x = Math.floor(Math.random() * 100 + 1);
num = Math.floor(Math.random() * 50 + 1);

console.log(`${x} + ${num} = ${x + num}`);
console.log(`${x} - ${num} = ${x - num}`);
console.log(`${x} * ${num} = ${x * num}`);
console.log(`${x} / ${num} = ${x / num}`);
console.log(`${x} % ${num} = ${x % num}`);

//Dates
let d = new Date();

d = d.toLocaleString('es-Ar', {
  day: 'numeric',
  weekday: 'long',
  month: 'long',
  year: 'numeric',
});

console.log(d);
