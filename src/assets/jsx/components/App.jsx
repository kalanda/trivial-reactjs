import React from 'react';
import ReactDOM from 'react-dom';

import { config, TypeOfQuestions } from '../config';

import Header from './Header';
import ProgressBar from './ProgressBar';
import Button from './Button';
import InputRadio from './InputRadio';
import AnsweredQuestion from "./AnsweredQuestion";

var App = React.createClass({

    timer : undefined,

    getInitialState : function() {
      return {
        elapsed: 0.0
      }
    },

    componentDidMount: function() {
      this.timer = setInterval(this.tick, 100);
    },

    componentWillUnmount: function(){
        clearInterval(this.timer);
    },

    tick: function(){
        let currentElapsed = this.state.elapsed;
        let newElapsed = (currentElapsed >= 30) ? 0 : currentElapsed+0.1;
        this.setState({elapsed: newElapsed });
    },

    testClick: function(event) {
      console.log('clicked');
    },

    render : function() {

        let percent = (100*this.state.elapsed)/30;
        let headerSubtitle;

        switch(config.typeOfQuestions) {
          case TypeOfQuestions.YEARS:
                  headerSubtitle = "of years";
                  break;

          case TypeOfQuestions.NUMBERS:
                  headerSubtitle = "of numbers";
                  break;

          default: headerSubtitle = "";
        }

        return (
          <div className="app-component">
            <Header subtitle={headerSubtitle}/>
            <br/>
            <ProgressBar percent={percent} />
            <br/>
            <InputRadio
              id="answer-option-1"
              name="answer-option"
              label="This is the label 1"
              value="1" />
            <br/>
            <InputRadio
              id="answer-option-2"
              name="answer-option"
              label="This is the label 2"
              value="2" />
            <br/>
            <p><Button text="Start" onClick={this.testClick} /></p>
            <br/>
            <p><Button text="End" /></p>

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
