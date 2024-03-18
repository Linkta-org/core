import createAi, { AiTypes } from "../models/aiFactory";

export function createConnection(ai: AiTypes): AiInterface {
  const aiConnection = createAi(ai);
  aiConnection.connect();

  return aiConnection;
}

