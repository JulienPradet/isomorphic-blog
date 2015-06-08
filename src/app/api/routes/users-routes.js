import * as UserController from '../controllers/UserController'

export default function(app) {
  return [
    {
      method: 'get',
      path: '/users',
      handler: UserController.getUsers
    },
    {
      method: 'get',
      path: '/me',
      security: {
        'bearer': []
      },
      handler: UserController.currentUser
    },
    {
      method: 'post',
      path: '/register',
      security: {
        'isNotLoggedIn': []
      },
      handler: UserController.register
    },
    {
      method: 'post',
      path: '/login',
      security: {
        'local': []
      },
      handler: UserController.login
    },
    {
      method: 'post',
      path: '/logout',
      security: {
        'bearer': []
      },
      handler: UserController.logout
    }
  ];
};
