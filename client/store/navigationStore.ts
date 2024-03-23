import { create } from 'zustand';

interface NavigationState {
  currentPage: string;
  actions: {
    setCurrentPage: (page: string) => void;
  }
}

const useNavigationStore = create<NavigationState>((set) => ({
  currentPage: '/',
  actions: {
    setCurrentPage: (page: string) => set({ currentPage: page }),
  }
}));

// export only custom hooks so that components cannot subscribe to the entire store
export const useCurrentPage = () => useNavigationStore((state) => state.currentPage)

export const useNavigationActions = () => useNavigationStore((state) => state.actions)