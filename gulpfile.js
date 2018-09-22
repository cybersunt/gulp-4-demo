global.$ = {
  gulp: require('gulp'),
  gp: require('gulp-load-plugins')(),
  browserSync: require('browser-sync').create(),
  fs: require('fs'),
  del: require('del'),

  path: {
    task: require('./gulp/paths/tasks.js')
  },

  config: {
    ready: './public',
    dev: './source',
    pug: {
      watch: '/pug/**/*.pug',
      src:'/pug/pages/**/*.pug',
      data: '/pug/data/',
      json: '/pug/pages/'
    },
    img: '/img/**/*'
  }
};

$.path.task.forEach(function(taskPath) {
  require(taskPath)();
});

$.gulp.task('default', $.gulp.series(
  'clean',
  'copy',
  'data',
  'pug',
  $.gulp.parallel(
    'watch',
    'server'
  )
));
