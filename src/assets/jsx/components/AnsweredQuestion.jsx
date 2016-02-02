import React from 'react';

var AnsweredQuestion = React.createClass({

    propTypes: {
      questionText: React.PropTypes.string.isRequired,
      userAnswer: React.PropTypes.string.isRequired,
      correctAnswer:  React.PropTypes.string.isRequired,
    },

    render: function() {

      let questionText = this.props.questionText;
      let userAnswer = this.props.userAnswer;
      let correctAnswer = this.props.correctAnswer;
      let isCorrect = (correctAnswer === userAnswer) ? true : false;
      let answerText;

      if (isCorrect) {
        answerText = (
          <p className="answered-text">
            <span className="result-correct">{userAnswer}</span>
          </p>
        );
      } else {
        answerText = (
          <p className="answered-text">
            <span className="result-wrong">{userAnswer}</span>
            <span className="correct-answer"> - the correct answer is {correctAnswer}</span>
          </p>
        );
      }

      return (
          <div className="answered-question-component">
            <p className="question-text">{questionText}</p>
            {answerText}
          </div>
      );
    }
});

export default AnsweredQuestion;
