import React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';
import RedoRoundedIcon from '@mui/icons-material/RedoRounded';
import styles from '@styles/UndoAndRedo.module.css';
import useUndoRedoStore from '@/stores/UndoRedoStore';

const UndoAndRedo = () => {
  const { undo, redo, pastStates, futureStates } = useUndoRedoStore(
    (state) => ({
      undo: state.undo,
      redo: state.redo,
      pastStates: state.pastStates,
      futureStates: state.futureStates,
    }),
  );

  const canUndo = pastStates.length > 0;
  const canRedo = futureStates.length > 0;
  return (
    <ButtonGroup orientation='vertical'>
      <IconButton
        disabled={!canUndo}
        aria-label='Undo last action'
        size='small'
        className={styles.undoredo_button}
        onClick={() => undo()}
      >
        <UndoRoundedIcon fontSize='small' />
      </IconButton>
      <IconButton
        disabled={!canRedo}
        aria-label='Redo last action'
        size='small'
        className={styles.undoredo_button}
        onClick={() => redo()}
      >
        <RedoRoundedIcon fontSize='small' />
      </IconButton>
    </ButtonGroup>
  );
};

export default UndoAndRedo;
