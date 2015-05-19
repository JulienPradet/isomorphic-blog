/**
 * Moves files to the public one
 * If it's dev mode, it's in a .tmp/public folder,
 *         prod mode, it's in public folder
 */
module.exports = function(grunt) {
  grunt.config.set('copy', {
    build: {
      files: [{
        expand: true,
        cwd: 'src/',
        src: ['server.js', 'app/**', 'utils/**'],
        dest: 'build'
      },
      {
        expand: true,
        src: ['src/assets/**/*'],
        dest: 'build/public'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
};