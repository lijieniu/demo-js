var fs = require('fs');

// 从流中读取数据
var data = '';

var readStream = fs.createReadStream('./tempfiles/input.txt');
readStream.setEncoding('utf8');

readStream.on('data', function(chunk) {
    console.log(chunk);
    data += chunk;
});

readStream.on('end', function() {
    console.log(data);
});

readStream.on('error', function(err) {
    console.log(err);
});

// 写入流
var inputData = 'stream input';
var writeStream = fs.createWriteStream('./tempfiles/output.txt');

writeStream.write(inputData, 'utf8');
writeStream.end();
writeStream.on('finish', function() {
    console.log('写入完成');
});