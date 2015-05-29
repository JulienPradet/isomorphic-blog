import React from 'react'
import Router from 'react-router'
import { routes, location } from './components/App'

import Context from './ContextProvider'

let context = new Context(DATA);

let mountNode = document.getElementById("react-container");

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler context={context} />, mountNode);
});
