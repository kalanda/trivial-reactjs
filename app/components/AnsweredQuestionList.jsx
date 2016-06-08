import React from 'react';

import AnsweredQuestion from './AnsweredQuestion';

const AnsweredQuestionList = React.createClass({

  propTypes: {
    questions: React.PropTypes.array.isRequired,
  },

  render() {
    const questions = this.props.questions;

    return (
      <div className="answered-question-list-component">
      {questions.map((question, index) => {
        return (
          <AnsweredQuestion
            key={index}
            questionText={question.questionText}
            userAnswer={question.userAnswer}
            correctAnswer={question.correctAnswer}
          />
        );
      })}
      </div>
    );
  },
});

export default AnsweredQuestionList;
