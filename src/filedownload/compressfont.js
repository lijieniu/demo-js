const Fontmin = require("fontmin");

let fontmin = new Fontmin()
  .use(
    Fontmin.glyph({
      text: "阅读今日篇章0123456789邀请好友注册守护精灵推荐好物立即阅读立即邀请立即下单",
      hinting: false,
    })
  )
  .src("./static/font/GenRyuMinTW-Heavy.ttf")
  .use(Fontmin.otf2ttf())
  .dest("./static/font/compress");
fontmin.run((err, files) => {
  console.log(files[0]);
});
