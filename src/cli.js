import promptly from 'promptly';

const counter = () => {
  let count = 0;
  return () => {
    count += 1;
    return count;
  };
};

const count = counter();

export const engine = async (logicGame, gamePhrase) => {
  const { questionNumber, correctAnswer } = logicGame();
  const attempt = count();
  console.log('Welcome to the Brain Games!');
  const userName = await promptly.prompt('May I have your name?:');
  console.log(`Hello, ${userName}!`);
  console.log(gamePhrase);
  console.log('Question', questionNumber);
  const userAnswer = await promptly.prompt('Your answer:');
  if (userAnswer !== correctAnswer) {
    console.log(`'${userAnswer}' is wrong answer ;(. Correct answer was '${correctAnswer}'.\nLet's try again, ${userName}!`);
  }
  if (userAnswer === correctAnswer) {
    console.log('Question', questionNumber);
    if (attempt === 3) {
      console.log(`Congratulations, ${userName}!`);
    }
  }
};

// eslint-disable-next-line max-len
export const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export const askUserNumber = (questionNumber) => {
  console.log('Question', questionNumber);
};

export const isPrimeNumber = (number) => {
  for (let i = 2; i < number; i += 1) {
    if (number % i === 0) return false;
  }
  return number > 1;
};

export const incorrectAnswerPhrase = (userAnswer, name, rightAnswer) => {
  console.log(`'${userAnswer}' is wrong answer ;(. Correct answer was '${rightAnswer}'.\nLet's try again, ${name}!`);
};
