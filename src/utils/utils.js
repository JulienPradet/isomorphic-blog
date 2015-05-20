var util = require('util')
  , fs = require('fs')
  , q = require('q');

/* Get each model from the stores */
function getModules(modulesPath) {
  var deferred = q.defer();
  // Reading all files in the path
  fs.readdir(modulesPath, function(err, files) {
    var models = {}
      , name
      , module;

    // Error while reading dir
    if(err) {
      deferred.cancel(err);

    // Extract the models from the path
    } else {
      files.forEach(function(file) {
        if (file.match(/^[A-Za-z0-9-]+\.js$/) !== null) {
          name = file.replace('.js', '');
          module = require(modulesPath + '/' + file);
          models[name] = module;
        }
      });

      deferred.resolve(models);
    }
  });

  return deferred.promise;
}

/* http://howtonode.org/promises */
function promisify(nodeAsyncFn, context) {
  return function() {
    var deferred = q.defer()
      , args = Array.prototype.slice.call(arguments);

    args.push(function(err, val) {
      if (err !== null) {
        return deferred.reject(err);
      }

      return deferred.resolve(val);
    });

    nodeAsyncFn.apply(context || {}, args);

    return deferred.promise;
  };
};

module.exports = {
  getModules: getModules,
  promisify: promisify
};