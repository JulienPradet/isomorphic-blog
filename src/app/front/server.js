var React = require('react')
  , ejs = require('ejs');

var App = require(__dirname+'/front/components/blog/app');

module.exports = function(app) {

  app.get('*', function(req, res) {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.render('index', {
      react: React.renderToString(
        <App />
      )
    });

  });

};