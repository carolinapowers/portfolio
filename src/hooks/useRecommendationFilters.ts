import { useState, useMemo, useCallback } from 'react';
import type { Recommendation } from '../data/recommendations';
import type {
  FilterState,
  FilterResult,
  Filter,
  SearchableField,
  SortOption,
  SortOrder,
  PaginationState,
  UseFiltersReturn,
  FilterActions,
  FilterPredicate
} from '../types/filtering';
import { isSkillFilter, isCompanyFilter, isRoleFilter, isDateRangeFilter } from '../types/filtering';
import { getSkillCategory } from '../data/skills';

// Initial state constants
const INITIAL_SEARCH = {
  type: 'search' as const,
  query: '',
  fields: ['name', 'title', 'company', 'content', 'skills', 'summary'] as SearchableField[],
  caseSensitive: false,
  exact: false,
};

const INITIAL_PAGINATION = {
  currentPage: 1,
  itemsPerPage: 6,
  totalItems: 0,
  totalPages: 0,
};

const INITIAL_FILTER_STATE: FilterState = {
  search: INITIAL_SEARCH,
  activeFilters: [],
  sortBy: 'date',
  sortOrder: 'desc',
};

/**
 * Advanced filtering hook for recommendations with TypeScript best practices
 * Demonstrates complex state management, memoization, and performance optimization
 */
