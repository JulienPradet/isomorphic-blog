import React from 'react'

export default class Input extends React.Component {
  render() {
    function renderInput(type, id, defaultValue) {
      switch(type) {
        case 'text':
          return (
            <input type="text" name={id} id={id} value={defaultValue} />
          );
      }
    }
    const input = renderInput(this.props.type, this.props.id, this.props.defaultValue);

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
