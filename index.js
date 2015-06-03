var express = require('express')
  , config = require('app-config')
  , colors = require('colors');

var app = express();

require(__dirname+'/build/app/server')(express, app)
  .then(function(app) {
    console.info("\nLoading API done.".underline.green);
    var server = app.listen(8080, function() {
        var host = server.address().address;
        var port = server.address().port;

        console.info('\nServer listening at http://%s:%s', host, port);
    });
  })
  .catch(function(error) {
    console.log(error);
    console.error(("Failed to load API").red);
    console.trace(error);
  })
  .done();
