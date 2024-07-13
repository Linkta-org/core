import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type SideNavDrawerStore = {
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
};

const useSideNavDrawerStore = create<SideNavDrawerStore>()(
  devtools((set) => ({
    drawerOpen: true,
    setDrawerOpen: (open: boolean) => set({ drawerOpen: open }),
  })),
);

export default useSideNavDrawerStore;
