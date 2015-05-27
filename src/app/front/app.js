import React from 'react'
import App from './components/App'
import * as context from './ContextProvider'

var mountNode = document.getElementById("react-container");

React.render(<App context={context} />, mountNode);
