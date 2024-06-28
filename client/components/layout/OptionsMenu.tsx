import React from 'react';
import { Menu, MenuItem, Typography } from '@mui/material';
import RenameIcon from '@mui/icons-material/EditOutlined';
import RegenerateIcon from '@mui/icons-material/AutorenewOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import styles from '@styles/layout/OptionsMenu.module.css';

interface OptionsMenuProps {
  arialabelledby: string;
  anchorEl: null | HTMLElement;
  isOpen: boolean;
  onClose: () => void;
  onRename: () => void;
  onRegenerate: () => void;
  onDelete: () => void;
}

const OptionsMenu: React.FC<OptionsMenuProps> = ({
  arialabelledby,
  anchorEl,
  isOpen,
  onClose,
  onRename,
  onRegenerate,
  onDelete,
}) => {
  return (
    <Menu
      aria-labelledby={arialabelledby}
      anchorEl={anchorEl}
      open={isOpen}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      MenuListProps={{
        'aria-labelledby': 'lock-button',
        role: 'menu',
        className: styles.optionsMenu__list,
      }}
      classes={{ paper: styles.optionsMenu }}
    >
      <MenuItem
        onClick={() => {
          onRename();
          onClose();
        }}
        aria-label='Rename input title'
        className={styles.optionsMenu__item}
      >
        <RenameIcon
          fontSize='small'
          className={styles.optionsMenu__itemIcon}
        />
        <Typography
          variant='caption'
          className={styles.optionsMenu__itemText}
        >
          Rename
        </Typography>
      </MenuItem>
      <MenuItem
        onClick={() => {
          onRegenerate();
          onClose();
        }}
        aria-label='Regenerate Linkta Flow'
        className={styles.optionsMenu__item}
      >
        <RegenerateIcon
          fontSize='small'
          className={styles.optionsMenu__itemIcon}
        />
        <Typography
          variant='caption'
          className={styles.optionsMenu__itemText}
        >
          Regenerate
        </Typography>
      </MenuItem>
      <MenuItem
        onClick={() => {
          onDelete();
          onClose();
        }}
        aria-label='Delete Linkta Flow'
        className={styles.optionsMenu__item}
      >
        <DeleteIcon
          fontSize='small'
          className={styles.optionsMenu__itemIcon}
        />
        <Typography
          variant='caption'
          className={styles.optionsMenu__itemText}
        >
          Delete
        </Typography>
      </MenuItem>
    </Menu>
  );
};

export default OptionsMenu;
