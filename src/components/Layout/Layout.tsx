import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { Edit, Code } from 'lucide-react';
import { client } from '../../apollo/client';
import { RichTextEditor } from '../RichTextEditor/RichTextEditor';
import { RecommendationsSection } from './RecommendationsSection';
import styles from './Layout.module.css';

export const Layout: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Interactive Portfolio</h1>
          <p className={styles.subtitle}>Senior Product Frontend Engineer</p>
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

          {/* <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Lightbulb className={styles.sectionIcon} size={20} />
              Collaborative Brainstorming
            </h2>
            <p className={styles.sectionDescription}>
              Interactive space for your thoughts
            </p>
            <BrainstormingSpace />
          </section> 
          */}

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Code className={styles.sectionIcon} size={20} />
              Technical Implementation Notes
            </h2>
            <div className={styles.codeSection}>
              <h3 className={styles.codeTitle}>Buffer Design Patterns</h3>
              <pre className={styles.codeBlock}>
                {`// Buffer-inspired component styling
const BufferCard = ({ children, rounded="md" }) => {
  return (
    <div className="bg-white rounded-md border border-gray-200 shadow-sm">
      {children}
    </div>
  );
};

// Modern React patterns
const [editorContent, setEditorContent] = useState('');`}
              </pre>

              <h3 className={styles.codeTitle}>Production Ready</h3>
              <pre className={styles.codeBlock}>
                {`// GraphQL + Apollo ready
const { data } = useQuery(GET_RECOMMENDATIONS);

// TypeScript throughout
interface Recommendation {
  id: string;
  name: string;
  skills: string[];
}`}
              </pre>
            </div>
          </section>
        </main>

        <section className={styles.techSection}>
          <h2 className={styles.sectionTitle}>
            <Code size={20} />
            Technical Implementation
          </h2>

          <div className={styles.techCategories}>
            <div className={styles.techCategory}>
              <h3 className={styles.techCategoryTitle}>Frontend & Build</h3>
              <div className={styles.techTags}>
                <span className={styles.techTag}>React 18</span>
                <span className={styles.techTag}>TypeScript</span>
                <span className={styles.techTag}>Vite</span>
                <span className={styles.techTag}>CSS Modules</span>
              </div>
            </div>

            <div className={styles.techCategory}>
              <h3 className={styles.techCategoryTitle}>Data & State</h3>
              <div className={styles.techTags}>
                <span className={styles.techTag}>GraphQL</span>
                <span className={styles.techTag}>Apollo Client</span>
                <span className={styles.techTag}>Local State</span>
                <span className={styles.techTag}>Custom Hooks</span>
              </div>
            </div>

            <div className={styles.techCategory}>
              <h3 className={styles.techCategoryTitle}>UI & Design</h3>
              <div className={styles.techTags}>
                <span className={styles.techTag}>Radix UI</span>
                <span className={styles.techTag}>Lucide Icons</span>
                <span className={styles.techTag}>Responsive Design</span>
                <span className={styles.techTag}>Accessibility</span>
              </div>
            </div>

            <div className={styles.techCategory}>
              <h3 className={styles.techCategoryTitle}>Testing & Quality</h3>
              <div className={styles.techTags}>
                <span className={styles.techTag}>Vitest</span>
                <span className={styles.techTag}>React Testing Library</span>
                <span className={styles.techTag}>Playwright</span>
                <span className={styles.techTag}>ESLint</span>
                <span className={styles.techTag}>Prettier</span>
              </div>
            </div>

            <div className={styles.techCategory}>
              <h3 className={styles.techCategoryTitle}>DevOps & Deployment</h3>
              <div className={styles.techTags}>
                <span className={styles.techTag}>GitHub Actions</span>
                <span className={styles.techTag}>Vercel</span>
                <span className={styles.techTag}>Auto Deployment</span>
                <span className={styles.techTag}>PR Previews</span>
                <span className={styles.techTag}>Branch Protection</span>
              </div>
            </div>

            <div className={styles.techCategory}>
              <h3 className={styles.techCategoryTitle}>Workflow & AI</h3>
              <div className={styles.techTags}>
                <span className={styles.techTag}>VS Code Config</span>
                <span className={styles.techTag}>Pre-commit Hooks</span>
                <span className={styles.techTag}>Claude Code</span>
                <span className={styles.techTag}>AI-Assisted Development</span>
                <span className={styles.techTag}>Auto Documentation</span>
              </div>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <h2 className={styles.footerTitle}>Why This Approach Works</h2>

          <div className={styles.benefits}>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>🎯</div>
              <div>
                <h3>Technical Alignment</h3>
                <p>Uses your actual tech stack and design patterns</p>
              </div>
            </div>

            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>🔍</div>
              <div>
                <h3>Deep Research</h3>
                <p>Shows understanding of your design system evolution</p>
              </div>
            </div>

            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>🚀</div>
              <div>
                <h3>Ready to Contribute</h3>
                <p>Demonstrates skills for Content Creation team</p>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <a
              href="https://carolinapowers-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actionButton}
            >
              <Code size={16} />
              View Live Portfolio
            </a>
            <a
              href="https://calendly.com/your-calendar-link"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actionButton + ' ' + styles.primary}
            >
              📅 Schedule Interview
            </a>
          </div>
        </footer>
      </div>
    </ApolloProvider>
  );
};
