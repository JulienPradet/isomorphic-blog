
var express = require('express')
  , config = require('app-config');

var app = express();

/* Initializing the routes */
require(config.api.dir+'/server')(app);

/* Link to the database */
require(config.build.dir+'/utils/db/orm')(app, function(err) {
    if(err)
        throw err;
    else
        var server = app.listen(8081, function() {
            var host = server.address().address;
            var port = server.address().port;

            console.log('Api server listening at http://%s:%s', host, port);
        });
});