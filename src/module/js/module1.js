import './module2.js';
import './module2.js';
import './module2.js';
const a = 1;
export default a;

const obj = {name: 'niu'};
export {
    obj
};

window.aa = 3;

// let sayHi = {};


export function sayHi() {
  console.log(this);
}
// export {sayHi};

// const obj2 = {name2: 'xxx'};
// export const obj = {
//     obj: obj2
// }

// const {name} = obj;