/**
 * Moves files to the public one
 * If it's dev mode, it's in a .tmp/public folder,
 *         prod mode, it's in public folder
 */
module.exports = function(grunt) {
  grunt.config.set('browserify', {
    build: {
      files: {
        'build/public/js/app.js': [
          'build/app/front/actions/**/*.js',
          'build/app/front/components/**/*.js',
          'build/app/front/dispatchers/**/*.js',
          'build/app/front/stores/**/*.js',
          'build/app/front/client.js'
        ],
      },
      options: {
        debug: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
};
