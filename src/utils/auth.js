import q from 'q'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import { BasicStrategy } from 'passport-http'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import bcrypt from 'bcrypt'
import forms from './forms'
import errorHandler from './errorHandler'
import colors from 'colors'


var _users = [];

function findByToken(token) {
  const deferred = q.defer();

  process.nextTick(function() {
    let user, i;
    const len = _users.length;
    for(i = 0; i < len; i++) {
      user = _users[i];
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
  });

  return deferred.promise;
}

function createUserSession(user) {
  let expiresAt = new Date()
    , token = Math.random().toString(36).substr(2);

  expiresAt.setMonth(expiresAt.getMonth() + 1);

  _users.push({
    token: token,
    expiresAt: expiresAt,
    roles: (typeof user.roles !== "undefined" ? user.roles : [])
  });

  return token;
}

function removeUserSession(user) {
  const deferred = q.defer();

  process.nextTick(function() {
    const token = user.token;
    const len = _users.length;
    let i;
    for(i = 0; i < len; i++) {
      user = _users[i];
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
  })

  return deferred.promise;
}

function initialize(app, parameters) {
  console.info("Loading auth...".underline);

  // Making sure that the user model is given as a parameter
  if(typeof parameters.userModel === "undefined")
    throw new TypeError('userModel is undefined when initializing authentification');
  const userModel = parameters.userModel;

  const deferred = q.defer();

  app.use(passport.initialize());
  app.use(passport.session());

  console.info("stategies...");

  function checkUser(username, password, done) {
    app.models[userModel].findOne({username: username}, function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      bcrypt.compare(password, user.password, function(err, res) {
        if(err || !res) {
          return done(null, false);
        } else {
          delete user.password;
          return done(null, user);
        }
      })
    });
  }

  /**
   * Local Strategy
   */
  passport.use(new LocalStrategy(checkUser));

  /**
  * BasicStrategy
  */
  passport.use(new BasicStrategy(checkUser));

  /**
  * BearerStrategy
  * Allows to authentificate thanks to the token
  */
  passport.use(new BearerStrategy(
    function(token, done) {
      findByToken(token)
        .then(function(user) {
          console.error(user);
          done(null, user);
        })
        .catch(function(error) {
          console.error(error);
          done(error, false);
        })
        .done();
    }
  ));

  console.info("Done".green);
  deferred.resolve(app);

  return deferred.promise;
}

function hasRole(role, user) {
  return user.roles.indexOf(role) > -1;
}

function checkRoles(roles) {
  return function checkRoles(req, res, next) {
    // You match one of those roles
    if(roles.some(function(role) { hasRole(role, req.user) })) {
      next();
    // You dont match those roles
    } else {
      throw new errorHandler.UnauthorizedError('You don\'t have the permission to do that.');
    }
  };
}

function isNotLoggedIn(req, res, next) {
  if(req.user) {
    throw new errorHandler.ForbiddenError('Already logged in');
  } else {
    next();
  }
}

const middleware = {
  local: function() { return passport.authenticate('local', {session: false}); },
  basic: function() { return passport.authenticate('basic', {session: false}); },
  bearer: function() { return passport.authenticate('bearer', {session: false}); },
  checkRoles: checkRoles,
  isNotLoggedIn:function() { return isNotLoggedIn; }
};

function _mapValues(object, callback) {
  for(var key in object) {
    if(object.hasOwnProperty(key)) {
      callback.bind(this)(key, object[key]);
    }
  }
}

function addSecurityMiddlewares(app, method, path, security) {
  _mapValues(security, function(authName, args) {
    if(!middleware.hasOwnProperty(authName)) {
      throw new Error('Security middleware "'+authName+'" does not exist.');
    } else {
      app[method](path, middleware[authName].apply(this, args));
    }
  });

  return app;
}

export default {
  initialize: initialize,
  addSecurityMiddlewares: addSecurityMiddlewares,
  createUserSession: createUserSession,
  removeUserSession: removeUserSession
};
