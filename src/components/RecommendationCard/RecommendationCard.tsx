import React, { useEffect, useState } from 'react';
import type { Recommendation } from '../../data/recommendations';
import type { Filter, SortOption, SortOrder } from '../../types/filtering';
import { trackRecommendationEvent } from '../../analytics/utils/eventHelpers';

import { HighlightedText } from '../HighlightedText/HighlightedText';
import styles from './RecommendationCard.module.css';
import { useHighlightedTerms } from '../../hooks/useHighlightedTerms';

interface RecommendationCardProps {
  recommendation: Recommendation;
  activeFilters?: Filter[];
  sortBy?: SortOption;
  sortOrder?: SortOrder;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  activeFilters = [],
  sortBy = 'date',
}) => {
  const highlightedTerms = useHighlightedTerms(activeFilters);
  const [isExpanded, setIsExpanded] = useState(false);
  const CHARACTER_LIMIT = 300; // Adjust this value as needed

  // Show full content if there are active filters (user is searching for specific content)
  const hasActiveFilters = activeFilters && activeFilters.length > 0;
  const shouldShowFullContent =
    hasActiveFilters ||
    isExpanded ||
    recommendation.content.length <= CHARACTER_LIMIT;
  const primarySkills = [
    'React',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'GraphQL',
    'Mentorship',
    'Leadership',
    'Code Reviews',
  ];

  // Get the sorting icon to display
  const getSortIcon = () => {
    const icons: Record<SortOption, string> = {
      date: '📅',
      name: '👤',
      company: '🏢',
      skills: '🛠️',
      role: '👥',
      relevance: '⭐',
    };
    return icons[sortBy] || '📅';
  };

  // Track recommendation view on mount
  useEffect(() => {
    trackRecommendationEvent({
      action: 'view',
      recommendationId: recommendation.id,
    });
  }, [recommendation.id]);

  return (
    <div className={styles.card}>
      <div className={styles.sortIndicator}>
        <span className={styles.sortIcon}>{getSortIcon()}</span>
      </div>
      <div className={styles.header}>
        <div className={styles.avatar}>{recommendation.avatar}</div>
        <div className={styles.info}>
          <h3 className={styles.name}>{recommendation.name}</h3>
          <p className={styles.title}>
            {recommendation.title} @ {recommendation.company}
          </p>
        </div>
      </div>

      <div className={styles.textContainer}>
        <p className={styles.text}>
          <HighlightedText
            text={
              shouldShowFullContent
                ? recommendation.content
                : `${recommendation.content.slice(0, CHARACTER_LIMIT)}...`
            }
            highlightTerms={highlightedTerms}
          />
        </p>
        {recommendation.content.length > CHARACTER_LIMIT &&
          !hasActiveFilters && (
            <button
              className={styles.readMoreBtn}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Read less' : 'Read more'}
            </button>
          )}
      </div>

      <div className={styles.skills}>
        {recommendation.skills.map(skill => (
          <span
            key={skill}
            className={`${styles.skill} ${primarySkills.includes(skill) ? styles.active : ''}`}
            onClick={() => {
              trackRecommendationEvent({
                action: 'skill_click',
                recommendationId: recommendation.id,
                skillTag: skill,
              });
            }}
            style={{ cursor: 'pointer' }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};
