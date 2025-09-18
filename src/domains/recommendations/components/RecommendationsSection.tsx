import React from 'react';
import { useQuery } from '@apollo/client';
import { Users } from 'lucide-react';
import { GET_RECOMMENDATIONS } from '../../../apollo/queries';
import { RecommendationCard } from './RecommendationCard/RecommendationCard';
import { RecommendationFilters } from './RecommendationFilters/RecommendationFilters';
import { SearchBar } from '../../search/components/SearchBar/SearchBar';
import { SortingControls } from '../../../shared/components/ui/SortingControls/SortingControls';
import { Pagination } from '../../../shared/components/ui/Pagination/Pagination';
import { useRecommendationFilters } from '../hooks/useRecommendationFilters';
import type { Recommendation } from '../data/recommendations';
import styles from '../../portfolio/components/Layout/Layout.module.css';

export const RecommendationsSection: React.FC = () => {
  const { loading, error, data } = useQuery(GET_RECOMMENDATIONS);
  
  // Initialize filtering hook with recommendations data
  const filters = useRecommendationFilters(data?.recommendations || [], 3);

  if (loading) {
    return (
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <Users className={styles.sectionIcon} size={20} />
          What It's Like to Work With Me
        </h2>
        <div className={styles.recommendationsIntro}>
          <p className={styles.sectionDescription}>Loading recommendations...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <Users className={styles.sectionIcon} size={20} />
          What It's Like to Work With Me
        </h2>
        <div className={styles.recommendationsIntro}>
          <p className={styles.sectionDescription}>
            Error loading recommendations: {error.message}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>
        <Users className={styles.sectionIcon} size={20} />
        What It's Like to Work With Me
      </h2>
      <div className={styles.recommendationsIntro}>
        <p className={styles.sectionDescription}>
          The best way to understand what it's like to work with me is by
          reading what the people I've collaborated with have to say about the
          experience.
        </p>
        <p className={styles.sectionNote}>
          Use the search and filters to explore by skills, companies, or
          keywords.
        </p>
      </div>

      {/* Main Layout with Sidebar */}
      <div className={styles.recommendationsLayout}>
        {/* Sidebar with Search and Filters */}
        <aside className={styles.filtersSidebar}>
          <SearchBar filters={filters} />
          <RecommendationFilters filters={filters} />
        </aside>

        {/* Main Content Area */}
        <div className={styles.mainContentArea}>
          {/* Sticky Controls Header */}
          <div className={styles.stickyControls}>
            {/* Recommendations Heading */}
            <div className={styles.recommendationsHeader}>
              <h3 className={styles.recommendationsTitle}>Recommendations</h3>
            </div>

            {/* Results Summary */}
            <div className={styles.resultsSummary}>
              <p>
                Showing{' '}
                <strong>{filters.results.recommendations.length}</strong> of{' '}
                <strong>{filters.results.totalMatches}</strong> recommendations
                {filters.results.totalMatches !==
                  (data?.recommendations?.length || 0) && (
                  <span className={styles.filteredNote}>
                    {' '}
                    (filtered from {data?.recommendations?.length || 0} total)
                  </span>
                )}
              </p>
            </div>

            <div className={styles.contentControls}>
              <SortingControls filters={filters} />
            </div>
          </div>

          {/* Loading state for filtering */}
          {filters.isLoading && (
            <div className={styles.loadingState}>
              <p>Filtering recommendations...</p>
            </div>
          )}

          {/* Error state for filtering */}
          {filters.error && (
            <div className={styles.errorState}>
              <p>Error filtering recommendations: {filters.error.message}</p>
            </div>
          )}

          {/* Recommendations Grid */}
          <div className={styles.recommendationsGrid}>
            {filters.results.recommendations.map(
              (recommendation: Recommendation) => (
                <RecommendationCard
                  key={recommendation.id}
                  recommendation={recommendation}
                  activeFilters={[...filters.filters.activeFilters]}
                  sortBy={filters.filters.sortBy}
                  sortOrder={filters.filters.sortOrder}
                  searchQuery={filters.filters.search.query}
                />
              )
            )}
          </div>

          {/* No results state */}
          {filters.results.recommendations.length === 0 &&
            !filters.isLoading && (
              <div className={styles.noResults}>
                <p>No recommendations match your current filters.</p>
                <button
                  onClick={filters.actions.clearAllFilters}
                  className={styles.clearFiltersButton}
                >
                  Clear all filters
                </button>
              </div>
            )}

          {/* Pagination */}
          <Pagination
            filters={filters}
            itemsPerPageOptions={[3, 6, 12, 24]}
            showQuickJumper={false}
            showSizeChanger={true}
          />
        </div>
      </div>

      <p className={styles.sectionNote}>
        These recommendations are loaded via <strong>GraphQL</strong> from real
        LinkedIn testimonials (demonstrating Apollo Client integration). You can
        find the original recommendations and more information about me on my{' '}
        <a
          href="https://www.linkedin.com/in/carolina-p-powers/details/recommendations/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.linkedinLink}
        >
          LinkedIn profile
        </a>
        .
      </p>
    </section>
  );
};