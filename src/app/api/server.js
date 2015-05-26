var config = require('app-config')
  , bodyParser = require('body-parser')
  , session = require('express-session');

module.exports = function(app) {
  app.use(bodyParser.json());

  return require(config.path.utils+"/utils").initialize(app, [
    {
      name: 'orm',
      parameters: {
        path: config.path.models
      }
    },
    {
      name: 'forms.js',
      parameters: {
        path: config.path.forms
      }
    },
    {
      name: 'auth',
      parameters: {
        userModel: 'user',
        routes: {
          login: '/login',
          logout: '/logout',
          register: '/register'
        },
        forms: {
          login: 'login',
          register: 'register'
        }
      }
    },
    {
      name: 'route',
      parameters: {
        path: config.path.apiRoutes
      }
    },
    {
      name: 'errorHandler',
    }
  ]);
}
