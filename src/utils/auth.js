var q = require('q')
  , passport = require('passport')
  , BasicStrategy = require('passport-http').BasicStrategy
  , BearerStrategy = require('passport-http-bearer').Strategy
  , bcrypt = require('bcrypt')
  , forms = require(__dirname+'/forms')
  , errorHandler = require(__dirname+'/errorHandler')
  , colors = require('colors');

/**
 * Users currently logged in
 * @type {Array} contains the user id, his token and the roles assigned to him
 * @todo it'd be better to switch to a database to be stateless (for instance redis since it's memcached)
 */
var _users = [];

function findByToken(token) {
  var deferred = q.defer();

  for(var i = 0, len = _users.length; i < len; i++) {
    var user = _users[i];
    if(user.token === token) {
      if(user.expiresAt < (new Date())) {
        _users.splice(i, 1);
      } else {
        deferred.resolve(user);
        i = -1;
        break;
      }
    }
  }

  if(i !== -1) {
    deferred.reject();
  }

  return deferred.promise;
}

/**
 * Authentificate user to allow him to connect by tokens
 * @param {Array} array of roles the user is allowed to
 * @return a token for the session of the user
 */
function createUserSession(user) {
  var expiresAt = new Date()
    , token = Math.random().toString(36).substr(2);

  expiresAt.setMonth(expiresAt.getMonth() + 1);

  _users.push({
    token: token,
    expiresAt: expiresAt,
    roles: user.roles
  });

  return token;
}

function removeUserSession(user) {
  console.log("test");
  var deferred = q.defer();

  for(var i = 0, len = _users.length; i < len; i++) {
    var user = _users[i];
    if(user.token === token) {
      _users.splice(i, 1);
      i = -1;
      deferred.resolve();
      break;
    }
  }

  if(i !== -1) {
    deferred.reject('User is not logged in');
  }

  return deferred.promise;
}

function initialize(app, parameters) {
  console.info("Loading auth...".underline);
  // Making sure that the user model is given as a parameter
  var userModel;
  if(typeof parameters.userModel !== "undefined") {
    userModel = parameters.userModel;
  } else {
    throw new TypeError('userModel is undefined when initializing authentification');
  }

  // initializing routes
  var routes = {
    login: '/login',
    logout: '/logout',
    register: '/register'
  };
  if(typeof parameters.routes !== "undefined"){
    if(typeof parameters.routes.login !== "undefined") routes.login = parameters.routes.login;
    if(typeof parameters.routes.logout !== "undefined") routes.logout = parameters.routes.logout;
    if(typeof parameters.routes.register !== "undefined") routes.register = parameters.routes.register;
  }

  // initializing forms
  var formsParam = {
    register: 'register'
  };
  if(typeof parameters.forms !== "undefined"){
    if(typeof parameters.forms.register !== "undefined") formsParam.register = parameters.forms.register;
  }

  var deferred = q.defer();

  app.use(passport.initialize());
  app.use(passport.session());

  console.info("stategies...");
  /**
  * BasicStrategy
  * This strategy is used to protect the token endpoint
  */
  passport.use(new BasicStrategy(
    function(username, password, done) {
      app.models[userModel].findOne({username: username}, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        bcrypt.compare(password, user.password, function(err, res) {
          if(err || !res) {
            return done(null, false);
          } else {
            return done(null, user);
          }
        })
      });
    }
  ));

  /**
  * BearerStrategy
  * Allows to authentificate thanks to the token
  */
  passport.use(new BearerStrategy(
    function(token, done) {
      console.log(token);
      findByToken(token)
        .then(function(user) {
          console.log(user);
          done(null, user);
        })
        .catch(function(error) {
          console.log(error);
          done(error, false);
        })
        .done();
    }
  ));

  console.info("routes...");
  /* Adding the login/register routes */
  app.post(
    routes.register,
    alreadyLoggedIn, // Make sure that the user is not already logged in
    function(req, res, next) {
      var registerForm = app.forms[formsParam.register]();
      registerForm.bind(req);
      if(registerForm.validates()) {
        app.repositories[userModel].createUser(
          registerForm.data.username,
          registerForm.data.password,
          registerForm.data.email
        )
          .then(function(user) {
            delete user.password;
            res.json(user);
          })
          .fail(function(err) {
            next();
          })
          .done();
      }
  });

  app.post(
    routes.login,
    alreadyLoggedIn, // Make sure that the user is not already logged in
    passport.authenticate('basic', {session: false}),
    function(req, res) {
      var token = createUserSession(req.user);
      res.json({
        token: token
      });
    }
  );

  app.post(
    routes.logout,
    passport.authenticate('bearer', {session: false}),
    function(req, res) {
      console.log("test");
      removeUserSession(app.user)
        .then(function() {
          res.json({
            message: "Deconnected"
          })
        })
        .fail(function() {
          throw new errorHandler.ForbiddenError('You are not logged in');
        })
        .done();
    }
  );

  console.info("Done".green);
  deferred.resolve(app);

  return deferred.promise;

}

function hasRole(role, user) {
  return user.roles.indexOf(role) > -1;
}

function checkAuthorization(security, options) {
  return function checkAuthorization(req, res, next) {
    // You don't have to be logged
    if(security.hasOwnProperty('logged') && !security.logged) {
      next();
    } else {
      // You have to be logged, but the user is anonymous
      if((security.logged || security.roles) && !req.user) {
        throw new errorHandler.UnauthorizedError('You must be logged in.');
      } else {
        // You have to be logged, and match some roles
        if(security.hasOwnProperty('roles')) {
          // You match one of those roles
          if(security.roles.some(function(role) { hasRole(role, req.user) })) {
            next();
          // You dont match those roles
          } else {
            throw new errorHandler.UnauthorizedError('You don\'t have the permission to do that.');
          }
        // You only have to be logged (no roles), and you are
        } else {
          next();
        }
      }
    }
  };
}

function alreadyLoggedIn(req, res, next) {
  if(req.user) {
    throw new errorHandler.ForbiddenError('Already logged in');
  } else {
    next();
  }
}

module.exports = {
  initialize: initialize,
  middleware: {
    authenticate: passport.authenticate('bearer', {session: false}),
    checkAuthorization: checkAuthorization,
    alreadyLoggedIn: alreadyLoggedIn
  }
};
