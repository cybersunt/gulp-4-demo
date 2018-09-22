const merge = require('gulp-merge-json');

module.exports = function () {
  $.gulp.task('data', () => {
    return $.gulp.src($.config.dev + $.config.pug.data + '*json')
      .pipe(merge({
        fileName: 'layout.json'
      }))
      .pipe($.gulp.dest($.config.dev + $.config.pug.json))
      .pipe($.browserSync.reload({stream: true}));
  })
}
