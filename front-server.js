/**
 * This App is meant to be a blog using React to do some isomorphic behavior
 */

var express = require('express')
  , ejs = require('ejs')
  , config = require('app-config');

var app = express();
app.set('view engine', 'ejs');
app.use('/public', express.static(config.path.public));

/* Configure the server */
require(config.path.front+'/server')(app);

var server = app.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Front server listening at http://%s:%s', host, port);
});
