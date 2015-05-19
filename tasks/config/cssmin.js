/**
 * Compress CSS files.
 *
 * ---------------------------------------------------------------
 *
 * Minifies css files and places them into .tmp/public/min directory.
 *
 * For usage docs see:
 *    https://github.com/gruntjs/grunt-contrib-cssmin
 */
module.exports = function(grunt) {

  grunt.config.set('cssmin', {
    build: {
      expand: true,
      cwd: 'build/public/styles',
      src: ['*.css', '!*.min.css'],
      dest: 'build/public/styles'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
};
