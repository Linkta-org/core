import React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';
import RedoRoundedIcon from '@mui/icons-material/RedoRounded';

import { useStoreWithEqualityFn } from 'zustand/traditional';
import type { TemporalState } from 'zundo';
import type { LinktaFlowStore } from '@/client/stores/LinktaFlowStore';
import useLinktaFlowStore from '@/client/stores/LinktaFlowStore';

const useTemporalStore = <T,>(
  selector: (state: TemporalState<LinktaFlowStore>) => T,
  equality?: (a: T, b: T) => boolean
) => useStoreWithEqualityFn(useLinktaFlowStore.temporal, selector, equality);

const UndoAndRedo = () => {
  const { undo, redo, pastStates, futureStates } = useTemporalStore(
    (state) => state
  );

  console.log('Past States:', pastStates);
  console.log('Future States:', futureStates);

  return (
    <>
      <ButtonGroup orientation="vertical">
        <IconButton
          aria-label="undo"
          size="small"
          sx={{
            color: 'black',
            backgroundColor: '#FFF',
            '&:hover': { backgroundColor: '#f4f4f4' },
            border: '0.5px solid #f4f4f4',
            borderRadius: '0px',
            width: '26px',
            height: '26px',
          }}
          onClick={() => undo()}
        >
          <UndoRoundedIcon fontSize="small" />
        </IconButton>
        <IconButton
          aria-label="redo"
          size="small"
          sx={{
            color: 'black',
            backgroundColor: '#FFF',
            '&:hover': { backgroundColor: '#f4f4f4' },
            border: '0.5px solid #f4f4f4',
            borderRadius: '0px',
            width: '26px',
            height: '26px',
          }}
          onClick={() => redo()}
        >
          <RedoRoundedIcon fontSize="small" />
        </IconButton>
      </ButtonGroup>
    </>
  );
};

export default UndoAndRedo;
