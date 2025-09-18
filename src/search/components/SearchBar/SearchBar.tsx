import React, { useCallback } from 'react';
import { Search, X } from 'lucide-react';
import type {
  SearchableField,
  UseFiltersReturn,
} from '../../../layout/Recommendations/types/filtering';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  filters: UseFiltersReturn;
}

export const SearchBar: React.FC<SearchBarProps> = ({ filters }) => {
  const { filters: filterState, actions } = filters;

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

  const searchFields: Array<{ field: SearchableField; label: string }> = [
    { field: 'name', label: 'Name' },
    { field: 'title', label: 'Title' },
    { field: 'company', label: 'Company' },
    { field: 'content', label: 'Content' },
    { field: 'skills', label: 'Skills' },
    { field: 'summary', label: 'Summary' },
  ];

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchHeader}>
        <div className={styles.searchTitle}>
          <Search size={14} />
          <span>Search</span>
        </div>
      </div>

      {/* Search Input */}
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
            <X size={12} />
          </button>
        )}
      </div>

      {/* Search Fields Selector */}
      <div className={styles.searchFields}>
        <span className={styles.searchFieldsLabel}>Search in:</span>
        <div className={styles.searchFieldsGrid}>
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
    </div>
  );
};