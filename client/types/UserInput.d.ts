export interface UserInput {
  id: string;
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
