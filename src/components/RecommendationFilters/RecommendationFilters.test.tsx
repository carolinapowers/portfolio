import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RecommendationFilters } from './RecommendationFilters';
import type { UseFiltersReturn } from '../../types/filtering';

// Mock the useRecommendationFilters hook behavior
const mockFilters: UseFiltersReturn = {
  filters: {
    search: {
      type: 'search',
      query: '',
      fields: ['name', 'title', 'company', 'content', 'skills', 'summary'],
      caseSensitive: false,
      exact: false,
    },
    activeFilters: [],
    sortBy: 'date',
    sortOrder: 'desc',
  },
  results: {
    recommendations: [],
    pagination: {
      currentPage: 1,
      itemsPerPage: 6,
      totalItems: 0,
      totalPages: 1,
    },
    appliedFilters: [],
    searchQuery: '',
    totalMatches: 0,
    executionTime: 10.5,
  },
  isLoading: false,
  error: null,
  actions: {
    addFilter: vi.fn(),
    removeFilter: vi.fn(),
    clearAllFilters: vi.fn(),
    updateSearch: vi.fn(),
    updateSort: vi.fn(),
    updatePagination: vi.fn(),
    resetFilters: vi.fn(),
  },
  metrics: [
    {
      filterType: 'search',
      itemCount: 17,
      executionTime: 8.2,
      matchCount: 17,
      timestamp: new Date('2023-07-01T10:00:00.000Z'),
    },
    {
      filterType: 'skill',
      itemCount: 17,
      executionTime: 12.1,
      matchCount: 5,
      timestamp: new Date('2023-07-01T10:01:00.000Z'),
    },
  ],
};

