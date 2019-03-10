const sourceImages = $.config.dev + $.config.img + '.{png,jpg,svg}',
      outputDirImg = $.config.ready + '/img',
      outputDirSprite = $.config.dev + '/img';

module.exports = function () {
  $.gulp.task('webp', () => {
    return $.gulp.src(sourceImages, {since: $.gulp.lastRun('webp')})
    .pipe($.gp.remember('webp'))
    .pipe($.gp.plumber())
    .pipe($.gp.webp({quality: 80}))
    .pipe($.gulp.dest(outputDirImg))
    .pipe($.browserSync.reload({stream : true}));
  });

  $.gulp.task('images', function() {
    return $.gulp.src(sourceImages, {since: $.gulp.lastRun('images')})
    .pipe($.gp.remember('images'))
    .pipe($.gp.plumber())
    .pipe($.gp.imagemin([
      $.gp.imagemin.jpegtran({progressive: true}),
      $.gp.imagemin.optipng({optimizationLevel: 3}),
      $.gp.imagemin.svgo()
    ]))
    .pipe($.gulp.dest(outputDirImg))
    .pipe($.browserSync.reload({stream : true}));
  })
}
