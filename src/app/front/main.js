var React = require('react');
var App = require('./components/blog/app');

var mountNode = document.getElementById("react-container");

React.render(<App.Blog />, mountNode);