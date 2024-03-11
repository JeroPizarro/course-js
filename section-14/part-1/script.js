(function () {
  //Constructor fcn
  function Rectangle(name = 'default', width = 0, height = 0) {
    this.name = name;
    this.width = width;
    this.height = height;
    this.area = () => this.width * this.height;
  }

  const rect1 = new Rectangle('Rect 1', 5, 10);
  //1- New empty obj is created
  //2- Constructor fcn is called with the arguments
  //3- The 'this' keyword is set to the obj
  //4- The new obj is returned from the Constructor fcn

  console.log(rect1);
  console.log(rect1.area());

  //prop access and mutation
  console.log(rect1['height']);
  
  //you'll add this prop and fcn in this single instance
  rect1.newProp = 'red';
  rect1.newFcn = () => console.log(`Rectangle name: ${rect1.name}, color: ${rect1.newProp}`);
  rect1.newFcn();

  delete rect1.newProp;
  console.log(rect1);


  console.log('--------------------------------------');

  //Built-in Constructor functions
  //Box & Unbox
  const strLit = 'Hello';
  const strObj = new String('Hello Jero');

  console.log(strLit, typeof strLit);
  console.log(strObj, typeof strObj);

  //Boxing
  console.log(strLit.toLocaleUpperCase());
  //normally you cant use methods in primitive types but JS adds a wrapper ('box') around the string and turn it into an obj temporarily.
  console.log(strLit.constructor);
  console.log(strLit instanceof String);

  //Unboxing - turns an obj into a literal, it inherit valueOf form Object prototype
  console.log(strObj.valueOf(), typeof strObj.valueOf());
  console.log(strObj.constructor);
  console.log(strObj instanceof String);

  //you can use the same logic of box/unbox with other data types as number, boolean, etc.

  //you can use built-in constructors for referenced types too like arrays, functions or objs literals.
})();
