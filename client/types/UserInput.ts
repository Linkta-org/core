export type UserInput = {
  userId?: string;
  input: string;
};

export type UserInputPayload = {
  input: string;

  headers?: {
    Authorization: string;
  };
};

export type UserInputResponse = {
  input: string;
};
