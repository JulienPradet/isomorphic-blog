module.exports = function (grunt) {
  grunt.registerTask('prod', [
    'dev',
    'cssmin:build',
    'uglify:build',
  ]);
};
