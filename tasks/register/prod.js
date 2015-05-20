module.exports = function (grunt) {
  grunt.registerTask('prod', [
    'front',
    'cssmin:build',
    'uglify:build',
  ]);
};
