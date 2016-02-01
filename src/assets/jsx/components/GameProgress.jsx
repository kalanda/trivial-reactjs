import React from 'react';

var GameProgress = React.createClass({

    propTypes: {
      currentQuestion: React.PropTypes.number.isRequired,
      totalQuestions: React.PropTypes.number.isRequired,
    },

    render: function() {

      let currentQuestion = this.props.currentQuestion;
      let totalQuestions = this.props.totalQuestions;

      return (
        <div className="game-progress-component">
          <p className="text">Question <strong>{currentQuestion}</strong> of {totalQuestions}</p>
        </div>
      );
    }
});

export default GameProgress;
