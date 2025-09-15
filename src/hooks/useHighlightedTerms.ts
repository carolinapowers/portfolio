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
            'documentation',
            'guide',
            'initiative',
            'knowledge',
            'lead',
            'leader',
            'leadership',
            'leading',
            'mentor',
            'mentored',
            'mentoring',
            'mentorship',
            'onboarding',
            'ownership',
            'pair',
            'proactive',
            'sharing'
          );
        } else if (category === 'collaboration') {
          termsToHighlight.push(
            'collaborate',
            'collaborating',
            'collaboration',
            'collaborative',
            'colleague',
            'communicate',
            'communication',
            'cross-functional',
            'design',
            'designer',
            'developer experience',
            'documentation',
            'feedback',
            'help',
            'mentor',
            'pair',
            'review',
            'sharing',
            'team',
            'team work',
            'teammates',
            'teamwork',
            'teams',
            'users',
            'work together',
            'working together'
          );
        } else if (category === 'engineering') {
          termsToHighlight.push(
            'API',
            'back-end',
            'backend',
            'code',
            'coding',
            'developer',
            'development',
            'engineer',
            'engineering',
            'framework',
            'front-end',
            'frontend',
            'integration',
            'javascript',
            'library',
            'node',
            'platform',
            'react',
            'review',
            'software',
            'solution',
            'sql',
            'technical',
            'test',
            'testing',
            'UI',
            'user interface'
          ); 
        } else if (category === 'delivery') {
          termsToHighlight.push(
            'deliver',
            'delivery',
            'documentation',
            'excellence',
            'outcome',
            'ownership',
            'problem-solving',
            'proactive',
            'productive',
            'quality',
            'results',
            'solution',
            'solve',
            'streamline',
            'success'
          );
        } else if (category === 'personality') {
          termsToHighlight.push(
            'adaptability',
            'adaptable',
            'calm',
            'committed',
            'curiosity',
            'dedicated',
            'driven',
            'empathetic',
            'empathy',
            'energy',
            'enjoyable',
            'enthusiasm',
            'flexible',
            'fun',
            'generous',
            'happy',
            'help',
            'humble',
            'integrity',
            'invaluable',
            'joy',
            'joyful',
            'kind',
            'kindness',
            'lighter',
            'lucky',
            'passion',
            'passionate',
            'pleasure',
            'positive',
            'positivity',
            'supportive',
            'understanding',
            'vibrant'
          );
        } else if (category === 'process') {
          termsToHighlight.push(
            'agile',
            'care',
            'CI/CD',
            'clarity',
            'clean',
            'code quality',
            'continuous',
            'deliver',
            'deployment',
            'developer experience',
            'documentation',
            'framework',
            'integration',
            'maintainable',
            'pride',
            'process',
            'productive',
            'quality',
            'review',
            'structure',
            'testing'
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