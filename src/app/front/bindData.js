import React from 'react'
import q from 'q'

export function fetchData(context, routes) {
  const promises = [];

  return q.all(
    routes.map(function(route) {
      const handler = new route.handler();
      const routePromises = [];

      if(handler.hasOwnProperty('_dataBinding')) {
        let moduleName, dataName;
        for(moduleName in handler._dataBinding) {
          for(dataName in handler._dataBinding[moduleName]) {
            routePromises.push(
              handler._dataBinding[moduleName][dataName]()
                .then(function(result) {
                  context.stores[moduleName]['_'+dataName] = result;
                })
            );
          }
        }
      }
      return q.all(routePromises);
    })
  );

  // if(typeof element.props.children !== "undefined") {
  //   promises.concat(
  //     element.props.children
  //       .map(function(element) {
  //         return fetchData(element)
  //       })
  //       .reduce(function(a, b) {
  //         return a.concat(b);
  //       })
  //   );
  // }
}

export function bindData(Component, dataBinding) {
  return class extends React.Component {
    constructor(props) {
      super(props)
      this._dataBinding = dataBinding;
    }

    render() {
      return (<Component {...this.props} />);
    }
  }
}
