import React from 'react';

const ProgressBar = React.createClass({

  propTypes: {
    percent: React.PropTypes.number.isRequired,
  },

  render() {
    const percent = this.props.percent;
    const style = { width: `${parseFloat(percent)}%` };
    let colorClass = 'is-green';
    if (percent >= 33 && percent < 66) colorClass = 'is-orange';
    else if (percent >= 66) colorClass = 'is-red';

    return (
      <div className="progress-bar-component">
        <span className={colorClass} style={style}></span>
      </div>
    );
  },
});

export default ProgressBar;
