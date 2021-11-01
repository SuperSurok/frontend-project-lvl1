import promptly from 'promptly';
import {
  askUserNumber,
  incorrectAnswerPhrase,
  getRandomNumber,
  engine,
} from '../cli.js';

const counter = () => {
  let count = 0;
  return () => {
    count += 1;
    return count;
  };
};

const count = counter();

const getCorrectAnswer = (number) => (number % 2 === 0 ? 'yes' : 'no');
const gamePhrase = 'Answer "yes" if the number is even, otherwise answer "no".';

const playConditions = (userName) => {
  const continueAnswerPhrase = 'Correct!';
  const winnerPhrase = `Congratulations, ${userName}!`;
  const questionNumber = getRandomNumber(1, 100);

  askUserNumber(questionNumber);

  promptly.prompt('Your answer:').then((userAnswer) => {
    const rightAnswer = userAnswer === 'yes' ? 'no' : 'yes';
    if (getCorrectAnswer(questionNumber) === userAnswer) {
      console.log(continueAnswerPhrase);
      if (count() < 3) {
        return playConditions(userName);
      }
      console.log(winnerPhrase);
    } else {
      return incorrectAnswerPhrase(userAnswer, userName, rightAnswer);
    }
    return true;
  });
};

const getQuestionAndAnswer = () => {
  const questionNumber = getRandomNumber(1, 100);
  const correctAnswer = getCorrectAnswer(questionNumber);
  return { questionNumber, correctAnswer };
};

const even = async () => {
  await engine(getQuestionAndAnswer, gamePhrase);
};

export default even;
