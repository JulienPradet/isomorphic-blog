/*
 * Minify javascript files
 */
module.exports = function(grunt) {

  grunt.config.set('uglify', {
    build: {
      files: [{
          expand: true,
          cwd: 'build/public/js',
          src: '**/*.js',
          dest: 'build/public/js'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
};