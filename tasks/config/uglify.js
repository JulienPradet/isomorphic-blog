/*
 * Minify javascript files
 */
module.exports = function(grunt) {

  grunt.config.set('uglify', {
    dist: {
      files: [{
          expand: true,
          cwd: '.tmp/public/js',
          src: '**/*.js',
          dest: '.tmp/public/js'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
};