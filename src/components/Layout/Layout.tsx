import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { Edit, Code } from 'lucide-react';
import { client } from '../../apollo/client';
import { RichTextEditor } from '../RichTextEditor/RichTextEditor';
import { RecommendationsSection } from './RecommendationsSection';
import styles from './Layout.module.css';
import { DisplayFlex, DisplayFlexItem } from '../DisplayFlex';

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
            <p className={styles.sectionDescription}>
              Demonstrates technical skills with Buffer's design patterns
            </p>
            <RichTextEditor />
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
              This portfolio is built with modern development practices and tools to showcase 
              the technical skills and attention to detail that would be valuable in a frontend 
              engineering role.
            </p>
            <p className={styles.sectionNote}>
              The implementation demonstrates proficiency with React, TypeScript, GraphQL, and 
              modern build tools, while following accessibility best practices and maintaining 
              clean, testable code architecture.
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
          <DisplayFlex className={styles.benefits} justify="around">
            <DisplayFlexItem>
              <DisplayFlex align="center" justify="center">
                <DisplayFlexItem>
                  <div className={styles.benefitIcon}>🎯</div>
                </DisplayFlexItem>
                <DisplayFlexItem>
                  <h3>Technical Alignment</h3>
                </DisplayFlexItem>
              </DisplayFlex>
              <p className="mt-0">
                Uses Buffer's actual tech stack and design patterns
              </p>
            </DisplayFlexItem>

            <DisplayFlexItem>
              <DisplayFlex align="center" justify="center">
                <DisplayFlexItem>
                  <div className={styles.benefitIcon}>🔍</div>
                </DisplayFlexItem>
                <DisplayFlexItem>
                  <h3>Deep Research</h3>
                </DisplayFlexItem>
              </DisplayFlex>
              <p className="mt-0">
                Shows understanding of Buffer's design system evolution
              </p>
            </DisplayFlexItem>
            <DisplayFlexItem>
              <DisplayFlex align="center" justify="center">
                <DisplayFlexItem>
                  <div className={styles.benefitIcon}>🚀</div>
                </DisplayFlexItem>
                <DisplayFlexItem>
                  <h3>Ready to Contribute</h3>
                </DisplayFlexItem>
              </DisplayFlex>
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
