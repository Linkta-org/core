import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type LinktaFlow from '@/client/types/LinktaFlow';

type LinktaFlowStore = {
  currentLinktaFlow: LinktaFlow | undefined;
  getCurrentFlow: () => LinktaFlow | undefined;
  setCurrentFlow: (flow: LinktaFlow) => void;
};

const useLinktaFlowStore = create<LinktaFlowStore>()(
  devtools((set, get) => ({
    currentLinktaFlow: undefined,
    getCurrentFlow: () => get().currentLinktaFlow,
    setCurrentFlow: (flow) => set({ currentLinktaFlow: flow }),
  }))
);

export default useLinktaFlowStore;
