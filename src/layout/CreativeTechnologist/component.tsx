import React from 'react';
import { ProjectGrid } from './ProjectGrid';
import styles from './component.module.css';
import { Card } from '../../shared/components/ui/Card';

export const CreativeTechnologistSection: React.FC = () => {
  return (
    <Card as="section" role="region">
      <section className={styles.section}>
        <header className={styles.header}>
          <h2 className={styles.title}>Featured Work</h2>
          <p className={styles.subtitle}>
            A collection of projects spanning AI automation, learning
            experiences, internal tooling, and developer experience improvements
          </p>
        </header>

        <ProjectGrid />
      </section>
    </Card>
  );
};
