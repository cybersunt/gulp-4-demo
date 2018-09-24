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
  'data',
  'pug',
  'scss:build'
));

$.gulp.task('default', $.gulp.series(
  'clean',
  'copy',
  'data',
  'pug',
  'scss:dev',
  $.gulp.parallel(
    'watch',
    'server'
  )
));
