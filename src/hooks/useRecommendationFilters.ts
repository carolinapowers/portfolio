import { useMemo, useCallback, useState } from 'react';
import type { Recommendation } from '../data/recommendations';
import type {
  FilterState,
  FilterResult,
  Filter,
  SearchableField,
  UseFiltersReturn,
  FilterActions,
} from '../types/filtering';
import { useSearch } from './useSearch';
import { useFilters } from './useFilters';
import { usePagination } from './usePagination';
import { useFilteredData } from './useFilteredData';
import { useSort } from './useSort';

/**
 * Advanced filtering hook for recommendations that composes smaller, focused hooks
 * Demonstrates separation of concerns and modular hook architecture
 */
export const useRecommendationFilters = (
  recommendations: readonly Recommendation[],
  initialItemsPerPage: number = 6
): UseFiltersReturn => {
  const [error, setError] = useState<Error | null>(null);

  // Initialize individual hooks
  const { searchState, updateSearch, clearSearch, matchesSearch } = useSearch();
  const { filters, addFilter, removeFilter, clearFilters } = useFilters();
  const { sortState, updateSort } = useSort('date', 'desc');

  // Create search predicate for filtered data hook
  const searchPredicate = useCallback(
    (item: Recommendation) => {
      return matchesSearch(item, {
        name: 'name',
        title: 'title',
        company: 'company',
        content: 'content',
        skills: item => item.skills.join(' '),
        summary: 'summary',
      });
    },
    [matchesSearch]
  );

  // Use filtered data hook with all filters
  const { filteredData, totalMatches } = useFilteredData(recommendations, {
    filters,
    sortBy: sortState.sortBy,
    sortOrder: sortState.sortOrder,
    searchPredicate,
  });

  // Use pagination hook
  const { pagination, setPage, setItemsPerPage, paginate } = usePagination(
    totalMatches,
    initialItemsPerPage
  );

  // Apply pagination to get final results
  const filteredResults = useMemo((): FilterResult => {
    try {
      const paginatedItems = paginate(filteredData);

      const result: FilterResult = {
        recommendations: paginatedItems,
        pagination: {
          currentPage: pagination.currentPage,
          itemsPerPage: pagination.itemsPerPage,
          totalItems: pagination.totalItems,
          totalPages: pagination.totalPages,
        },
        appliedFilters: filters,
        searchQuery: searchState.query,
        totalMatches,
      };

      return result;
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error('Unknown filtering error');
      setError(error);

      return {
        recommendations: [],
        pagination: {
          currentPage: pagination.currentPage,
          itemsPerPage: pagination.itemsPerPage,
          totalItems: 0,
          totalPages: 0,
        },
        appliedFilters: [],
        searchQuery: '',
        totalMatches: 0,
      };
    }
  }, [
    filteredData,
    pagination,
    paginate,
    filters,
    searchState.query,
    totalMatches,
  ]);

  // Combine actions from all hooks
  const actions: FilterActions = useMemo(
    () => ({
      addFilter: (filter: Filter) => {
        addFilter(filter);
        setPage(1); // Reset to first page when filters change
      },

      removeFilter: (filterId: string) => {
        removeFilter(filterId);
        setPage(1);
      },

      clearAllFilters: () => {
        clearFilters();
        clearSearch();
        setPage(1);
      },

      updateSearch: (query: string, fields?: SearchableField[]) => {
        updateSearch(query, fields);
        setPage(1);
      },

      updateSort: (sortBy, order = 'desc') => {
        updateSort(sortBy, order);
      },

      updatePagination: (page: number, itemsPerPage?: number) => {
        setPage(page);
        if (itemsPerPage) {
          setItemsPerPage(itemsPerPage);
        }
      },

      resetFilters: () => {
        clearFilters();
        clearSearch();
        updateSort('date', 'desc');
        setPage(1);
      },
    }),
    [
      addFilter,
      removeFilter,
      clearFilters,
      clearSearch,
      updateSearch,
      updateSort,
      setPage,
      setItemsPerPage,
    ]
  );

  // Build filter state for return value
  const filterState: FilterState = useMemo(
    () => ({
      search: {
        type: 'search' as const,
        query: searchState.query,
        fields: searchState.fields,
        caseSensitive: searchState.caseSensitive,
        exact: searchState.exact,
      },
      activeFilters: filters,
      sortBy: sortState.sortBy,
      sortOrder: sortState.sortOrder,
    }),
    [searchState, filters, sortState]
  );

  return {
    filters: filterState,
    results: filteredResults,
    isLoading: false,
    error,
    actions,
  };
};
