import { useMemo, useCallback } from 'react';
import type { Filter, SortOption, SortOrder, FilterPredicate } from '../types/filtering';
import { isSkillFilter, isCompanyFilter, isRoleFilter, isDateRangeFilter } from '../types/filtering';
import type { Recommendation } from '../../../../data/recommendations';
import { getSkillCategory } from '../../../../data/skills';

interface UseFilteredDataReturn<T> {
  filteredData: T[];
  totalMatches: number;
  applyFilters: (data: T[]) => T[];
  applySort: (data: T[]) => T[];
  applySingleFilter: (data: T[], filter: Filter) => T[];
}

interface FilterOptions<T extends Recommendation> {
  filters: Filter[];
  sortBy?: SortOption;
  sortOrder?: SortOrder;
  searchPredicate?: (item: T) => boolean;
}

export const useFilteredData = <T extends Recommendation>(
  data: readonly T[],
  options: FilterOptions<T>
): UseFilteredDataReturn<T> => {
  const { filters, sortBy = 'date', sortOrder = 'desc', searchPredicate } = options;

  // Helper to categorize relationships for role-based sorting
  const getRelationshipCategory = useCallback((relationship: string): number => {
    const rel = relationship.toLowerCase();

    if (rel.includes('managed') || rel.includes('director') || rel.includes('manager')) {
      return 1; // Manager/Leadership
    }
    if (rel.includes('senior') || rel.includes('lead') ||
        rel.includes('mentor') || (rel.includes('worked with') && rel.includes('different teams'))) {
      return 2; // Senior/Mentor
    }
    if (rel.includes('same team') || rel.includes('colleague')) {
      return 3; // Peer/Same team
    }
    if (rel.includes('junior') || rel.includes('didn\'t manage')) {
      return 4; // Junior/Mentee
    }
    return 3; // Default
  }, []);

  // Filter predicates for different filter types
  const filterPredicates = useMemo((): Record<string, FilterPredicate> => ({
    skill: (recommendation: Recommendation) => {
      const skillFilters = filters.filter(isSkillFilter);
      if (skillFilters.length === 0) return true;

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
      const companyFilters = filters.filter(isCompanyFilter);
      if (companyFilters.length === 0) return true;

      return companyFilters.some(filter =>
        filter.companies.some(company =>
          recommendation.company.toLowerCase().includes(company.toLowerCase())
        )
      );
    },

    role: (recommendation: Recommendation) => {
      const roleFilters = filters.filter(isRoleFilter);
      if (roleFilters.length === 0) return true;

      return roleFilters.some(filter =>
        filter.roles.some(role =>
          recommendation.title.toLowerCase().includes(role.toLowerCase())
        )
      );
    },

    dateRange: (recommendation: Recommendation) => {
      const dateFilters = filters.filter(isDateRangeFilter);
      if (dateFilters.length === 0) return true;

      const recDate = new Date(recommendation.date);
      return dateFilters.every(filter => {
        const afterStart = !filter.startDate || recDate >= filter.startDate;
        const beforeEnd = !filter.endDate || recDate <= filter.endDate;
        return afterStart && beforeEnd;
      });
    },
  }), [filters]);

  // Sorting function
  const sortData = useCallback((items: T[]): T[] => {
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
          const scoreA = a.skills.length * 0.3 + a.content.length * 0.001;
          const scoreB = b.skills.length * 0.3 + b.content.length * 0.001;
          comparison = scoreA - scoreB;
          break;
        }
        case 'role': {
          const categoryA = getRelationshipCategory(a.relationship);
          const categoryB = getRelationshipCategory(b.relationship);
          comparison = categoryA - categoryB;
          break;
        }
        default:
          comparison = 0;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return sortedItems;
  }, [sortBy, sortOrder, getRelationshipCategory]);

  // Apply all filters to data
  const applyFilters = useCallback((items: T[]): T[] => {
    let filtered = [...items];

    // Apply search predicate if provided
    if (searchPredicate) {
      filtered = filtered.filter(searchPredicate);
    }

    // Apply all filter predicates
    filtered = filtered.filter(item =>
      Object.values(filterPredicates).every(predicate => predicate(item))
    );

    return filtered;
  }, [filterPredicates, searchPredicate]);

  // Apply a single filter (useful for testing individual filters)
  const applySingleFilter = useCallback((items: T[], filter: Filter): T[] => {
    if (isSkillFilter(filter)) {
      return items.filter(item =>
        item.skills.some(skillName => {
          const skillCategory = getSkillCategory(skillName);
          return filter.keywords.some(keyword =>
            skillCategory === keyword ||
            skillName.toLowerCase().includes(keyword.toLowerCase())
          );
        })
      );
    }

    if (isCompanyFilter(filter)) {
      return items.filter(item =>
        filter.companies.some(company =>
          item.company.toLowerCase().includes(company.toLowerCase())
        )
      );
    }

    if (isRoleFilter(filter)) {
      return items.filter(item =>
        filter.roles.some(role =>
          item.title.toLowerCase().includes(role.toLowerCase())
        )
      );
    }

    if (isDateRangeFilter(filter)) {
      return items.filter(item => {
        const itemDate = new Date(item.date);
        const afterStart = !filter.startDate || itemDate >= filter.startDate;
        const beforeEnd = !filter.endDate || itemDate <= filter.endDate;
        return afterStart && beforeEnd;
      });
    }

    return items;
  }, []);

  // Apply sort wrapper
  const applySort = useCallback((items: T[]): T[] => {
    return sortData(items);
  }, [sortData]);

  // Calculate filtered and sorted data
  const filteredData = useMemo(() => {
    const filtered = applyFilters([...data]);
    return sortData(filtered);
  }, [data, applyFilters, sortData]);

  return {
    filteredData,
    totalMatches: filteredData.length,
    applyFilters,
    applySort,
    applySingleFilter,
  };
};