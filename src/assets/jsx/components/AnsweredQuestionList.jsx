import React from 'react';

import AnsweredQuestion from './AnsweredQuestion';

var AnsweredQuestionList = React.createClass({

    propTypes: {
      questions: React.PropTypes.array.isRequired,
    },

    render: function() {

      let questions = this.props.questions;

      return (
          <div className="answered-question-list-component">
          {questions.map(function(question, index) {
            return(
              <AnsweredQuestion
                key={index}
                questionText={question.questionText}
                userAnswer={question.userAnswer}
                correctAnswer={question.correctAnswer}
              />
            );
          }, this)}
       </div>
      );
    }
});

export default AnsweredQuestionList;
