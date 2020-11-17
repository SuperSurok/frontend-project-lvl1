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

const guessExpression = async (userName) => {
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
  await promptly.prompt('Your answer:').then((response) => {
    const userAnswerPhrase = Number(response) === result ? continueAnswerPhrase : `${response} is wrong answer ;(. Correct answer was ${result}.\nLet's try again, ${userName}!`;
    console.log(userAnswerPhrase);

    counter();

    if (Number(response) === result) {
      return guessNumber === 3 ? console.log(winnerPhrase) : guessExpression(userName);
    }
    return incorrectAnswerPhrase(response, result, userName);
  });
};

const brainCalcLogic = async () => {
  console.log('Welcome to the Brain Games!');
  let userName;
  userGreeting()
    .then((response) => {
      userName = response;
      console.log(`Hello, ${response}!`);
    })
    .then(() => {
      console.log('What is the result of the expression?');
    })
    .then(() => guessExpression(userName));
};

export default brainCalcLogic;
