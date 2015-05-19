module.exports = function (grunt) {
  grunt.registerTask('prod', [
    'compileAssets',
    'cssmin:dist',
    'uglify:dist',
    'clean:build',
    'copy:build',
  ]);
};
