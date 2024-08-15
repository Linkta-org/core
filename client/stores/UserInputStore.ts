import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { UserInput } from '@/types/UserInput';

type UserInputStore = {
  currentInput: UserInput | undefined;
  isChecked: boolean;
  getLastInput: () => UserInput | undefined;
  setLastInput: (input: UserInput) => void;
  setIsChecked: (checked: boolean) => void;
};

const useUserInputStore = create<UserInputStore>()(
  devtools((set, get) => ({
    currentInput: undefined,
    isChecked: true,
    getLastInput: () => get().currentInput,
    setLastInput: (input) => set({ currentInput: input }),
    setIsChecked: (checked) => set({ isChecked: checked }),
  })),
);

export default useUserInputStore;
