import React from 'react';
import { useQuery } from '@apollo/client';
import { Users } from 'lucide-react';
import { GET_RECOMMENDATIONS } from '../apollo/queries';
import { RecommendationCard } from '../components/RecommendationCard/RecommendationCard';
import { RecommendationFilters } from '../components/RecommendationFilters/RecommendationFilters';
import { SortingControls } from '../components/SortingControls/SortingControls';
import { Pagination } from '../components/Pagination/Pagination';
import { useRecommendationFilters } from '../hooks/useRecommendationFilters';
import type { Recommendation } from '../data/recommendations';
import styles from './Layout.module.css';

export const RecommendationsSection: React.FC = () => {
  const { loading, error, data } = useQuery(GET_RECOMMENDATIONS);
  
  // Initialize filtering hook with recommendations data
  const filters = useRecommendationFilters(data?.recommendations || [], 6);

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
          These recommendations are loaded via <strong>GraphQL</strong> from
          real LinkedIn testimonials (demonstrating Apollo Client integration).
          Use the filters below to search and explore by skills, companies, or
          keywords. You can find the original recommendations and more
          information about me on my{' '}
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
      </div>

      {/* Advanced Filtering System */}
      <RecommendationFilters
        filters={filters}
        totalRecommendations={data?.recommendations?.length || 0}
      />

      {/* Sorting Controls */}
      <SortingControls filters={filters} />

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
              activeFilters={filters.filters.activeFilters}
              sortBy={filters.filters.sortBy}
              sortOrder={filters.filters.sortOrder}
            />
          )
        )}
      </div>

      {/* No results state */}
      {filters.results.recommendations.length === 0 && !filters.isLoading && (
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
        itemsPerPageOptions={[6, 12, 24]}
        showQuickJumper={true}
        showSizeChanger={true}
      />
    </section>
  );
};