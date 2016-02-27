import React from 'react';

const GameProgress = React.createClass({

  propTypes: {
    currentQuestionNumber: React.PropTypes.number.isRequired,
    totalQuestionsNumber: React.PropTypes.number.isRequired,
  },

  render() {
    const currentQuestionNumber = this.props.currentQuestionNumber;
    const totalQuestionsNumber = this.props.totalQuestionsNumber;

    return (
      <div className="game-progress-component">
        <p className="text">
          Question <strong>{currentQuestionNumber}</strong> of {totalQuestionsNumber}
        </p>
      </div>
    );
  },
});

export default GameProgress;
