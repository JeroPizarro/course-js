(function () {
  //Prototypes - special obj where additional props and fcns can be attached and shared across all instances of his constr fcn.

  //Prototype chain - the prototype of your new class will inherit from other prototypes like Object prototype.

  function Rectangle(name = 'default', width = 0, height = 0) {
    this.name = name;
    this.width = width;
    this.height = height;
  }

  Rectangle.prototype.area = function () {
    return this.width * this.height;
  };
  //you cant use arrow fcn here because of its lexical div. () => (this.width * this.height) this here is undefined because this is pointing to window obj.

  Rectangle.prototype.perimeter = function () {
    return 2 * (this.width + this.height);
  };

  Rectangle.prototype.isSqr = function () {
    return this.width === this.height;
  };

  const rect1 = new Rectangle('Rect 1', 5, 10);
  console.log(
    `area: ${rect1.area()}, perimeter ${rect1.perimeter()}, isSqr: ${rect1.isSqr()}`
  );
  console.log(rect1);

  //Alternative way - Constructor fcn.
  const rectanglePrototypes = {
    area: function () {
      return this.width * this.height;
    },

    perimeter: function () {
      return 2 * (this.width + this.height);
    },

    isSqr: function () {
      return this.height === this.width;
    },
  };

  function createRectangle(width, height) {
    return Object.create(rectanglePrototypes, {
      height: {
        value: height,
      },
      width: {
        value: width,
      },
    });
  }

  const rect2 = createRectangle(15, 30);
  console.log(rect2);

  //Prototypical inheritance & call()
  function Shape(name) {
    this.name = name;
  }

  Shape.prototype.logName = function () {
    console.log(`Shape name: ${this.name}`);
  };

  function Rectangle2(name = 'default', width = 0, height = 0) {
    Shape.call(this, name); // use call() to inhertit props and methods from Shape and send it the right scope conxtext with this.

    this.width = width;
    this.height = height;
  }
  //Use obj create to create a new prototype obj using Shape's original prot and assing it to Rect2 prot. Also is setting a new this scope.
  Rectangle2.prototype = Object.create(Shape.prototype);

  function Circle(name = 'default', radius = 0) {
    Shape.call(this, name);

    this.radius = radius;
  }
  Circle.prototype = Object.create(Shape.prototype);

  //Set prototype constructors properly for each figure, otherwise both will have Shape constr attached. 
  Rectangle2.prototype.constructor = Rectangle2;
  Circle.prototype.constructor = Circle;


  const rect3 = new Rectangle2('Rect 3', 10, 5);
  const circle = new Circle('Circle', 10);

  console.log(rect3, circle);

  rect3.logName();
  circle.logName();
})();
