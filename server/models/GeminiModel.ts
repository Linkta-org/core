import { getEnv } from '@/server/utils/environment';
import { GoogleGenerativeAI } from '@google/generative-ai';

import type { GenerationConfig, Content } from '@google/generative-ai';

getEnv();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('Gemini API key not found');
}

// Connect to Gemini API and set the model
const generate_config: GenerationConfig = {
  temperature: 0.5,
  maxOutputTokens: 3500,
  responseMimeType: 'application/json',
};

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  generationConfig: generate_config,
  systemInstruction:
    '#CONTEXT#\n\nI am a visual learner. I need you to process and brainstorm input subject for me\n#############\n\n# OBJECTIVE#\n\nI want you use to analysis input subject and create a tree-like data structure using parent and child nodes to represents the relationships. Expand at least 4-level in depth. Use this step-by-step process :\n\n1. define the topic based on input subject as top tree node\n2 .create a tree-like data structure to represent the process or brainstorm information, where each node represents a subject. Assign a unique ‘id’ to each node based on its level in the tree, and include ‘data’ property containing a \'label\' property with the maximum of three keywords that describe the subject as its value.\n3.convert the tree like data structure into a JSON object containing two properties ‘nodes’ and ‘edges’ in the same manner as React Flow’s Node and Edge type.\n#############\n\n# STYLE#\n\nJSON\n#############\n\n# TONE#\n\nProfessional, technical\n#############\n\n# AUDIENCE#\n\nAdult learner; ADHD learner\n#############\n\n# RESPONSE: a JSON object#\n\n\'{"nodes":[{id, data:{label}}],"edges":[{id, source, target}]}\'\n#############\n\n# START ANALYSIS#',
});

if (!model) {
  throw new Error('Model not found');
}

// Generate a response to a prompt in the context of a conversation
export const startGeneration = async (
  history: Content[],
  prompt: string
): Promise<string> => {
  const chat = model.startChat({ history });
  const result = await chat.sendMessage(prompt); //req.body.userinput
  return result.response.text(); //LLM res -> send back to frontend
};


  /*
   TODO: 1) adding safetySettings
         2) update genAI api route x
         3) continue to work on generateInitialResponse in genAi controller x
         4) make coresponding changes in userInputController.submitUserInput x
         5) work out the logic for all responseGeneration after initial generation
          a) see if history can be modified; cant modify history but can customize one and pass into a new chat
          b) [{
            role: user,
            part: userInputString,
          },
          {
            role: model,
            part: linktaFlow
          }
         ]
         6) testing if gemini model works with multi turn
  */
