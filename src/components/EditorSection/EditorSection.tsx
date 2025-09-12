import React from 'react';
import { Edit } from 'lucide-react';
import { RichTextEditor } from '../RichTextEditor/RichTextEditor';
import styles from './EditorSection.module.css';

export const EditorSection: React.FC = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>
        <Edit className={styles.sectionIcon} size={20} />
        Rich Text Editor - Modern Composer
      </h2>
      <div className={styles.editorIntro}>
        <p className={styles.sectionDescription}>
          This interactive rich text editor showcases modern React
          development patterns and demonstrates how modern content
          creation tools might be built. Try the formatting controls,
          keyboard shortcuts, and explore the features.
        </p>
        <p className={styles.sectionNote + ' ' + 'mb-lg'}>
          Built with custom hooks, contentEditable management, and local
          state persistence. Click the <strong>AI Assistant</strong>{' '}
          button in the editor to learn how this entire portfolio was
          created in one day using AI-assisted development with Claude
          Code.
        </p>
      </div>
      <RichTextEditor />
    </section>
  );
};