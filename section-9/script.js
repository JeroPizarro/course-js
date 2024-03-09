(function () {
  const itemInput = document.getElementById('item-input');
  const submitButton = document.querySelector('.btn');
  const itemList = document.getElementById('item-list');
  const clearButton = document.getElementById('clear');
  const filterInput = document.getElementById('filter');
  let value;

  submitButton.addEventListener('click', onSubmit);
  itemList.addEventListener('click', onClick);
  clearButton.addEventListener('click', clearAllItems);
  filterInput.addEventListener('input', filterItems);

  checkUI();

  function onSubmit(e) {
    e.preventDefault();

    if (itemInput.value) {
      insertNewItem(createNewItem(itemInput.value));
      checkUI();
      itemInput.value = '';
    } else {
      alert('Entered values are incorrect');
    }
  }

  function onClick(e) {
    if (e.target.className === 'fa-solid fa-xmark') {
      removeItem(e.target);
    }
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
    items.forEach((item) => item.remove());
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

  function removeItem(target) {
    const currentItem = target.parentElement.parentElement;
    currentItem.remove();
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
  }
})();
