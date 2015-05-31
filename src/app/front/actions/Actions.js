export default class Actions {
  constructor(functions) {
    /* adds the functions to the object */
    for(var functionName in functions) {
      if(functions.hasOwnProperty(functionName)) {
        this[functionName] = functions[functionName];
      }
    }
  }
}
