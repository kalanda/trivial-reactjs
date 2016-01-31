import React from 'react';

var InputRadio = React.createClass({

    propTypes: {
      id: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      value: React.PropTypes.string.isRequired,
    },

    render: function() {

      let id = this.props.id;
      let name = this.props.name;
      let label = this.props.label;
      let value = this.props.value;

      return (
        <p className="input-radio-component">
          <input type="radio" name={name} value={value} id={id} />
          <label htmlFor={id}>{label}</label>
        </p>
      );
    }
});

export default InputRadio;
