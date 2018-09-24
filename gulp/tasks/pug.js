const merge = require('gulp-merge-json'),
      bemify = require('pug-bemify'),
      removeEmptyLines = require('gulp-remove-empty-lines');

module.exports = function () {
  $.gulp.task('data', () => {
    return $.gulp.src($.config.dev + $.config.pug.data + '*json')
      .pipe(merge({
        fileName: 'layout.json'
      }))
      .pipe($.gulp.dest($.config.dev + $.config.pug.json))
      .pipe($.browserSync.reload({stream: true}));
  });

  $.gulp.task('pug', () => {
    return $.gulp.src($.config.dev + $.config.pug.src)
      .pipe($.gp.pug({
        locals : JSON.parse($.fs.readFileSync($.config.dev + $.config.pug.json + 'layout.json', 'utf8')),
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
      .pipe($.gulp.dest($.config.ready))
      .pipe($.browserSync.reload({stream : true}));
  });
};
