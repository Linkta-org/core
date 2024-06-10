import { create } from 'zustand';
import type { UserInput } from '@/client/types/datamodels';

type userInputStore = {
  lastInput: UserInput | undefined;
  inputHistory: UserInput[];
  getLastInput: () => UserInput | undefined;
  getInputHistory: () => UserInput[];
  setLastInput: () => void;
  setInputHistory: () => void;
};

const useUserInputStore = create<userInputStore>()((set, get) => ({
  lastInput: undefined,
  inputHistory: [],
  getLastInput: () => get().lastInput,
  getInputHistory: () => get().inputHistory,
  setLastInput: () => set((state) => ({ lastInput: state.lastInput })),
  setInputHistory: () => set((state) => ({ inputHistory: state.inputHistory })),
}));

export default useUserInputStore;
