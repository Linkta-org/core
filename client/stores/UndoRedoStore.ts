import { useStoreWithEqualityFn } from 'zustand/traditional';
import type { TemporalState } from 'zundo';
import useLinktaFlowStore from '@/stores/LinktaFlowStore';
import type { LinktaFlowStore } from '@/stores/LinktaFlowStore';

const useUndoRedoStore = <T>(
  selector: (state: TemporalState<LinktaFlowStore>) => T,
  equality?: (a: T, b: T) => boolean,
) => useStoreWithEqualityFn(useLinktaFlowStore.temporal, selector, equality);

export default useUndoRedoStore;
