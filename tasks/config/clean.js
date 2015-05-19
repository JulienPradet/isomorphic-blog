/**
 * Clean files and folders.
 */
module.exports = function(grunt) {

  grunt.config.set('clean', {
    dev: ['.tmp/public/**'],
    build: ['public']
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
};
