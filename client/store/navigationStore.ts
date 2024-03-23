import { create } from 'zustand';

interface NavigationState {
  currentPage: string;
  actions: {
    setCurrentPage: (page: string) => void;
  };
}

const useNavigationStore = create<NavigationState>((set) => ({
  currentPage: '/',
  actions: {
    setCurrentPage: (page: string) => set({ currentPage: page }),
  },
}));

// export only custom hooks so that components cannot subscribe to the entire store
// atomic selectors: selectors target smallest possible values when possible
export const useCurrentPage = () =>
  useNavigationStore((state) => state.currentPage);

// separate actions from state - actions object can be considered atomic because its values won't change
export const useNavigationActions = () =>
  useNavigationStore((state) => state.actions);
