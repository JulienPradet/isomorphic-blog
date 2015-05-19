
module.exports = function(grunt) {

  grunt.config.set('sass', {
    build: {
      lineNumbers: true,
      sourcemap: 'none',
      files: [{
        expand: true,
        cwd: 'build/public/styles/',
        src: ['*.scss'],
        dest: 'build/public/styles/',
        ext: '.css'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
};
