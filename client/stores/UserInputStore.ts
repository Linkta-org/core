import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { UserInput } from '@/types';

type UserInputStore = {
  currentInput: UserInput | undefined;
  getLastInput: () => UserInput | undefined;
  setLastInput: (input: UserInput) => void;
};

const useUserInputStore = create<UserInputStore>()(
  devtools((set, get) => ({
    currentInput: undefined,
    getLastInput: () => get().currentInput,
    setLastInput: (input) => set({ currentInput: input }),
  })),
);

export default useUserInputStore;
