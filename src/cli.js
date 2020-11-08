import promptly from 'promptly';

export const userGreeting = async () => promptly.prompt('May I have your name?:');

export const numberGenRandom = () => Math.floor(Math.random() * 100 + 1);

export const askUserNumber = (questionNumber) => {
  console.log('Question', questionNumber);
};
