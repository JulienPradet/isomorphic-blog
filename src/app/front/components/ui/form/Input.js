import React from 'react'

export default class Input extends React.Component {
  change(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    function renderInput(type, id, defaultValue, onChange) {
      switch(type) {
        case 'text':
          return (
            <input type="text" name={id} id={id} value={defaultValue} onChange={onChange} />
          );
          break;
        case 'password':
          return(
            <input type="password" name={id} id={id} value={defaultValue} onChange={onChange} />
          );
        case 'email':
          return(
            <input type="email" name={id} id={id} value={defaultValue} onChange={onChange} />
          );
      }
    }
    const input = renderInput(this.props.type, this.props.id, this.props.defaultValue, this.change.bind(this));

    return (
      <div className="form__group">
        <div className="form__label">
          <label htmlFor={this.props.id}>{this.props.label}</label>
        </div>

        <div className="form__input">
          {input}
        </div>
      </div>
    );
  }
}
