import type { GoogleGenerativeAI, InputContent } from '@google/generative-ai';

/**
 * The interface for the AI.
 * This will need to modified if we add more AI models.
 */
export interface GenerativeAIModel {
  apiKey: string;

  // ai will need more types if we expand the factory to include other AI models
  AI: GoogleGenerativeAI;

  /**
   * Connect to the AI API.
   */
  connect(): void;

  // these methods are based upon the Gemini model, they will need to be updated if we add more models
  /**
   * Generate a response to a prompt.
   *
   * @param prompt The prompt to generate a response to.
   * @returns The response from the AI.
   */
  generateResponse(prompt: string): Promise<string>;

  /**
   * Generate a response to a conversation.
   *
   * @param history The conversation history.
   * @param prompt The prompt to generate a response to.
   * @param generationConfig Any configuration for the generation.
   * @returns The response from the AI.
   */
  generateConversation(
    history: InputContent[],
    prompt: string,
    generationConfig?: object
  ): Promise<string>;
}

/**
 * The enumerated types of AI that can be used.
 */
export const enum AIProvider {
  Gemini = 'gemini',
}

/**
 * The chain of thought for a conversation.
 */
export interface ChainOfThought {
  history: InputContent[];
  prompt: string;
}

/**
 * The type of function that generates prompts for the AI.
 * This can be inspected from the functions within the TreePromptsModel.
 * As methods are added that return different types, we will need to update this type.
 */
export type TreePromptsFunction = (prompt: string) => string | ChainOfThought;
