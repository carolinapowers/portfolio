import { useState, useCallback, useMemo } from 'react';
import type { SortOption, SortOrder } from '../types/filtering';

interface SortState {
  sortBy: SortOption;
  sortOrder: SortOrder;
}

interface UseSortReturn {
  sortState: SortState;
  updateSort: (sortBy: SortOption, sortOrder?: SortOrder) => void;
  toggleSortOrder: () => void;
  resetSort: (defaultSort?: SortOption, defaultOrder?: SortOrder) => void;
  getSortComparator: <T>(accessor: (item: T) => any) => (a: T, b: T) => number;
}

const DEFAULT_SORT: SortState = {
  sortBy: 'date',
  sortOrder: 'desc',
};

export const useSort = (
  initialSortBy: SortOption = 'date',
  initialSortOrder: SortOrder = 'desc'
): UseSortReturn => {
  const [sortState, setSortState] = useState<SortState>({
    sortBy: initialSortBy,
    sortOrder: initialSortOrder,
  });

  const updateSort = useCallback((sortBy: SortOption, sortOrder?: SortOrder) => {
    setSortState(prev => ({
      sortBy,
      sortOrder: sortOrder ?? prev.sortOrder,
    }));
  }, []);

  const toggleSortOrder = useCallback(() => {
    setSortState(prev => ({
      ...prev,
      sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  const resetSort = useCallback((
    defaultSort: SortOption = DEFAULT_SORT.sortBy,
    defaultOrder: SortOrder = DEFAULT_SORT.sortOrder
  ) => {
    setSortState({
      sortBy: defaultSort,
      sortOrder: defaultOrder,
    });
  }, []);

  const getSortComparator = useCallback(<T,>(
    accessor: (item: T) => any
  ): ((a: T, b: T) => number) => {
    return (a: T, b: T): number => {
      const valueA = accessor(a);
      const valueB = accessor(b);

      let comparison = 0;

      if (valueA == null && valueB == null) {
        comparison = 0;
      } else if (valueA == null) {
        comparison = 1;
      } else if (valueB == null) {
        comparison = -1;
      } else if (typeof valueA === 'string' && typeof valueB === 'string') {
        comparison = valueA.localeCompare(valueB);
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        comparison = valueA - valueB;
      } else if (valueA instanceof Date && valueB instanceof Date) {
        comparison = valueA.getTime() - valueB.getTime();
      } else {
        comparison = String(valueA).localeCompare(String(valueB));
      }

      return sortState.sortOrder === 'asc' ? comparison : -comparison;
    };
  }, [sortState.sortOrder]);

  return useMemo(() => ({
    sortState,
    updateSort,
    toggleSortOrder,
    resetSort,
    getSortComparator,
  }), [sortState, updateSort, toggleSortOrder, resetSort, getSortComparator]);
};