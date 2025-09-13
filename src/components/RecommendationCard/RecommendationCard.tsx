import React, { useEffect, useMemo } from 'react';
import type { Recommendation } from '../../data/recommendations';
import type { Filter, SortOption, SortOrder } from '../../types/filtering';
import { trackRecommendationEvent } from '../../analytics/utils/eventHelpers';
import { SKILL_TO_CATEGORY_MAP } from '../../data/skills';
import { HighlightedText } from '../HighlightedText/HighlightedText';
import styles from './RecommendationCard.module.css';

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
  sortOrder = 'desc',
}) => {
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

  // Get terms that should be highlighted in the text based on active filters
  const highlightedTerms = useMemo(() => {
    if (!activeFilters || activeFilters.length === 0) return [];

    const skillFilters = activeFilters.filter(
      filter => filter.type === 'skill'
    );
    if (skillFilters.length === 0) return [];

    const termsToHighlight: string[] = [];

    // Get all active categories from filters
    const activeCategories = skillFilters.flatMap(filter => filter.keywords);

    // Add all skills from ALL recommendations that match the active categories
    // This ensures consistent highlighting across all cards
    Object.entries(SKILL_TO_CATEGORY_MAP).forEach(([skillName, category]) => {
      if (activeCategories.includes(category)) {
        termsToHighlight.push(skillName);

        // Add related terms based on the skill/category
        if (category === 'leadership') {
          termsToHighlight.push(
            'mentor',
            'mentoring',
            'mentored',
            'mentorship',
            'leader',
            'leading',
            'lead',
            'leadership'
          );
        } else if (category === 'collaboration') {
          termsToHighlight.push(
            'collaborate',
            'collaborative',
            'collaborating',
            'collaboration',
            'team',
            'teammates',
            'teamwork'
          );
        } else if (category === 'frontend') {
          termsToHighlight.push(
            'frontend',
            'front-end',
            'UI',
            'user interface'
          );
        } else if (category === 'integration') {
          termsToHighlight.push(
            'backend',
            'back-end',
            'API',
            'integration',
            'testing',
            'test'
          );
        } else if (category === 'delivery') {
          termsToHighlight.push(
            'deliver',
            'delivery',
            'quality',
            'ownership',
            'proactive'
          );
        } else if (category === 'personality') {
          termsToHighlight.push(
            'kind',
            'kindness',
            'empathy',
            'empathetic',
            'fun',
            'joy',
            'joyful',
            'positive',
            'positivity',
            'passion',
            'passionate',
            'energy',
            'vibrant',
            'pleasure',
            'enjoyable',
            'lighter',
            'lucky',
            'invaluable',
            'generous'
          );
        }
      }
    });

    // Remove duplicates and empty strings
    return [
      ...new Set(termsToHighlight.filter(term => term && term.length > 0)),
    ];
  }, [activeFilters]);

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

      <p className={styles.text}>
        <HighlightedText
          text={recommendation.content}
          highlightTerms={highlightedTerms}
        />
      </p>

      <div className={styles.skills}>
        {recommendation.skills.map(skill => (
          <span
            key={skill}
            className={`${styles.skill} ${primarySkills.includes(skill) ? styles.primary : ''}`}
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
