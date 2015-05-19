module.exports = function(grunt) {
  grunt.config.set('react', {
    dev: {
      files: [
        {
          expand: true,
          cwd: 'assets/js/react',
          src: ['**/*.jsx'],
          dest: '.tmp/public/js',
          ext: '.js'
        }
      ]
    }
  });

  grunt.loadNpmTasks('grunt-react');
}