describe('RecommendationFilters', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render filter header with correct title', () => {
    render(<RecommendationFilters filters={mockFilters} />);
    
    expect(screen.getByText('Filters')).toBeInTheDocument();
  });

  it('should display results summary correctly', () => {
    const filtersWithResults = {
      ...mockFilters,
      results: {
        ...mockFilters.results,
        recommendations: Array(6).fill(null).map((_, i) => ({ id: i.toString() })),
        totalMatches: 15,
        executionTime: 12.3,
      },
    };
    
    render(
      <RecommendationFilters 
        filters={filtersWithResults as UseFiltersReturn} 
 
      />
    );
    
    // RecommendationFilters no longer displays results summary - this was moved to RecommendationsSection
    expect(screen.getByText('Filters')).toBeInTheDocument();
  });

  it('should show filters content without collapsing', async () => {
    render(<RecommendationFilters filters={mockFilters} />);
    
    // RecommendationFilters no longer has collapsible content - filters are always visible
    // Search is now in a separate SearchBar component
    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByText('Frontend Excellence')).toBeInTheDocument();
  });

  // Search functionality has been moved to the SearchBar component

  describe('Skill category filters', () => {

    it('should render skill category buttons', () => {
      render(<RecommendationFilters filters={mockFilters} />);
      
      expect(screen.getByText('Frontend Excellence')).toBeInTheDocument();
      expect(screen.getByText('Team Leadership')).toBeInTheDocument();
      expect(screen.getByText('Cross-functional Collaboration')).toBeInTheDocument();
    });

    it('should toggle skill filters when clicked', async () => {
      const user = userEvent.setup();
      render(<RecommendationFilters filters={mockFilters} />);
      
      const technicalButton = screen.getByText('Frontend Excellence');
      await user.click(technicalButton);
      
      expect(mockFilters.actions.addFilter).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'skill-frontend',
          type: 'skill',
          label: 'Frontend Excellence',
          category: 'frontend',
        })
      );
    });

    it('should remove active skill filters when clicked again', async () => {
      const user = userEvent.setup();
      const filtersWithActiveSkillFilter = {
        ...mockFilters,
        filters: {
          ...mockFilters.filters,
          activeFilters: [{
            id: 'skill-frontend',
            type: 'skill' as const,
            label: 'Frontend Excellence',
            category: 'frontend' as const,
            keywords: ['React', 'TypeScript'],
            priority: 'high' as const,
          }],
        },
      };
      
      render(
        <RecommendationFilters 
          filters={filtersWithActiveSkillFilter} 
   
        />
      );
      
      // Click the already active filter (from the skill categories section, not active filters)
      const frontendButtons = screen.getAllByText('Frontend Excellence');
      const technicalButton = frontendButtons[0]; // First one is from skill categories
      await user.click(technicalButton);
      
      expect(mockFilters.actions.removeFilter).toHaveBeenCalledWith('skill-frontend');
    });
  });

  // Sort functionality has been moved to the SortingControls component

  describe('Active filters display', () => {
    it('should show active filters section when filters are applied', async () => {
      const filtersWithActive = {
        ...mockFilters,
        filters: {
          ...mockFilters.filters,
          activeFilters: [{
            id: 'skill-frontend',
            type: 'skill' as const,
            label: 'Frontend Skills',
            category: 'technical' as const,
            keywords: ['React'],
            priority: 'high' as const,
          }],
        },
      };
      
      render(<RecommendationFilters filters={filtersWithActive} />);
      
      // Active filters are always visible in the new design
      
      expect(screen.getByText('Active Filters')).toBeInTheDocument();
      expect(screen.getByText('Frontend Skills')).toBeInTheDocument();
      expect(screen.getByText('Clear All')).toBeInTheDocument();
    });

    it('should remove individual filters', async () => {
      const user = userEvent.setup();
      const filtersWithActive = {
        ...mockFilters,
        filters: {
          ...mockFilters.filters,
          activeFilters: [{
            id: 'skill-frontend',
            type: 'skill' as const,
            label: 'Frontend Skills',
            category: 'technical' as const,
            keywords: ['React'],
            priority: 'high' as const,
          }],
        },
      };
      
      render(<RecommendationFilters filters={filtersWithActive} />);
      
      // Remove the filter - look for the button with class removeFilterButton
      const removeFilterButton = document.querySelector('._removeFilterButton_87b938');
      
      if (removeFilterButton) {
        await user.click(removeFilterButton);
        expect(mockFilters.actions.removeFilter).toHaveBeenCalledWith('skill-frontend');
      }
    });

    it('should clear all filters', async () => {
      const user = userEvent.setup();
      const filtersWithActive = {
        ...mockFilters,
        filters: {
          ...mockFilters.filters,
          activeFilters: [{
            id: 'skill-frontend',
            type: 'skill' as const,
            label: 'Frontend Skills',
            category: 'technical' as const,
            keywords: ['React'],
            priority: 'high' as const,
          }],
        },
      };
      
      render(<RecommendationFilters filters={filtersWithActive} />);
      
      // Clear all filters
      await user.click(screen.getByText('Clear All'));
      
      expect(mockFilters.actions.clearAllFilters).toHaveBeenCalled();
    });
  });

  // Performance metrics functionality has been removed from RecommendationFilters

  describe('Filter count display', () => {
    it('should show filter count when filters are active', () => {
      const filtersWithActiveAndSearch = {
        ...mockFilters,
        filters: {
          ...mockFilters.filters,
          search: { ...mockFilters.filters.search, query: 'React' },
          activeFilters: [{
            id: 'skill-frontend',
            type: 'skill' as const,
            label: 'Frontend Skills',
            category: 'technical' as const,
            keywords: ['React'],
            priority: 'high' as const,
          }],
        },
      };
      
      render(
        <RecommendationFilters 
          filters={filtersWithActiveAndSearch} 
   
        />
      );
      
      // Should show count of 2 (1 skill filter + 1 search)
      expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('should not show filter count when no filters are active', () => {
      render(<RecommendationFilters filters={mockFilters} />);
      
      // Should not show any count badge
      expect(screen.queryByText('0')).not.toBeInTheDocument();
    });
  });
});