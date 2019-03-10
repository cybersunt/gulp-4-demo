const rsp = require('remove-svg-properties').stream,

      sourceSpriteFiles = $.config.dev + $.config.sprite,
      outputDirSprite = $.config.dev + '/img';

module.exports = function () {
  $.gulp.task('sprite', function () {
    return $.gulp.src(sourceSpriteFiles, {since: $.gulp.lastRun('sprite')})
    .pipe($.gp.plumber())
    .pipe(rsp.remove({
      properties: [rsp.PROPS_FILL]
    }))
    .pipe($.gp.svgstore({
      inlineSvg: true
    }))
    .pipe($.gp.remember('sprite'))
    .pipe($.gp.rename('sprite.svg'))
    .pipe($.gulp.dest(outputDirSprite))
    .pipe($.browserSync.reload({stream : true}));
  });
}
