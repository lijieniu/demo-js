var http = require('http');
var url = require('url');
http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log('request for ' + pathname + ' received.');
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('hello');
    response.end();
}).listen(8090);