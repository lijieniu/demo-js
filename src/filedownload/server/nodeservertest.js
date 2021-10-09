let http = require('http');
let url = require('url');
let fs = require('fs');
let root = '../views';
let staticPath = '..';

http.createServer((request, response) => {
    let url = request.url;
    console.log(url);
    let file;
    if(url.startsWith('/static')) {
        file = staticPath + url;
    } else {
        file = root + url;
    }
    fs.readFile(file, (err, data) => {
        if(err) {
            console.log(err);
            response.writeHead(404, {
                'Content-Type': 'text/html'
            });
        } else {
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            response.end(data);
        }
        response.end();
    });
}).listen(8080);
console.log('node server running at http://localhost:8080/');