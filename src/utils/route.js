var utils = require('./utils')
  , auth = require('./auth')
  , colors = require('colors');

function addRouterToApp(app, router) {
  var path = router.path;

  // Making 'get' the default method
  var method;
  if(router.hasOwnProperty('method')) {
    method = router.method;
  } else {
    method = 'get';
  }

  // Handling security
  if(router.hasOwnProperty('security')) {
    var options = {};
    // Getting the options for the security
    if(router.hasOwnProperty('options')) {
      options = router.options;
    }
    // Adding the middleware to the stack
    app[method](path, auth.middleware.authenticate);
    app[method](path, auth.middleware.checkAuthorization(router.security, options));
  }

  if(router.hasOwnProperty('handler')) {
    // Adding the route to the express app
    app[method](path, router.handler);
  }

  return app;
}

/**
 * Adds the routes to an express application
 * @param  {express app} An express app
 * @param  {path} A path to a folder containing the routes
 */
module.exports = {
  initialize: function initialize(app, routes) {
    return utils.getModules(routes)
      .then(function(modules) {
        console.info("Loading routes...".underline);

        var moduleName, name, router;
        for(moduleName in modules) {
          console.log(moduleName);
          routes = modules[moduleName];
          for(var name in routes) {
            router = routes[name];
            app = addRouterToApp(app, router);
          }
        }

        console.info("Done\n".green);
        return app;
      });
    }
};
