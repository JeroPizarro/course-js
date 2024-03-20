(function () {
  //Callback hell - multiple callback executions nested. Solved by promises.

  function getData(endpoint, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', endpoint);
    xhr.onreadystatechange = function () {
      const condition = this.readyState === 4 && this.status === 200;
      if (condition) {
        cb(JSON.parse(this.responseText));
      }
    };
    setTimeout(() => {
      xhr.send();
    }, Math.floor(Math.random() * 3000 + 1000)); //randomize the call
  }
  //We want to retreive the data in the following order: movies, actors, directors.

  getData('./json/movies.json', (data) => {
    console.log(data);
    getData('./json/actors.json', (data) => {
      console.log(data);
      getData('./json/directors.json', (data) => {
        console.log(data);
        //cb are chained to retreive data in the right order independently of the exec time. Many cbs are super messy and not so effective as promises.
      });
    });
  });

  //Promises - obj that represents the eventual complition or failure of an async operation. Its async and non-blocking, so your code can still finnish and the promise will be resoluted at the end.

  //Basic sintax
  //it can be stored in variables
  const getUser = new Promise((resolved, rejected) => {
    //Do some async task
    setTimeout(() => {
      let error = false;

      if (!error) {
        resolved({ name: 'John', lastname: 'Doe', age: 30 }); //use resolved as the positive case, arguments will be used by .then() method
      } else {
        rejected('Promise -- Something went wrong');
      }
    }, 1500);
  });

  //.then() & .catch can be attached with the promise body
  getUser
    .then((user) => {
      console.log(
        `Promise -- Username: ${user.name} ${user.lastname}, age: ${user.age}`
      );
    })
    .catch((error) => {
      console.log(error);
    })
    //runs no matter what is the promise resolution
    .finally(() => {
      console.log('Promise -- Promise consumed.');
    });

  const posts = [
    { title: 'Post 1', body: 'This is post number one. Enjoy reading it.' },
    { title: 'Post 2', body: 'This is post number two. Enjoy reading it.' },
  ];

  const randomTime = Math.floor(Math.random() * 3000 + 1000);

  function createPost(id, number) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        let error = false;

        if (!error) {
          const newPost = {
            title: `Post ${id}`,
            body: `This is post number ${number}. Enjoy reading it.`,
          };
          posts.push(newPost);
          res();
        } else {
          rej('Something went wrong!!!');
        }
      }, randomTime + 1000);
    });
  }

  function getPosts() {
    setTimeout(() => {
      posts.forEach((post) => {
        console.log(post);
      });
    }, randomTime);
  }

  //use rej(argument) as param for this cb
  function logError(errorMsg) {
    console.error(errorMsg);
  }

  createPost(3, 'three')
    .then(getPosts)
    .catch(logError);
})();
