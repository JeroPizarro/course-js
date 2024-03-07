(function () {
  const title = document.querySelector('#title');
  const container = document.querySelector('.box-container');

  window.addEventListener('keydown', (e) => {
    const codes = getCodes(e);
    const boxes = Array.from(container.children);

    title.classList.add('hidden');
    container.classList.remove('hidden');

    boxes.forEach((box, idx) => {
      box.querySelector('span').textContent = Object.values(codes)[idx];
    });
  });

  function getCodes(evt) {
    return {
      key: evt.key === ' ' ? 'Space' : evt.key,
      keyCode: evt.keyCode,
      code: evt.code,
    };
  }
})();
