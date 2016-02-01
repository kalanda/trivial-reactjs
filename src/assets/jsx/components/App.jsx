import React from 'react';
import ReactDOM from 'react-dom';

import Config from '../constants/Config';
import TypesOfQuestions from '../constants/TypesOfQuestions';

import Header from './Header';
import ProgressBar from './ProgressBar';
import Button from './Button';
import InputRadio from './InputRadio';
import AnsweredQuestion from './AnsweredQuestion';
import QuestionForm from './QuestionForm';
import GameProgress from './GameProgress';

var App = React.createClass({

    render : function() {

        let headerSubtitle;

        switch(Config.typeOfQuestions) {
          case TypesOfQuestions.ABOUT_YEARS:
                  headerSubtitle = "of years";
                  break;

          case TypesOfQuestions.ABOUT_NUMBERS:
                  headerSubtitle = "of numbers";
                  break;

          default: headerSubtitle = "";
        }

        return (
          <div className="app-component">
            <Header subtitle={headerSubtitle}/>
            <GameProgress
              currentQuestion={1}
              totalQuestions={Config.totalQuestions}
            />
            <QuestionForm
              questionText="What is the text of the question 1?"
              possibleAnswers={['1','4','5', '2001', '1323']}
              onUserAnswer={this.handleUserAnswer}
            />
            <AnsweredQuestion
              questionText="What is the text of the question 1?"
              userAnswer="29"
              correctAnswer="33"
              />
            <AnsweredQuestion
              questionText="What is the text of the question 2?"
              userAnswer="29"
              correctAnswer="29"
              />
          </div>
        );
    }
});

export default App;
