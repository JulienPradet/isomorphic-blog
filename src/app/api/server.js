var config = require('app-config')
  , bodyParser = require('body-parser')
  , session = require('express-session');

module.exports = function(app) {
  app.use(bodyParser.json());

  return require(config.path.utils+'/auth').initialize(app, 'user')
    .then(function(app) {
      return require(config.path.utils+'/route').initialize(app, config.path.apiRoutes);
    })
    .then(function(app) {
      return require(config.path.utils+'/errorHandler').initialize(app);
    });
}
