//Insertions
//insertAdjacentElement
function insertElement() {
  const filter = document.querySelector('.filter');
  const heading = document.createElement('h4');

  heading.appendChild(document.createTextNode('insertAdjacentElement'));

  filter.insertAdjacentElement('beforeend', heading);
}

insertElement();

//insertAdjacentText
function insertText() {
  const li = document.querySelectorAll('li')[0];

  li.insertAdjacentText('afterend', 'insertAdjacentText');
}

insertText();

//insertAdjacentHTML

function insertHtml() {
  const clearBtn = document.querySelector('#clear');

  clearBtn.insertAdjacentHTML('beforebegin', '<h5>insertAdjacentHTML</h5>');
}

insertHtml();

//insertBefore
function insertBeforeItem() {
  const ul = document.querySelector('ul');
  const li = document.createElement('li');
  li.textContent = 'insertBefore';

  ul.insertBefore(li, ul.lastElementChild.previousElementSibling);
}

insertBeforeItem();

//Replacements
//replaceWith
function replaceFirstElement() {
  const items = document.querySelectorAll('li');
  const newElement = document.createElement('li');

  newElement.textContent = 'New First Item';

  items[0].replaceWith(newElement);
}

replaceFirstElement();

//outerHTML
function replaceLastElement() {
  const items = document.querySelectorAll('li');
  const newElement = document.createElement('li');

  items[items.length - 1].outerHTML= '<li>New Last Item</li>';
}

replaceLastElement();

//replaceChild
function replaceChildElement() {
  const header = document.querySelector('header');
  const newElement = document.createElement('h2');
  newElement.textContent = 'Task list!'

  header.replaceChild(newElement, header.lastElementChild);
}

replaceChildElement();

//Removals
//remove - remove item
function removeItem() {
  const items = document.querySelectorAll('li');
  items[items.length -2].remove();
}

removeItem();

//removeChild -remove item from parent
function removeChildItem() {
  const list = document.querySelector('#item-list');
  list.removeChild(list.lastElementChild.previousElementSibling)
}

removeChildItem();
