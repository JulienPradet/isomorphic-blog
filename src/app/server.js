import config from 'app-config'
import bodyParser from 'body-parser'
import session from 'express-session'
import ejs from 'ejs'
import React from 'react'
import Router from 'react-router'
import * as RendererWithData from './front/components/RendererWithData'
import Context from './front/ContextProvider'
import { routes } from './front/components/App'

module.exports = function(express, app) {
  app.set('view engine', 'ejs');
  app.use('/public', express.static(config.path.public));
  app.use(bodyParser.json());

  var modules = [
    {
      name: 'orm', // Parse the models and make them available under app.models and app.repositories
      parameters: {
        path: config.path.models
      }
    },
    {
      name: 'forms', // Load the definition of the forms in order to make them usable to parse some data
      parameters: {
        path: config.path.forms
      }
    },
    {
      name: 'auth', // Enable a user system and authentificatoin (working with a bearer strategy)
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
      name: 'route', // Parse the routes that are available on the API side
      parameters: {
        path: config.path.apiRoutes,
        urlPrefix: '/api'
      }
    },
    {
      name: 'errorHandler', // Catch the errors in error to return understandable errors to the user
    }
  ];

  return require(config.path.utils+"/utils").initialize(app, modules)
    .then(function(app){
      /* It must be done after the api has been made */
      app.get('*', function(req, res) {
        let initData = {
          auth: {
            users: [{username: "l"}]
          }
        };
        Router.run(routes, req.url, function (Handler) {
          var react = React.renderToString(<Handler context={new Context(initData)} />);
          res.render('index', {
            react: react,
            data: JSON.stringify(initData)
          });
        });
      });

      return app;
    })
}
