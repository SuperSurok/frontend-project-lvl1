import promptly from 'promptly';
import {
  //
  askUserNumber,
  incorrectAnswerPhrase,
  numberGenRandom,
  userGreeting,
} from '../cli.js';

let guessNumber = 0;

const counter = () => () => {
  guessNumber += 1;
  return guessNumber;
};

const userResponse = (questionNumber, userAnswer) => (questionNumber % 2 === 0 && userAnswer === 'yes') || (questionNumber % 2 !== 0 && userAnswer === 'no');

const playConditions = (userName) => {
  const count = counter();
  const continueAnswerPhrase = 'Correct!';
  const winnerPhrase = `Congratulations, ${userName}!`;
  const questionNumber = numberGenRandom();

  askUserNumber(questionNumber);

  promptly.prompt('Your answer:').then((userAnswer) => {
    const rightAnswer = userAnswer === 'yes' ? 'no' : 'yes';
    count();
    if (userResponse(questionNumber, userAnswer)) {
      console.log(continueAnswerPhrase);
      if (guessNumber < 3) {
        return playConditions(userName);
      }
      console.log(winnerPhrase);
    } else {
      return incorrectAnswerPhrase(userAnswer, userName, rightAnswer);
    }
    return true;
  });
};

const even = () => {
  userGreeting().then((userName) => playConditions(userName));
};

export default even;
