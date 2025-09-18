import React from 'react';
import { Palette, ExternalLink, Github } from 'lucide-react';
import styles from './DesignSystemSection.module.css';
import layoutStyles from '../Layout/Layout.module.css';

export const DesignSystemSection: React.FC = () => {
  return (
    <section className={layoutStyles.section}>
      <h2 className={layoutStyles.sectionTitle}>
        <Palette className={layoutStyles.sectionIcon} size={20} />
        Modern Design System
      </h2>
      <div className={styles.intro}>
        <p className={layoutStyles.sectionDescription}>
          Explore my in-progress, open-source design system. Built with Radix UI, TypeScript, and CSS Modules, it provides accessible, reusable components and design tokens for modern product teams.
        </p>
        <p className={layoutStyles.sectionNote} style={{ marginBottom: 'var(--spacing-lg)' }}>
          <strong>Features:</strong> Primitives, composite components, design tokens, Storybook docs, and full accessibility support. <br />
          <strong>Tech:</strong> React, Radix UI, TypeScript, Vite, Vitest, Chromatic, and more.
        </p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <a
            href="https://design-system-iota-five.vercel.app/?path=/docs/components-composite-modal--docs"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.actionButton}
          >
            <ExternalLink size={16} />
            Storybook Demo
          </a>
          <a
            href="https://github.com/carolinapowers/design-system"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.actionButton + ' ' + styles.githubBtn}
          >
            <Github size={16} />
            GitHub Repo
          </a>
        </div>
      </div>
    </section>
  );
};