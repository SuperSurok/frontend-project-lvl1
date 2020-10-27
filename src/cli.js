import promptly from 'promptly';

const userGreeting = async () => (
    await promptly.prompt('May I have your name?:')
);

export default userGreeting;