import React from 'react';

var Button = React.createClass({

    propTypes: {
      text: React.PropTypes.string.isRequired,
      onClick: React.PropTypes.func,
    },

    handleClick: function(event){
      if (this.props.onClick) this.props.onClick(event);
    },

    render: function() {
      return (
        <button
          className="button-component"
          onClick={this.handleClick}
          >{this.props.text}</button>
      );
    }
});

export default Button;
