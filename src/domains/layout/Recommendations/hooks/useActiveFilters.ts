import { useMemo } from 'react';
import type { Filter, SkillFilter, CompanyFilter, RoleFilter, DateRangeFilter } from '../types/filtering';
import { isSkillFilter, isCompanyFilter, isRoleFilter, isDateRangeFilter } from '../types/filtering';
import type { SkillCategory } from '../../../../data/skills';

interface FilterCounts {
  total: number;
  skills: number;
  companies: number;
  roles: number;
  dateRanges: number;
}

interface FiltersByType {
  skills: SkillFilter[];
  companies: CompanyFilter[];
  roles: RoleFilter[];
  dateRanges: DateRangeFilter[];
}

interface UseActiveFiltersReturn {
  filtersByType: FiltersByType;
  filterCounts: FilterCounts;
  hasActiveFilters: boolean;
  hasFilterType: (type: keyof FiltersByType) => boolean;
  getFiltersByType: <T extends Filter>(predicate: (filter: Filter) => filter is T) => T[];
  getActiveFilterLabels: () => string[];
  activeSkillCategories: SkillCategory[];
}

export const useActiveFilters = (filters: Filter[]): UseActiveFiltersReturn => {
  const filtersByType = useMemo((): FiltersByType => ({
    skills: filters.filter(isSkillFilter),
    companies: filters.filter(isCompanyFilter),
    roles: filters.filter(isRoleFilter),
    dateRanges: filters.filter(isDateRangeFilter),
  }), [filters]);

  const filterCounts = useMemo((): FilterCounts => ({
    total: filters.length,
    skills: filtersByType.skills.length,
    companies: filtersByType.companies.length,
    roles: filtersByType.roles.length,
    dateRanges: filtersByType.dateRanges.length,
  }), [filters.length, filtersByType]);

  const hasActiveFilters = useMemo(() => filters.length > 0, [filters.length]);

  const hasFilterType = useMemo(() => (type: keyof FiltersByType): boolean => {
    return filtersByType[type].length > 0;
  }, [filtersByType]);

  const getFiltersByType = useMemo(() => <T extends Filter>(
    predicate: (filter: Filter) => filter is T
  ): T[] => {
    return filters.filter(predicate);
  }, [filters]);

  const getActiveFilterLabels = useMemo(() => (): string[] => {
    const labels: string[] = [];

    filtersByType.skills.forEach(filter => {
      filter.keywords.forEach(keyword => labels.push(`Skill: ${keyword}`));
    });

    filtersByType.companies.forEach(filter => {
      filter.companies.forEach(company => labels.push(`Company: ${company}`));
    });

    filtersByType.roles.forEach(filter => {
      filter.roles.forEach(role => labels.push(`Role: ${role}`));
    });

    filtersByType.dateRanges.forEach(filter => {
      const start = filter.startDate?.toLocaleDateString() || 'Any';
      const end = filter.endDate?.toLocaleDateString() || 'Any';
      labels.push(`Date: ${start} - ${end}`);
    });

    return labels;
  }, [filtersByType]);

  const activeSkillCategories = useMemo((): SkillCategory[] => {
    return filtersByType.skills
      .flatMap(filter => filter.keywords)
      .filter((category): category is SkillCategory =>
        ['frontend', 'backend', 'infrastructure', 'delivery'].includes(category)
      );
  }, [filtersByType.skills]);

  return {
    filtersByType,
    filterCounts,
    hasActiveFilters,
    hasFilterType,
    getFiltersByType,
    getActiveFilterLabels,
    activeSkillCategories,
  };
};