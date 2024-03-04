//Calculator challenge
const calculator = (number1, number2, operator) => {
  switch (operator) {
    case '+':
      return number1 + number2;
      break;
    case '-':
      return number1 - number2;
      break;
    case '*':
      return number1 * number2;
      break;
    case '/':
      return number1 / number2;
      break;

    default:
      return 'The operator is incorrect.';
      break;
  }
};

console.log(calculator(10, 5, '+'));

//truthy/falsy caveats

//using 0
const children = 0; //0 is valid qty but is a falsy value.

if (!isNaN(children)) {
  // or children !== undefined
  console.log(`You have ${children} children`);
} else {
  console.log(`Enter number of children`);
}

//empty array/obj
const posts = []; //[] is valid but it does't match our case

if (posts.length) {
  //using just posts is truthy but it doesn't match the case
  console.log('List of posts');
} else {
  console.log('No available posts');
}

//for obj you can use Object.keys(obj).length as param

//Logical operators

// && - will return first falsy value or the last value
let a = 10 && 20 && 30; //return 30
a = 10 && 0 && 30; //return 0

// || - will return first truthy value or the last value
let b = 10 || 20; //return 10
b = 0 || 20; //return 20

// ?? (nullish coalescing op) - will return right-hand operand if left-hand operand is null or undefined
let c = 10 ?? 20; //return 10
c = null ?? 20; //return 20

//Logical assignment

// ||= it assing right side if left is falsy
let d = false;

// if (!d) {
//   a = 10;
// }

//shorthand
d ||= 10;
console.log('d: ' + d);

// &&= it assing right if left  is truthy
d &&= 20;
console.log('d: ' + d);

// ??=  it assing right if left is null or undefined
d = null;
d ??= 30;
console.log('d: ' + d);

//Ternary operator
let age = Math.floor(Math.random() * 100);

console.log('age:' + age);

age >= 18 && age < 99
  ? console.log('You can vote')
  : console.log("You can't vote");

//assingment
const canVote = age >= 18 && age < 99 ? true : false;
console.log(canVote);

//complex actions, use parenthesis to do multiple actions
const auth = false;
const redirect = auth
  ? (alert('Welcome to dashboard'), '/dashboard')
  : (alert('Access denied'), '/login');

console.log('redirect route: ' + redirect);

// no else case
auth && console.log('Welcome to the dashboard');