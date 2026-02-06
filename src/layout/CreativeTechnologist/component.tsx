import React from 'react';
import { Briefcase } from 'lucide-react';
import { ProjectGrid } from './ProjectGrid';
import layoutStyles from '../component.module.css';
import { Card } from '../../shared/components/ui/Card';

export const CreativeTechnologistSection: React.FC = () => {
  return (
    <Card as="section" role="region">
      <h2 className={layoutStyles.sectionTitle}>
        <Briefcase className={layoutStyles.sectionIcon} size={20} />
        Featured Work
      </h2>
      <div className={layoutStyles.recommendationsIntro}>
        <p className={layoutStyles.sectionDescription}>
          A collection of projects spanning AI automation, learning experiences,
          internal tooling, and developer experience improvements
        </p>
      </div>

      <ProjectGrid />
    </Card>
  );
};
