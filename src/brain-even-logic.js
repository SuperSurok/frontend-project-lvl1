import promptly from 'promptly';

let guessNumber = 0;

const userGreeting = async () => (
  promptly.prompt('May I have your name?:')
);

const numberGenRandom = () => Math.floor((Math.random() * 100) + 1);

const askUserNumber = (questionNumber) => {
  console.log('Question', questionNumber);
};

const decrement = () => (() => {
  guessNumber += 1;
  return guessNumber;
});

const playConditions = async (userName) => {
  const counter = decrement();
  const continueAnswerPhrase = 'Correct!';
  const winnerPhrase = `Congratulations, ${userName}!`;
  const questionNumber = numberGenRandom();

  askUserNumber(questionNumber);

  await promptly.prompt('Your answer:')
    .then((response) => {
      const userAnswerPhrase = response === 'yes' ? 'no' : 'yes';
      const incorrectAnswerPhrase = (responseAnswer, correctPhrase, name) => (
        console.log(`'${responseAnswer}' is wrong answer ;(. Correct answer was '${correctPhrase}'.\nLet's try again, ${name}!`)
      );

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
