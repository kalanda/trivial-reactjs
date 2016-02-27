import React from 'react';

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

const App = React.createClass({

  /**
   * Returns the initial state for the application
   * @return {object} Initial state
   */
  getInitialState() {
    return {
      isGameStarted: false,
      isGameOver: false,
      isGameFinished: false,
      currentQuestionNumber: 0,
      totalQuestionsNumber: Config.totalQuestions,
      currentQuestion: null,
      answeredQuestions: [],
      correctAnswers: 0,
    };
  },

  /**
   * Starts the game
   */
  startGame() {
    this.setState(Object.assign(this.getInitialState(), {
      isGameStarted: true,
    }));

    this.fetchNewQuestion();
  },

  /**
   * Go to next question
   */
  gotoNextQuestion() {
    const { currentQuestionNumber, totalQuestionsNumber } = this.state;
    const isLast = (currentQuestionNumber === totalQuestionsNumber);

    if (!isLast) this.fetchNewQuestion();
    else this.endWithResults();
  },

  /**
   * Finishes the game showing game over screen
   */
  endWithGameOver() {
    this.setState(Object.assign(this.getInitialState(), {
      isGameStarted: true,
      isGameOver: true,
    }));
  },

  /**
   * Finishes showing the results
   */
  endWithResults() {
    this.setState({
      isGameFinished: true,
      currentQuestionNumber: 0,
      currentQuestion: null,
    });
  },

  /**
   * Generates a new question using the QuestionsFactory
   */
  fetchNewQuestion() {
    QuestionsFactory.generateQuestion((question) => {
      this.setState({
        currentQuestion: question,
        currentQuestionNumber: this.state.currentQuestionNumber + 1,
      });
    });
  },

  /**
   * Handles the answer from the users from current question form
   * @param  {string} userAnswer [description]
   */
  handleUserAnswer(userAnswer) {
    let correctAnswers = this.state.correctAnswers;
    const answeredQuestion = {
      questionText: this.state.currentQuestion.questionText,
      userAnswer,
      correctAnswer: this.state.currentQuestion.correctAnswer,
    };

    if (answeredQuestion.correctAnswer === answeredQuestion.userAnswer) {
      correctAnswers++;
    }

    this.setState({
      answeredQuestions: [answeredQuestion].concat(this.state.answeredQuestions),
      correctAnswers,
    });

    this.gotoNextQuestion();
  },

  /**
   * Render
   */
  render() {
    const {
          isGameOver,
          isGameStarted,
          isGameFinished,
          currentQuestion,
          answeredQuestions,
          currentQuestionNumber,
          totalQuestionsNumber,
          correctAnswers,
        } = this.state;

    let headerSubtitle;

    switch (Config.typeOfQuestions) {
      case TypesOfQuestions.ABOUT_YEARS:
        headerSubtitle = 'of years';
        break;

      case TypesOfQuestions.ABOUT_NUMBERS:
        headerSubtitle = 'of numbers';
        break;

      default:
        headerSubtitle = '';
    }

    return (
      <div className="app-component">

        <Header subtitle={headerSubtitle} />

        { !isGameStarted ? (<Welcome onClickStart={this.startGame} />) : null }

        { currentQuestionNumber > 0 ? (
          <GameProgress
            currentQuestionNumber={currentQuestionNumber}
            totalQuestionsNumber={totalQuestionsNumber}
          />) : null
        }

        { currentQuestion ? (
          <QuestionForm
            questionText={currentQuestion.questionText}
            possibleAnswers={currentQuestion.possibleAnswers}
            onUserAnswer={this.handleUserAnswer}
            onTimeout={this.endWithGameOver}
          />) : null
        }

        { isGameFinished ? (
          <GameResults
            correctAnswers={correctAnswers}
            totalAnswers={totalQuestionsNumber}
            onClickRestart={this.startGame}
          />) : null
        }

        { isGameOver ? (
          <GameOver
            onClickRestart={this.startGame}
          />) : null }

        <AnsweredQuestionList
          questions={answeredQuestions}
        />

      </div>
    );
  },
});

export default App;
