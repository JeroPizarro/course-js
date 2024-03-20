(function () {
  //Callback hell - refactoring cbs with promises & promise chaining and Promise.all() method.
  function getData(endpoint) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open('GET', endpoint);

      xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status === 200) {
            resolve(JSON.parse(this.responseText));
          } else {
            reject('Something went wrong.');
          }
        }
      };

      setTimeout(() => {
        xhr.send();
      }, Math.floor(Math.random() * 3000 + 1000));
    });
  }

  //Promise chaining

  // getData('./json/movies.json')
  //   .then((movies) => {
  //     console.log(movies);
  //     return getData('./json/directors.json');
  //   })
  //   .then((directors) => {
  //     console.log(directors);
  //     return getData('./json/actors.json');
  //   })
  //   .then((actors) => {
  //     console.log(actors);
  //   });

  //Promise.all() method
  const moviesPromise = getData('./json/movies.json');
  const directorsPromise = getData('./json/directors.json');
  const actorsPromise = getData('./json/actors.json');

  Promise.all([moviesPromise, directorsPromise, actorsPromise])
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
})();
