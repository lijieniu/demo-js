let http = require('http');
let url = require('url');
let fs = require('fs');

http.createServer((request, response) => {
    let pathname = url.parse(request.url).pathname;
    console.log('request for' + pathname + ' received.');
    let fileName = 'testdata.xlsx';
    if(pathname === '/download') {
        fs.readFile('./testdata.xlsx', (err, data) => {
            if(err) {
                console.log(err);
                response.writeHead(404, {
                    'Content-Type': 'text/html'
                });
            } else {
                response.writeHead(200, {
                    'Content-Type': 'application/octet-stream',
                    'Content-Disposition': 'attachment; filename=' + fileName
                });
                response.end(data);
            }
            response.end();
        });
    } else {
        fs.readFile(pathname.substr(1), (err, data) => {
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
    }
}).listen(8080);
console.log('node server running at http://localhost:8080/');