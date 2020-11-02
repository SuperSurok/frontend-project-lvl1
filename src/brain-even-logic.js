import promptly from 'promptly';

import userGreeting from './cli.js';

const numberGenRandom = () => Math.floor((Math.random() * 100) + 1);

const askUserNumber = (questionNumber) => {
    console.log('Question', questionNumber);
};

export const playConditions = async (userName) => {
    let counter = 0;
    const continueAnswerPhrase = 'Correct!';
    const winnerPhrase = `Congratulations, ${userName}!}`;
    const questionNumber = numberGenRandom();

    const decrement = (num) => {
        let temp = num;
        temp += 1;
        return temp;
    };

    askUserNumber(questionNumber);

    await promptly.prompt('Your answer:')
        .then((response) => {
            const correctAnswerPhrase = response === 'yes' ? 'no' : 'yes';
            const incorrectAnswerPhrase = `${response} is wrong answer ;(. Correct answer was ${correctAnswerPhrase}. Let's try again, ${userName}!`;
            if ((questionNumber % 2 === 0 && response === 'yes') || (questionNumber % 2 !== 0 && response === 'no')) {
                console.log(continueAnswerPhrase);
                decrement(counter);
                askUserNumber(questionNumber);
                playConditions(userName);
                if (counter === 3) {
                    console.log(winnerPhrase);
                }
            } else {
                console.log(incorrectAnswerPhrase);
                console.log('make lint');
            }
        });
};

export const brainEvenLogic = () => {
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
