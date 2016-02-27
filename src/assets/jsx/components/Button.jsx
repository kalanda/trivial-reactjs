import React from 'react';

const Button = React.createClass({

  propTypes: {
    text: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func,
    disabled: React.PropTypes.bool,
  },

  handleClick(event) {
    if (this.props.onClick) this.props.onClick(event);
  },

  render() {
    return (
      <button
        className="button-component"
        onClick={this.handleClick}
        disabled={this.props.disabled}
      >{this.props.text}</button>
    );
  },
});

export default Button;
