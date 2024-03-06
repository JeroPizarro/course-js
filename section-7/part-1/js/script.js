//Single element selectors
const form = document.getElementById('item-form');
const title = document.querySelector('h1'); //uses tags, attr, classes, css selectors

console.log(title);

//set & get attr
title.setAttribute('id', 'app-title');

const titleId = title.getAttribute('id');
console.log(titleId);

//get/edit content and html
title.textContent = 'Heello!!';
title.innerText = 'Shopping List!';
title.innerHTML = '<strong><h2>Shopping List!!</h2></strong>';

//edit style
title.style.color = 'green';

//Multiple element selectors
//.querySelectorAll();

const listItems = document.querySelector('#item-list').querySelectorAll('li');

//it return nodeList, you can use high order methods in nodeLists.
listItems.forEach((item) => item.setAttribute('class', 'item'));

//
let items = document.getElementsByClassName('item'); //return htmlCollection
items = Array.from(items);

const liItems = document.getElementsByTagName('li'); //return htmlCollection

console.log(liItems);

//Traversing Dom
const parentElement = listItems[0].parentElement;

const firstElementChild = parentElement.firstElementChild;
//you can use lastElementChild too
//if you use firstChild you will get the first child node
//use parentElement.childNodes to determine what is what

const nextSibling = firstElementChild.nextElementSibling;
//nextSibling get next sibling node
//you can use previousElementSibling or previousSibling  (if you have it, else null)

const parentFromSibling = nextSibling.parentElement;
//you can get parent node too with parentNode

const children = parentElement.children; //htmlCollection with all the children

const childElementCount = parentElement.childElementCount;

console.log(childElementCount);

//Create and append elements
const div = document.createElement('div');
div.classList = 'new-div';
div.id = 'test-id';
div.setAttribute('title', 'My new div');

const heading = document.createElement('h3');
heading.appendChild(document.createTextNode('Hello World!'));
//use innerText just to get or edit text.

div.appendChild(heading);

console.log(div);

createItem('Cookies', parentElement);

function createItem(heading, parent) {
  const item = document.createElement('li');
  item.classList = 'item';
  
  const taskName = document.createTextNode(heading);
  
  const i = document.createElement('i');
  i.classList = 'fa-solid fa-xmark';
  
  const button = document.createElement('button');
  button.classList = 'remove-item btn-link text-red';
  button.appendChild(i);
  
  item.appendChild(taskName);
  item.appendChild(button);
  parent.appendChild(item);
}
