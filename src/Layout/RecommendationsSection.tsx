import React from 'react';
import { useQuery } from '@apollo/client';
import { Users } from 'lucide-react';
import { GET_RECOMMENDATIONS } from '../apollo/queries';
import { RecommendationCard } from '../components/RecommendationCard/RecommendationCard';
import type { Recommendation } from '../data/recommendations';
import styles from './Layout.module.css';

export const RecommendationsSection: React.FC = () => {
  const { loading, error, data } = useQuery(GET_RECOMMENDATIONS);

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
          These recommendations are loaded via <strong>GraphQL</strong> from real LinkedIn testimonials 
          (demonstrating Apollo Client integration). You can find the original recommendations and more information about me on my{' '}
          <a
            href="https://www.linkedin.com/in/carolina-p-powers/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkedinLink}
          >
            LinkedIn profile
          </a>
          .
        </p>
      </div>
      <div className={styles.recommendationsGrid}>
        {data?.recommendations.map((recommendation: Recommendation) => (
          <RecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
          />
        ))}
      </div>
    </section>
  );
};