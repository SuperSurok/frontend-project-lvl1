#!/usr/bin/env node
import { engine } from '../src/cli.js';

console.log('Welcome to the Brain Games!');
engine().then((response) => console.log(`Hello, ${response}!`));
