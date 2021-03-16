let http = require('http');
let httpProxy = require('http-proxy');

let proxy = httpProxy.createProxyServer();

proxy.on('proxyRes', (proxyReq, req, res, options) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
});

http.createServer((request, response) => {
    proxy.web(request, response, {
        target: 'http://123.57.68.108:8090',
        changeOrigin: true,
    });
    proxy.on('error', err => {
        console.log(err);
    });
}).listen(8081);
console.log('node server running at http://localhost:8081/');