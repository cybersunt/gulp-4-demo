const merge = require('gulp-merge-json'),
      bemify = require('pug-bemify'),
      removeEmptyLines = require('gulp-remove-empty-lines'),

      sourceFilesJson = $.config.dev + $.config.watch.json,
      outputFileJson =  $.config.dev + '/pug/pages/',
      sourceFilesPug = $.config.dev + '/pug/pages/**/*.pug';

module.exports = function () {
  $.gulp.task('json', () => {
    return $.gulp.src(sourceFilesJson + '*json')
      .pipe(merge({
        fileName: 'layout.json'
      }))
      .pipe($.gulp.dest(outputFileJson))
      .pipe($.browserSync.reload({stream: true}));
  });

  $.gulp.task('pug', () => {
    return $.gulp.src(sourceFilesPug, {since: $.gulp.lastRun('pug')})
      .pipe($.gp.pug({
        locals : JSON.parse($.fs.readFileSync(outputFileJson + 'layout.json', 'utf8')),
        pretty: true,
        plugins : [bemify()]
      }))
      .on('error', $.gp.notify.onError(function(error) {
        return {
          title: 'Error in the pug file',
          message:  error.message
        }
      }))
      .pipe($.gp.plumber())
      .pipe($.gp.jsbeautifier({
        indent_size: 2,
        unformatted: [
          'abbr', 'area', 'b', 'bdi', 'bdo', 'br', 'cite', 'code', 'data', 'datalist', 'del', 'dfn', 'em',
          'embed', 'i', 'ins', 'kbd', 'keygen', 'map', 'mark', 'math', 'meter', 'noscript', 'object',
          'output', 'progress', 'q', 'ruby', 's', 'samp', 'small', 'strong', 'sub', 'sup', 'template',
          'time', 'u', 'var', 'wbr', 'text', 'acronym', 'address', 'big', 'dt', 'ins', 'strike', 'tt'
        ]
      }))
      .pipe(removeEmptyLines({
        removeComments: true
      }))
      .pipe($.gp.remember('pug'))
      .pipe($.gulp.dest($.config.ready))
      .pipe($.browserSync.reload({stream : true}));
  });
};
