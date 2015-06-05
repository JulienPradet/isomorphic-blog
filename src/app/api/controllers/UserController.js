import { InternalServerError, BadRequestError } from '../../../utils/errorHandler'

export function getUsers(req, res) {
  req.app.repositories.user.getUsers()
    .then(function(users) {
      res.json(users.map(function(user) {
        delete user.password;
        return user;
      }))
    })
    .catch(function(error) {
      throw InternalServerError(error);
    })
    .done();
}


export function register(req, res) {
  let errors = {};
  let user = {};

  const form = req.app.forms.register();
  const data = form.bind(req);
  if(form.validates()) {
    req.app.repositories.user.createUser(data.username, data.password, data.email)
      .then(function(user) {
        res.send(user);
      })
      .catch(function(error) {
        throw new InternalServerError('Invalid user.');
      })
      .done();
  } else {
    throw new BadRequestError(form.errors);
  }
}
