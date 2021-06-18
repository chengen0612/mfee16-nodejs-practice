const car = {
  brand: "Ford",
  color: "blue"
};

// obj
exports.car = car;

// string
exports.name = "nagi";

// function
exports.getColor = function () {
  return car.color;
};

// function
exports.setColor = function (color) {
  if (color == "yellow" || color == "red") {
    car.color = color;
    console.log('setColor is running!');
    console.log('new color: ', color);
  } else {
    console.log('illegal request!')
  };
};