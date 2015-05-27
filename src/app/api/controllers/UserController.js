export function getUsers(req, res) {
  req.app.repositories.user.getUsers()
    .then(function(users) {
      res.json(users);
    })
    .fail(function(error) {
      throw Error(error);
    })
    .done();
}
