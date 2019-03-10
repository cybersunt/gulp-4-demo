module.exports = function () {
  $.gulp.task('fonts', () => {
    return $.gulp.src($.config.dev + $.config.fonts, {since: $.gulp.lastRun('fonts')})
    .pipe($.gp.debug({title: 'fonts'}))
    .pipe($.gp.remember('fonts'))
    .pipe($.gulp.dest($.config.ready + '/fonts'));
  });
}
