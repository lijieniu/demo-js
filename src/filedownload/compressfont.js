const Fontmin = require("fontmin");

let fontmin = new Fontmin()
  .use(
    Fontmin.glyph({
      text: "开启花絮彩蛋（心动指数>万）开启Making合辑开启多地大屏抽奖记录",
      hinting: false,
    })
  )
  .src("./static/font/HYWenHei-85J.ttf")
  .dest("./static/font/compress");
fontmin.run((err, files) => {
  console.log(files[0]);
});
