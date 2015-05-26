var utils = require('./utils')
  , auth = require('./auth')
  , colors = require('colors')
  , config = require('app-config')
  , csrf = require('csurf');

var csrfProtection = csrf({cookie: false});

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

    // CSRF protection
    if(router.hasOwnProperty('csrf')) {
      app[method](path, csrfProtection);
    }
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
  initialize: function initialize(app, parmeters) {

    var path = config.path.apiRoutes;
    if(typeof parameters !== "undefined" && typeof parameters.path !== "undefined") path = parameters.path;

    return utils.getModules(path)
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

        console.info("Done".green);
        return app;
      });
    }
};
