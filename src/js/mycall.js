// 手写call
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

console.log(new Food('cheese', 5).name);

Function.prototype.mycall = function(context) {
  if(typeof this !== 'function') {
    throw new TypeError('not function');
  }
  context = context || window;
  context.fn = this;
  let arg = [...arguments].slice(1);
  let result = context.fn(...arg);
  delete context.fn;
  return result;
}

function newFood(name, price) {
  Product.mycall(this, name, price);
}
console.log(new newFood('piza', 20).name);