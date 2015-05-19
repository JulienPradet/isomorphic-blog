
module.exports = function(grunt) {

  grunt.config.set('sass', {
    dev: {
      lineNumbers: true,
      sourcemap: 'none',
      files: [{
        expand: true,
        cwd: 'assets/styles/',
        src: ['*.scss'],
        dest: '.tmp/public/styles/',
        ext: '.css'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
};
