var fs = require('fs');
var module1 = require('./module1');

module1.getName();

// var data = fs.readFileSync('./tempfiles/input.txt');
// console.log(data.toString());
// console.log('end');

var data = fs.readFile('./tempfiles/input.txt', function (err, data) {
    if(err) return console.log(err);
    console.log(data.toString());
});
console.log('end');