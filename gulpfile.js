global.$ = {
  gulp: require('gulp'),
  gp: require('gulp-load-plugins')(),
  browserSync: require('browser-sync').create(),
  fs: require('fs'),
  del: require('del'),

  path: {
    task: require('./gulp/paths/tasks.js')
  },

  config: require('./gulp/paths/sources.js')
};

$.path.task.forEach(function(taskPath) {
  require(taskPath)();
});

$.gulp.task('build', $.gulp.series(
  'clean',
  'copy',
  $.gulp.parallel(
    'fonts',
    'json',
    'pug',
    'style:build',
    'images',
    'sprite',
    'scripts:build'
  )
));

$.gulp.task('default', $.gulp.series(
  'clean',
  'copy',
  $.gulp.parallel(
    'fonts',
    'json',
    'pug',
    'style:dev',
    'images',
    'sprite',
    'scripts:dev'
  ),
  $.gulp.parallel(
    'watch',
    'server'
  )
));

