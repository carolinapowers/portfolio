import { useState, useCallback, useMemo } from 'react';
import type { SearchableField } from '../types/filtering';

interface SearchState {
  query: string;
  fields: SearchableField[];
  caseSensitive: boolean;
  exact: boolean;
}

interface UseSearchReturn {
  searchState: SearchState;
  updateSearch: (query: string, fields?: SearchableField[]) => void;
  clearSearch: () => void;
  matchesSearch: <T extends Record<string, any>>(
    item: T,
    fieldMapping?: Partial<Record<SearchableField, keyof T | ((item: T) => string)>>
  ) => boolean;
}

const DEFAULT_FIELDS: SearchableField[] = ['name', 'title', 'company', 'content', 'skills', 'summary'];

const INITIAL_SEARCH_STATE: SearchState = {
  query: '',
  fields: DEFAULT_FIELDS,
  caseSensitive: false,
  exact: false,
};

export const useSearch = (
  initialFields?: SearchableField[],
  options?: Partial<Pick<SearchState, 'caseSensitive' | 'exact'>>
): UseSearchReturn => {
  const [searchState, setSearchState] = useState<SearchState>({
    ...INITIAL_SEARCH_STATE,
    fields: initialFields || DEFAULT_FIELDS,
    ...options,
  });

  const updateSearch = useCallback((query: string, fields?: SearchableField[]) => {
    setSearchState(prev => ({
      ...prev,
      query,
      ...(fields && { fields }),
    }));
  }, []);

  const clearSearch = useCallback(() => {
    setSearchState(prev => ({
      ...prev,
      query: '',
    }));
  }, []);

  const matchesSearch = useCallback(<T extends Record<string, any>>(
    item: T,
    fieldMapping?: Partial<Record<SearchableField, keyof T | ((item: T) => string)>>
  ): boolean => {
    const { query, fields, caseSensitive, exact } = searchState;

    if (!query.trim()) return true;

    const searchQuery = caseSensitive ? query : query.toLowerCase();

    return fields.some(field => {
      let fieldValue: string = '';

      if (fieldMapping && fieldMapping[field]) {
        const mapping = fieldMapping[field];
        if (typeof mapping === 'function') {
          fieldValue = mapping(item);
        } else {
          fieldValue = String(item[mapping] || '');
        }
      } else {
        // Default mapping
        fieldValue = String(item[field as keyof T] || '');
      }

      if (!fieldValue) return false;

      const processedValue = caseSensitive ? fieldValue : fieldValue.toLowerCase();
      return exact ? processedValue === searchQuery : processedValue.includes(searchQuery);
    });
  }, [searchState]);

  return useMemo(() => ({
    searchState,
    updateSearch,
    clearSearch,
    matchesSearch,
  }), [searchState, updateSearch, clearSearch, matchesSearch]);
};