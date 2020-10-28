import promptly from 'promptly';

const userGreeting = async () => (
  promptly.prompt('May I have your name?:')
);

export default userGreeting;
