import React, { useState, useMemo, useCallback } from 'react';
import {
  creativeTechnologistProjects,
  categoryDisplayNames,
  type ProjectCategory,
  type Project,
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
      active={isSelected}
    >
      {displayName}
    </Button>
  );
};

interface ProjectCardWrapperProps {
  project: Project;
  index: number;
  isExpanded: boolean;
  onToggleExpand: (projectId: string, index: number) => void;
}

const ProjectCardWrapper: React.FC<ProjectCardWrapperProps> = ({
  project,
  index,
  isExpanded,
  onToggleExpand,
}) => {
  const handleToggle = useCallback(() => {
    onToggleExpand(project.id, index);
  }, [project.id, index, onToggleExpand]);

  return (
    <ProjectCard
      project={project}
      isExpanded={isExpanded}
      onToggleExpand={handleToggle}
    />
  );
};

export const ProjectGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    ProjectCategory | null | undefined
  >(undefined);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

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

  const handleToggleExpand = useCallback(
    (projectId: string, index: number) => {
      setExpandedCards((prev) => {
        const newSet = new Set(prev);
        const isExpanding = !prev.has(projectId);

        if (isExpanding) {
          // Add the clicked card
          newSet.add(projectId);

          // Add the adjacent card (next card in the grid)
          const adjacentIndex = index + 1;
          const adjacentProject = filteredProjects[adjacentIndex];
          if (adjacentProject) {
            newSet.add(adjacentProject.id);
          }
        } else {
          // Remove the clicked card
          newSet.delete(projectId);

          // Remove the adjacent card
          const adjacentIndex = index + 1;
          const adjacentProject = filteredProjects[adjacentIndex];
          if (adjacentProject) {
            newSet.delete(adjacentProject.id);
          }
        }

        return newSet;
      });
    },
    [filteredProjects]
  );

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
            active={selectedCategory === null && selectedCategory !== undefined}
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
          {filteredProjects.map((project, index) => (
            <ProjectCardWrapper
              key={project.id}
              project={project}
              index={index}
              isExpanded={expandedCards.has(project.id)}
              onToggleExpand={handleToggleExpand}
            />
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
