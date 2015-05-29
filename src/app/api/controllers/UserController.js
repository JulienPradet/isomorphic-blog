export function getUsers(req, res) {
  req.app.repositories.user.getUsers()
    .then(function(users) {
      res.json(users.map(function(user) {
        delete user.password;
        return user;
      }))
    })
    .fail(function(error) {
      throw Error(error);
    })
    .done();
}
