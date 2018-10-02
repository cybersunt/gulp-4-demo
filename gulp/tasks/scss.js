const autoprefixer = require('autoprefixer'),

      sourceFileScss = $.config.dev + '/scss/paths/style.scss',
      outputDirCss = $.config.ready + '/css';

module.exports = function () {
  $.gulp.task('scss:dev', () => {
    return $.gulp.src(sourceFileScss)
      .pipe($.gp.sourcemaps.init())
      .pipe($.gp.sass())
      .on('error', $.gp.notify.onError(function(error) {
        return {
          title: 'Error in the scss file',
          message:  error.message
        }
      }))
      .pipe($.gp.postcss([
        autoprefixer('last 2 version')
      ]))
      .pipe($.gp.plumber())
      .pipe($.gp.sourcemaps.write())
      .pipe($.gulp.dest(outputDirCss))
      .pipe($.browserSync.reload({stream : true}));
  });

  $.gulp.task('scss:build', () => {
    return $.gulp.src(sourceFileScss)
      .pipe($.gp.sass())
      .pipe($.gp.postcss([
        autoprefixer('last 2 version')
      ]))
      .pipe($.gp.csso())
      .pipe($.gp.rename({ suffix: '.min' }))
      .pipe($.gulp.dest(outputDirCss));
});
}
