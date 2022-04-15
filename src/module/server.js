let http = require('http');
let url = require('url');
let fs = require('fs');

http.createServer((request, response) => {
    let pathname = url.parse(request.url).pathname;
    console.log('request for' + pathname + ' received.');
    let fileType = pathname.substr(pathname.lastIndexOf('.') + 1);
    if(fileType === 'js') fileType = 'javascript';
    fs.readFile(pathname.substr(1), (err, data) => {
        if(err) {
            console.log(err);
            response.writeHead(404, {
                'Content-Type': 'text/html'
            });
        } else {
            response.writeHead(200, {
                'Content-Type': 'text/' + fileType
            });
            response.end(data);
        }
        response.end();
    });
}).listen(8080);
console.log('node server running at http://localhost:8080/');