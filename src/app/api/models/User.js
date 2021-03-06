var slugify = require('slug')
  , q = require('q')
  , config = require('app-config')
  , bcrypt = require('bcrypt')
  , Waterline = require('waterline');

var User = Waterline.Collection.extend({

  // Identity is a unique name for this model and must be in lower case
  identity: 'user',

  // Connection
  // A named connection which will be used to read/write to the datastore
  connection: config.models.connection,

  autoPK: true,
  autoCreatedAt: true,
  autoUpdatedAt: true,
  schema: true,

  attributes: {
    'username': {
      type: 'string',
      unique: true,
      maxLength: 128
    },
    'password': {
      type: 'string',
      maxLength: 64
    },
    'email': {
      type: 'email'
    }
  },

  // toJson method used for the front API
  toJson: function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
  }
});

module.exports = {
  identity: 'user',
  model: User,
  repository: function(Model) {
    return {
      getUsers: function() {
        var deferred = q.defer();

        Model.find()
          .exec(function(err, users) {
            if(err) {
              deferred.reject(err);
            } else {
              deferred.resolve(users);
            }
          });

        return deferred.promise;
      },
      getUser: function(username) {
        var deferred = q.defer();

        Model.find()
          .where({username: username})
          .exec(function(err, user) {
            if(err) {
              deferred.reject(err);
            } else {
              deferred.resolve(user);
            }
          });

        return deferred;
      },
      createUser: function(username, password, email) {
        var deferred = q.defer();

        bcrypt.genSalt(10, function(err, salt) {
          if(err) {
            deferred.reject(err);
          } else {
            bcrypt.hash(password, salt, function(err, hash) {
              if(err) {
                deferred.reject(err)
              } else {
                Model.create({
                  username: username,
                  password: hash,
                  email: email
                }).exec(function(err, user) {
                  if(err) {
                    deferred.reject(err);
                  } else {
                    deferred.resolve(user);
                  }
                });
              }
            });
          }
        });

        return deferred.promise;
      }
    };
  }
};
