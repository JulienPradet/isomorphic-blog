import validate from "validate.js"
import utils from './utils'
import config from 'app-config'
import colors from 'colors'

function loadForms(app, path) {
  console.info("Loading forms...".underline);
  return utils.getModules(path)
    .then(function(modules) {
      var forms = app.forms
        , name
        , module;

      if(typeof forms !== "undefined") {
        forms = {};
      }

      for(name in modules) {
        module = modules[name];
        forms[name] = function() {
          return (new Form(module));
        }
      }

      app.forms = forms;
      console.info("Done".green);

      return app;
    });
}

function Form(options) {
  this._fields = (typeof options.fields !== "undefined" ? options.fields : []);
  this._validators = (typeof options.validators !== "undefined" ? options.validators : []);
  this._csrf = (typeof options.csrf !== "undefined" ? options.csrf : true);
}

Form.prototype.bind = function bind(req) {
  var values = {};
  var data = {};
  this._fields.forEach(function(field) {
    if(typeof req.body[field] !== "undefined") {
      data[field] = req.body[field];
    }
  });
  this.data = data;
  return data;
}

Form.prototype.validates = function validates() {
  this.errors = validate(this.data, this._validators);
  if(typeof this.errors === "undefined") {
    return true;
  } else {
    return false;
  }
}

function initialize(app, parameters){
  var path = config.path.forms;
  if(typeof parameters !== "undefined" && typeof parameters.path !== "undefined") path = parameters.path;
  return loadForms(app, path);
}

module.exports = {
  Form: Form,
  loadForms: loadForms,
  initialize: initialize
};
