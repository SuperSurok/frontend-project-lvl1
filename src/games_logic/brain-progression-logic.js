import promptly from 'promptly';
import { userGreeting, askUserNumber, numberGenProgression } from '../cli.js';

let guessNumber = 0;

const decrement = () => () => {
  guessNumber += 1;
  return guessNumber;
};

const guessExpression = async (userName) => {
  const continueAnswerPhrase = 'Correct!';
  const winnerPhrase = `Congratulations, ${userName}!`;
  const counter = decrement();
  let num1 = numberGenProgression(1, 30);
  const num2 = numberGenProgression(1, 10);
  const maskNum1 = numberGenProgression(0, 9);
  const progression = [];

  for (let i = 0; i <= 10; i += 1) {
    progression.push((num1 += num2));
  }

  const result = progression[maskNum1];
  progression[maskNum1] = '..';

  askUserNumber(progression.join(' '));
  await promptly.prompt('Your answer:').then((response) => {
    const userAnswerPhrase = Number(response) === result ? continueAnswerPhrase : `${response} is wrong answer ;(. Correct answer was ${result}.\nLet's try again, ${userName}!`;
    console.log(userAnswerPhrase);
    const incorrectAnswerPhrase = (responseAnswer, correctResult, name) => console.log(`'${responseAnswer}' is wrong answer ;(. Correct answer was '${correctResult}'.\nLet's try again, ${name}!`);

    counter();

    if (Number(response) === result) {
      return guessNumber === 3 ? console.log(winnerPhrase) : guessExpression(userName);
    }
    return incorrectAnswerPhrase(response, result, userName);
  });
};

const progressionLogic = async () => {
  console.log('Welcome to the Brain Games!');
  let userName;

  userGreeting()
    .then((response) => {
      userName = response;
      console.log(`Hello, ${response}!`);
    })
    .then(() => {
      console.log('What number is missing in the progression?');
    })
    .then(() => guessExpression(userName));
};

export default progressionLogic;