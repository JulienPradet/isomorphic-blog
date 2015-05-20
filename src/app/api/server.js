var config = require('app-config');

module.exports = function(app) {
  return require(config.path.utils+'/route')(app, config.path.apiRoutes)
}