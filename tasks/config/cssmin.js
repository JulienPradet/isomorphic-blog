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
    dist: {
      expand: true,
      cwd: '.tmp/public/styles',
      src: ['*.css', '!*.min.css'],
      dest: '.tmp/public/styles'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
};
