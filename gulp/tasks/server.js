module.exports = function () {
  $.gulp.task('server', () => {
    $.browserSync.init({
      open: false,
      server: {
        baseDir: $.config.ready
      }
    });
    $.browserSync.watch([$.config.ready], $.browserSync.reload);
  });
}
