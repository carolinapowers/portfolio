import React, { useState, useMemo, useCallback } from 'react';
import {
  creativeTechnologistProjects,
  categoryDisplayNames,
  type ProjectCategory,
} from '../../data/creativeTechnologistProjects';
import { Button } from '../../shared/components/ui/Button';
import { ProjectCard } from './ProjectCard';
import styles from './ProjectGrid.module.css';

interface CategoryButtonProps {
  category: ProjectCategory;
  displayName: string;
  isSelected: boolean;
  onClick: (category: ProjectCategory) => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  category,
  displayName,
  isSelected,
  onClick,
}) => {
  const handleClick = useCallback(() => {
    onClick(category);
  }, [category, onClick]);

  return (
    <Button
      variant="filter"
      size="md"
      onClick={handleClick}
      className={isSelected ? 'active' : ''}
    >
      {displayName}
    </Button>
  );
};

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

  const handleShowAll = useCallback(() => {
    setSelectedCategory(null);
  }, []);

  const handleCategoryClick = useCallback((category: ProjectCategory) => {
    setSelectedCategory(category);
  }, []);

  const handleFeaturedChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setShowFeaturedOnly(e.target.checked);
    },
    []
  );

  const handleClearFilters = useCallback(() => {
    setSelectedCategory(null);
    setShowFeaturedOnly(false);
  }, []);

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
            onClick={handleShowAll}
            className={selectedCategory === null ? 'active' : ''}
          >
            All Projects
          </Button>
          {categories.map(([category, displayName]) => (
            <CategoryButton
              key={category}
              category={category}
              displayName={displayName}
              isSelected={selectedCategory === category}
              onClick={handleCategoryClick}
            />
          ))}
        </div>

        <label className={styles.featuredToggle}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={showFeaturedOnly}
            onChange={handleFeaturedChange}
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
          <Button variant="secondary" size="md" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </div>
      )}
    </section>
  );
};
