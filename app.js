/**
 * This App is meant to be a blog using React to do some isomorphic behavior
 */

var express = require('express')
  , ejs = require('ejs')
  , config = require('app-config');

var app = express();
app.set('view engine', 'ejs');

require(config.build.dir+'/app/server')(app);

require(config.build.dir+'/utils/db/orm')(app, function(err) {
  if(err)
    throw err;
  else
    var server = app.listen(1337, function() {
      var host = server.address().address;
      var port = server.address().port;

      console.log('Example app listening at http://%s:%s', host, port);
    });
});