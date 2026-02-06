import React, { useState, useMemo } from 'react';
import {
  creativeTechnologistProjects,
  categoryDisplayNames,
  type ProjectCategory,
} from '../../data/creativeTechnologistProjects';
import { Button } from '../../shared/components/ui/Button';
import { ProjectCard } from './ProjectCard';
import styles from './ProjectGrid.module.css';

export const ProjectGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategory | null>(null);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const filteredProjects = useMemo(() => {
    return creativeTechnologistProjects
      .filter((project) => {
        if (selectedCategory && project.category !== selectedCategory) {
          return false;
        }
        if (showFeaturedOnly && !project.featured) {
          return false;
        }
        return true;
      })
      .sort((a, b) => a.order - b.order);
  }, [selectedCategory, showFeaturedOnly]);

  const categories = Object.entries(categoryDisplayNames) as [
    ProjectCategory,
    string,
  ][];

  return (
    <section className={styles.projectSection}>
      <div className={styles.controls}>
        <div className={styles.filters}>
          <Button
            variant="filter"
            size="md"
            onClick={() => setSelectedCategory(null)}
            className={selectedCategory === null ? 'active' : ''}
          >
            All Projects
          </Button>
          {categories.map(([category, displayName]) => (
            <Button
              key={category}
              variant="filter"
              size="md"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? 'active' : ''}
            >
              {displayName}
            </Button>
          ))}
        </div>

        <label className={styles.featuredToggle}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={showFeaturedOnly}
            onChange={(e) => setShowFeaturedOnly(e.target.checked)}
          />
          Show Featured Only
        </label>
      </div>

      <div className={styles.projectCount}>
        {filteredProjects.length}{' '}
        {filteredProjects.length === 1 ? 'Project' : 'Projects'}
      </div>

      {filteredProjects.length > 0 ? (
        <div className={styles.grid}>
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>No projects match your current filters.</p>
          <Button
            variant="secondary"
            size="md"
            onClick={() => {
              setSelectedCategory(null);
              setShowFeaturedOnly(false);
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </section>
  );
};
