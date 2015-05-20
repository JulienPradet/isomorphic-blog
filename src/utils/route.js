var utils = require('./utils')
  , colors = require('colors');

/**
 * Adds the routes to an express application
 * @param  {express app} An express app
 * @param  {path} A path to a folder containing the routes
 */
module.exports = function(app, routes) {
  return utils.getModules(routes)
    .then(function(modules) {
      console.info("Loading routes...".underline);
      var name, router;
      for(name in modules) {
        router = modules[name];
        console.info(""+name);
        router(app); 
      }
      console.info("Done\n".green);
      return app;
    });
};