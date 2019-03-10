module.exports = function () {
  $.gulp.task('copy', () => {
    return $.gulp.src($.config.dev + $.config.img, {since: $.gulp.lastRun('copy')})
    .pipe($.gp.remember('copy'))
    .pipe($.gulp.dest($.config.ready + '/img'));
  });
}
