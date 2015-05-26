module.exports = function(grunt) {
  grunt.config.set('babel', {
    options: {
        sourceMap: true
    },
    build: {
      files: [
        {
          expand: true,
          cwd: 'build/public/js',
          src: ['**/*.js'],
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

  grunt.loadNpmTasks('grunt-babel');
}
