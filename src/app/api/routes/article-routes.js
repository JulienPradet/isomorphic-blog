module.exports = [
  {
    method: 'GET',
    path: '/admin',
    security: {
      'roles': ['admin']
    },
    handler: function(req, res) {
      res.send('hi');
    }
  }
];