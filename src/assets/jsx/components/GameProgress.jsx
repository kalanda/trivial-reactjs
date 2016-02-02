import React from 'react';

var GameProgress = React.createClass({

    propTypes: {
      currentQuestionNumber: React.PropTypes.number.isRequired,
      totalQuestionsNumber: React.PropTypes.number.isRequired,
    },

    render: function() {

      let currentQuestionNumber = this.props.currentQuestionNumber;
      let totalQuestionsNumber = this.props.totalQuestionsNumber;


        return (
          <div className="game-progress-component">
            <p className="text">Question <strong>{currentQuestionNumber}</strong> of {totalQuestionsNumber}</p>
          </div>
        );

    }
});

export default GameProgress;
