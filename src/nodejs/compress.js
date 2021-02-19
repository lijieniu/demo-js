var fs = require('fs');
var zlib = require('zlib');

fs.createReadStream('./tempfiles/compress.txt.gz')
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream('./tempfiles/compress.txt'));