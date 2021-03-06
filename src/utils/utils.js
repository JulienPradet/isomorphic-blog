import util from 'util'
import fs from 'fs'
import q from 'q'
import config from'app-config'
import colors from 'colors'

/* Get each model from the stores */
function getModules(modulesPath, modules) {
  const deferred = q.defer();
  // Reading all files in the path
  fs.readdir(modulesPath, function(err, files) {
    let name
      , module;

    if(typeof modules === "undefined") {
      modules = {};
    }

    // Error while reading dir
    if(err) {
      deferred.reject(err);

    // Extract the models from the path
    } else {
      files.forEach(function(file) {
        if (file.match(/^[A-Za-z0-9-]+\.js$/) !== null) {
          name = file.replace('.js', '');
          module = require(modulesPath + '/' + file);
          if(typeof module.name !== "undefined") {
            name = module.name;
          }
          modules[name] = module;
        }
      });

      deferred.resolve(modules);
    }
  });

  return deferred.promise;
}

/* http://howtonode.org/promises */
function promisify(nodeAsyncFn, context) {
  return function() {
    const deferred = q.defer();
    let args = Array.prototype.slice.call(arguments);

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

/* Makes the initialiasation of the modules in utils declarative */
function initialize(app, modules) {
  const deferred = q.defer();

  function initializeAux(app, modules, promise) {
    if(modules.length === 0) {
      return promise.then(function(app) {
        return app;
      });
    } else {
      const module = modules.splice(0, 1)[0];
      return initializeAux(app, modules, promise.then(function() {
        console.log(("\nModule: "+module.name).grey);
        return require(config.path.utils+'/'+module.name).initialize(app, module.parameters);
      }));
    }
  }

  deferred.resolve();
  return initializeAux(app, modules, deferred.promise);
};

module.exports = {
  getModules: getModules,
  promisify: promisify,
  initialize: initialize
};
