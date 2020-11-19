import promptly from 'promptly';

export const userGreeting = () => {
  console.log('Welcome to the Brain Games!');
  return promptly.prompt('May I have your name?:').then((userName) => {
    console.log(`Hello, ${userName}!`);
    console.log('Answer "yes" if the number is even, otherwise answer "no".');
    return userName;
  });
};

export const numberGenRandom = () => Math.floor(Math.random() * 100 + 1);

export const numberGenProgression = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export const askUserNumber = (questionNumber) => {
  console.log('Question', questionNumber);
};

export const primeNumber = (number) => {
  for (let i = 2; i < number; i += 1) {
    if (number % i === 0) return false;
  }
  return number > 1;
};

export const incorrectAnswerPhrase = (responseAnswer, name) => {
  const userAnswerPhrase = responseAnswer === 'yes' ? 'no' : 'yes';
  console.log(`'${responseAnswer}' is wrong answer ;(. Correct answer was '${userAnswerPhrase}'.\nLet's try again, ${name}!`);
};
