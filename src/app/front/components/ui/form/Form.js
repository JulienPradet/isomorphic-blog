import React from 'react'
import isUrl from './../../PropTypes'
import Input from './Input'

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = this._defaultValues(props.fields);
  }

  changeHandler(path) {
    function push(obj, path, value) {
      if(typeof obj === "undefined") obj = {};
      if(path.length <= 0) {
        throw new Error('invalid path');
      } else if(path.length === 1) {
        obj[path[0]] = value;
      } else {
        obj[path[0]] = push(obj[path[0]], path.slice(0, 1), value);
      }
      return obj;
    }

    return (function(value) {
      const state = push(this.state, path, value);
      this.setState(state);
    }).bind(this);
  }


  _defaultValues(fields) {
    let defaultValues = {};
    this.props.fields
      .forEach(((field) => {
        if(field.hasOwnProperty('defaultValue')) {
          defaultValues[field.id] = field.defaultValue;
        } else if(field.hasOwnProperty('fields')) {
          defaultValues[field.id] = this._defaultValues(field.fields);
        }
      }).bind(this));
    return defaultValues;
  }

  submit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state);
  }

  renderForm(path, element, errors) {
    path.push(element.id);
    switch(element.type) {
      case 'fieldset':
        return this.renderFieldset(path, element, errors);
        break;
      default:
        return this.renderInput(path, element, errors)
    }
  }

  renderFieldset(path, element, error) {
    return (
      <fieldset key={element.id} class="form__fieldset">
        {element.fields.map((element) => this.renderForm.bind(this)(path, element))}
      </fieldset>
    );
  }

  renderInput(path, element, error) {
    if(typeof error === "undefined") {
      return (
        <Input key={element.id} id={element.id} label={element.label} value={element.defaultValue} type={element.type} onChange={this.changeHandler.bind(this)(path)} />
      );
    } else {
      return (
        <Input key={element.id} id={element.id} label={element.label} value={element.defaultValue} type={element.type} error={error} onChange={this.changeHandler.bind(this)(path)} />
      );
    }
  }

  renderButton(button) {
    return (
      <button key={button.id} type={button.type}>{button.label}</button>
    );
  }

  render() {
    const fields = this.props.fields.map((element) => {
      if(typeof this.props.errors !== "undefined" && typeof this.props.errors[element.id] !== "undefined") {
        return this.renderForm.bind(this)([], element, this.props.errors[element.id])
      } else {
        return this.renderForm.bind(this)([], element)
      }
    });

    const buttons = (
      typeof this.props.buttons !== "undefined" ?
        this.props.buttons.map(this.renderButton.bind(this)) :
        renderButton()
    );

    return (
      <form className="form" action={this.props.action} method={this.props.method} onSubmit={this.submit.bind(this)}>
        {fields}
        {buttons}
      </form>
    );
  }
}

Form.propTypes = {
  method: React.PropTypes.oneOf(['POST', 'PUT', 'DELETE']).isRequired,
  action: React.PropTypes.string.isRequired
}
