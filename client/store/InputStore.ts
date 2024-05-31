import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type ClientInput = {
  id: string,
  input: string
}

type UserInputStore = {
  newInput: ClientInput;
  inputHistory: ClientInput[];
  getHistory:  (userId: string) => Promise< ClientInput[]>;
  addUserInput: void;
}

export const useInputStore = create<UserInputStore>()(devtools((set, get) => ({
  inputHistory: [],
  newInput: {
    id: '',
    input: ''
  },
  addUserInput: set((state) => ({ inputHistory: [...state.inputHistory, state.newInput] })),
  getHistory: async (userId: string) => {
    // TODO: get userInputs by userId from database
    console.log(userId);
    const history = get().inputHistory;
    return history;
  }
}),
  {
    name: 'input-store',
    enabled: true,
  }
));

