const uglify = require('gulp-uglify-es').default,
      sourceJSFiles = $.config.dev + $.config.js,
      outputDirJS = $.config.ready + '/js';

module.exports = function () {
  $.gulp.task('scripts:dev', function () {
    return $.gulp.src(sourceJSFiles, {since: $.gulp.lastRun('scripts:dev')})
    .pipe($.gp.remember('scripts:dev'))
    .pipe($.gp.sourcemaps.init())
    .pipe($.gp.jslint())
    .pipe($.gp.plumber())
    .pipe($.gp.babel({
      presets: ['env']
    }))
    .pipe($.gp.concat('app.js'))
    .pipe($.gp.sourcemaps.write('.'))
    .pipe($.gulp.dest(outputDirJS))
    .pipe($.browserSync.reload({stream : true}));
  });

  $.gulp.task('scripts:build', function () {
    return $.gulp.src(sourceJSFiles)
    .pipe($.gp.jslint())
    .pipe($.gp.babel({
      presets: ['env']
    }))
    .pipe($.gp.concat('app.js'))
    .pipe($.gulp.dest(outputDirJS))
    .pipe(uglify())
    .pipe($.gp.rename({ suffix: '.min' }))
    .pipe($.gulp.dest(outputDirJS))
  });
}
