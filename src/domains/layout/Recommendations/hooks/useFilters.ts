import { useState, useCallback, useMemo } from 'react';
import type { Filter } from '../types/filtering';

interface UseFiltersReturn {
  filters: Filter[];
  addFilter: (filter: Filter) => void;
  removeFilter: (filterId: string) => void;
  updateFilter: (filterId: string, updates: Partial<Filter>) => void;
  clearFilters: () => void;
  hasFilter: (filterId: string) => boolean;
  getFilter: (filterId: string) => Filter | undefined;
}

export const useFilters = (initialFilters: Filter[] = []): UseFiltersReturn => {
  const [filters, setFilters] = useState<Filter[]>(initialFilters);

  const addFilter = useCallback((filter: Filter) => {
    setFilters(prev => {
      // Replace if filter with same ID exists, otherwise add
      const existing = prev.findIndex(f => f.id === filter.id);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = filter;
        return updated;
      }
      return [...prev, filter];
    });
  }, []);

  const removeFilter = useCallback((filterId: string) => {
    setFilters(prev => prev.filter(f => f.id !== filterId));
  }, []);

  const updateFilter = useCallback((filterId: string, updates: Partial<Filter>) => {
    setFilters(prev => prev.map(filter =>
      filter.id === filterId ? { ...filter, ...updates } as Filter : filter
    ));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters([]);
  }, []);

  const hasFilter = useCallback((filterId: string): boolean => {
    return filters.some(f => f.id === filterId);
  }, [filters]);

  const getFilter = useCallback((filterId: string): Filter | undefined => {
    return filters.find(f => f.id === filterId);
  }, [filters]);

  return useMemo(() => ({
    filters,
    addFilter,
    removeFilter,
    updateFilter,
    clearFilters,
    hasFilter,
    getFilter,
  }), [filters, addFilter, removeFilter, updateFilter, clearFilters, hasFilter, getFilter]);
};