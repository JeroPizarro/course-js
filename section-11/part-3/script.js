(function () {
  //Async & Await

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ name: 'John Doe', age: 30 });
    }, 2000);
  });

  async function getPromise() {
    const response = await promise;
    console.log(response);
  }

  async function getUsers() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();
    console.log(data);
  }

  const getPosts = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();
    console.log(data);
  };

  getPromise();
  getUsers();
  getPosts();

  //Error handling

  //Try & catch
  const getUsers2 = async () => {
    try {
      const res = await fetch('https://httpstat.us/404');
      if (!res.ok) {
        throw new Error('Something went wrong');
      }
    } catch (err) {
      console.error(err);
    }
  };

  getUsers2();

  //Using just .catch()
  const getPosts2 = async () => {
    const res = await fetch('https://httpstat.us/500');
    if (!res.ok) {
      throw new Error('Something went wrong');
    }
  };

  getPosts2().catch((err) => console.log(err));

  //Using multiple promises
  async function getAllData() {
    const moviesRes = await fetch('../../json/movies.json');
    const moviesData = await moviesRes.json();

    const actorsRes = await fetch('../../json/actors.json');
    const actorsData = await actorsRes.json();

    const directorsRes = await fetch('../../json/directors.json');
    const directorsData = await directorsRes.json();

    const totalData = {
      movies: moviesData,
      actors: actorsData,
      directors: directorsData,
    };
    console.log(totalData);
  }
  
  //Using multiple promises wit promise.all()
  async function getDataPromiseAll() {
    const [moviesRes, actorsRes, directorsRes] = await Promise.all([
      fetch('../../json/movies.json'),
      fetch('../../json/actors.json'),
      fetch('../../json/directors.json'),
    ]);

    const movies = await moviesRes.json();
    const actors = await actorsRes.json();
    const directors = await directorsRes.json();
    console.log('Promise all', movies, actors, directors);
  }
  getAllData();
  getDataPromiseAll();
})();
