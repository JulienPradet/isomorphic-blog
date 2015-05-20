var React = require('react')
  , ejs = require('ejs')
  , config = require('app-config');

var App = require(config.path.front+'/components/blog/app');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index', {
      react: React.renderToString(
        <App.Blog />
      )
    });
  });

};