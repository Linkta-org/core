import Gemini from '@/server/models/GeminiModel';

import type { GenerativeAIModel } from '@server/types/index';
import { AIProvider } from '@server/types/index';

/**
 * AI Factory interface.
 *
 * @param AIName The type of AI to connect to
 * @return an AI connection
 */
export default function createAI(AIName: AIProvider): GenerativeAIModel {
  switch (AIName) {
    case AIProvider.Gemini:
      return setupGemini();
    default:
      throw new Error('Invalid AI type');
  }
}

/**
 * Function to setup and return Gemini AI.
 * This seems redundant since it only returns a new object, but is created for consistency
 * with potential future AI connections that require more setup.
 *
 * @return Gemini AI
 */
function setupGemini(): GenerativeAIModel {
  return new Gemini();
}
