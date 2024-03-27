import type { GoogleGenerativeAI, InputContent } from '@google/generative-ai';

/**
 * The interface for the AI.
 * This will need to modified if we add more AI models.
 */
export interface AiInterface {
  apiKey: string;

  // ai will need more types if we expand the factory to include other AI models
  ai: GoogleGenerativeAI;
  connect(): void;

  // these methods are based upon the Gemini model, they will need to be updated if we add more models
  generateResponse(prompt: string): Promise<string>;
  generateConversation(
    history: InputContent[],
    prompt: string,
    generationConfig?: object
  ): Promise<string>;
}

/**
 * The enumerated types of AI that can be used.
 */
export enum AiTypes {
  Gemini = 'gemini',
}

export interface ChainOfThought {
  history: InputContent[];
  prompt: string;
}
