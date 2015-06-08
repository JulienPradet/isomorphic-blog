import React from 'react'

export default class Input extends React.Component {
  change(event) {
    this.props.onChange(event.target.value);
  }

  renderError() {
    let error;
    if(typeof this.props.error !== "undefined") {
      error = this.props.error.map((element) => {
        return <li>{element}</li>
      });
    } else {
      error = "";
    }

    return (
      <div className="form__input__error">
        <ul>{error}</ul>
      </div>
    );
  }

  render() {
    function renderInput(type, id, onChange) {
      switch(type) {
        case 'text':
          return (
            <input type="text" name={id} id={id} onChange={onChange} />
          );
          break;
        case 'password':
          return(
            <input type="password" name={id} id={id} onChange={onChange} />
          );
        case 'email':
          return(
            <input type="email" name={id} id={id} onChange={onChange} />
          );
      }
    }
    const input = renderInput.bind(this)(this.props.type, this.props.id, this.change.bind(this));

    return (
      <div className="form__group">
        <div className="form__label">
          <label htmlFor={this.props.id}>{this.props.label}</label>
        </div>

        <div className="form__input">
          {input}
          {this.renderError()}
        </div>
      </div>
    );
  }
}
