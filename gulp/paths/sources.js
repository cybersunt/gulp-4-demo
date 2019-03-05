module.exports = {
  ready: './public',
  dev: './source',
  watch: {
    json: '/pug/data/',
    layout: '/pug/pages/layout.json',
    pug: '/pug/**/*.pug',
    // styles: '/scss/**/*.scss',
    styles: '/less/**/*.less',
    img: '/img/**/*'
  },
  img: '/img/**/*',
  sprite: '/img/icon-*.svg',
};
