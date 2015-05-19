var React = require('react');

var App = React.createClass({
  onClick: function() {
    console.log("BLOG");
  },
  render: function() {
    return (
      <div className="Blog">
        <button onClick={this.onClick} type="button">
          Blog
        </button>
      </div>
    );
  }
});

module.exports = App;