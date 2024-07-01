export interface UserInput {
  _id: string;
  id;
  title: string;
  input: string;
}

export interface UpdateInputTitleParams {
  userInputId: string;
  newTitle: string;
}

export interface UpdateInputTitleResponse {
  message: string;
  inputHistory: UserInput[];
}

export interface UserInputPayload {
  input: string;

  headers?: {
    Authorization: string;
  };
}

export interface UserInputResponse {
  input: string;
}
