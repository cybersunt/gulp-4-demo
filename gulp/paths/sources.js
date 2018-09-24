module.exports = {
  ready: './public',
    css: '/css',
    dev: './source',
    pug: {
    watch: '/pug/**/*.pug',
      src: '/pug/pages/**/*.pug',
      data: '/pug/data/',
      json: '/pug/pages/'
  },
  scss: {
    watch: '/scss/**/*.scss',
      output: '/scss/paths/style.scss'
  },
  img: '/img/**/*'
};
