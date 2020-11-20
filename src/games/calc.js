import promptly from 'promptly';
import {
  //
  userGreeting,
  numberGenRandom,
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
  const num1 = numberGenRandom();
  const num2 = numberGenRandom();
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

    if (Number(response) === result) {
      return guessNumber === 3 ? console.log(winnerPhrase) : guessExpression(userName);
    }
    return incorrectAnswerPhrase(response, result, userName);
  });
};

const calc = () => {
  userGreeting().then((userName) => guessExpression(userName));
};

export default calc;
