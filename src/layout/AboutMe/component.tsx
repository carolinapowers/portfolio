import React from 'react';
import { User } from 'lucide-react';
import layoutStyles from '../component.module.css';
import { Card } from '../../shared/components/ui/Card';
import styles from './component.module.css';

export const AboutMeSection: React.FC = () => {
  return (
    <Card as="section" role="region">
      <h2 className={layoutStyles.sectionTitle}>
        <User className={layoutStyles.sectionIcon} size={20} />
        About Me
      </h2>
      <div className={styles.content}>
        <p>
          I'm a software engineer with a passion for creating intuitive user
          experiences and building tools that empower developers and teams. My
          work spans across AI automation, learning platforms, and developer
          experience improvements, always with a focus on clean code and
          thoughtful design.
        </p>
        <p>
          With expertise in React, TypeScript, and modern web technologies, I
          specialize in translating complex requirements into elegant,
          accessible solutions. I thrive at the intersection of technical
          implementation and user-centered design, whether that's crafting
          interactive learning experiences or building internal tools that
          streamline workflows.
        </p>
        <p>
          Beyond writing code, I'm driven by continuous learning and knowledge
          sharing. I believe the best products come from understanding both the
          technical constraints and the human needs they serve.
        </p>
      </div>
    </Card>
  );
};
