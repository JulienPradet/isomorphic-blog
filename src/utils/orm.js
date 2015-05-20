var q = require('q')
  , colors = require('colors')
  , config = require('app-config')
  , utils = require(config.path.utils+'/utils')
  , Waterline = require('waterline')
  , Article = require(config.path.models+'/Article');

var orm = Waterline();

// Get the config for the orm
var config = require('app-config');

// Load the Models into the ORM
function loadModels(storesPath, callback) {
  /* Loading in the orm and registering the repositories */
  return utils.getModules(storesPath)
    .then(function(result) {
      var models = {};
      for(var name in result) {
        var model = result[name];
        if(model.hasOwnProperty('model') && model.hasOwnProperty('repository') && model.hasOwnProperty('identity')) {
          console.log(""+model.identity);
          orm.loadCollection(model.model);
          models[name] = model;
        }
      }
      return models;
    })
}

/* Launch the orm initialisation by transforming it in a promise */
function initOrm(app, config) {
  console.info("Loading ORM...".underline);
  return function(result) {
    var deferred = q.defer();
    orm.initialize(config, function(err, models) {
      if(err)
        deferred.reject(err);
      else {
        /* Making models easily usable */
        app.models = models.collections;
        
        /* Initializing repositories and forms */
        app.repositories = {};
        app.forms = {};
        for(var name in result) {
          var model = result[name];
          app.repositories[model.identity] = model.repository(app.models[model.identity]);
          app.forms[model.identity] = model.form;
        }
        
        /* Remembering connections */
        app.connections = models.connections;

        deferred.resolve(app);
      }
    });
    return deferred.promise;
  }
}

// Start Orm
function initialize(app) {
  /* Load models */
  return loadModels(config.path.models)
    /* Launch the orm and adding the whole things to the app */
    .then(initOrm(app, config))
    .then(function(app) {
      console.info("Done\n".green);
      return app;
    });
}

module.exports = initialize;