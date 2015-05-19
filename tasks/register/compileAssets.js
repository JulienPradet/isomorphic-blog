module.exports = function (grunt) {
  grunt.registerTask('compileAssets', [
    'clean:build',
    'copy:build',
    'sass:build',
    'react:build',
  ]);
};
