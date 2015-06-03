import React from 'react'
import q from 'q'

export function fetchDataFromHandler(context, handler) {
  let promises = [];

  if(handler.hasOwnProperty('_dataBinding')) {
    let moduleName, dataName;
    for(moduleName in handler._dataBinding) {
      for(dataName in handler._dataBinding[moduleName]) {
        promises.push(
          handler._dataBinding[moduleName][dataName]()
            .then(function(result) {
              context.stores[moduleName]['_'+dataName] = result;
              return {
                moduleName: moduleName,
                dataName: dataName,
                data: result
              }
            })
        );
      }
    }
  }

  return q.all(promises)
}

export function fetchDataFromRoutes(context, routes) {
  let promises = [];

  return q.all(
    routes.map(function(route) {
      const handler = new route.handler();
      return fetchDataFromHandler(context, handler);
    })
  )
    .then(function(results) {
      let initData = {};
      for(var handlerKey in results) {
        for(var resultKey in results[handlerKey]) {
          let result = results[handlerKey][resultKey];
          if(typeof initData[result.moduleName] === "undefined")
            initData[result.moduleName] = {};
          initData[result.moduleName][result.dataName] = result.data
        }
      }
      return initData;
    });
}

export function bindData(displayName, Component, dataBinding) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.displayName = displayName;
      this._dataBinding = dataBinding;
    }

    render() {
      return (<Component {...this.props} />);
    }
  }
}
