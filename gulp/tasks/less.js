const autoprefixer = require('autoprefixer'),

  sourceFileLess = $.config.dev + '/less/paths/style.less',
  outputDirCss = $.config.ready + '/css';

module.exports = function () {
  $.gulp.task('style:dev', () => {
    return $.gulp.src(sourceFileLess)
    .pipe($.gp.sourcemaps.init())
    .pipe($.gp.less()).on('error',
      $.gp.notify.onError(function(error) {
        return {
          title: 'Error in style file',
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

  $.gulp.task('style:build', () => {
    return $.gulp.src(sourceFileLess)
      .pipe($.gp.less())
      .pipe($.gp.postcss([
        autoprefixer('last 2 version')
      ]))
      .pipe($.gp.csso())
      .pipe($.gp.rename({ suffix: '.min' }))
      .pipe($.gulp.dest(outputDirCss));
  });

}
