import { getEnv } from '@utils/environment';
import { GoogleGenerativeAI } from '@google/generative-ai';

import type {
  GenerationConfig,
  Content,
  SafetySetting,
} from '@google/generative-ai';
import { HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

getEnv();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('Gemini API key not found');
}

const generate_config: GenerationConfig = {
  temperature: 0.5,
  maxOutputTokens: 1000,
  responseMimeType: 'application/json',
};

const safetySettings: SafetySetting[] = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

/**
 * Create a Gemini API connection.
 */
const genAI = new GoogleGenerativeAI(apiKey);

/**
 * The GenerativeModel to use during prompt generation.
 */
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  generationConfig: generate_config,
  safetySettings: safetySettings,
  systemInstruction:
    '#CONTEXT#\n\nI am a visual learner. I need you to process and brainstorm input subject for me\n#############\n\n# OBJECTIVE#\n\nI want you use to analysis input subject and create a tree-like data structure using parent and child nodes to represents the relationships. Expand at least 4-level in depth. Use this step-by-step process :\n\n1. define the topic based on input subject as top tree node\n2 .create a tree-like data structure to represent the process or brainstorm information, where each node represents a subject. Assign a unique ‘id’ to each node based on its level in the tree, and include ‘data’ property containing a \'label\' property with the maximum of three keywords that describe the subject as its value.\n3.convert the tree like data structure into a JSON object containing two properties ‘nodes’ and ‘edges’ in the same manner as React Flow’s Node and Edge type.\n#############\n\n# STYLE#\n\nJSON\n#############\n\n# TONE#\n\nProfessional, technical\n#############\n\n# AUDIENCE#\n\nAdult learner; ADHD learner\n#############\n\n# RESPONSE: a JSON object#\n\n\'{"nodes":[{id, data:{label}}],"edges":[{id, source, target}]}\'\n#############\n\n# START ANALYSIS#',
});

/**
 * Generate a response to a prompt in the context of a conversation.
 *
 * @param history The conversation history.
 * @param prompt The prompt to use in generating the response.
 * @return The text of the generated response.
 */
export const startGeneration = async (
  history: Content[],
  prompt: string
): Promise<string> => {
  if (!model) {
    throw new Error('Model not found');
  }
  const chat = model.startChat({ history });
  const result = await chat.sendMessage(prompt);
  //count tokens
  const his = await chat.getHistory();
  const msgContent = { role: 'user', parts: [{ text: prompt }] };
  const contents = [...his, msgContent];
  const { totalTokens } = await model.countTokens({ contents });
  console.log('totalToken:', totalTokens);

  return result.response.text();
};
