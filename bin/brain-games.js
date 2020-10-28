#!/usr/bin/env node
import userGreeting from '../src/cli.js';

console.log('Welcome to the Brain Games!');
userGreeting().then((response) => console.log(`Hello, ${response}!`));
