const gulp = require('gulp');
const otf2ttf = require('otf2ttf');
gulp.task('otf2ttf', [], function() {
  return gulp.src('./static/font/SourceHanSerifCN-Heavy.otf')
    .pipe(otf2ttf())
    .pipe(gulp.dest(function(file) {
      return './static/font/' + file.data.fontName
    }))
});