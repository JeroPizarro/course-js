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

  document.querySelector('button').addEventListener('click', ()=> {
    console.log(`Timer: ${timerId}`);
    clearTimeout(timerId);
    console.log('Execution stopped');
  })

})();
