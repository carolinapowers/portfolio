import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { Edit, Users, Lightbulb, Code } from 'lucide-react';
import { client } from '../../apollo/client';
import { RichTextEditor } from '../RichTextEditor/RichTextEditor';
import { RecommendationCard } from '../RecommendationCard/RecommendationCard';
import { BrainstormingSpace } from '../BrainstormingSpace/BrainstormingSpace';
import { portfolioRecommendations } from '../../data/recommendations';
import styles from './Layout.module.css';

export const Layout: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Buffer Content Creation Experience</h1>
          <p className={styles.subtitle}>Senior Frontend Engineer Portfolio</p>
          <p className={styles.description}>
            Built with Buffer-inspired design patterns + modern React
          </p>
          <div className={styles.techStack}>
            <span className={styles.tech}>React</span>
            <span className={styles.tech}>TypeScript</span>
            <span className={styles.tech}>Tailwind</span>
            <span className={styles.tech}>GraphQL</span>
            <span className={styles.tech}>MongoDB</span>
            <span className={styles.tech}>AWS</span>
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

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Users className={styles.sectionIcon} size={20} />
              LinkedIn Recommendations
            </h2>
            <p className={styles.sectionDescription}>
              Actual testimonials from colleagues
            </p>
            <div className={styles.recommendationsGrid}>
              {portfolioRecommendations.map(recommendation => (
                <RecommendationCard key={recommendation.id} recommendation={recommendation} />
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Lightbulb className={styles.sectionIcon} size={20} />
              Collaborative Brainstorming
            </h2>
            <p className={styles.sectionDescription}>
              Interactive space for your thoughts
            </p>
            <BrainstormingSpace />
          </section>

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