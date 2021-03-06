module.exports = function(grunt) {
  grunt.config.set('react', {
    options: {
      es6module: true
    },
    build: {
      files: [
        {
          expand: true,
          cwd: 'build/public/js',
          src: ['**/*.jsx'],
          dest: 'build/public/js',
          ext: '.js'
        },
        {
          expand: true,
          cwd: 'build/app',
          src:['**/*.js'],
          dest: 'build/app',
          ext: '.js'
        }
      ]
    }
  });

  grunt.loadNpmTasks('grunt-react');
}
