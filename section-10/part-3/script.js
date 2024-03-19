(function () {
  //https://api.chucknorris.io/jokes/random
  /*
  {
"icon_url" : "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
"id" : "yec826sksvow5e5kxgdl3w",
"url" : "",
"value" : "It is better to give than to receive. This is especially true of a Chuck Norris roundhouse kick."
}*/

  const container = document.querySelector('.container');
  const button = document.getElementById('button');

  button.addEventListener('click', getNewJoke);

  init(getNewJoke);

  function init(cb) {
    container.innerHTML = `<p>Loading...</p>`;
    if (cb) {
      cb();
    }
  }

  function getNewJoke() {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://api.chucknorris.io/jokes/random');

    xhr.onreadystatechange = function () {
      const condition = this.readyState === 4 && this.status === 200;
      if (condition) {
        const newJoke = JSON.parse(this.responseText).value;
        printJoke(newJoke)
      }
    };
    xhr.send();
  }

  function printJoke(text) {
    container.innerHTML = `<p>${text}</p>`
  }
})();
