module.exports = function (grunt) {
  grunt.registerTask('dev', [
    'compileAssets',
    'browserify:build'
  ]);
};
