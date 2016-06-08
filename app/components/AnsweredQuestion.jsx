import React from 'react';

const AnsweredQuestion = React.createClass({

  propTypes: {
    questionText: React.PropTypes.string.isRequired,
    userAnswer: React.PropTypes.string.isRequired,
    correctAnswer: React.PropTypes.string.isRequired,
  },

  render() {
    const questionText = this.props.questionText;
    const userAnswer = this.props.userAnswer;
    const correctAnswer = this.props.correctAnswer;
    const isCorrect = (correctAnswer === userAnswer);
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
  },
});

export default AnsweredQuestion;
