import React from 'react';
import Button from './Button';

var GameResults = React.createClass({

  propTypes: {
    correctAnswers: React.PropTypes.number.isRequired,
    totalAnswers: React.PropTypes.number.isRequired,
    onClickRestart: React.PropTypes.func.isRequired,
  },

  handleOnClickRestart: function(event){
    if (this.props.onClickRestart) this.props.onClickRestart(event);
  },

  render: function() {

    let correctAnswers =  this.props.correctAnswers;
    let totalAnswers =  this.props.totalAnswers;

    return (
      <div className="game-results-component">
        <h1>You are right {correctAnswers} of {totalAnswers} questions!</h1>
        <Button text="Play again" onClick={this.handleOnClickRestart} />
      </div>
    );
  }
});

export default GameResults;
