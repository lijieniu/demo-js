const Fontmin = require("fontmin");

let fontmin = new Fontmin()
  .use(
    Fontmin.glyph({
      text: "ABCD套装剩余0123456789份",
      hinting: false,
    })
  )
  .src("./static/font/1.ttf")
  .use(Fontmin.otf2ttf())
  .dest("./static/font/compress");
fontmin.run((err, files) => {
  console.log(files[0]);
});
