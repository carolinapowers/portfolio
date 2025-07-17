import React, { useState, useRef, useEffect } from 'react';
import { Bold, Italic, Underline, Link, RotateCcw } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import styles from './Toolbar.module.css';

interface ToolbarProps {
  onFormat: (command: string) => void;
  onInsertLink: (url: string) => void;
  onClearFormatting: () => void;
  formatStates: {
    bold: boolean;
    italic: boolean;
    underline: boolean;
  };
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onFormat,
  onInsertLink,
  onClearFormatting,
  formatStates,
}) => {
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const linkInputRef = useRef<HTMLInputElement>(null);

  const handleLinkClick = () => {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      setShowLinkDialog(true);
      setLinkUrl('');
    }
  };

  const handleLinkSubmit = () => {
    if (linkUrl.trim()) {
      onInsertLink(linkUrl);
      setShowLinkDialog(false);
      setLinkUrl('');
    }
  };

  const handleLinkCancel = () => {
    setShowLinkDialog(false);
    setLinkUrl('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLinkSubmit();
    } else if (e.key === 'Escape') {
      handleLinkCancel();
    }
  };

  useEffect(() => {
    if (showLinkDialog && linkInputRef.current) {
      linkInputRef.current.focus();
    }
  }, [showLinkDialog]);

  return (
    <div className={styles.toolbar}>
      <div className={styles.buttonGroup}>
        <button
          className={`${styles.toolbarButton} ${formatStates.bold ? styles.active : ''}`}
          onClick={() => onFormat('bold')}
          title="Bold (Ctrl+B)"
          aria-label="Bold"
          aria-pressed={formatStates.bold}
        >
          <Bold size={16} />
        </button>
        <button
          className={`${styles.toolbarButton} ${formatStates.italic ? styles.active : ''}`}
          onClick={() => onFormat('italic')}
          title="Italic (Ctrl+I)"
          aria-label="Italic"
          aria-pressed={formatStates.italic}
        >
          <Italic size={16} />
        </button>
        <button
          className={`${styles.toolbarButton} ${formatStates.underline ? styles.active : ''}`}
          onClick={() => onFormat('underline')}
          title="Underline (Ctrl+U)"
          aria-label="Underline"
          aria-pressed={formatStates.underline}
        >
          <Underline size={16} />
        </button>
      </div>

      <div className={styles.buttonGroup}>
        <Dialog.Root open={showLinkDialog} onOpenChange={setShowLinkDialog}>
          <Dialog.Trigger asChild>
            <button
              className={styles.toolbarButton}
              onClick={handleLinkClick}
              title="Insert Link"
              aria-label="Insert Link"
              disabled={!window.getSelection()?.toString()}
            >
              <Link size={16} />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className={styles.dialogOverlay} />
            <Dialog.Content className={styles.dialogContent}>
              <Dialog.Title className={styles.dialogTitle}>
                Insert Link
              </Dialog.Title>
              <Dialog.Description className={styles.dialogDescription}>
                Enter a URL to create a link from the selected text.
              </Dialog.Description>
              <div className={styles.dialogForm}>
                <input
                  ref={linkInputRef}
                  type="url"
                  placeholder="Enter URL..."
                  value={linkUrl}
                  onChange={e => setLinkUrl(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={styles.linkInput}
                />
                <div className={styles.dialogActions}>
                  <Dialog.Close asChild>
                    <button className={`${styles.linkButton} ${styles.secondary}`}>
                      Cancel
                    </button>
                  </Dialog.Close>
                  <button
                    onClick={handleLinkSubmit}
                    className={styles.linkButton}
                    disabled={!linkUrl.trim()}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      <div className={styles.buttonGroup}>
        <button
          className={styles.toolbarButton}
          onClick={onClearFormatting}
          title="Clear Formatting"
          aria-label="Clear Formatting"
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
};
