module.exports = function () {
  $.gulp.task('copy', () => {
    return $.gulp.src($.config.dev + $.config.img)
      .pipe($.gulp.dest($.config.ready + '/img'));
  });
}
