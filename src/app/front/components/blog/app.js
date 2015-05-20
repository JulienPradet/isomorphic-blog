var React = require('react');

var Blog = React.createClass({
  onClick: function(event) {
    console.log("BLOG");
  },
  render: function() {
    return (
      <div className="Blog">
        <button onClick={this.onClick}>
          Blog
        </button>
      </div>
    );
  }
});

module.exports = {
  Blog: Blog
};