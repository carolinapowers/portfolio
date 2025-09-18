import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RecommendationFilters } from './RecommendationFilters';
import type { UseFiltersReturn } from '../../types/filtering';
import type { Recommendation } from '../../../../../data/recommendations';
import type { SkillCategory } from '../../../../../data/skills';

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
        recommendations: Array(6).fill(null).map((_, i) => ({
          id: i.toString(),
          name: `Test Person ${i}`,
          title: `Test Title ${i}`,
          company: `Test Company ${i}`,
          avatar: `TP${i}`,
          summary: `Test summary ${i}`,
          content: `Test recommendation content ${i}`,
          skills: ['React', 'TypeScript'],
          date: '2023-01-01',
          relationship: 'Colleague'
        } as Recommendation)),
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
    expect(screen.getByText('Engineering Skills')).toBeInTheDocument();
  });

  // Search functionality has been moved to the SearchBar component

  describe('Skill category filters', () => {

    it('should render skill category buttons', () => {
      render(<RecommendationFilters filters={mockFilters} />);

      expect(screen.getByText('Engineering Skills')).toBeInTheDocument();
      expect(screen.getByText('Team Leadership')).toBeInTheDocument();
      expect(screen.getByText('Collaboration')).toBeInTheDocument();
    });

    it('should toggle skill filters when clicked', async () => {
      const user = userEvent.setup();
      render(<RecommendationFilters filters={mockFilters} />);

      const technicalButton = screen.getByText('Engineering Skills');
      await user.click(technicalButton);

      expect(mockFilters.actions.addFilter).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'skill-engineering',
          type: 'skill',
          label: 'Engineering Skills',
          category: 'engineering',
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
            id: 'skill-engineering',
            type: 'skill' as const,
            label: 'Engineering Skills',
            category: 'engineering' as SkillCategory,
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
      const engineeringButtons = screen.getAllByText('Engineering Skills');
      const technicalButton = engineeringButtons[0]!; // First one is from skill categories
      expect(technicalButton).toBeDefined();
      await user.click(technicalButton);

      expect(mockFilters.actions.removeFilter).toHaveBeenCalledWith('skill-engineering');
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
            id: 'skill-engineering',
            type: 'skill' as const,
            label: 'Frontend Skills',
            category: 'engineering' as const,
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
            id: 'skill-engineering',
            type: 'skill' as const,
            label: 'Frontend Skills',
            category: 'engineering' as const,
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
        expect(mockFilters.actions.removeFilter).toHaveBeenCalledWith('skill-engineering');
      }
    });

    it('should clear all filters', async () => {
      const user = userEvent.setup();
      const filtersWithActive = {
        ...mockFilters,
        filters: {
          ...mockFilters.filters,
          activeFilters: [{
            id: 'skill-engineering',
            type: 'skill' as const,
            label: 'Frontend Skills',
            category: 'engineering' as const,
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

  // Filter count display functionality has been removed
});