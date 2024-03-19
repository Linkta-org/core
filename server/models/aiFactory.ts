import Gemini from "./gemini";

// The enum AI types
export type AiTypes = "gemini";

/**
 * AI Factory interface.
 *
 * @param ai The type of AI to connect to
 * @return an AI connection
 */
export default function createAi(ai: AiTypes): AiInterface {
  switch (ai) {
    case "gemini":
      return new Gemini();
    default:
      throw new Error("Invalid AI type");
  }
}
