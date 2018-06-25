const gulp = require('gulp'),
      gp = require('gulp-load-plugins')(),
      browserSync = require('browser-sync').create(),
      fs = require('fs'),
      del = require('del'),
      bemify = require('pug-bemify'),
      merge = require('gulp-merge-json');

const config = {
  ready: './public',
  dev: './source',
  pug: {
    watch: '/pug/**/*.pug',
    src:'/pug/pages/**/*.pug',
    data: '/pug/data/',
    json: '/pug/pages/'
  },
  img: '/**/*'
};

gulp.task('copy', () => {
  return gulp.src(config.dev + config.img)
  .pipe(gulp.dest(config.ready));
});

gulp.task('clean', () => {
  return del(config.ready);
});

gulp.task('data', () => {
  return gulp.src(config.dev + config.pug.data + '*json')
  .pipe(merge({
    fileName: 'layout.json'
  }))
  .pipe(gulp.dest(config.dev + config.pug.json))
  .pipe(browserSync.reload({stream : true}));
});

gulp.task('pug', () => {
  return gulp.src(config.dev + config.pug.src)
  .pipe(gp.pug({
    locals : JSON.parse(fs.readFileSync(config.dev + config.pug.json + 'layout.json', 'utf8')),
    pretty: true,
    plugins : [bemify()]
  }))
  .on('error', gp.notify.onError(function(error) {
    return {
      title: 'Error in the pug file',
      message:  error.message
    }
  }))
  .pipe(gp.plumber())
  .pipe(gp.jsbeautifier({
    indent_size: 2,
    unformatted: [
    'abbr', 'area', 'b', 'bdi', 'bdo', 'br', 'cite', 'code', 'data', 'datalist', 'del', 'dfn', 'em',
    'embed', 'i', 'ins', 'kbd', 'keygen', 'map', 'mark', 'math', 'meter', 'noscript', 'object',
    'output', 'progress', 'q', 'ruby', 's', 'samp', 'small', 'strong', 'sub', 'sup', 'template',
    'time', 'u', 'var', 'wbr', 'text', 'acronym', 'address', 'big', 'dt', 'ins', 'strike', 'tt'
    ]
  }))
  .pipe(gulp.dest(config.ready))
  .pipe(browserSync.reload({stream : true}));
});

gulp.task('server', () => {
  browserSync.init({
    open: false,
    server: {
      baseDir: config.ready
    }
  });
  browserSync.watch([config.ready], browserSync.reload);
});

gulp.task('watch', () => {
  gulp.watch(config.dev + config.pug.watch, gulp.series('pug'));
  gulp.watch(config.dev + config.pug.data + '**.json', gulp.series('data'));
});

gulp.task('default', gulp.series(
  'clean',
  'copy',
  'data',
  'pug',
  gulp.parallel(
    'watch',
    'server'
  )
));
