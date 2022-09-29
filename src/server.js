import Koa from "koa";
const app = new Koa();
import fs from "fs";
// 处理跨域
app.use(async (ctx, next) => {
  console.log(ctx);
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Methods", "GET");
  ctx.set("Access-Control-Allow-Headers", "x-requested-with");
  if (ctx.method === "OPTIONS") {
    ctx.body = 200;
  } else {
    await next();
  }
});
app.use(async (ctx, next) => {
  if (ctx.request.url.endsWith(".html")) {
    ctx.type = "html";
    ctx.body = fs.readFileSync("." + ctx.request.url);
  } else if (ctx.request.url.startsWith("/static/icon")) {
    ctx.body = fs.readFileSync("." + ctx.request.url);
  }
});
app.listen(8080);
