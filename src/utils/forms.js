var validate = require("validate.js")
  , utils = require('./utils');

function loadForms(app, routes) {
  return utils.getModules(__dirname+'/forms')
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

module.exports = {
  Form: Form,
  loadForms: loadForms
};
