import React from 'react';

var HelloWorld = React.createClass({

  getInitialState: function() {
    return {
      data: [1,2,3]
    };
  },

  render: function() {
    return (
      <div className="HelloWorld">
        <h1>Hello {this.props.name} {this.state.data}</h1>
      </div>
    );
  }

});

export default HelloWorld;
