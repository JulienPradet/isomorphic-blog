import React from 'react'
import Router from 'react-router'
import { routes, location } from './components/App'

import * as context from './ContextProvider'

let mountNode = document.getElementById("react-container");

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler context={context} />, mountNode);
});
