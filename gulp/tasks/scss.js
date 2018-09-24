module.exports = function () {
  $.gulp.task('sass', () => {
    return $.gulp.src($.config.dev + $.config.pug.src)
});
}