export const useRecommendationFilters = (
  recommendations: readonly Recommendation[],
  initialItemsPerPage: number = 6
): UseFiltersReturn => {
  // State management
  const [filterState, setFilterState] = useState<FilterState>(INITIAL_FILTER_STATE);
  const [pagination, setPagination] = useState<PaginationState>({
    ...INITIAL_PAGINATION,
    itemsPerPage: initialItemsPerPage,
  });
  const [error, setError] = useState<Error | null>(null);

  // Filter predicates for different filter types
  const filterPredicates = useMemo((): Record<string, FilterPredicate> => ({
    skill: (recommendation: Recommendation) => {
      const skillFilters = filterState.activeFilters.filter(isSkillFilter);
      if (skillFilters.length === 0) return true;
      
      // Check if any of the recommendation's skills match the filter categories
      return skillFilters.some(filter => 
        recommendation.skills.some(skillName => {
          const skillCategory = getSkillCategory(skillName);
          return filter.keywords.some(keyword => 
            skillCategory === keyword || 
            skillName.toLowerCase().includes(keyword.toLowerCase())
          );
        })
      );
    },
    
    company: (recommendation: Recommendation) => {
      const companyFilters = filterState.activeFilters.filter(isCompanyFilter);
      if (companyFilters.length === 0) return true;
      
      return companyFilters.some(filter =>
        filter.companies.some(company =>
          recommendation.company.toLowerCase().includes(company.toLowerCase())
        )
      );
    },
    
    role: (recommendation: Recommendation) => {
      const roleFilters = filterState.activeFilters.filter(isRoleFilter);
      if (roleFilters.length === 0) return true;
      
      return roleFilters.some(filter =>
        filter.roles.some(role =>
          recommendation.title.toLowerCase().includes(role.toLowerCase())
        )
      );
    },
    
    dateRange: (recommendation: Recommendation) => {
      const dateFilters = filterState.activeFilters.filter(isDateRangeFilter);
      if (dateFilters.length === 0) return true;
      
      const recDate = new Date(recommendation.date);
      return dateFilters.every(filter => {
        const afterStart = !filter.startDate || recDate >= filter.startDate;
        const beforeEnd = !filter.endDate || recDate <= filter.endDate;
        return afterStart && beforeEnd;
      });
    },
    
    search: (recommendation: Recommendation) => {
      const { query, fields, caseSensitive, exact } = filterState.search;
      if (!query.trim()) return true;
      
      const searchQuery = caseSensitive ? query : query.toLowerCase();
      
      const searchableContent: Record<SearchableField, string> = {
        name: recommendation.name || '',
        title: recommendation.title || '',
        company: recommendation.company || '',
        content: recommendation.content || '',
        skills: (recommendation.skills || []).join(' '),
        summary: recommendation.summary || '',
      };
      
      return fields.some(field => {
        const content = searchableContent[field];
        if (!content) return false;
        
        const fieldValue = caseSensitive ? content : content.toLowerCase();
        return exact ? fieldValue === searchQuery : fieldValue.includes(searchQuery);
      });
    },
  }), [filterState]);

  // Helper to categorize relationships for role-based sorting
  const getRelationshipCategory = useCallback((relationship: string): number => {
    const rel = relationship.toLowerCase();
    
    // Manager/Leadership roles (highest priority)
    if (rel.includes('managed') || rel.includes('director') || rel.includes('manager')) {
      return 1;
    }
    
    // Senior/Mentor roles  
    if (rel.includes('senior') || rel.includes('lead') || 
        rel.includes('mentor') || (rel.includes('worked with') && rel.includes('different teams'))) {
      return 2;
    }
    
    // Peer/Same team roles
    if (rel.includes('same team') || rel.includes('colleague')) {
      return 3;
    }
    
    // Junior/Mentee roles
    if (rel.includes('junior') || rel.includes('didn\'t manage')) {
      return 4;
    }
    
    // Default category
    return 3;
  }, []);

  // Sorting logic with type safety
  const sortRecommendations = useCallback((
    items: readonly Recommendation[],
    sortBy: SortOption,
    order: SortOrder
  ): readonly Recommendation[] => {
    const sortedItems = [...items].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'company':
          comparison = a.company.localeCompare(b.company);
          break;
        case 'skills':
          comparison = a.skills.length - b.skills.length;
          break;
        case 'relevance': {
          // Simple relevance score based on skill count and content length
          const scoreA = a.skills.length * 0.3 + a.content.length * 0.001;
          const scoreB = b.skills.length * 0.3 + b.content.length * 0.001;
          comparison = scoreA - scoreB;
          break;
        }
        case 'role': {
          // Sort by relationship category (manager -> peer -> junior)
          const categoryA = getRelationshipCategory(a.relationship);
          const categoryB = getRelationshipCategory(b.relationship);
          comparison = categoryA - categoryB;
          break;
        }
        default:
          comparison = 0;
      }
      
      return order === 'asc' ? comparison : -comparison;
    });
    
    return sortedItems;
  }, [getRelationshipCategory]);

  // Main filtering and sorting logic (without pagination)
  const filteredAndSorted = useMemo(() => {
    try {
      // Apply all filters
      const filtered = recommendations.filter(recommendation =>
        Object.values(filterPredicates).every(predicate => predicate(recommendation))
      );

      // Apply sorting
      const sorted = sortRecommendations(filtered, filterState.sortBy, filterState.sortOrder);

      return {
        recommendations: sorted,
        totalMatches: filtered.length,
      };
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown filtering error');
      setError(error);

      return {
        recommendations: [],
        totalMatches: 0,
      };
    }
  }, [recommendations, filterState, filterPredicates, sortRecommendations]);

  // Calculate pagination separately
  const paginationInfo = useMemo(() => {
    const totalItems = filteredAndSorted.totalMatches;
    const totalPages = Math.max(1, Math.ceil(totalItems / pagination.itemsPerPage));
    const currentPage = Math.min(pagination.currentPage, totalPages);
    
    return {
      currentPage,
      itemsPerPage: pagination.itemsPerPage,
      totalItems,
      totalPages,
    };
  }, [filteredAndSorted.totalMatches, pagination.itemsPerPage, pagination.currentPage]);

  // Apply pagination to get final results
  const filteredResults = useMemo((): FilterResult => {
    try {
      const startIndex = (paginationInfo.currentPage - 1) * paginationInfo.itemsPerPage;
      const endIndex = startIndex + paginationInfo.itemsPerPage;
      const paginatedItems = filteredAndSorted.recommendations.slice(startIndex, endIndex);
      
      const result: FilterResult = {
        recommendations: paginatedItems,
        pagination: paginationInfo,
        appliedFilters: filterState.activeFilters,
        searchQuery: filterState.search.query,
        totalMatches: filteredAndSorted.totalMatches,
      };
      
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown filtering error');
      setError(error);
      
      return {
        recommendations: [],
        pagination: paginationInfo,
        appliedFilters: [],
        searchQuery: '',
        totalMatches: 0,
      };
    }
  }, [filteredAndSorted, paginationInfo, filterState.activeFilters, filterState.search.query]);


  // Action creators with type safety
  const actions: FilterActions = useMemo(() => ({
    addFilter: (filter: Filter) => {
      setFilterState(prev => ({
        ...prev,
        activeFilters: [...prev.activeFilters.filter(f => f.id !== filter.id), filter],
      }));
      // Reset to first page when filters change
      setPagination(prev => ({ ...prev, currentPage: 1 }));
    },

    removeFilter: (filterId: string) => {
      setFilterState(prev => ({
        ...prev,
        activeFilters: prev.activeFilters.filter(f => f.id !== filterId),
      }));
      setPagination(prev => ({ ...prev, currentPage: 1 }));
    },

    clearAllFilters: () => {
      setFilterState(prev => ({
        ...prev,
        activeFilters: [],
        search: INITIAL_SEARCH,
      }));
      setPagination(prev => ({ ...prev, currentPage: 1 }));
    },

    updateSearch: (query: string, fields?: SearchableField[]) => {
      setFilterState(prev => ({
        ...prev,
        search: {
          ...prev.search,
          query,
          ...(fields && { fields }),
        },
      }));
      setPagination(prev => ({ ...prev, currentPage: 1 }));
    },

    updateSort: (sortBy: SortOption, order: SortOrder = 'desc') => {
      setFilterState(prev => ({
        ...prev,
        sortBy,
        sortOrder: order,
      }));
    },

    updatePagination: (page: number, itemsPerPage?: number) => {
      setPagination(prev => ({
        ...prev,
        currentPage: Math.max(1, page),
        ...(itemsPerPage && { itemsPerPage }),
      }));
    },

    resetFilters: () => {
      setFilterState(INITIAL_FILTER_STATE);
      setPagination(prev => ({ ...INITIAL_PAGINATION, itemsPerPage: prev.itemsPerPage }));
    },
  }), []);

  return {
    filters: filterState,
    results: filteredResults,
    isLoading: false, // Simplified - loading state managed externally if needed
    error,
    actions,
  };
};