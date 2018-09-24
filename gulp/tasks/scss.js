const autoprefixer = require('autoprefixer'),

      sourceFile = $.config.dev + $.config.scss.output,
      outputDir = $.config.ready + $.config.css;

module.exports = function () {
  $.gulp.task('scss:dev', () => {
    return $.gulp.src(sourceFile)
      .pipe($.gp.sourcemaps.init())
      .pipe($.gp.sass())
      .on('error', $.gp.notify.onError(function(error) {
        return {
          title: 'Error in the scss file',
          message:  error.message
        }
      }))
      .pipe($.gp.plumber())
      .pipe($.gp.sourcemaps.write())
      .pipe($.gulp.dest(outputDir))
      .pipe($.browserSync.reload({stream : true}));
  });

  $.gulp.task('scss:build', () => {
    return $.gulp.src(sourceFile)
      .pipe($.gp.sass())
      .pipe($.gp.postcss([
        autoprefixer('last 2 version')
      ]))
      .pipe($.gp.csso())
      .pipe($.gp.rename({ suffix: '.min' }))
      .pipe($.gulp.dest(outputDir));
});
}
