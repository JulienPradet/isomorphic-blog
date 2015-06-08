import utils from './utils'
import * as auth from './auth'
import colors from 'colors'
import config from 'app-config'
import csrf from 'csurf'

let csrfProtection = csrf({cookie: false});

function addRouterToApp(app, router, urlPrefix) {
  let path = router.path;
  if(typeof urlPrefix !== "undefined")
    path = urlPrefix + path;

  // Making 'get' the default method
  let method;
  if(router.hasOwnProperty('method')) {
    method = router.method;
  } else {
    method = 'get';
  }

  // Handling security
  if(router.hasOwnProperty('security')) {
    app = auth.addSecurityMiddlewares(app, method, path, router.security);
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
export function initialize(app, parmeters) {

  let path = config.path.apiRoutes;
  if(typeof parameters !== "undefined" && typeof parameters.path !== "undefined") path = parameters.path;

  return utils.getModules(path)
    .then(function(modules) {
      console.info("Loading routes...".underline);

      let moduleName, name, routes, router;
      for(moduleName in modules) {
        routes = modules[moduleName](app);
        for(name in routes) {
          router = routes[name];
          app = addRouterToApp(app, router, parmeters.urlPrefix);
        }
      }

      console.info("Done".green);
      return app;
    });
}
