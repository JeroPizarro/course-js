(function () {
  //Async JS

  //setTimeout & clearTimeout
  // setTimeout(()=> {
  //   console.log('Hello from callback');
  // },3000);
  //even if we put a zero time delay the callback will be send to the task queue, and the task queue will wait for the conclusion of the global execution.

  // console.log('Hello from global scope');

  function changeText() {
    document.querySelector('h1').textContent = 'Hello from call back';
  }
  const timerId = setTimeout(changeText, 5000);

  document.querySelector('button').addEventListener('click', () => {
    console.log(`Timer: ${timerId}`);
    clearTimeout(timerId);
    console.log('Execution stopped');
  });

  //setInterval & clearInterval - it execute some code snippet repeatly after some time
  const h2 = document.querySelector('h2');
  const startButton = document.getElementById('start-button');
  const stopButton = document.getElementById('stop-button');

  let intId = null;
  startButton.addEventListener('click', startInterval);
  stopButton.addEventListener('click', stopInterval);

  function changeColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    h2.style.color = '#' + randomColor;
  }

  function startInterval() {
    console.log(intId);
    intId = setInterval(changeColor, 500);
  }

  function stopInterval() {
    clearInterval(intId);
    console.log(intId);
  }

  //Callbacks - using it to perfom async executions
  const posts = [
    { title: 'Post 1', content: 'This is post one.' },
    { title: 'Post 2', content: 'This is post two.' },
  ];
  const blog = document.getElementById('blog');
  const addPostButton = document.getElementById('post');

  //addPostButton.addEventListener('click', getPosts);

  function createPost(id, numberName, callback) {
    const newPost = {
      title: `Post ${id}`,
      content: `This is post ${numberName}.`,
    };
    setTimeout(() => {
      posts.push(newPost);
      callback();
    }, 2000);
  }

  function getPosts() {
    setTimeout(() => {
      posts.forEach((post) => {
        const div = document.createElement('div');
        div.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.content}</p>
        `;
        blog.appendChild(div);
      });
    }, 1000);
  }

  createPost(3, 'three', getPosts); //sending the fcn as callback, we can wait for the resolution of createPost and when its finisshed we call getPosts to get the 3 articles, otherwise you will get just 2 because creation takes longer. 
})();
