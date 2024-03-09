(function () {
  const itemInput = document.getElementById('item-input');
  const priorityInput = document.getElementById('priority-input');
  const checkboxInput = document.getElementById('checkbox');
  const button = document.querySelector('button.btn');
  const form = document.getElementById('item-form');
  const list = document.getElementById('item-list');

  //Get values from inputs
  itemInput.addEventListener('input', onInput);
  priorityInput.addEventListener('input', onInput); //you can use change type too
  checkboxInput.addEventListener('input', onInput);

  //focus and blur elements
  // itemInput.addEventListener('focus', onFocus);
  // itemInput.addEventListener('blur', onBlur);

  //Form Submittion
  // form.addEventListener('submit', onSubmit);
  // form.addEventListener('submit', onSubmit2);

  //Prevent Evt bubbling
  // button.addEventListener('click', onClick);

  //Evt delegation - if youu have multiple elements wich need a evt, you can put the evt listener in the parent elem to delegate the evt.
  list.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
      e.target.remove();
    }
  });

  //--IMPORTANT: to load js from <head> you can use deffer attrb to wait for the page load

  //Window events
  //load - wait for the entire assest to be loaded to run the js.
  //DOMContentLoad - wait for just the DOM to be loaded to run the js
  //resize
  //scroll
  //focus
  //blur

  function onInput(e) {
    if (e.target.type === 'checkbox') {
      console.log(e.target.checked);
    } else {
      console.log(e.target.value);
    }
  }
  function onFocus(e) {
    console.log('Input focused');
  }
  function onBlur(e) {
    console.log('Input blured');
  }

  function onSubmit(e) {
    e.preventDefault();
    itemInput = itemInput.value;
    priorityInput = priorityInput.value;
    if (itemInput !== '' && priorityInput !== 0) {
      console.log(itemInput, priorityInput);
    } else {
      alert('Fields required');
    }
  }

  function onSubmit2(e) {
    e.preventDefault();
    const formData = new FormData(form);
    console.log(
      `itemInput: ${formData.get('item')}, priorityInput: ${formData.get(
        'priority'
      )}`
    );
    formData.entries().forEach((element) => {
      console.log(element);
    });
  }

  function onClick(e) {
    e.stopPropagation();
    console.log('Button clicked');
  }
})();
