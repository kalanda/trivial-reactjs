import React from 'react';

const Header = React.createClass({

  propTypes: {
    subtitle: React.PropTypes.string.isRequired,
  },

  render() {
    return (
      <div className="header-component">
        <h1>Trivial</h1>
        <p>{this.props.subtitle}</p>
      </div>
    );
  },
});

export default Header;
