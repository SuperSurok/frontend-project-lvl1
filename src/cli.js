import promptly from 'promptly';

export const engine = () => {
  console.log('Welcome to the Brain Games!');
  return promptly.prompt('May I have your name?:').then((userName) => {
    console.log(`Hello, ${userName}!`);
    console.log('Answer "yes" if the number is even, otherwise answer "no".');
    return userName;
  });
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
