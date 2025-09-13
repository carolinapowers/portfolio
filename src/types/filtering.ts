/**
 * Comprehensive TypeScript interfaces for recommendation filtering system
 * Demonstrates advanced TypeScript patterns for interview preparation
 */

import type { Recommendation } from '../data/recommendations';
import type { SkillCategory } from '../data/skillCategories';

// Base filter configuration types
export interface FilterConfig {
  readonly id: string;
  readonly label: string;
  readonly description?: string;
  readonly icon?: string;
}

// Skill-based filter types
export interface SkillFilter extends FilterConfig {
  readonly type: 'skill';
  readonly category: SkillCategory;
  readonly keywords: readonly string[];
  readonly priority: 'high' | 'medium' | 'low';
}

// Search filter configuration
export interface SearchFilter {
  readonly type: 'search';
  readonly query: string;
  readonly fields: readonly SearchableField[];
  readonly caseSensitive: boolean;
  readonly exact: boolean;
}

export type SearchableField = 'name' | 'title' | 'company' | 'content' | 'skills' | 'summary';

// Company/role filter types
export interface CompanyFilter extends FilterConfig {
  readonly type: 'company';
  readonly companies: readonly string[];
}

export interface RoleFilter extends FilterConfig {
  readonly type: 'role';
  readonly roles: readonly string[];
}

// Date range filter
export interface DateRangeFilter extends FilterConfig {
  readonly type: 'dateRange';
  readonly startDate?: Date;
  readonly endDate?: Date;
}

// Union type for all filter types
export type Filter = SkillFilter | CompanyFilter | RoleFilter | DateRangeFilter;

// Filter state management
export interface FilterState {
  readonly search: SearchFilter;
  readonly activeFilters: readonly Filter[];
  readonly sortBy: SortOption;
  readonly sortOrder: SortOrder;
}

// Sorting configuration
export type SortOption = 'date' | 'name' | 'company' | 'relevance' | 'skills' | 'role';
export type SortOrder = 'asc' | 'desc';

export interface SortConfig {
  readonly field: SortOption;
  readonly order: SortOrder;
  readonly label: string;
}

// Pagination types
export interface PaginationState {
  readonly currentPage: number;
  readonly itemsPerPage: number;
  readonly totalItems: number;
  readonly totalPages: number;
}

export interface PaginationConfig {
  readonly itemsPerPageOptions: readonly number[];
  readonly showPageNumbers: boolean;
  readonly showQuickJumper: boolean;
  readonly showSizeChanger: boolean;
}

// Filter result types
export interface FilterResult {
  readonly recommendations: readonly Recommendation[];
  readonly pagination: PaginationState;
  readonly appliedFilters: readonly Filter[];
  readonly searchQuery: string;
  readonly totalMatches: number;
  readonly executionTime: number; // in milliseconds for performance tracking
}

// Advanced filter predicates for complex filtering logic
export type FilterPredicate<T = Recommendation> = (item: T) => boolean;

export interface FilterPredicateConfig {
  readonly skill: FilterPredicate;
  readonly search: FilterPredicate;
  readonly company: FilterPredicate;
  readonly role: FilterPredicate;
  readonly dateRange: FilterPredicate;
}

// Filter performance tracking
export interface FilterPerformanceMetrics {
  readonly filterType: Filter['type'] | 'search';
  readonly itemCount: number;
  readonly executionTime: number;
  readonly matchCount: number;
  readonly timestamp: Date;
}

// Hook interfaces for type-safe state management
export interface UseFiltersReturn {
  readonly filters: FilterState;
  readonly results: FilterResult;
  readonly isLoading: boolean;
  readonly error: Error | null;
  readonly actions: FilterActions;
  readonly metrics: FilterPerformanceMetrics[];
}

export interface FilterActions {
  readonly addFilter: (filter: Filter) => void;
  readonly removeFilter: (filterId: string) => void;
  readonly clearAllFilters: () => void;
  readonly updateSearch: (query: string, fields?: SearchableField[]) => void;
  readonly updateSort: (sortBy: SortOption, order?: SortOrder) => void;
  readonly updatePagination: (page: number, itemsPerPage?: number) => void;
  readonly resetFilters: () => void;
}

// Utility types for type-safe filter creation
export type CreateFilterInput<T extends Filter['type']> = 
  T extends 'skill' ? Omit<SkillFilter, 'id' | 'type'> :
  T extends 'company' ? Omit<CompanyFilter, 'id' | 'type'> :
  T extends 'role' ? Omit<RoleFilter, 'id' | 'type'> :
  T extends 'dateRange' ? Omit<DateRangeFilter, 'id' | 'type'> :
  never;

// Filter validation types
export interface FilterValidationResult {
  readonly isValid: boolean;
  readonly errors: readonly string[];
  readonly warnings: readonly string[];
}

export type FilterValidator<T extends Filter = Filter> = (filter: T) => FilterValidationResult;

// Advanced TypeScript patterns for filter composition
export type FilterComposition = {
  readonly [K in Filter['type']]: Extract<Filter, { type: K }>[];
};

// Generic filter function type for reusable filtering logic
export type GenericFilterFunction<T, F> = (items: readonly T[], filter: F) => readonly T[];

// Export utility type for extracting filter types
export type ExtractFilterType<T extends Filter> = T['type'];

// Type guards for runtime type checking
export const isSkillFilter = (filter: Filter): filter is SkillFilter => filter.type === 'skill';
export const isCompanyFilter = (filter: Filter): filter is CompanyFilter => filter.type === 'company';
export const isRoleFilter = (filter: Filter): filter is RoleFilter => filter.type === 'role';
export const isDateRangeFilter = (filter: Filter): filter is DateRangeFilter => filter.type === 'dateRange';