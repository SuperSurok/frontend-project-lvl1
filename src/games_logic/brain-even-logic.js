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

const playConditions = async (userName) => {
  const counter = decrement();
  const continueAnswerPhrase = 'Correct!';
  const winnerPhrase = `Congratulations, ${userName}!`;
  const questionNumber = numberGenRandom();

  askUserNumber(questionNumber);

  await promptly.prompt('Your answer:').then((response) => {
    const userAnswerPhrase = response === 'yes' ? 'no' : 'yes';

    counter();

    if ((questionNumber % 2 === 0 && response === 'yes') || (questionNumber % 2 !== 0 && response === 'no')) {
      console.log(continueAnswerPhrase);
      return guessNumber === 3 ? console.log(winnerPhrase) : playConditions(userName);
    }
    return incorrectAnswerPhrase(response, userAnswerPhrase, userName);
  });
};

const brainEvenLogic = () => {
  console.log('Welcome to the Brain Games!');
  let userName;
  userGreeting()
    .then((response) => {
      userName = response;
      console.log(`Hello, ${response}!`);
    })
    .then(() => console.log('Answer "yes" if the number is even, otherwise answer "no".'))
    .then(() => playConditions(userName));
};

export default brainEvenLogic;
