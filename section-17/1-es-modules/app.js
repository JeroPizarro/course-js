import { Shape, Rectangle } from './modules/shape.js';

const circleOne = new Shape('Circle One', Shape.generateId());

circleOne.displayName();

const rectOne = new Rectangle('Rectangle One', Rectangle.generateId(), 10, 20);

console.log(rectOne);
rectOne.displayArea();
