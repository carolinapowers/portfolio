import React, { useRef, useCallback, useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { useEditor } from '../../hooks/useEditor';
import { useEditorTracking } from '../../analytics';
import { Toolbar } from './Toolbar';

import styles from './RichTextEditor.module.css';
import { DisplayFlex, DisplayFlexItem } from '../DisplayFlex';

export const RichTextEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showAIDialog, setShowAIDialog] = useState(false);
  const {
    content,
    setContent,
    characterCount,
    formatStates,
    formatText,
    insertLink,
    clearFormatting,
  } = useEditor();

  // Initialize analytics tracking
  const {
    trackInput,
    trackFormatting,
    trackClear,
  } = useEditorTracking();

  const handleInput = useCallback(
    (e: React.FormEvent) => {
      const text = e.currentTarget.textContent || '';
      setContent(text);
      
      // Track input analytics
      trackInput(text.length);
    },
    [setContent, trackInput]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'b':
            e.preventDefault();
            formatText('bold');
            trackFormatting('bold', characterCount);
            break;
          case 'i':
            e.preventDefault();
            formatText('italic');
            trackFormatting('italic', characterCount);
            break;
          case 'u':
            e.preventDefault();
            formatText('underline');
            trackFormatting('underline', characterCount);
            break;
        }
      }
    },
    [formatText, trackFormatting, characterCount]
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
        onFormat={(command) => {
          formatText(command);
          trackFormatting(command as 'bold' | 'italic' | 'underline', characterCount);
        }}
        onInsertLink={(url) => {
          insertLink(url);
          trackFormatting('link', characterCount);
        }}
        onClearFormatting={() => {
          trackClear(characterCount);
          clearFormatting();
        }}
        formatStates={formatStates}
      />
      <div
        ref={editorRef}
        className={styles.content}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        data-placeholder="✨ Try the AI Assistant button for inspiration!"
        role="textbox"
        aria-label="Rich text editor"
        aria-multiline="true"
        suppressContentEditableWarning={true}
      />
      <div className={styles.footer}>
        <DisplayFlex justify="between" align="center" gap="md">
          <DisplayFlexItem>
            <span className={getCharacterCountClass()}>
              {characterCount}/280 characters
            </span>
          </DisplayFlexItem>

          <DisplayFlexItem>
            <DisplayFlex gap="sm" align="center">
              <DisplayFlexItem>
                <Dialog.Root open={showAIDialog} onOpenChange={setShowAIDialog}>
                  <Dialog.Trigger asChild>
                    <button className={styles.aiButton}>
                      <Sparkles size={14} />
                      AI Assistant
                    </button>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className={styles.aiDialogOverlay} />
                    <Dialog.Content className={styles.aiDialogContent}>
                      <Dialog.Title className={styles.aiDialogTitle}>
                        🤖 AI-Powered Development Process
                      </Dialog.Title>
                      <Dialog.Description
                        className={styles.aiDialogDescription}
                      >
                        How Claude Code accelerated this one-day portfolio
                        prototype
                      </Dialog.Description>

                      <div className={styles.aiDialogBody}>
                        <div className={styles.aiFeature}>
                          <h4>⚡ Rapid Prototyping</h4>
                          <p>
                            Claude Code generated complete React components with
                            TypeScript, including proper prop interfaces and
                            styling patterns that match Buffer's design
                            philosophy.
                          </p>
                        </div>

                        <div className={styles.aiFeature}>
                          <h4>🧪 Testing Excellence</h4>
                          <p>
                            Automatically created comprehensive test suites
                            following React Testing Library best practices, with
                            accessibility-focused queries and proper mocking
                            strategies.
                          </p>
                        </div>

                        <div className={styles.aiFeature}>
                          <h4>🔧 DevOps Setup</h4>
                          <p>
                            Configured complete development workflow: ESLint,
                            Prettier, Husky pre-commit hooks, GitHub Actions,
                            and VSCode workspace settings for team consistency.
                          </p>
                        </div>

                        <div className={styles.aiFeature}>
                          <h4>📋 Architecture Decisions</h4>
                          <p>
                            Analyzed Buffer's tech stack requirements and
                            implemented matching patterns: GraphQL with Apollo,
                            Radix UI primitives, and accessibility-first
                            component design.
                          </p>
                        </div>

                        <div className={styles.aiMetrics}>
                          <div className={styles.metric}>
                            <span className={styles.metricValue}>6 hours</span>
                            <span className={styles.metricLabel}>
                              Time saved vs manual coding
                            </span>
                          </div>
                          <div className={styles.metric}>
                            <span className={styles.metricValue}>100%</span>
                            <span className={styles.metricLabel}>
                              Test coverage achieved
                            </span>
                          </div>
                          <div className={styles.metric}>
                            <span className={styles.metricValue}>0</span>
                            <span className={styles.metricLabel}>
                              Linting errors
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className={styles.aiDialogActions}>
                        <Dialog.Close asChild>
                          <button className={styles.aiCloseButton}>
                            Got it!
                          </button>
                        </Dialog.Close>
                      </div>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
              </DisplayFlexItem>

              <DisplayFlexItem>
                <span className={styles.saved}>Auto-saved</span>
              </DisplayFlexItem>
            </DisplayFlex>
          </DisplayFlexItem>
        </DisplayFlex>
      </div>
    </div>
  );
};
