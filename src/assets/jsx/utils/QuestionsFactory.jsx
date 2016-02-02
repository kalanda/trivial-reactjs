import $ from 'jquery';
import TypesOfQuestions from '../constants/TypesOfQuestions';
import Config from '../constants/Config'

export function generateQuestion(successCallback) {

  let url = '';

  switch(Config.typeOfQuestions) {
    case TypesOfQuestions.ABOUT_YEARS:
      url = Config.numbersApiBaseUrl+'/random/year/';
      break;

    case TypesOfQuestions.ABOUT_NUMBERS:
      url = Config.numbersApiBaseUrl+'/random/';
      break;
  }

  $.ajax({
    dataType: 'json',
    url: url+'?json', //&fragment',
    success: function(data){
      var question = componseQuestion(data);
      successCallback(question);
    }.bind(this)
  });
}

function componseQuestion(data) {

  var fact = data.text;

  var question = {
    questionText : '',
    possibleAnswers : [],
    correctAnswer : ''
  }

  let firstWord = fact.match(/^\w+/g)[0];
  let secondWord = fact.match(/\w+/g)[1];

  question.questionText = fact.replace(/^\w+/g, "What");

  if (secondWord == 'BC') {
    question.questionText = question.questionText.replace(" BC", "");
    question.correctAnswer = firstWord+' BC';
  } else {
    question.correctAnswer = firstWord+'';
  }

  question.questionText = question.questionText+'?';

  // Generate possible answers
  let baseNumber = parseInt(firstWord);
  let randomPositionForCorrectAnswer = Math.floor((Math.random() * 4));
  let randomOptions = [];

  for (let i=0; i<3; i++) {
    var random = Math.floor((Math.random() * 100)+1);
    var newNumber = (i % 2 && Config.typeOfQuestions == TypesOfQuestions.ABOUT_YEARS) ? baseNumber-random : baseNumber+random;
    randomOptions.push(newNumber);
  }

  var index = 0;
  for (let i=0; i<4; i++){

    if (i == randomPositionForCorrectAnswer) {
      question.possibleAnswers.push(question.correctAnswer);
    }
    else {

      let answer = randomOptions[index];
      index++;

      // Put "BC" to negative years
      if (Config.typeOfQuestions == TypesOfQuestions.ABOUT_YEARS && answer < 0) {
        answer = answer*(-1)+' BC';
      }
      question.possibleAnswers.push(answer+'');
    }
  }

  return question;
}
