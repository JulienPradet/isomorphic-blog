import React from 'react'
import q from 'q'

function createInstance(component) {
  let instance = new component.type(component._store.props);
  return instance;
}

function getBindings(component) {
  var instance = createInstance(component);
  React.renderToString(component);
  console.log(component);
  /*
   * if the component doesn't have any bindings, let's have a look in its children
   * else return its bindings
   */
  if(typeof component.getDataBindings !== "function") {
    return React.Children
      .map(component.props.children, function(child) {
        return getBindings(child)
      })
      .reduce(function(a, b) {
        return a.concat(b);
      })
  } else {
    return component.getDataBindings();
  }
}

function fetchData(bindings) {
  /* Then fetch all the data */
  const keys = Object.keys(bindings);
  return keys.map(function(key) {
    return bindings[key]();
  });
}

export function render(component, callback) {
  q.all(fetchData(getBindings(component)))
    .then(function() {
      callback(React.renderToString(component));
    });
}
