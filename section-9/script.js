(function () {
  const itemInput = document.getElementById('item-input');
  const submitButton = document.querySelector('.btn');
  const itemList = document.getElementById('item-list');
  const clearButton = document.getElementById('clear');
  const filterInput = document.getElementById('filter');
  let isEditMode = false;
  let value;

  init();

  function init() {
    submitButton.addEventListener('click', onClick);
    itemList.addEventListener('click', onClick);
    itemList.addEventListener('dblclick', onClick);
    clearButton.addEventListener('click', onClick);
    filterInput.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', showStorageItems);

    checkUI();
  }

  function showStorageItems() {
    const items = getItemsFromStorage();
    items.forEach((item) => insertNewItem(createNewItem(item)));
    checkUI();
  }

  function onClick(e) {
    if (e.currentTarget.classList.contains('btn')) {
      e.preventDefault();

      if (isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode');
        deleteItem(itemToEdit);
        addItem();
        isEditMode = false;
      } else {
        if (checkDuplicates(itemInput.value)) {
          alert('That item already exists!');
        } else {
          addItem();
        }
      }
    } else if (e.target.parentElement.classList.contains('remove-item')) {
      const parentLi = e.target.parentElement.parentElement;
      deleteItem(parentLi);
    } else if (e.target.id === 'clear') {
      clearAllItems();
    } else if (e.type === 'dblclick') {
      editMode(e.target);
    }
  }

  function addItem() {
    if (itemInput.value) {
      insertNewItem(createNewItem(itemInput.value));
      addItemToStorage(itemInput.value);
      checkUI();
      itemInput.value = '';
    } else {
      alert('Entered values are incorrect');
    }
  }

  function deleteItem(item) {
    removeItemFromDOM(item);
    removeItemFromStorage(item.textContent.trim());
  }

  function editMode(item) {
    isEditMode = true;

    itemList
      .querySelectorAll('li')
      .forEach((item) => item.classList.remove('edit-mode'));

    item.classList.add('edit-mode');
    submitButton.innerHTML = '<i class="fa-solid fa-pen"></i>    Update Item';
    submitButton.style.backgroundColor = '#228B22';
    itemInput.value = item.textContent.trim();
  }

  function filterItems(e) {
    const filterInput = e.target.value.toLowerCase();
    const items = Array.from(itemList.children);

    items.forEach((item) => {
      const itemName = item.innerText.toLowerCase();

      if (itemName.indexOf(filterInput) != -1) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  }

  function clearAllItems() {
    const items = itemList.querySelectorAll('li');
    items.forEach((item) => {
      removeItemFromStorage(item.textContent.trim());
      item.remove();
    });
    checkUI();
  }

  function createNewItem(task) {
    const liItem = document.createElement('li');
    const closeButton = `
      <button class="remove-item btn-link text-red">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;

    liItem.innerHTML = closeButton;
    liItem.querySelector('button').insertAdjacentText('beforebegin', task);

    return liItem;
  }

  function insertNewItem(newItem) {
    itemList.appendChild(newItem);
  }

  function removeItemFromDOM(item) {
    item.remove();
    checkUI();
  }

  function checkUI() {
    const items = itemList.children;
    if (items.length === 0) {
      filterInput.style.display = 'none';
      clearButton.style.display = 'none';
    } else {
      filterInput.style.display = 'block';
      clearButton.style.display = 'block';
    }

    submitButton.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    submitButton.style.backgroundColor = '#333';
  }

  function addItemToStorage(newItem) {
    let storageItems = getItemsFromStorage();

    storageItems.push(newItem);

    localStorage.setItem('items', JSON.stringify(storageItems));
  }

  function getItemsFromStorage() {
    let storageItems;

    if (localStorage.getItem('items') === null) {
      storageItems = [];
    } else {
      storageItems = JSON.parse(localStorage.getItem('items'));
    }
    return storageItems;
  }

  function removeItemFromStorage(item) {
    let storageItems = getItemsFromStorage();

    storageItems = storageItems.filter((sItem) => sItem !== item);

    localStorage.setItem('items', JSON.stringify(storageItems));
  }

  function checkDuplicates(item) {
    const itemsFromStorage = getItemsFromStorage();
    return itemsFromStorage.includes(item);
  }
})();
