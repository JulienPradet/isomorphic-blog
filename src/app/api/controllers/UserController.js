import { InternalServerError, BadRequestError } from '../../../utils/errorHandler'
import { createUserSession, removeUserSession } from '../../../utils/auth'

export function getUsers(req, res) {
  req.app.repositories.user.getUsers()
    .then(function(users) {
      res.json(users.map(function(user) {
        delete user.password;
        return user;
      }))
    })
    .catch(function(error) {
      throw new InternalServerError(error);
    })
    .done();
}

export function register(req, res, next) {
  let errors = {};
  let user = {};

  const form = req.app.forms.register();
  const data = form.bind(req);
  if(form.validates()) {
    req.app.repositories.user.createUser(data.username, data.password, data.email)
      .then(function(user) {
        delete user.password;
        res.send(user);
      })
      .catch(function(error) {
        next(new BadRequestError({
            username: ['This username is already registered. Please, choose a different one.']
        }));
      })
      .done();
  } else {
    throw new BadRequestError(form.errors);
  }
}

export function login(req, res, next) {
  var token = createUserSession(req.user);
  res.json({
    user: req.user,
    token: token
  });
}

export function logout(req, res, next) {
  removeUserSession(req.user)
    .then(function() {
      res.json({
        message: "Disconnected"
      })
    })
    .catch(function() {
      throw new errorHandler.ForbiddenError('You are not logged in');
    })
    .done();
}

export function currentUser(req, res, next) {
  console.log(req.user);
  res.json(req.user);
}
