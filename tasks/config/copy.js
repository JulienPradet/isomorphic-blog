/**
 * Moves files to the public one
 * If it's dev mode, it's in a .tmp/public folder,
 *         prod mode, it's in public folder
 */
module.exports = function(grunt) {
  grunt.config.set('copy', {
    dev: {
      files: [{
        expand: true,
        cwd: './assets',
        src: ['**/*.!(jsx|scss)'],
        dest: '.tmp/public'
      }]
    },
    build: {
      files: [{
        expand: true,
        cwd: '.tmp/public',
        src: ['**/*'],
        dest: 'public'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
};