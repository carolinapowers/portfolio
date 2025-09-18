import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import type {
  SortOption,
  UseFiltersReturn,
} from '../../../../domains/layout/recommendations/types/filtering';
import styles from './SortingControls.module.css';

interface SortingControlsProps {
  filters: UseFiltersReturn;
}

export const SortingControls: React.FC<SortingControlsProps> = ({ filters }) => {
  const { filters: filterState, actions } = filters;

  // Sort options configuration
  const sortOptions: Array<{ value: SortOption; label: string; icon: string }> = [
    { value: 'date', label: 'Date', icon: '📅' },
    { value: 'name', label: 'Name', icon: '👤' },
    { value: 'company', label: 'Company', icon: '🏢' },
    { value: 'skills', label: 'Skills', icon: '🛠️' },
    { value: 'role', label: 'Role', icon: '👥' },
    { value: 'relevance', label: 'Relevance', icon: '⭐' },
  ];

  const handleSortChange = (sortBy: SortOption) => {
    const currentOrder =
      filterState.sortBy === sortBy
        ? filterState.sortOrder === 'asc'
          ? 'desc'
          : 'asc'
        : 'desc';
    actions.updateSort(sortBy, currentOrder);
  };

  return (
    <div className={styles.sortingContainer}>
      <div className={styles.sortingHeader}>
        <div className={styles.sortingTitle}>
          <ArrowUpDown size={14} />
          <span>Sort</span>
        </div>
        <span className={styles.currentSort}>
          Currently:{' '}
          {sortOptions.find(opt => opt.value === filterState.sortBy)?.label}{' '}
          {filterState.sortOrder === 'asc' ? '↑' : '↓'}
        </span>
      </div>

      <div className={styles.sortOptions}>
        {sortOptions.map(({ value, label, icon }) => (
          <button
            key={value}
            onClick={() => handleSortChange(value)}
            className={styles.sortOption}
            aria-label={`Sort by ${label}`}
          >
            <span className={styles.sortIcon}>{icon}</span>
            <span className={styles.sortLabel}>{label}</span>
            <span className={styles.sortOrder}>
              {filterState.sortBy === value
                ? (filterState.sortOrder === 'asc' ? '↑' : '↓')
                : ''
              }
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};