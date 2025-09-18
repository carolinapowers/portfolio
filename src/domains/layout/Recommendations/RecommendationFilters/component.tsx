import React, { useCallback } from 'react';
import {
  Filter,
  X,
} from 'lucide-react';
import {
  SKILL_CATEGORIES,
  type SkillCategory,
  SKILL_TO_CATEGORY_MAP,
} from '../../../../data/skills';
import { recommendations } from '../../../../data/recommendations';
import styles from './component.module.css';
import type { SkillFilter, UseFiltersReturn } from '../types/filtering';

interface RecommendationFiltersProps {
  filters: UseFiltersReturn;
}

export const RecommendationFilters: React.FC<RecommendationFiltersProps> = ({
  filters,
}) => {
  const { filters: filterState, actions } = filters;

  // Count unique skills that appear in recommendations for each category
  const getSkillCountForCategory = useCallback(
    (category: SkillCategory): number => {
      // Get all unique skills from recommendations
      const allSkills = recommendations.flatMap(rec => rec.skills);

      const uniqueSkills = [...new Set(allSkills)];

      // Count how many unique skills belong to this category
      const count = uniqueSkills.filter(
        skillName => SKILL_TO_CATEGORY_MAP[skillName] === category
      ).length;

      return count;
    },
    []
  );

  // Filter creation helpers
  const createSkillFilter = useCallback(
    (category: SkillCategory): SkillFilter => {
      const categoryInfo = SKILL_CATEGORIES[category];
      return {
        id: `skill-${category}`,
        type: 'skill',
        label: categoryInfo.name,
        description: categoryInfo.description,
        category,
        keywords: [category], // Use category key for filtering
        priority: 'high',
      };
    },
    []
  );

  const handleSkillFilterToggle = useCallback(
    (category: SkillCategory) => {
      const filterId = `skill-${category}`;
      const existingFilter = filterState.activeFilters.find(
        f => f.id === filterId
      );

      if (existingFilter) {
        actions.removeFilter(filterId);
      } else {
        const newFilter = createSkillFilter(category);
        actions.addFilter(newFilter);
      }
    },
    [filterState.activeFilters, actions, createSkillFilter]
  );

  // Get active filter count
  const activeFilterCount = filterState.activeFilters.length;

  return (
    <div className={styles.filtersContainer}>
      {/* Filter Header */}
      <div className={styles.filtersHeader}>
        <div className={styles.filtersTitle}>
          <Filter size={14} />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className={styles.filterCount}>{activeFilterCount}</span>
          )}
        </div>
      </div>

      <div className={styles.filtersContent}>
        {/* Skill Categories Filter */}
        <div className={styles.skillFiltersSection}>
          <div className={styles.skillCategories}>
            {Object.entries(SKILL_CATEGORIES).map(([category, info]) => {
              const typedCategory = category as SkillCategory;
              const isActive = filterState.activeFilters.some(
                f => f.type === 'skill' && f.id === `skill-${category}`
              );

              return (
                <div key={category} className={styles.skillCategory}>
                  <label
                    className={`${styles.skillCategoryLabel} ${isActive ? styles.active : ''}`}
                  >
                    <div className={styles.skillCategoryInfo}>
                      <input
                        type="checkbox"
                        checked={isActive}
                        onChange={() => handleSkillFilterToggle(typedCategory)}
                        className={styles.skillCheckbox}
                      />
                      <div className={styles.skillCategoryName}>
                        <span>{info.name}</span>
                        <p className={styles.skillCategoryCount}>
                          {getSkillCountForCategory(typedCategory)} skills
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Filters */}
        {filterState.activeFilters.length > 0 && (
          <div className={styles.activeFiltersSection}>
            <div className={styles.activeFiltersHeader}>
              <h3 className={styles.sectionTitle}>Active Filters</h3>
              <button
                onClick={actions.clearAllFilters}
                className={styles.clearAllButton}
              >
                Clear All
              </button>
            </div>
            <div className={styles.activeFilters}>
              {filterState.activeFilters.map(filter => (
                <div key={filter.id} className={styles.activeFilter}>
                  <span className={styles.activeFilterLabel}>
                    {filter.label}
                  </span>
                  <button
                    onClick={() => actions.removeFilter(filter.id)}
                    className={styles.removeFilterButton}
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};