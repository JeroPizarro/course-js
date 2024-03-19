(function () {
  //AJAX & XMLHttpRequest - object to handle http request/responses. Old way.

  //HTTP methods
  /*
  GET Request - Fetch/retrieve data from svr
  POST Request - Send data to svt
  PUT & PATCH Request - Update data on a svr
  DELETE Request - Delete data from a svr   
  */

  const xhr = new XMLHttpRequest();
  xhr.open('GET', './movies.json');

  xhr.onreadystatechange = function () {
    const condition = this.readyState === 4 && this.status === 200;
    if (condition) {
      const movies = JSON.parse(this.responseText);
      movies.forEach((movie) => {
        console.log(`Movie name: ${movie.title}, year: ${movie.year}.`);
      });
    }
  };

  /* readyState values: 
  - 0: request not initilized
  - 1: svr connection stablished
  - 2: request received
  - 3: processing request
  - 4: request finnished and response is ready   
  */

  xhr.send();
  //showPersonalRepo();

  function showPersonalInfo() {
    xhr.open('GET', 'https://api.github.com/users/JeroPizarro');

    xhr.onreadystatechange = function () {
      const condition = this.readyState === 4 && this.status === 200;
      if (condition) {
        const userInfo = JSON.parse(this.responseText);
        console.log(userInfo);
      }
    };
    xhr.send();
  }
})();
