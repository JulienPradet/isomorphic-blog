/**
 * Clean files and folders.
 */
module.exports = function(grunt) {

  grunt.config.set('clean', {
    build: ['build']
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
};
