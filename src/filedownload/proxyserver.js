let http = require("http");
let httpProxy = require("http-proxy");
let fs = require("fs");

let proxy = httpProxy.createProxyServer();

proxy.on("proxyRes", (proxyReq, req, res, options) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
});

http
  .createServer((request, response) => {
    // proxy.web(request, response, {
    //     target: 'http://123.57.68.108:8090',
    //     changeOrigin: true,
    // });
    // proxy.on('error', err => {
    //     console.log(err);
    // });
    // console.log(request);
    response.writeHead(200, {
      "Content-Type": "text/html;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "x-requested-with",
    });
    response.end("上传成功");
    let body = "";
    request.on("data", (buffer) => {
      body += buffer;
    });
    request.on("end", () => {
      fs.writeFile(
        __dirname + "/upload/" + new Date().getTime() + ".png",
        body,
        (error) => {
          console.log(error);
        }
      );
    });
  })
  .listen(8081);
console.log("node server running at http://localhost:8081/");
