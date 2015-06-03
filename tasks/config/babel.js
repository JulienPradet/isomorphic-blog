module.exports = function(grunt) {
  grunt.config.set('babel', {
    options: {
        sourceMap: true
    },
    build: {
      files: [
        {
          expand: true,
          cwd: 'build',
          src: ['**/*.js'],
          dest: 'build',
          ext: '.js'
        }
      ]
    }
  });

  grunt.loadNpmTasks('grunt-babel');
}
