import config from 'app-config'
import bodyParser from 'body-parser'
import session from 'express-session'
import ejs from 'ejs'

import utils from '../utils/utils'

import React from 'react'
import Router from 'react-router'
import { routes } from './front/routes'

import Context from './front/Context'
import { fetchDataFromRoutes } from './front/bindData'

module.exports = function(express, app) {
  app.set('view engine', 'ejs');
  app.use('/public', express.static(config.path.public));
  app.use(bodyParser.json());

  app.get('/favicon.ico', function(req, res) {
    res.send('haha');
  });

  const modules = [
    {
      name: 'orm',
      parameters: {
        path: config.path.models
      }
    },
    {
      name: 'forms',
      parameters: {
        path: config.path.forms
      }
    },
    {
      name: 'auth',
      parameters: {
        userModel: 'user',
        routes: {
          login: '/login',
          logout: '/logout',
          register: '/register'
        },
        forms: {
          login: 'login',
          register: 'register'
        }
      }
    },
    {
      name: 'route',
      parameters: {
        path: config.path.apiRoutes,
        urlPrefix: '/api'
      }
    },
    {
      name: 'errorHandler', // Catch the errors in error to return understandable errors to the user
    }
  ];

  return utils.initialize(app, modules)
    .then(function(app){
      /* It must be done after the api has been made, in order not to override those routes */
      app.get('*', function(req, res) {
        const context = new Context();

        Router.run(routes, req.url, function (Handler, state) {
          /* Fetch the datas needed to render the page */
          fetchDataFromRoutes(context, state.routes)
            .then(function(initData) {
              context.setInitData(initData);

              const react = React.renderToString(<Handler context={context} />);
              res.render('index', {
                react: react,
                data: JSON.stringify(initData)
              });
            })
            .done();

        });
      });

      return app;
    })
}
