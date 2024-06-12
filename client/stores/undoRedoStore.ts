import { create } from 'zustand';
import { temporal } from 'zundo';
import type { Node, Edge } from 'reactflow';

export type Flow = {
  nodes: Node[];
  edges: Edge[];
};

export interface StoreState {
  currentLinktaFlow: Flow | undefined; // Allow undefined for initial state
  setCurrentFlow: (flow: Flow) => void; // Function to set current flow
}

const useStoreWithUndo = create<StoreState>()(
  temporal((set) => ({
    currentLinktaFlow: undefined, // Initial state can be undefined
    setCurrentFlow: (flow: Flow) => set({ currentLinktaFlow: flow }),
  }))
);

export default useStoreWithUndo;
