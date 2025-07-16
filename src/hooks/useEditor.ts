import { useState, useCallback, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export interface EditorState {
  content: string;
  characterCount: number;
  formatStates: {
    bold: boolean;
    italic: boolean;
    underline: boolean;
  };
}

export function useEditor() {
  const [content, setContent] = useLocalStorage('editor-content', '');
  const [characterCount, setCharacterCount] = useState(0);
  const [formatStates, setFormatStates] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  const updateContent = useCallback((newContent: string) => {
    setContent(newContent);
    setCharacterCount(newContent.length);
  }, [setContent]);

  const formatText = useCallback((command: string) => {
    document.execCommand(command, false);
    
    // Update format states
    setFormatStates({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
    });
  }, []);

  const insertLink = useCallback((url: string) => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();
      
      if (selectedText) {
        document.execCommand('createLink', false, url);
      }
    }
  }, []);

  const clearFormatting = useCallback(() => {
    document.execCommand('removeFormat', false);
    setFormatStates({
      bold: false,
      italic: false,
      underline: false,
    });
  }, []);

  // Update character count when content changes
  useEffect(() => {
    setCharacterCount(content.length);
  }, [content]);

  // Update format states on selection change
  useEffect(() => {
    const handleSelectionChange = () => {
      setFormatStates({
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        underline: document.queryCommandState('underline'),
      });
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);

  return {
    content,
    setContent: updateContent,
    characterCount,
    formatStates,
    formatText,
    insertLink,
    clearFormatting,
  };
}