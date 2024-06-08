import React from 'react';
import type { Theme } from '@mui/material';
import { Menu, MenuItem, Typography, styled } from '@mui/material';
import RenameIcon from '@mui/icons-material/Edit';
import RegenerateIcon from '@mui/icons-material/Sync';
import DeleteIcon from '@mui/icons-material/Delete';

interface ListItemMenuProps {
  anchorEl: null | HTMLElement;
  isOpen: boolean;
  onClose: () => void;
  onRename: () => void;
  onRegenerate: () => void;
  onDelete: () => void;
}

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 4,
    minWidth: 200,
    color: theme.palette.text.secondary,
    boxShadow:
      '0 0 0 0 rgba(0,0,0,0), 0 0 0 0 rgba(0,0,0,0), 0 10px 20px -10px rgba(0,0,0,0.2)',
  },
}));

const itemButtonStyles = (theme: Theme) => ({
  padding: '0.2rem 1rem',
  minHeight: '2rem',
  display: 'flex',
  alignItems: 'center',
  '&:hover, &:focus-within': {
    backgroundColor: theme.palette.action.hover,
  },
  '&.Mui-selected, &.Mui-selected:hover, &.Mui-selected:focus-within': {
    backgroundColor: theme.palette.action.selected,
  },
});

const StyledMenuItem = styled(MenuItem)(({ theme }) => itemButtonStyles(theme));

const ListItemMenu: React.FC<ListItemMenuProps> = ({
  anchorEl,
  isOpen,
  onClose,
  onRename,
  onRegenerate,
  onDelete,
}) => {
  return (
    <StyledMenu
      anchorEl={anchorEl}
      open={isOpen}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      MenuListProps={{
        'aria-labelledby': 'lock-button',
        role: 'menu',
      }}
    >
      <StyledMenuItem
        onClick={onRename}
        aria-label="Rename input title"
      >
        <RenameIcon fontSize="small" />
        <Typography
          variant="caption"
          noWrap
        >
          Rename
        </Typography>
      </StyledMenuItem>
      <StyledMenuItem
        onClick={onRegenerate}
        aria-label="Regenerate Linkta Flow"
      >
        <RegenerateIcon fontSize="small" />
        <Typography
          variant="caption"
          noWrap
        >
          Regenerate
        </Typography>
      </StyledMenuItem>
      <StyledMenuItem
        onClick={onDelete}
        aria-label="Delete Linkta Flow"
      >
        <DeleteIcon fontSize="small" />
        <Typography
          variant="caption"
          noWrap
        >
          Delete
        </Typography>
      </StyledMenuItem>
    </StyledMenu>
  );
};

export default ListItemMenu;
