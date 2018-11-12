// point.js

export const point = {
  create: function (x, y) {
    let snake_point = {};
    snake_point.x = x;
    snake_point.y = y;
    // snake_point.makeSound = function () { alert("喵喵喵"); };
    return snake_point;
  }
};