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
  console.log(`area: ${rect1.area()}, perimeter ${rect1.perimeter()}, isSqr: ${rect1.isSqr()}`);
  console.log(rect1);
})();
