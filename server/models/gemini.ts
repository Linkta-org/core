import { getEnv } from "../utils/base";
import { GoogleGenerativeAI, GenerativeModel, InputContent } from "@google/generative-ai";


/**
 * Class representing the Gemini API connection and it's methods
 */
class Gemini implements AiInterface {
  apiKey: string = this.setApiKey();
  ai: GoogleGenerativeAI = this.connect();
  model: GenerativeModel | undefined;

  constructor() {
    getEnv();
  }

  setApiKey(): string {
    const apiKey = process.env.GEMINI_API_KEY;
    console.log('Gemini API Key:', this.apiKey); 
    return apiKey;
  }

  setModel(model: GenerativeModel): void {
    this.model = this.ai.getGenerativeModel(model);
  }

  connect(): GoogleGenerativeAI {
    if (!this.apiKey) {
      this.setApiKey();
    }

    this.ai = new GoogleGenerativeAI(this.apiKey);

    // The model name may change. Check the documentation for the latest model name.
    // https://ai.google.dev/models/gemini
    this.model = this.ai.getGenerativeModel({ model: 'gemini-pro' })

    console.log('Connecting to Gemini');
    return this.ai;
  }

  async generateResponse(prompt: string): Promise<string> {
    if (!this.model) {
      throw new Error('Model not found');
    }

    const result = await this.model.generateContent(prompt);
    const response = await result.response;

    return response.text();
  }

  async generateConversation(history: InputContent[], prompt: string, generationConfig: object): Promise<string> {
    if (!this.model) {
      throw new Error('Model not found');
    }

    const chat = this.model.startChat({ history, generationConfig });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;

    return response.text();
  }
}

export default Gemini;