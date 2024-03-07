//you can use evt listener directly in html, pass a fcn in html (both not recommended) or use an evt listener

//JS Event listener
document.querySelector('#clear').addEventListener('click', clearItems);
//you can remove evt listeners using removeEventListener()

function clearItems() {
  const list = document.querySelector('#item-list');
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}

//Mouse evt types
/*click, dblclick, contextmenu (r-click), mousedown, mouseup, wheel*/

//'Hover' evt types
/*mouseover, mouseout*/

//Drag evt types
/*dragstart, drag, dragend*/

//Evt obj
/*target, currentTarget, type, timestamp (when evt was triggered), clientX (rel to window), clientY, offsetX (rel to element), offsetY, pageX (rel to page), pageY, screenX (rel to screen), screenY*/

// document.body.addEventListener('click', (evt) => {
//   console.log(evt.target); //real target
//   console.log(evt.currentTarget); //target with listener attached
// });

//Prevent default method
document.querySelector('#google-btn').addEventListener('click', (e) => {
  e.preventDefault();
  console.log('Default behavior prevented');
});

//Key evts
(function () {
  const input = document.querySelector('#item-input');

  // input.addEventListener('keypress', (e) => {
  //   console.log('keypress');
  // });

  // input.addEventListener('keyup', (e) => {
  //   console.log('keyup');
  // });

  input.addEventListener('keydown', (e) => {
    //key - use it for newer browser
    // if (e.key === 'Enter') {
    //   e.preventDefault();
    //   alert('Enter pressed');
    // }

    //keyCode
    // if (e.keyCode === 13) {
    //   e.preventDefault();
    //   alert('Enter pressed');
    // }

    //code
    if (e.code === 'Enter') {
      e.preventDefault();
      alert('Enter pressed');
    }

    //repeat - check for key hold
    if (e.repeat) {
      console.log('key holded');
    }

    //key combination - shift, ctrl, alt
    console.log('Shift:' + e.shiftKey);
    console.log('Control:' + e.ctrlKey);
    console.log('Alt:' + e.altKey);
  });
})();
