var fs = require('fs')
  , Waterline = require('waterline')
  , config = require('app-config')
  , Article = require(config.models.dir+'/Article');

var orm = Waterline();

// Get the config for the orm
var config = require('app-config');

// Load the Models into the ORM
function loadModels(storesPath, callback) {
  var models = {};

  /* Get each model from the stores */
  function getModels(storesPath, fs, callback) {
    // Reading all files in the stores
    fs.readdir(storesPath, function(err, files) {
      var models = {}
        , name
        , module;

      // Error while reading dir
      if(err) {
        callback(err);

      // Extract the models from the stores
      } else {
        files.forEach(function(file) {
          if (file.match(/^[A-Z][A-Za-z0-9]*\.js$/) !== null) {
            name = file.replace('.js', '');
            module = require(storesPath + '/' + file);
            if(module.hasOwnProperty('model')) {
              models[name] = module;
            }
          }
        });

        callback(null, models);
      }
    });
  }

  /* Loading in the orm and registering the repositories */
  getModels(config.models.path, fs, function(err, result) {
    if(err) {
      callback(err);
    } else {
      for(var name in result) {
        var model = result[name];
        orm.loadCollection(model.model);
        models[name] = model;
      }

      callback(null, models);
    }
  });
}

// Start Orm
function initialize(app, callback) {
  loadModels(config.models.path, function(err, result) {
    if(err) {
      callback(err);
    } else {
      orm.initialize(config, function(err, models) {
        if(err)
          callback(err);
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

          callback(null);
        }
      });
    }
  });
}

module.exports = initialize;