import React from 'react';

var ProgressBar = React.createClass({

    propTypes: {
      percent: React.PropTypes.number.isRequired,
    },

    render: function() {

      let percent = this.props.percent;
      let style = { width : parseFloat(percent)+'%' }
      let colorClass = 'is-green';
      if (percent >= 33 && percent < 66) colorClass = 'is-orange';
      else if (percent >= 66) colorClass = 'is-red';

      return (
        <div className="progress-bar-component">
          <span className={colorClass} style={style}></span>
        </div>
      );
    }
});

export default ProgressBar;
