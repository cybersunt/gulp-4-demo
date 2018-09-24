module.exports = function () {
  $.gulp.task('watch', () => {
    $.gulp.watch($.config.dev + $.config.pug.watch, $.gulp.series('pug'));
    $.gulp.watch($.config.dev + $.config.pug.data + '**.json', $.gulp.series('data'));
    $.gulp.watch($.config.dev + $.config.scss.watch, $.gulp.series('scss:dev'));
  });
}
