var React = require('react')
  , ejs = require('ejs')
  , config = require('app-config');

var Blog = require(config.path.front+'/components/blog/Blog');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index', {
      react: React.renderToString(
        <Blog />
      )
    });
  });

};
