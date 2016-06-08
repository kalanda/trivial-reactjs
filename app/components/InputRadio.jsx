import React from 'react';

const InputRadio = React.createClass({

  propTypes: {
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    checked: React.PropTypes.bool,
    onChange: React.PropTypes.func,
  },

  handleChange(event) {
    if (this.props.onChange) this.props.onChange(event);
  },

  render() {
    const {
      id,
      name,
      label,
      value,
      checked,
    } = this.props;

    return (
      <p className="input-radio-component">
        <input
          type="radio"
          name={name}
          value={value}
          id={id}
          checked={checked}
          onChange={this.handleChange}
        />
        <label htmlFor={id}>{label}</label>
      </p>
    );
  },
});

export default InputRadio;
