import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type DrawerState = {
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
};

const useDrawerStore = create<DrawerState>()(
  devtools((set) => ({
    drawerOpen: true,
    setDrawerOpen: (open: boolean) => set({ drawerOpen: open }),
  }))
);

export default useDrawerStore;
