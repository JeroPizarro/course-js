(function () {
  //Classes, subclasses and class inheritance

  //Class
  class Shape {
    constructor(name) {
      this.name = name;
    }

    logName() {
      console.log(`Shape name: ${this.name}`);
    }

    //Static method
    static getClassName() {
      return 'Shape';
    }
  }

  //Subclass
  class Rectangle extends Shape {
    constructor(name, width, height) {
      super(name);

      this.width = width;
      this.height = height;
    }

    area() {
      return this.height * this.width;
    }

    perimeter() {
      return 2 * (this.width + this.height);
    }

    logArea() {
      console.log(`${this.name} area: ${this.area()}`);
    }
  }

  //Class inheritance defined with keyword extends
  class Circle extends Shape {
    constructor(name, radius) {
      super(name);
      this.radius = radius;
    }

    //Polymorphism ex
    logName() {
      console.log(`Circle name: ${this.name}`);
    }
  }

  const rect = new Rectangle('Rectangle 1', 10, 5);
  const circle = new Circle('Circle 1', 10);

  console.log(rect);
  rect.logArea();
  rect.logName();

  console.log(circle);
  circle.logName();

  //Acess to static method
  console.log(Shape.getClassName());

  //bind method - use it to manuallly define the scope of 'this'. Similar to call() in prototype inheritance.
  class App {
    constructor() {
      this.serverName = 'localHost';

      //whitout .bind(), 'this' is referencing just the button in the UI when the event is fired off.
      // document
      //   .querySelector('button')
      //   .addEventListener('click', this.getServerName);

      //with bind() am sharing the current scope of 'this'
      document
        .querySelector('button')
        .addEventListener('click', this.getServerName.bind(this));
    }

    getServerName() {
      console.log(this.serverName);
    }
  }
  const app = new App();

  //Getters and setters - use it in classes,constr fcns and object literals to access props indirectly.

  class Person {
    constructor(firstName, lastName = '') {
      //Convention _. Use it to name a private property.
      this._firstName = firstName;
      this._lastName = lastName;
    }

    //Getter
    get firstName() {
      return this.capitalizeFirst(this._firstName);
    }

    //Setter
    set lastName(value) {
      this._lastName = this.capitalizeFirst(value);
    }

    capitalizeFirst(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }

  const person1 = new Person('john');
  console.log(person1.firstName); //you're accessing to the getter and the text is manipulated.
  person1.lastName = 'doe'; //doe is capitalized in the obj beacuse the setter manipulates the input.
  console.log(person1);

  //Getter & Setter with constructor fcn
  function Person2(firstName, lastName) {
    this._firstName = firstName;
    this._lastName = lastName;

    Object.defineProperty(this, 'firstName', {
      get: function () {
        return this.capitalizeFirst(this._firstName);
      },
      set: function (firstName) {
        this._firstName = firstName;
      },
    });

    Object.defineProperty(this, 'lastName', {
      get: function () {
        return this.capitalizeFirst(this._lastName);
      },
      set: function (lastName) {
        this._lastName = lastName;
      },
    });
  }

  Person2.prototype.capitalizeFirst = function (value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const person2 = new Person2('johnny', 'doe');
  console.log(person2);
  console.log(person2.firstName, person2.lastName);

  //Obj literal
  const PersonObj = {
    _firstName: 'jane',
    _lastName: 'doe',

    //getter
    get firstName() {
      return Person.prototype.capitalizeFirst(this._firstName);
    },

    //setter
    set lastName(value) {
      this._lastName = value;
    },
  };

  const person3 = Object.create(PersonObj);
  console.log(person3.firstName);
  person3.lastName = 'daer';
  console.log(person3);
})();
