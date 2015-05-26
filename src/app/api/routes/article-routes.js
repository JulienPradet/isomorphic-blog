module.exports = [
  {
    method: 'get',
    path: '/admin',
    security: {
      'logged': true,
      'csrf': true
    },
    handler: function(req, res) {
      res.json({
        content: 'hi'
      });
    }
  }
];
