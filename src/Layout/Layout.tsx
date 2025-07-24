import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { Edit, Code } from 'lucide-react';
import { client } from '../apollo/client';
import { RichTextEditor } from '../components/RichTextEditor/RichTextEditor';
import { RecommendationsSection } from './RecommendationsSection';
import styles from './Layout.module.css';
import { DisplayFlex, DisplayFlexItem } from '../components/DisplayFlex';

export const Layout: React.FC = () => {
  const techCategories = [
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
      ],
    },
  ];

  return (
    <ApolloProvider client={client}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Buffer's Interactive Portfolio</h1>
          <p className={styles.subtitle}>
            Senior Product Frontend Engineer
            <br />
            <span className={styles.caption}>Carolina Powers</span>
          </p>
          <p className={styles.description}>
            Built with Buffer-inspired design patterns + modern React
          </p>
          <div className={styles.techStack}>
            <span className={styles.tech}>React</span>
            <span className={styles.tech}>TypeScript</span>
            <span className={styles.tech}>GraphQL</span>
            <span className={styles.tech}>Apollo Client</span>
            <span className={styles.tech}>Radix UI</span>
            <span className={styles.tech}>Claude Code</span>
          </div>
        </header>
        <main className={styles.mainContent}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Edit className={styles.sectionIcon} size={20} />
              Rich Text Editor - Buffer-Style Composer
            </h2>
            <div className={styles.editorIntro}>
              <p className={styles.sectionDescription}>
                This interactive rich text editor showcases modern React
                development patterns and demonstrates how Buffer's content
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
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Code className={styles.sectionIcon} size={20} />
              Buffer-Inspired Design System
            </h2>
            <div className={styles.editorIntro}>
              <p className={styles.sectionDescription}>
                Explore my in-progress, open-source design system inspired by Buffer’s UI library. Built with Radix UI, TypeScript, and CSS Modules, it provides accessible, reusable components and design tokens for modern product teams.
              </p>
              <p className={styles.sectionNote + ' ' + 'mb-lg'}>
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
                  <Code size={16} />
                  Storybook Demo
                </a>
                <a
                  href="https://github.com/carolinapowers/design-system"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionButton + ' ' + styles.githubBtn}
                >
                  <Code size={16} />
                  GitHub Repo
                </a>
              </div>
            </div>
          </section>
          <RecommendationsSection />
        </main>
        <section className={styles.techSection}>
          <h2 className={styles.sectionTitle}>
            <Code size={20} />
            Technical Implementation
          </h2>
          <div className={styles.techIntro}>
            <p className={styles.sectionDescription}>
              This portfolio is built with modern development practices and
              tools to showcase the technical skills and attention to detail
              that would be valuable in a frontend engineering role.
            </p>
            <p className={styles.sectionNote}>
              The implementation demonstrates proficiency with React,
              TypeScript, GraphQL, and modern build tools, while following
              accessibility best practices and maintaining clean, testable code
              architecture.
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
        <footer className={styles.footer}>
          <h2 className={styles.footerTitle}>
            Why This Portfolio Approach Works
          </h2>
          <DisplayFlex
            className={styles.benefits}
            justify="around"
            align="start"
          >
            <DisplayFlexItem shrink={1}>
              <h3>
                <span aria-hidden="true">🎯</span> Technical Alignment
              </h3>
              <p className="mt-0">
                Uses Buffer's actual tech stack and design patterns
              </p>
            </DisplayFlexItem>
            <DisplayFlexItem shrink={1}>
              <h3>
                <span aria-hidden="true">🔍</span> Deep Research
              </h3>
              <p className="mt-0">
                Shows understanding of Buffer's design system evolution
              </p>
            </DisplayFlexItem>
            <DisplayFlexItem shrink={1}>
              <h3>
                <span aria-hidden="true">🚀</span> Ready to Contribute
              </h3>
              <p className="mt-0">
                Demonstrates skills for Buffer's Content Creation team
              </p>
            </DisplayFlexItem>
          </DisplayFlex>
          <div className={styles.actions}>
            <a
              href="https://github.com/carolinapowers/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actionButton + ' ' + styles.github}
            >
              <Code size={16} />
              View Source Code
            </a>
          </div>
        </footer>
      </div>
    </ApolloProvider>
  );
};
