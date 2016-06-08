import React from 'react';
import Config from '../constants/Config';
import InputRadio from './InputRadio';
import Button from './Button';
import ProgressBar from './ProgressBar';

const QuestionForm = React.createClass({

  propTypes: {
    questionText: React.PropTypes.string.isRequired,
    possibleAnswers: React.PropTypes.array.isRequired,
    onUserAnswer: React.PropTypes.func.isRequired,
    onTimeout: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      elapsedTime: 0.0,
      selectedAnswer: undefined,
    };
  },

  componentDidMount() {
    this.timer = setInterval(this.tickTimer, 1000);
  },

  componentWillUnmount() {
    clearInterval(this.timer);
  },

  tickTimer() {
    const currentElapsed = this.state.elapsedTime;

    if (currentElapsed >= Config.maxSecondsToAnswer) {
      clearInterval(this.timer);
      if (this.props.onTimeout) this.props.onTimeout();
    } else {
      this.setState({ elapsedTime: currentElapsed + 1 });
    }
  },

  handleChange(event) {
    this.setState({
      selectedAnswer: event.target.value,
    });
  },

  handleSubmit(event) {
    event.preventDefault();

    const selectedAnswer = this.state.selectedAnswer;
    const onUserAnswer = this.props.onUserAnswer;

    if (selectedAnswer) {
      if (onUserAnswer) {
        onUserAnswer(selectedAnswer);
        this.setState(this.getInitialState());
      }
    }
  },

  render() {
    const questionText = this.props.questionText;
    const possibleAnswers = this.props.possibleAnswers;
    const timerPercent = (100 * this.state.elapsedTime) / Config.maxSecondsToAnswer;
    const selectedAnswer = this.state.selectedAnswer;

    return (
      <form className="question-form-component" onSubmit={this.handleSubmit}>
        <ProgressBar percent={timerPercent} />
        <p className="question-text">{questionText}</p>
        <fieldset className="fieldset">
          {possibleAnswers.map((answer, index) => {
            return (
              <InputRadio
                key={index}
                id={`answer-option-${index}`}
                name="answer-option"
                label={answer}
                value={answer}
                checked={selectedAnswer === answer}
                onChange={this.handleChange}
              />
            );
          }, this)}
        </fieldset>
        <p>
          <Button
            text="Accept"
            disabled={!this.state.selectedAnswer}
          />
        </p>
      </form>
    );
  },
});

export default QuestionForm;
