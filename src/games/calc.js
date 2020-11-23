import promptly from 'promptly';
import {
  //
  engine,
  getRandomNumber,
  askUserNumber,
  incorrectAnswerPhrase,
} from '../cli.js';

let guessNumber = 0;

const decrement = () => () => {
  guessNumber += 1;
  return guessNumber;
};

const guessExpression = (userName) => {
  const counter = decrement();
  const continueAnswerPhrase = 'Correct!';
  const num1 = getRandomNumber(1, 100);
  const num2 = getRandomNumber(1, 100);
  const mathSignsArr = ['+', '-', '*'];
  const winnerPhrase = `Congratulations, ${userName}!`;
  const randomMathSign = mathSignsArr[Math.floor(Math.random() * mathSignsArr.length)];
  const questionExpression = `${num1} ${randomMathSign} ${num2}`;
  let result;

  switch (randomMathSign) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    default:
      break;
  }

  askUserNumber(questionExpression);
  promptly.prompt('Your answer:').then((userAnswer) => {
    if (Number(userAnswer) === result) {
      console.log(continueAnswerPhrase);
    }

    counter();

    if (Number(userAnswer) === result) {
      return guessNumber === 3 ? console.log(winnerPhrase) : guessExpression(userName);
    }

    return incorrectAnswerPhrase(userAnswer, userName, result);
  });
};

const calc = () => {
  engine().then((userName) => guessExpression(userName));
};

export default calc;
