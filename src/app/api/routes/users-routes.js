import * as UserController from '../controllers/UserController'

export default function(app) {
  return [
    {
      method: 'get',
      path: '/users',
      handler: UserController.getUsers
    }
  ];
};
