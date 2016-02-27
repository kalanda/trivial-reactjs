import $ from 'jquery';
import TypesOfQuestions from '../constants/TypesOfQuestions';
import Config from '../constants/Config';

function componseQuestion(data) {
  const fact = data.text;

  const question = {
    questionText: '',
    possibleAnswers: [],
    correctAnswer: '',
  };

  const firstWord = fact.match(/^\w+/g)[0];
  const secondWord = fact.match(/\w+/g)[1];

  question.questionText = fact.replace(/^\w+/g, 'What');

  if (secondWord === 'BC') {
    question.questionText = question.questionText.replace(' BC', '');
    question.correctAnswer = `${firstWord} BC`;
  } else {
    question.correctAnswer = `${firstWord}`;
  }

  question.questionText = question.questionText.replace('.', '?');

  // Generate possible answers
  const baseNumber = parseInt(firstWord, 10);
  const randomPositionForCorrectAnswer = Math.floor((Math.random() * 4));
  const randomOptions = [];

  for (let i = 0; i < 3; i++) {
    const random = Math.floor((Math.random() * 100) + 1);
    const newNumber = (i % 2) ? baseNumber - random : baseNumber + random;
    randomOptions.push(newNumber);
  }

  let index = 0;
  for (let i = 0; i < 4; i++) {
    if (i === randomPositionForCorrectAnswer) {
      question.possibleAnswers.push(question.correctAnswer);
    } else {
      let answer = randomOptions[index];
      index++;

      // Put "BC" to negative years
      if (Config.typeOfQuestions === TypesOfQuestions.ABOUT_YEARS && answer < 0) {
        answer = `${answer * (-1)} BC`;
      }
      question.possibleAnswers.push(`${answer}`);
    }
  }

  return question;
}

export function generateQuestion(successCallback) {
  let url = '';

  switch (Config.typeOfQuestions) {
    case TypesOfQuestions.ABOUT_YEARS:
      url = `${Config.numbersApiBaseUrl}/random/year/`;
      break;

    default:
    case TypesOfQuestions.ABOUT_NUMBERS:
      url = `${Config.numbersApiBaseUrl}/random/`;
      break;
  }

  $.ajax({
    dataType: 'json',
    url: `${url}?json`, // &fragment',
    success: (data) => {
      const question = componseQuestion(data);
      successCallback(question);
    },
  });
}
