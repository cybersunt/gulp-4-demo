module.exports = function () {
  $.gulp.task('watch', () => {
    $.gulp.watch($.config.dev + $.config.watch.pug, $.gulp.series('pug'));
    $.gulp.watch($.config.dev + $.config.watch.json + '**.json', $.gulp.series('json'));
    $.gulp.watch($.config.dev + $.config.watch.scss, $.gulp.series('scss:dev'));
    $.gulp.watch($.config.dev + $.config.watch.img, $.gulp.series('copy'));
  });
}
