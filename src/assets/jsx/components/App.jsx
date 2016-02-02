import React from 'react';
import ReactDOM from 'react-dom';

import Config from '../constants/Config';
import TypesOfQuestions from '../constants/TypesOfQuestions';

import Header from './Header';
import Welcome from './Welcome';
import GameProgress from './GameProgress';
import QuestionForm from './QuestionForm';
import AnsweredQuestionList from './AnsweredQuestionList';
import GameResults from './GameResults';
import GameOver from './GameOver';

import * as QuestionsFactory from '../utils/QuestionsFactory';

var App = React.createClass({

    /**
     * Returns the initial state for the application
     * @return {object} Initial state
     */
    getInitialState: function() {
      return {
        gameStarted : false,
        gameOver : false,
        gameFinished : false,
        currentQuestionNumber : 0,
        totalQuestionsNumber : Config.totalQuestions,
        currentQuestion : null,
        answeredQuestions : [],
        correctAnswers : 0
      }
    },

    /**
     * Starts the game
     */
    startGame : function(){

      this.setState( Object.assign(this.getInitialState(), {
        gameStarted: true,
      }));

      this.fetchNewQuestion();
    },

    /**
     * Go to next question
     */
    gotoNextQuestion : function(){

      let { currentQuestionNumber, totalQuestionsNumber } = this.state;
      let isLast = (currentQuestionNumber == totalQuestionsNumber) ? true : false;

      if (!isLast) this.fetchNewQuestion();
      else this.endWithResults();
    },

    /**
     * Finishes the game showing game over screen
     */
    endWithGameOver : function(){
      this.setState( Object.assign(this.getInitialState(), {
        gameStarted: true,
        gameOver : true,
      }));
    },

    /**
     * Finishes showing the results
     */
    endWithResults : function(){
      this.setState({
        gameFinished : true,
        currentQuestionNumber : 0,
        currentQuestion : null,
      });
    },

    /**
     * Generates a new question using the QuestionsFactory
     */
    fetchNewQuestion : function(){

      this.setState({ currentQuestion : null });

      QuestionsFactory.generateQuestion(function(question){
        console.log('new question', question);
        this.setState({
          currentQuestion : question,
          currentQuestionNumber : this.state.currentQuestionNumber+1,
        })
      }.bind(this));
    },

    /**
     * Handles the answer from the users from current question form
     * @param  {string} userAnswer [description]
     */
    handleUserAnswer : function(userAnswer){

      let correctAnswers = this.state.correctAnswers;

      let answeredQuestion = {
        questionText : this.state.currentQuestion.questionText,
        userAnswer: userAnswer,
        correctAnswer: this.state.currentQuestion.correctAnswer
      };

      if (answeredQuestion.correctAnswer == answeredQuestion.userAnswer) {
        correctAnswers++;
      }

      this.setState({
        answeredQuestions : [answeredQuestion].concat(this.state.answeredQuestions),
        correctAnswers : correctAnswers
      });

      this.gotoNextQuestion();
    },

    /**
     * Render
     */
    render : function() {

        let {
              gameOver,
              gameStarted,
              gameFinished,
              currentQuestion,
              answeredQuestions,
              currentQuestionNumber,
              totalQuestionsNumber,
              correctAnswers,
            } = this.state;

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

            { !gameStarted ? (<Welcome onClickStart={this.startGame}/>) : null }

            { currentQuestionNumber > 0 ? (
              <GameProgress
                currentQuestionNumber={currentQuestionNumber}
                totalQuestionsNumber={totalQuestionsNumber}
              /> ) : null
            }

            { currentQuestion ? (
                    <QuestionForm
                      questionText={currentQuestion.questionText}
                      possibleAnswers={currentQuestion.possibleAnswers}
                      onUserAnswer={this.handleUserAnswer}
                      onTimeout={this.endWithGameOver}
                    />) : null
            }

            { gameFinished ? (
              <GameResults
                correctAnswers={correctAnswers}
                totalAnswers={totalQuestionsNumber}
                onClickRestart={this.startGame}
              />) : null
            }

            { gameOver ? (<GameOver onClickRestart={this.startGame}/>) : null }

            <AnsweredQuestionList
              questions={answeredQuestions}
            />

          </div>
        );
    }
});

export default App;
