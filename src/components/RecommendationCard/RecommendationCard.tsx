import React, { useEffect, useState } from 'react';
import type { Recommendation } from '../../data/recommendations';
import type { Filter, SortOption, SortOrder } from '../../types/filtering';
import { trackRecommendationEvent } from '../../analytics/utils/eventHelpers';

import { HighlightedText } from '../HighlightedText/HighlightedText';
import styles from './RecommendationCard.module.css';
import { useHighlightedTerms } from '../../hooks/useHighlightedTerms';
import { getSkillCategory, type SkillCategory } from '../../data/skills';

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

  // Get active skill categories from filters
  const activeSkillCategories = hasActiveFilters
    ? activeFilters
        .filter(filter => filter.type === 'skill')
        .flatMap(filter => filter.keywords)
    : [];

  // Organize skills by category
  const skillsByCategory = recommendation.skills.reduce((acc, skill) => {
    const category = getSkillCategory(skill);
    if (category) {
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
    } else {
      // Handle skills without a category (fallback to 'delivery' category)
      const fallbackCategory = 'delivery' as SkillCategory;
      if (!acc[fallbackCategory]) {
        acc[fallbackCategory] = [];
      }
      acc[fallbackCategory].push(skill);
    }
    return acc;
  }, {} as Record<SkillCategory, string[]>);

  // Determine which skills to display
  const getDisplayedSkills = () => {
    if (!hasActiveFilters) {
      // Default state: show at least 6 skills, prioritizing category diversity
      const displayedSkills: string[] = [];
      const minSkills = 6;

      // First, add one skill from each category to ensure diversity
      Object.values(skillsByCategory).forEach(skills => {
        const firstSkill = skills[0];
        if (firstSkill) {
          displayedSkills.push(firstSkill);
        }
      });

      // If we have fewer than 6 skills, add more skills to reach at least 6
      if (displayedSkills.length < minSkills) {
        Object.values(skillsByCategory).forEach(skills => {
          for (let i = 1; i < skills.length && displayedSkills.length < minSkills; i++) {
            displayedSkills.push(skills[i]);
          }
        });
      }

      // If we still don't have enough skills, show what we have
      return displayedSkills;
    } else {
      // Filtered state: show skills based on active filters
      const availableCategories = Object.keys(skillsByCategory) as SkillCategory[];
      const allCategoriesActive = availableCategories.every(category =>
        activeSkillCategories.includes(category)
      );

      if (allCategoriesActive && availableCategories.length > 0) {
        // If all available categories are active, show ALL skills
        return recommendation.skills;
      } else {
        // Show all skills from active categories, first skill from others
        const displayedSkills: string[] = [];
        Object.entries(skillsByCategory).forEach(([category, skills]) => {
          if (activeSkillCategories.includes(category as SkillCategory)) {
            // Show all skills from active categories
            displayedSkills.push(...skills);
          } else {
            // Show only first skill from inactive categories
            const firstSkill = skills[0];
            if (firstSkill) {
              displayedSkills.push(firstSkill);
            }
          }
        });
        return displayedSkills;
      }
    }
  };

  const displayedSkills = getDisplayedSkills();

  // Determine which skills should be highlighted (active)
  const getActiveSkills = () => {
    if (!hasActiveFilters) {
      return [];
    }

    const activeSkills: string[] = [];
    Object.entries(skillsByCategory).forEach(([category, skills]) => {
      if (activeSkillCategories.includes(category as SkillCategory)) {
        // First skill from each active category gets highlighted
        const firstSkill = skills[0];
        if (firstSkill) {
          activeSkills.push(firstSkill);
        }
      }
    });
    return activeSkills;
  };

  const activeSkills = getActiveSkills();

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
        {displayedSkills.map(skill => (
          <span
            key={skill}
            className={`${styles.skill} ${activeSkills.includes(skill) ? styles.active : ''}`}
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
