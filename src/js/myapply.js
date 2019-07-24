// 手写apply
function Animal(name, weight) {
  this.name = name;
  this.weight = weight;
}

function Cat(name,  weight) {
  Animal.myapply(this, [name, weight]);
}

Function.prototype.myapply = function(context) {
  if(typeof this !== 'function') {
    throw new TypeError('not function');
  }
  context = context || window;
  context.fn = this;
  let result;
  if(arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
}

console.log(new Cat('miaomiao', 30).name);
