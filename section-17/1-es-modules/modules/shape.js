class Shape {
  #name = '';
  #id = null;
  constructor(name, id) {
    this.#name = name;
    this.#id = id;
  }

  displayName() {
    console.log(`Shape name: ${this.#name}`);
  }

  static generateId() {
    return Math.random().toString(16).slice(2);
  }
}

class Rectangle extends Shape {
  #l1 = 0;
  #l2 = 0;

  constructor(name, id, l1, l2) {
    super(name, id);
    this.#l1 = l1;
    this.#l2 = l2;
  }

  displayArea() {
    this.displayName();
    console.log(`Area: ${this.#l1 * this.#l2}`);
  }
}

//Single export
//export default Shape;

//Multiple named export
export { Shape, Rectangle };
