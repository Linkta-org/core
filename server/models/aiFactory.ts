import Gemini from "./gemini";

export type AiTypes = 'gemini';

export default function createAi(ai: AiTypes): AiInterface {
  switch (ai) {
    case 'gemini':
      return new Gemini();
    default:
      throw new Error('Invalid AI type');
  }
}