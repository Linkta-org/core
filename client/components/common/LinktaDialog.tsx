import React, { useEffect, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import styles from '@styles/LinktaDialog.module.css';

interface LinktaDialogProps {
  isOpen: boolean;
  title: string;
  content: React.ReactNode;
  confirmText: string;
  cancelText: string;
  icon?: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  confirmButtonClass?: string;
}

/**
 * LinktaDialog is a reusable dialog component that handles user confirmations.
 * It contains a title, content area, and actions for confirming or canceling.
 *
 * @param {boolean} isOpen - Controls the visibility of the dialog.
 * @param {string} title - Title of the dialog.
 * @param {React.ReactNode} content - The content displayed inside the dialog.
 * @param {string} confirmText - Text for the confirm button.
 * @param {string} cancelText - Text for the cancel button.
 * @param {React.ReactNode} [icon] - Optional icon displayed next to the title.
 * @param {() => void} onConfirm - Function called when the user confirms the action.
 * @param {() => void} onCancel - Function called when the user cancels the action.
 * @param {string} [confirmButtonClass] - Optional custom class for the confirm button.
 *
 * @returns {JSX.Element} The rendered dialog component.
 */
const LinktaDialog: React.FC<LinktaDialogProps> = ({
  isOpen,
  title,
  content,
  confirmText,
  cancelText,
  icon,
  onConfirm,
  onCancel,
  confirmButtonClass,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /**
     * Automatically focus on the first focusable element (buttons, inputs, links) when the dialog opens.
     * This enhances accessibility for keyboard users.
     */
    if (isOpen && dialogRef.current) {
      const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusableElements.length > 0) {
        focusableElements[0].focus(); // Set focus to the first focusable element
      }
    }
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      aria-labelledby='linkta-dialog-title'
      aria-describedby='linkta-dialog-content'
      role='dialog'
      aria-modal='true'
      ref={dialogRef}
      classes={{ paper: styles.dialog }}
    >
      <DialogTitle
        id='linkta-dialog-title'
        className={styles.dialogTitle}
      >
        <Box className={styles.dialogHeader}>
          {icon}
          <Typography className={styles.dialogTitleText}>{title}</Typography>
        </Box>
      </DialogTitle>
      <DialogContent
        id='linkta-dialog-content'
        className={styles.dialogContent}
      >
        {content}
      </DialogContent>
      <DialogActions className={styles.dialogActions}>
        <Button
          onClick={onCancel}
          className={`${styles.buttonBase} ${styles.cancelButton}`}
          aria-label='Cancel the dialog'
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          className={`${styles.buttonBase} ${confirmButtonClass || styles.confirmButton}`}
          aria-label={confirmText}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LinktaDialog;
