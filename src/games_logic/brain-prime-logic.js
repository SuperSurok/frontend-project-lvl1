import promptly from 'promptly';

import {
  //
  userGreeting,
  askUserNumber,
  numberGenProgression,
  primeNumber,
} from '../cli.js';

let guessNumber = 0;

const decrement = () => () => {
  guessNumber += 1;
  return guessNumber;
};

const guessExpression = async (userName) => {
  const continueAnswerPhrase = 'Correct!';
  const winnerPhrase = `Congratulations, ${userName}!`;
  const counter = decrement();
  const randomNumber = numberGenProgression(1, 30);

  const result = primeNumber(randomNumber);
  askUserNumber(randomNumber);
  await promptly.prompt('Your answer:').then((response) => {
    const userAnswerPhrase = (response === 'yes' && result) || (response === 'no' && !result) ? 'yes' : 'no';
    console.log("response === 'yes': ", response === 'yes' && result);
    console.log(userAnswerPhrase);
    const incorrectAnswerPhrase = (responseAnswer, correctResult, name) => console.log(`'${responseAnswer}' is wrong answer ;(. Correct answer was '${correctResult}'.\nLet's try again, ${name}!`);

    counter();

    if ((response === 'yes' && result) || (response === 'no' && !result)) {
      console.log(continueAnswerPhrase);
      return guessNumber === 3 ? console.log(winnerPhrase) : guessExpression(userName);
    }
    return incorrectAnswerPhrase(response, randomNumber, userName);
  });
};

const primeLogic = async () => {
  console.log('Welcome to the Brain Games!');
  let userName;

  userGreeting()
    .then((response) => {
      userName = response;
      console.log(`Hello, ${response}!`);
    })
    .then(() => {
      console.log('Answer "yes" if given number is prime. Otherwise answer "no".');
    })
    .then(() => guessExpression(userName));
};

export default primeLogic;
