const gulp = require('gulp'),
      gp = require('gulp-load-plugins')(),
      browserSync = require('browser-sync').create(),
      fs = require('fs'),
      del = require('del'),
      bemify = require('pug-bemify');

const config = {
  ready: './public',
  dev: './source',
  pug: {
    watch: '/pug/**/*.pug',
    src:'/pug/pages/**/*.pug',
    data: '/pug/data/'
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


gulp.task('pug', () => {
  return gulp.src(config.dev + config.pug.src)
  .pipe(gp.pug({
    locals : {
      nav: JSON.parse(fs.readFileSync(config.dev + config.pug.data + 'navigation.json', 'utf8')),
      social: JSON.parse(fs.readFileSync(config.dev + config.pug.data + 'social.json', 'utf8')),
      advert: JSON.parse(fs.readFileSync(config.dev + config.pug.data + 'advertising.json', 'utf8'))
    },
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
  gulp.watch(config.dev + config.pug.data + '**.json', gulp.series('pug'));
});

gulp.task('default', gulp.series(
  'clean',
  'copy',
  'pug',
  gulp.parallel(
    'watch',
    'server'
  )
));
