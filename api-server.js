var express = require('express')
  , config = require('app-config')
  , colors = require('colors');

var app = express();

require(config.path.api+'/server')(app)
  .then(function(app) {
    console.info("\nLoading API done.".underline.green);
    var server = app.listen(8081, function() {
        var host = server.address().address;
        var port = server.address().port;

        console.info('\nServer listening at http://%s:%s', host, port);
    });
  })
  .catch(function(error) {
    console.error(("Failed to load API").red);
    console.trace(error);
  })
  .done();
