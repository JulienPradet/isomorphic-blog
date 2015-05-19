/**
 * Gruntfile to get tasks from the folder tasks/
 */

module.exports = function(grunt) {
  includeAll = require('include-all');

  function load(path) {
    return includeAll({
      dirname: require('path').resolve(__dirname, path),
      filter: /(.+)\.js$/
    }) || {};
  }

  var configs = load('./tasks/config')
    , tasks = load('./tasks/register');

  // (ensure that a default task exists)
  if (!tasks.default) {
    tasks.default = function (grunt) { grunt.registerTask('default', []); };
  }

  function invoke(tasks) {
    for(var task in tasks) {
      for(taskName in tasks[task]) {
        console.log(taskName);
        tasks[task][taskName](grunt);
      }
    }
  }

  invoke([configs, tasks]);
}