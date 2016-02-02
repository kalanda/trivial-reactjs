import React from 'react';
import Config from '../constants/Config';
import TypesOfQuestions from '../constants/TypesOfQuestions';
import Button from './Button';

var Welcome = React.createClass({

    propTypes: {
      onClickStart: React.PropTypes.func.isRequired,
    },

    handleOnClickStart: function(event){
      if (this.props.onClickStart) this.props.onClickStart(event);
    },

    render: function() {

      var text;

      switch(Config.typeOfQuestions) {
        case TypesOfQuestions.ABOUT_YEARS:
          text = 'In this trivial you will test your knowledge about the years in which certain facts they occurred. (In which year was America discovered?) ';
          break;

        case TypesOfQuestions.ABOUT_NUMBERS:
          text = 'In this trivial you will test your knowledge on mathematical data. (how many faces has a triangle?)';
          break;
      }

      return (
        <div className="welcome-component">
          <p className="text">{text}</p>
          <Button text="Start" onClick={this.handleOnClickStart}/>
        </div>
      );
    }
});

export default Welcome;
