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
    try {
      req.app.repositories.user.createUser(data.username, data.password, data.email)
        .then(function(user) {
          res.send(user);
        })
        .catch(function(error) {
          next(new BadRequestError({
              username: ['This username is already registered. Please, choose a different one.']
          }));
        })
        .done();
    } catch(exception) {
      console.log(exception);
    }
  } else {
    throw new BadRequestError(form.errors);
  }
}
