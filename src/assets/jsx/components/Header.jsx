import React from 'react';

var Header = React.createClass({

    propTypes: {
      subtitle: React.PropTypes.string.isRequired,
    },

    render: function() {
      return (
        <div className="header-component">
          <h1>Trivial</h1>
          <p>{this.props.subtitle}</p>
        </div>
      );
    }
});

export default Header;
