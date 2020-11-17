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
  const winnerPhrase = `Congratulations, ${userName}!`;
  const questionExpression = `${num1} ${num2}`;
  const gcd = (a, b) => (!b ? a : gcd(b, a % b));
  const result = gcd(num1, num2);

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

const nodLogic = async () => {
  console.log('Welcome to the Brain Games!');
  let userName;

  userGreeting()
    .then((response) => {
      userName = response;
      console.log(`Hello, ${response}!`);
    })
    .then(() => {
      console.log('Find the greatest common divisor of given numbers.');
    })
    .then(() => guessExpression(userName));
};

export default nodLogic;
