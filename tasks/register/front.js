module.exports = function (grunt) {
  grunt.registerTask('front', [
    'compileAssets',
    'browserify:build'
  ]);
};
