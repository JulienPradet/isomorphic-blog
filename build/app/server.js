var React = require('react')
  , ejs = require('ejs');

var App = require(__dirname+'/iso/components/blog/app');

module.exports = function(app) {

  app.get('*', function(req, res) {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.render('index', {
      react: React.renderToString(
        React.createElement(App, null)
      )
    });

  });

}