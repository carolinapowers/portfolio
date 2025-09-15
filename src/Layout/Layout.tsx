import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { Code } from 'lucide-react';
import { client } from '../apollo/client';
import { RecommendationsSection } from './RecommendationsSection';
import { usePageTracking } from '../analytics';
import styles from './Layout.module.css';
import { DisplayFlex, DisplayFlexItem } from '../components/DisplayFlex';
import { DesignSystemSection } from '../components/DesignSystemSection';

export const Layout: React.FC = () => {
  // Track page views and scroll behavior
  usePageTracking({ 
    pageName: 'portfolio_home',
    trackScrollDepth: true,
  });

  const techCategories: { title: string; tags: string[] }[] = [
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

  return (
    <ApolloProvider client={client}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Interactive Portfolio</h1>
          <p className={styles.subtitle}>Carolina Powers</p>
          <p className={styles.description}>
            Built with modern React patterns and clean design
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
          <RecommendationsSection />
          <DesignSystemSection />
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
        </main>
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
              <p className="mt-0">Uses modern tech stack and design patterns</p>
            </DisplayFlexItem>
            <DisplayFlexItem shrink={1}>
              <h3>
                <span aria-hidden="true">🔍</span> Deep Research
              </h3>
              <p className="mt-0">
                Shows understanding of modern design system evolution
              </p>
            </DisplayFlexItem>
            <DisplayFlexItem shrink={1}>
              <h3>
                <span aria-hidden="true">🚀</span> Ready to Contribute
              </h3>
              <p className="mt-0">
                Demonstrates skills for content creation and collaboration
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
