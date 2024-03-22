import Gemini from '@/server/models/GeminiModel';

import type { AiInterface, AiTypes } from '@/server/types/ai';
import { func } from 'prop-types';

/**
 * AI Factory interface.
 *
 * @param ai The type of AI to connect to
 * @return an AI connection
 */
export default function createAi(ai: AiTypes): AiInterface {
  switch (ai) {
    case 'gemini':
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
function setupGemini(): AiInterface {
  return new Gemini();
}
