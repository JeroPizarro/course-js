(function () {
  //Fetch API with std promise sintax. GET is the default HTTP verb.
  fetch('../json/movies.json')
    .then((response) => {
      //You'll get first the response obj with info about the response
      console.log(response);
      return response.json(); //return data
      //use response.text() to return data from txt file
    })
    .then((data) => {
      console.log(data);
    });

  //Fetch from API
  fetch('http://api.github.com/users')
    .then((response) => response.json())
    .then((data) => {
      console.log('GitHub Users', data);
    });

  const generateButton = document.querySelector('button');
  const userContainer = document.querySelector('.user');
  const userImage = userContainer.querySelector('#user-image');
  const userInfo = userContainer.querySelector('#user-info');

  const init = () => {
    getRandomUser();
  };

  const getRandomUser = () => {
    fetch('https://randomuser.me/api/')
      .then((response) => response.json())
      .then((data) => {
        fillUserData(data);
        changeBackground(data.results[0].gender);
      });
  };

  const createUserData = (newRandomUser) => {
    const userInfo = {
      name: `${newRandomUser.name.first} ${newRandomUser.name.last}`,
      age: newRandomUser.registered.age,
      location: `${newRandomUser.location.street.name} ${newRandomUser.location.street.number}, ${newRandomUser.location.state}, ${newRandomUser.location.country}.`,
      phone: newRandomUser.phone,
      email: newRandomUser.email,
    };

    return userInfo;
  };

  const fillUserData = (data) => {
    const newRandomUser = data.results[0];
    const userData = createUserData(newRandomUser);

    userImage.src = newRandomUser.picture.large;

    userInfo.innerHTML = '';
    Object.keys(userData).forEach((key) => {
      const li = document.createElement('li');
      const capitalizeKey = `${key[0].toLocaleUpperCase() + key.slice(1)}`;

      li.innerText = `${capitalizeKey}: ${userData[key]}`;

      userInfo.appendChild(li);
    });
  };

  const changeBackground = (gender) => {
    if (gender === 'male') {
      document.body.classList.add('background-blue');
    } else {
      document.body.classList.remove('background-blue');
    }
  };

  generateButton.addEventListener('click', getRandomUser);
  addEventListener('DOMContentLoaded', init);

  // Using POST verb with Fetch. Using JSONPlaceholder API.
  function createPost(post) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: post.title,
        body: post.body,
      }),
      headers: {
        'Content-Type': 'application/json',
        token: 'abc123',
      },
    })
      .then((res) => res.json())
      .then((data) => console.log('New Post data', data));
  }

  createPost({ title: 'My new post', body: 'This is the body.' });
})();
