var utils = require('./utils')
  , auth = require('./auth')
  , colors = require('colors');

function addRouterToApp(app, router) {
  var path = router.path;

  // Handling security
  if(router.hasOwnProperty('secruity')) {
    // Getting the options for the security
    if(router.hasOwnProperty('options')) {
      options = router.options;
    }
    // Adding the method option in order to limit the auth security to a certain method
    if(router.hasOwnProperty('method')) {
      options.method = router.method;
    }
    // Getting the middleware
    var authMiddleware = auth.middleware(router.security, options);
    // Adding the middleware to the stack
    app.use(path, authMiddleware);
  }

  if(router.hasOwnProperty('handler')) {
    // Making 'get' the default method
    var method;
    if(router.hasOwnProperty('method')) {
      method = router.method;
    } else {
      method = 'get';
    }
    // Adding the route to the express app
    app[method](path, router.handler);
  }
}

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
        console.info(name);
        router = modules[name];
        addRouterToApp(app, router); 
      }
      
      console.info("Done\n".green);
      return app;
    });
};