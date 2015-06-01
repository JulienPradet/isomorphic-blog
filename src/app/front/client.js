import React from 'react'
import Router from 'react-router'
import { routes, location } from './routes'

import Context from './Context'
import { fetchData } from './bindData'

const context = new Context();
context.setInitData(DATA);

const mountNode = document.getElementById("react-container");

Router.run(routes, Router.HistoryLocation, function(Handler, state) {
  const react = React.renderToString(<Handler context={context} />);
  React.render(<Handler context={context} />, mountNode);
});
