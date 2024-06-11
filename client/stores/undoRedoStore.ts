import { create } from 'zustand';
import { temporal } from 'zundo';

interface StoreState {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
}

const useStoreWithUndo = create<StoreState>()(
  temporal((set) => ({
    bears: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
  }))
);

export default useStoreWithUndo;
