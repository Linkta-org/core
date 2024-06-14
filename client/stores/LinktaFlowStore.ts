import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { temporal } from 'zundo';
import isDeepEqual from 'fast-deep-equal';
import type LinktaFlow from '@/client/types/LinktaFlow';

export interface LinktaFlowStore {
  currentLinktaFlow: LinktaFlow;
  getCurrentFlow: () => LinktaFlow | undefined;
  setCurrentFlow: (flow: LinktaFlow) => void;
  setCurrentNodes: (nodes: LinktaFlow['nodes']) => void;
  setCurrentEdges: (edges: LinktaFlow['edges']) => void;
  setCurrentViewport: (viewport: LinktaFlow['viewport']) => void;
}

const useLinktaFlowStore = create<LinktaFlowStore>()(
  devtools(
    temporal(
      (set, get) => ({
        currentLinktaFlow: {} as LinktaFlow,
        getCurrentFlow: () => get().currentLinktaFlow,
        setCurrentFlow: (flow) => set({ currentLinktaFlow: flow }),
        setCurrentNodes: (nodes) => {
          set((state) => ({
            currentLinktaFlow: { ...state.currentLinktaFlow, nodes },
          }));
        },
        setCurrentEdges: (edges) => {
          set((state) => ({
            currentLinktaFlow: { ...state.currentLinktaFlow, edges },
          }));
        },
        setCurrentViewport: (viewport) => {
          set((state) => ({
            currentLinktaFlow: { ...state.currentLinktaFlow, viewport },
          }));
        },
      }),
      {
        limit: 20,
        equality: isDeepEqual,
        onSave: (state) => console.log('saved', state),
      }
    )
  )
);

export default useLinktaFlowStore;
