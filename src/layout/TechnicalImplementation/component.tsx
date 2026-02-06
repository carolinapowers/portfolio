import React from 'react';
import { Code } from 'lucide-react';
import styles from './component.module.css';

type TechTitle =
  | 'Frontend & Build'
  | 'Data & State'
  | 'UI & Design'
  | 'Testing & Quality'
  | 'DevOps & Deployment'
  | 'Workflow & AI';

type TechCategory = {
  title: TechTitle;
  tags: string[];
};

const techCategories: TechCategory[] = [
  {
    title: 'Frontend & Build',
    tags: ['React 18', 'TypeScript', 'Vite', 'CSS Modules'],
  },
  {
    title: 'Data & State',
    tags: ['GraphQL', 'Apollo Client', 'Local State', 'Custom Hooks'],
  },
  {
    title: 'UI & Design',
    tags: ['Radix UI', 'Lucide Icons', 'Responsive Design', 'Accessibility'],
  },
  {
    title: 'Testing & Quality',
    tags: [
      'Vitest',
      'React Testing Library',
      'Playwright',
      'ESLint',
      'Prettier',
    ],
  },
  {
    title: 'DevOps & Deployment',
    tags: [
      'GitHub Actions',
      'Vercel',
      'Auto Deployment',
      'PR Previews',
      'Branch Protection',
    ],
  },
  {
    title: 'Workflow & AI',
    tags: [
      'VS Code Config',
      'Pre-commit Hooks',
      'Claude Code',
      'AI-Assisted Development',
      'Auto Documentation',
      'Cursor',
    ],
  },
];

export const TechnicalImplementationSection: React.FC = () => {
  return (
    <section className={styles.techSection}>
      <h2 className={styles.sectionTitle}>
        <Code className={styles.sectionIcon} size={20} />
        Technical Implementation
      </h2>
      <div className={styles.techIntro}>
        <p className={styles.sectionDescription}>
          This portfolio is built with modern development practices and tools to
          showcase the technical skills and attention to detail that would be
          valuable in a software engineering role.
        </p>
        <p className={styles.sectionNote}>
          The implementation demonstrates proficiency with React, TypeScript,
          GraphQL, and modern build tools, while following accessibility best
          practices and maintaining clean, testable code architecture.
        </p>
      </div>
      <div className={styles.techCategories}>
        {techCategories.map(category => (
          <div className={styles.techCategory} key={category.title}>
            <h3 className={styles.techCategoryTitle}>{category.title}</h3>
            <div className={styles.techTags}>
              {category.tags.map(tag => (
                <span className={styles.techTag} key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
