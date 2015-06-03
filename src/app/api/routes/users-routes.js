import * as UserController from '../controllers/UserController'

export default function(app) {
  return [
    {
      method: 'get',
      path: '/users',
      handler: UserController.getUsers
    },
    {
      method: 'post',
      path: '/register',
      handler: UserController.register
    }
  ];
};
