import { create } from 'zustand';

interface LoadingState {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),
}));

export default useLoadingStore;
