var validate = require("validate.js")
  , utils = require('./utils')
  , config = require('app-config')
  , colors = require('colors');

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
        console.info(name);
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
}

Form.prototype.validates = function validate() {
  return this._fields.every(function(field) {
    if(typeof this._validators === "undefined")
      return true;
    else
      validate(this.data[field], this._validators[field]);
  });
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
