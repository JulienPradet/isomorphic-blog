import React from 'react'
import Router from 'react-router'
import { routes, location } from './routes'

import { Context, urlToRequest } from './Context'

let context = new Context(DATA, function() {
  let mountNode = document.getElementById("react-container");

  Router.run(routes, Router.HistoryLocation, function(Handler) {
    React.render(<Handler context={context} />, mountNode);
  });
});
