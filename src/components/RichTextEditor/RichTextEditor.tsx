import React, { useRef, useCallback, useEffect } from 'react';
import { useEditor } from '../../hooks/useEditor';
import { Toolbar } from './Toolbar';
import styles from './RichTextEditor.module.css';

export const RichTextEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const {
    content,
    setContent,
    characterCount,
    formatStates,
    formatText,
    insertLink,
    clearFormatting,
  } = useEditor();

  const handleInput = useCallback(
    (e: React.FormEvent) => {
      const text = e.currentTarget.textContent || '';
      setContent(text);
    },
    [setContent]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'b':
            e.preventDefault();
            formatText('bold');
            break;
          case 'i':
            e.preventDefault();
            formatText('italic');
            break;
          case 'u':
            e.preventDefault();
            formatText('underline');
            break;
        }
      }
    },
    [formatText]
  );

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  }, []);

  const getCharacterCountClass = () => {
    if (characterCount > 280) return `${styles.characterCount} ${styles.error}`;
    if (characterCount > 250)
      return `${styles.characterCount} ${styles.warning}`;
    return styles.characterCount;
  };

  // Initialize content in editor
  useEffect(() => {
    if (
      editorRef.current &&
      content &&
      editorRef.current.textContent !== content
    ) {
      editorRef.current.textContent = content;
    }
  }, [content]);

  return (
    <div className={styles.editor}>
      <Toolbar
        onFormat={formatText}
        onInsertLink={insertLink}
        onClearFormatting={clearFormatting}
        formatStates={formatStates}
      />
      <div
        ref={editorRef}
        className={styles.content}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        data-placeholder="Start brainstorming your thoughts..."
        role="textbox"
        aria-label="Rich text editor"
        aria-multiline="true"
        suppressContentEditableWarning={true}
      />
      <div className={styles.footer}>
        <span className={getCharacterCountClass()}>
          {characterCount}/280 characters
        </span>
        <span className={styles.saved}>Auto-saved</span>
      </div>
    </div>
  );
};
