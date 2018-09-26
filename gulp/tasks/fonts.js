module.exports = function () {
  $.gulp.task('fonts', () => {
    return $.gulp.src($.config.dev + $.config.img)
      .pipe($.gulp.dest($.config.ready + '/fonts'));
  });
}
