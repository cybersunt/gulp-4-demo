const rsp = require('remove-svg-properties').stream,

      sourceSpriteFiles = $.config.dev + $.config.sprite,
      sourceImages = $.config.dev + $.config.img + '.{png,jpg,svg}',
      outputDirImg = $.config.ready + '/img',
      outputDirSprite = $.config.dev + '/img';

module.exports = function () {
  $.gulp.task('webp', () => {
    return $.gulp.src(sourceImages)
    .pipe($.gp.plumber())
      .pipe($.gp.webp({quality: 80}))
      .pipe($.gulp.dest(outputDirImg))
      .pipe($.browserSync.reload({stream : true}));
  });

  $.gulp.task('sprite', function () {
    return $.gulp.src(sourceSpriteFiles)
      .pipe($.gp.plumber())
      .pipe(rsp.remove({
        properties: [rsp.PROPS_FILL]
       }))
      .pipe($.gp.svgstore({
        inlineSvg: true
      }))
    .pipe($.gp.rename('sprite.svg'))
    .pipe($.gulp.dest(outputDirSprite))
    .pipe($.browserSync.reload({stream : true}));
  });

  $.gulp.task('images', function() {
    return $.gulp.src(sourceImages)
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
