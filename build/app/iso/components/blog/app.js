var React = require('react');

var App = React.createClass({displayName: "App",
  onClick: function() {
    console.log("BLOG");
  },
  render: function() {
    return (
      React.createElement("div", {className: "Blog"}, 
        React.createElement("button", {onClick: this.onClick, type: "button"}, 
          "Blog"
        )
      )
    );
  }
});

module.exports = App;