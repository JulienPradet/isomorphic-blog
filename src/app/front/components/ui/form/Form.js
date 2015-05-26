import React from 'react'
import isUrl from './../../PropTypes'
import objectPath from 'object-path'
import Input from './Input'

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  changeHandler(path, value) {
    let state = this.state;
    objectPath.set(state, path, value);
    this.setState(state);
  }

  submit() {
    function merge(object, fill) {
      for(let key in fill) {
        if(fill.hasOwnProperty(key)) {
          if(!object.hasOwnProperty(key)) {
            object[key] = fill[key].defaultValue;
          } else {
            if(typeof object[key] === "object" && object[key] !== null
                && Array.isArray(fill[key].fields)) {
              object[key] = merge(object[key], fill[key].fields);
            }
          }
        }
      }
      return object;
    }

    const submitValues = merge(this.state, this.props.defaultValues);
    this.props.submit(submitValues);
  }

  renderForm(element) {
    switch(element.type) {
      case 'fieldset':
        return this.renderFieldset(element);
        break;
      default:
        return this.renderInput(element)
    }
  }

  renderFieldset(element) {
    return (
      <fieldset key={element.id} class="form__fieldset">
        {element.fields.map(this.renderForm.bind(this))}
      </fieldset>
    );
  }

  renderInput(element) {
    return (
      <Input key={element.id} id={element.id} label={element.label} value={element.defaultValue} type={element.type} onChange={this.changeHandler.bind(this)} />
    );
  }

  render() {
    let fields = this.props.fields.map(this.renderForm.bind(this));
    return (
      <form action={this.props.action} method={this.props.action}>
        {fields}
      </form>
    );
  }
}

Form.propTypes = {
  method: React.PropTypes.oneOf(['POST', 'PUT', 'DELETE']).isRequired,
  action: React.PropTypes.string.isRequired
}
