import React from 'react';
import Button from './Button';

const GameOver = React.createClass({

  propTypes: {
    onClickRestart: React.PropTypes.func.isRequired,
  },

  handleOnClickRestart(event) {
    if (this.props.onClickRestart) this.props.onClickRestart(event);
  },

  render() {
    return (
      <div className="game-over-component">
        <h1>GAME OVER</h1>
        <p>You've spent too much time to answer</p>
        <Button text="Play again" onClick={this.handleOnClickRestart} />
      </div>
    );
  },
});

export default GameOver;
