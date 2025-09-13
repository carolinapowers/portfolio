import { useMemo } from 'react';
import type { Filter } from '../types/filtering';
import { SKILL_TO_CATEGORY_MAP } from '../data/skills';

/**
 * Custom hook to get terms that should be highlighted based on active skill filters
 */
export const useHighlightedTerms = (activeFilters: Filter[] = []): string[] => {
  return useMemo(() => {
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
            'teamwork',
            'design',
            'designer',
            'users'
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
            'generous',
            'integrity'
          );
        } else if (category === 'process') {
          termsToHighlight.push(
            'agile',
            'CI/CD',
            'continuous',
            'deployment',
            'integration',
            'code quality',
            'maintainable',
            'clean code'
          );
        }
      }
    });

    // Remove duplicates and empty strings
    return [
      ...new Set(termsToHighlight.filter(term => term && term.length > 0)),
    ];
  }, [activeFilters]);
};