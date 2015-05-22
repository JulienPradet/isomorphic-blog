module.exports = [
  {
    method: 'get',
    path: '/admin',
    security: {
      'logged': true
    },
    handler: function(req, res) {
      res.json({
        content: 'hi'
      });
    }
  }
];
