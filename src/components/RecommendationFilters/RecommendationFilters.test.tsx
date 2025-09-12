import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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
    render(<RecommendationFilters filters={mockFilters} totalRecommendations={17} />);
    
    expect(screen.getByText('Filter Recommendations')).toBeInTheDocument();
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
        totalRecommendations={17} 
      />
    );
    
    expect(screen.getByText(/Showing 6 of 15 recommendations/)).toBeInTheDocument();
    expect(screen.getByText(/filtered from 17 total/)).toBeInTheDocument();
    expect(screen.getByText(/12.3ms/)).toBeInTheDocument();
  });

  it('should expand and collapse filters content', async () => {
    const user = userEvent.setup();
    render(<RecommendationFilters filters={mockFilters} totalRecommendations={17} />);
    
    // Initially collapsed - search input should not be visible
    expect(screen.queryByPlaceholderText('Search recommendations...')).not.toBeInTheDocument();
    
    // Click expand button
    const expandButton = screen.getByRole('button', { name: /chevron/i });
    await user.click(expandButton);
    
    // Should now show the search input
    expect(screen.getByPlaceholderText('Search recommendations...')).toBeInTheDocument();
  });

  describe('Search functionality', () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      render(<RecommendationFilters filters={mockFilters} totalRecommendations={17} />);
      
      // Expand filters first
      const expandButton = screen.getByRole('button', { name: /chevron/i });
      await user.click(expandButton);
    });

    it('should handle search input changes', async () => {
      const user = userEvent.setup();
      const searchInput = screen.getByPlaceholderText('Search recommendations...');
      
      await user.type(searchInput, 'React');
      
      expect(mockFilters.actions.updateSearch).toHaveBeenCalledWith('R');
      expect(mockFilters.actions.updateSearch).toHaveBeenCalledWith('Re');
      expect(mockFilters.actions.updateSearch).toHaveBeenCalledWith('Rea');
      expect(mockFilters.actions.updateSearch).toHaveBeenCalledWith('Reac');
      expect(mockFilters.actions.updateSearch).toHaveBeenCalledWith('React');
    });

    it('should show clear search button when there is a query', () => {
      const filtersWithQuery = {
        ...mockFilters,
        filters: {
          ...mockFilters.filters,
          search: {
            ...mockFilters.filters.search,
            query: 'React',
          },
        },
      };
      
      render(<RecommendationFilters filters={filtersWithQuery} totalRecommendations={17} />);
      
      // Expand to see search
      fireEvent.click(screen.getByRole('button', { name: /chevron/i }));
      
      const clearButton = screen.getByRole('button', { name: /×/i });
      expect(clearButton).toBeInTheDocument();
    });

    it('should clear search when clear button is clicked', async () => {
      const user = userEvent.setup();
      const filtersWithQuery = {
        ...mockFilters,
        filters: {
          ...mockFilters.filters,
          search: {
            ...mockFilters.filters.search,
            query: 'React',
          },
        },
      };
      
      render(<RecommendationFilters filters={filtersWithQuery} totalRecommendations={17} />);
      
      // Expand to see search
      await user.click(screen.getByRole('button', { name: /chevron/i }));
      
      const clearButton = screen.getByRole('button', { name: /×/i });
      await user.click(clearButton);
      
      expect(mockFilters.actions.updateSearch).toHaveBeenCalledWith('');
    });

    it('should toggle search fields', async () => {
      const user = userEvent.setup();
      
      const nameCheckbox = screen.getByLabelText('Name');
      await user.click(nameCheckbox);
      
      expect(mockFilters.actions.updateSearch).toHaveBeenCalledWith(
        '',
        ['title', 'company', 'content', 'skills', 'summary']
      );
    });
  });

  describe('Skill category filters', () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      render(<RecommendationFilters filters={mockFilters} totalRecommendations={17} />);
      
      // Expand filters first
      const expandButton = screen.getByRole('button', { name: /chevron/i });
      await user.click(expandButton);
    });

    it('should render skill category buttons', () => {
      expect(screen.getByText('Technical Excellence')).toBeInTheDocument();
      expect(screen.getByText('Leadership & Mentorship')).toBeInTheDocument();
      expect(screen.getByText('Collaboration & Communication')).toBeInTheDocument();
    });

    it('should toggle skill filters when clicked', async () => {
      const user = userEvent.setup();
      
      const technicalButton = screen.getByText('Technical Excellence');
      await user.click(technicalButton);
      
      expect(mockFilters.actions.addFilter).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'skill-technical',
          type: 'skill',
          label: 'Technical Excellence',
          category: 'technical',
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
            id: 'skill-technical',
            type: 'skill' as const,
            label: 'Technical Excellence',
            category: 'technical' as const,
            keywords: ['React', 'TypeScript'],
            priority: 'high' as const,
          }],
        },
      };
      
      render(
        <RecommendationFilters 
          filters={filtersWithActiveSkillFilter} 
          totalRecommendations={17} 
        />
      );
      
      // Expand and click the already active filter
      await user.click(screen.getByRole('button', { name: /chevron/i }));
      const technicalButton = screen.getByText('Technical Excellence');
      await user.click(technicalButton);
      
      expect(mockFilters.actions.removeFilter).toHaveBeenCalledWith('skill-technical');
    });
  });

  describe('Sort functionality', () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      render(<RecommendationFilters filters={mockFilters} totalRecommendations={17} />);
      
      // Expand filters first
      const expandButton = screen.getByRole('button', { name: /chevron/i });
      await user.click(expandButton);
    });

    it('should render sort options', () => {
      expect(screen.getByText('📅')).toBeInTheDocument(); // Date
      expect(screen.getByText('👤')).toBeInTheDocument(); // Name
      expect(screen.getByText('🏢')).toBeInTheDocument(); // Company
      expect(screen.getByText('🛠️')).toBeInTheDocument(); // Skills
      expect(screen.getByText('⭐')).toBeInTheDocument(); // Relevance
    });

    it('should change sort when clicked', async () => {
      const user = userEvent.setup();
      
      const nameSort = screen.getByRole('button', { name: /👤 Name/i });
      await user.click(nameSort);
      
      expect(mockFilters.actions.updateSort).toHaveBeenCalledWith('name', 'desc');
    });

    it('should show active sort with indicator', () => {
      const filtersWithSort = {
        ...mockFilters,
        filters: {
          ...mockFilters.filters,
          sortBy: 'name' as const,
          sortOrder: 'asc' as const,
        },
      };
      
      render(<RecommendationFilters filters={filtersWithSort} totalRecommendations={17} />);
      fireEvent.click(screen.getByRole('button', { name: /chevron/i }));
      
      const nameButton = screen.getByRole('button', { name: /👤 Name/i });
      expect(nameButton).toHaveClass(/active/);
      expect(screen.getByText('↑')).toBeInTheDocument(); // Ascending indicator
    });
  });

  describe('Active filters display', () => {
    it('should show active filters section when filters are applied', async () => {
      const user = userEvent.setup();
      const filtersWithActive = {
        ...mockFilters,
        filters: {
          ...mockFilters.filters,
          activeFilters: [{
            id: 'skill-technical',
            type: 'skill' as const,
            label: 'Technical Skills',
            category: 'technical' as const,
            keywords: ['React'],
            priority: 'high' as const,
          }],
        },
      };
      
      render(<RecommendationFilters filters={filtersWithActive} totalRecommendations={17} />);
      
      // Expand to see active filters
      await user.click(screen.getByRole('button', { name: /chevron/i }));
      
      expect(screen.getByText('Active Filters')).toBeInTheDocument();
      expect(screen.getByText('Technical Skills')).toBeInTheDocument();
      expect(screen.getByText('Clear All')).toBeInTheDocument();
    });

    it('should remove individual filters', async () => {
      const user = userEvent.setup();
      const filtersWithActive = {
        ...mockFilters,
        filters: {
          ...mockFilters.filters,
          activeFilters: [{
            id: 'skill-technical',
            type: 'skill' as const,
            label: 'Technical Skills',
            category: 'technical' as const,
            keywords: ['React'],
            priority: 'high' as const,
          }],
        },
      };
      
      render(<RecommendationFilters filters={filtersWithActive} totalRecommendations={17} />);
      
      // Expand and remove the filter
      await user.click(screen.getByRole('button', { name: /chevron/i }));
      const removeButtons = screen.getAllByRole('button', { name: /×/i });
      const removeFilterButton = removeButtons.find(button => 
        button.closest('.activeFilter')
      );
      
      if (removeFilterButton) {
        await user.click(removeFilterButton);
        expect(mockFilters.actions.removeFilter).toHaveBeenCalledWith('skill-technical');
      }
    });

    it('should clear all filters', async () => {
      const user = userEvent.setup();
      const filtersWithActive = {
        ...mockFilters,
        filters: {
          ...mockFilters.filters,
          activeFilters: [{
            id: 'skill-technical',
            type: 'skill' as const,
            label: 'Technical Skills',
            category: 'technical' as const,
            keywords: ['React'],
            priority: 'high' as const,
          }],
        },
      };
      
      render(<RecommendationFilters filters={filtersWithActive} totalRecommendations={17} />);
      
      // Expand and clear all
      await user.click(screen.getByRole('button', { name: /chevron/i }));
      await user.click(screen.getByText('Clear All'));
      
      expect(mockFilters.actions.clearAllFilters).toHaveBeenCalled();
    });
  });

  describe('Performance metrics', () => {
    it('should toggle performance metrics display', async () => {
      const user = userEvent.setup();
      render(<RecommendationFilters filters={mockFilters} totalRecommendations={17} />);
      
      // Initially metrics should not be visible
      expect(screen.queryByText('Performance Metrics')).not.toBeInTheDocument();
      
      // Click metrics button
      const metricsButton = screen.getByRole('button', { name: /performance/i });
      await user.click(metricsButton);
      
      expect(screen.getByText('Performance Metrics')).toBeInTheDocument();
      expect(screen.getByText('search')).toBeInTheDocument();
      expect(screen.getByText('8.2ms')).toBeInTheDocument();
    });
  });

  describe('Filter count display', () => {
    it('should show filter count when filters are active', () => {
      const filtersWithActiveAndSearch = {
        ...mockFilters,
        filters: {
          ...mockFilters.filters,
          search: { ...mockFilters.filters.search, query: 'React' },
          activeFilters: [{
            id: 'skill-technical',
            type: 'skill' as const,
            label: 'Technical Skills',
            category: 'technical' as const,
            keywords: ['React'],
            priority: 'high' as const,
          }],
        },
      };
      
      render(
        <RecommendationFilters 
          filters={filtersWithActiveAndSearch} 
          totalRecommendations={17} 
        />
      );
      
      // Should show count of 2 (1 skill filter + 1 search)
      expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('should not show filter count when no filters are active', () => {
      render(<RecommendationFilters filters={mockFilters} totalRecommendations={17} />);
      
      // Should not show any count badge
      expect(screen.queryByText('0')).not.toBeInTheDocument();
    });
  });
});