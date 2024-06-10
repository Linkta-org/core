import { create } from 'zustand';
import type { LinktaFlow } from '@/client/types/datamodels';

type LinktaFlowStore = {
  currentLinktaFlow: LinktaFlow | undefined;
  undoHistory: LinktaFlow[];
  getCurrentFlow: () => LinktaFlow | undefined;
  getUndoHistory: () => LinktaFlow[];
  setCurrentFlow: () => void;
  setUndoHistory: () => void;
};

const useLinktaFlowStore = create<LinktaFlowStore>()((set, get) => ({
  currentLinktaFlow: undefined,
  undoHistory: [],
  getCurrentFlow: () => get().currentLinktaFlow,
  getUndoHistory: () => get().undoHistory,
  setCurrentFlow: () =>
    set((state) => ({ currentLinktaFlow: state.currentLinktaFlow })),
  setUndoHistory: () => set((state) => ({ undoHistory: state.undoHistory })),
}));

export default useLinktaFlowStore;
