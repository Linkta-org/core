interface AiInterface {
  apiKey: string;

  // ai will need more types if we expand the factory to include other AI models
  ai: GoogleGenerativeAI;
  connect(): void;

  // these methods are based upon the Gemini model, they will need to be updated if we add more models
  generateResponse(prompt: string): Promise<string>;
  generateConversation(
    history: InputContent[],
    prompt: string,
    generationConfig: object
  ): Promise<string>;
}

type MiddlewareError = {
  log: string;
  status: number;
  message: {
    err: string;
  };
};
