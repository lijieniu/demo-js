const buffer = Buffer.from('hello', 'ascii');

console.log(buffer.toString('hex'));

const buffer2 = Buffer.alloc(128);
buffer2.write(' buffer');

console.log(buffer2.toLocaleString());
// console.log(buffer2.toJSON());

const buffer3 = Buffer.concat([buffer, buffer2]);
console.log(buffer3.toString());

console.log(buffer3.length);


const b1 = Buffer.alloc(10, 3);

const b2 = Buffer.from('hello world', 'utf8');
console.log(b2);