import React from 'react';

var Button = React.createClass({

    propTypes: {
      text: React.PropTypes.string.isRequired,
      onClick: React.PropTypes.func,
      disabled: React.PropTypes.bool,
    },

    handleClick: function(event){
      if (this.props.onClick) this.props.onClick(event);
    },

    render: function() {
      return (
        <button
          className="button-component"
          onClick={this.handleClick}
          disabled={this.props.disabled}
          >{this.props.text}</button>
      );
    }
});

export default Button;
