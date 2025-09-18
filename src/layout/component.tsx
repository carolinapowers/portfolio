import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { Code } from 'lucide-react';
import { client } from '../apollo/client';
import {
  DisplayFlex,
  DisplayFlexItem,
} from '../shared/components/ui/DisplayFlex';
import { usePageTracking } from '../analytics';
import { RecommendationsSection } from './Recommendations';
import { DesignSystemSection } from './DesignSystem';
import { TechnicalImplementationSection } from './TechnicalImplementation';
import styles from './component.module.css';

export const Layout: React.FC = () => {
  // Track page views and scroll behavior
  usePageTracking({
    pageName: 'portfolio_home',
    trackScrollDepth: true,
  });

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
          <TechnicalImplementationSection />
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
