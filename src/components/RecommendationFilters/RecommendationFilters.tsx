import React, { useState, useCallback } from 'react';
import { Search, Filter, X, ChevronDown, ChevronUp, Clock, BarChart3 } from 'lucide-react';
import type { 
  SkillFilter, 
  SortOption, 
  SearchableField,
  UseFiltersReturn 
} from '../../types/filtering';
import {
  SKILL_CATEGORIES,
  type SkillCategory,
  SKILL_TO_CATEGORY_MAP,
} from '../../data/skills';
import { recommendations } from '../../data/recommendations';
import styles from './RecommendationFilters.module.css';

interface RecommendationFiltersProps {
  filters: UseFiltersReturn;
  totalRecommendations: number;
}

export const RecommendationFilters: React.FC<RecommendationFiltersProps> = ({
  filters,
  totalRecommendations,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPerformanceMetrics, setShowPerformanceMetrics] = useState(false);

  const { filters: filterState, results, actions, metrics } = filters;

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

  // Search handlers
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      actions.updateSearch(e.target.value);
    },
    [actions]
  );

  const handleSearchFieldToggle = useCallback(
    (field: SearchableField) => {
      const currentFields = filterState.search.fields;
      const newFields = currentFields.includes(field)
        ? currentFields.filter(f => f !== field)
        : [...currentFields, field];

      if (newFields.length > 0) {
        actions.updateSearch(filterState.search.query, newFields);
      }
    },
    [filterState.search, actions]
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

  // Sort handlers
  const handleSortChange = useCallback(
    (sortBy: SortOption) => {
      const currentOrder =
        filterState.sortBy === sortBy
          ? filterState.sortOrder === 'asc'
            ? 'desc'
            : 'asc'
          : 'desc';
      actions.updateSort(sortBy, currentOrder);
    },
    [filterState.sortBy, filterState.sortOrder, actions]
  );

  // Get active filter count
  const activeFilterCount =
    filterState.activeFilters.length + (filterState.search.query ? 1 : 0);

  // Sort options configuration
  const sortOptions: Array<{ value: SortOption; label: string; icon: string }> =
    [
      { value: 'date', label: 'Date', icon: '📅' },
      { value: 'name', label: 'Name', icon: '👤' },
      { value: 'company', label: 'Company', icon: '🏢' },
      { value: 'skills', label: 'Skills', icon: '🛠️' },
      { value: 'relevance', label: 'Relevance', icon: '⭐' },
    ];

  const searchFields: Array<{ field: SearchableField; label: string }> = [
    { field: 'name', label: 'Name' },
    { field: 'title', label: 'Title' },
    { field: 'company', label: 'Company' },
    { field: 'content', label: 'Content' },
    { field: 'skills', label: 'Skills' },
    { field: 'summary', label: 'Summary' },
  ];

  return (
    <div className={styles.filtersContainer}>
      {/* Filter Header */}
      <div className={styles.filtersHeader}>
        <div className={styles.filtersTitle}>
          <Filter size={18} />
          <span>Filter Recommendations</span>
          {activeFilterCount > 0 && (
            <span className={styles.filterCount}>{activeFilterCount}</span>
          )}
        </div>

        <div className={styles.filtersActions}>
          <button
            onClick={() => setShowPerformanceMetrics(!showPerformanceMetrics)}
            className={styles.metricsButton}
            title="Show performance metrics"
          >
            <BarChart3 size={16} />
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={styles.expandButton}
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Performance Metrics */}
      {showPerformanceMetrics && metrics.length > 0 && (
        <div className={styles.performanceMetrics}>
          <h4>Performance Metrics</h4>
          <div className={styles.metricsGrid}>
            {metrics.slice(-3).map(metric => (
              <div
                key={`${metric.filterType}-${metric.executionTime}`}
                className={styles.metric}
              >
                <span className={styles.metricLabel}>{metric.filterType}</span>
                <span className={styles.metricValue}>
                  {metric.executionTime.toFixed(1)}ms
                </span>
                <span className={styles.metricMatch}>
                  {metric.matchCount} matches
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results Summary */}
      <div className={styles.resultsSummary}>
        <b>
          Showing {results.recommendations.length} of {results.totalMatches}{' '}
          recommendations
          {results.totalMatches !== totalRecommendations && (
            <span className={styles.filteredCount}>
              (filtered from {totalRecommendations} total)
            </span>
          )}
        </b>
        {results.executionTime > 0 && (
          <span className={styles.executionTime}>
            <Clock size={12} />
            {results.executionTime.toFixed(1)}ms
          </span>
        )}
      </div>

      {/* Search Section */}
      <div className={styles.searchSection}>
        <div className={styles.searchInput}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search recommendations..."
            value={filterState.search.query}
            onChange={handleSearchChange}
            className={styles.searchField}
          />
          {filterState.search.query && (
            <button
              onClick={() => actions.updateSearch('')}
              className={styles.clearSearch}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Search Fields Selector */}
        <div className={styles.searchFields}>
          <span className={styles.searchFieldsLabel}>Search in:</span>
          {searchFields.map(({ field, label }) => (
            <label key={field} className={styles.searchFieldOption}>
              <input
                type="checkbox"
                checked={filterState.search.fields.includes(field)}
                onChange={() => handleSearchFieldToggle(field)}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      {isExpanded && (
        <div className={styles.filtersContent}>
          {/* Skill Categories Filter */}
          <div className={styles.skillFiltersSection}>
            <h3 className={styles.sectionTitle}>Filter by Skills</h3>
            <div className={styles.skillCategories}>
              {Object.entries(SKILL_CATEGORIES).map(([category, info]) => {
                const typedCategory = category as SkillCategory;
                const isActive = filterState.activeFilters.some(
                  f => f.type === 'skill' && f.id === `skill-${category}`
                );

                return (
                  <div key={category} className={styles.skillCategory}>
                    <button
                      onClick={() => handleSkillFilterToggle(typedCategory)}
                      className={`${styles.skillCategoryButton} ${isActive ? styles.active : ''}`}
                    >
                      <span className={styles.skillCategoryName}>
                        {info.name}
                      </span>
                      <span className={styles.skillCategoryCount}>
                        {getSkillCountForCategory(typedCategory)} skills
                      </span>
                    </button>
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
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sort Section */}
          <div className={styles.sortSection}>
            <h3 className={styles.sectionTitle}>Sort By</h3>
            <div className={styles.sortOptions}>
              {sortOptions.map(({ value, label, icon }) => (
                <button
                  key={value}
                  onClick={() => handleSortChange(value)}
                  className={`${styles.sortOption} ${
                    filterState.sortBy === value ? styles.active : ''
                  }`}
                >
                  <span className={styles.sortIcon}>{icon}</span>
                  <span>{label}</span>
                  {filterState.sortBy === value && (
                    <span className={styles.sortOrder}>
                      {filterState.sortOrder === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};