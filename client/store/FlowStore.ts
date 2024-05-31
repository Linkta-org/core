import { createStore } from 'zustand/vanilla';
import { devtools } from 'zustand/middleware';
import type { LinktaFlow } from '@/client/types/datamodels';

type FlowStore = {
  flow: LinktaFlow | undefined;
  fetchFlow: () => Promise<void>;
  updateFlow: void;
};

export const useFlowStore = createStore<FlowStore>()(
  devtools(
    (set, get) => ({
      flow: undefined,
      getFlow: get().flow,
      fetchFlow: async (): Promise<void> => {
        await fetch('placeholder URL')
          .then((res) => res.json())
          .then((data) => {
            set({ flow: data });
          })
          .catch((err) => {
            console.error(
              'An error occurred while fetching data from the server.',
              err
            );
          });
      },
      updateFlow: set((state) => ({ flow: state.flow })),
    }),
    {
      name: 'flow-store',
      enabled: true,
    }
  )
);
