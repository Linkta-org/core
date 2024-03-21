import { ChainOfThought } from '../types';

class Prompts {
  constructor() {}

  oneShot(prompt: string): string {}

  zeroShot(prompt: string): string {}

  chainOfThought(prompt: string): ChainOfThought {}
}

export default Prompts;
