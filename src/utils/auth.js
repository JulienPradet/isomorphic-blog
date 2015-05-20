var q = require('q')
  , passport = require('passport')
  , BasicStrategy = require('passport-http').BasicStrategy
  , BearerStrategy = require('passport-http-bearer').Strategy;

/**
 * Users currently logged in
 * @type {Array} contains the user id, his token and the roles assigned to him
 */
var _users = [];

function findByToken(token) {
  var deferred = q.defer();

  for(var i = 0, len = users.length; i < len; i++) {
    var user = _users[i];
    if(user.token === token) {
      deferred.resolve(user);
      i = -1;
      break;
    }
  }

  if(i !== -1)
    deferred.reject();

  return deferred.promise;
}

function initialize(app) {
  var deferred = q.defer();

  /**
   * BasicStrategy
   * This strategy is used to protect the token endpoint
   */
  passport.use(new BasicStrategy(
    function(username, password, done) {
      app.models.user.findOne({username: username}, function(err, client) {
        if (err) { return done(err); }
        if (!client) { return done(null, false); }
        if (client.clientSecret != password) { return done(null, false); }
        return done(null, client);
      });
    }
  ));

  /**
   * BearerStrategy
   * Allows to authentificate thanks to the token
   */
  passport.use(new BearerStrategy(
    function(token, done) {
      findByToken(token)
        .then(function(user) {
          done(null, user);
        })
        .catch(function(error) {
          done(error, false);
        })
        .done();
      })
    }
  ));

  deferred.resolve(app);

  return deferred.promise;
}

function middleware(security, options) {
  return function(req, res, next) {
    console.info("check auth");
    console.log(security);
    next();
  }
}

module.exports = {
  initialize: initialize,
  middleware: middleware
};