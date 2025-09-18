import { useMemo } from 'react';
import type { Filter } from '../types/filtering';
import { SKILL_TO_CATEGORY_MAP } from '../../../data/skills';

/**
 * Custom hook to get terms that should be highlighted based on active skill filters and search query
 */
export const useHighlightedTerms = (activeFilters: Filter[] = [], searchQuery: string = ''): string[] => {
  return useMemo(() => {
    const termsToHighlight: string[] = [];

    // Add search query terms (split by spaces for individual words)
    if (searchQuery && searchQuery.trim()) {
      const searchWords = searchQuery.trim().split(/\s+/);
      termsToHighlight.push(...searchWords);
    }

    // Add skill filter terms only if there are active skill filters
    const skillFilters = activeFilters.filter(
      filter => filter.type === 'skill'
    );

    if (skillFilters.length === 0) {
      // If no skill filters but we have search query, return search terms
      return [...new Set(termsToHighlight.filter(term => term && term.length > 0))];
    }

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
            'advocate',
            'advocating',
            'coordination',
            'coordinating',
            'dedicated',
            'dependable',
            'documentation',
            'elevate',
            'elevates',
            'elevating',
            'empower',
            'empowered',
            'endorsement',
            'guide',
            'guided',
            'guiding',
            'guidance',
            'help',
            'helped',
            'helping',
            'initiative',
            'instrumental',
            'knowledge',
            'lead',
            'leader',
            'leadership',
            'leading',
            'mentor',
            'mentored',
            'mentoring',
            'mentorship',
            'onboard',
            'onboarding',
            'ownership',
            'pair',
            'pairing',
            'proactive',
            'proactively',
            'raises the bar',
            'recommend',
            'recommendation',
            'review',
            'reviewing',
            'reviews',
            'sets others up',
            'sharing',
            'speak up',
            'support',
            'supported',
            'supporting',
            'supportive',
            'teach',
            'teaching',
            'thoughtful'
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
        } else if (category === 'learning') {
          termsToHighlight.push(
            'adapt',
            'adaptability',
            'adaptable',
            'adapting',
            'challenge',
            'challenging',
            'curious',
            'curiosity',
            'dedicated learner',
            'dedication',
            'dive in',
            'driven',
            'education',
            'educational',
            'enthusiasm',
            'enthusiastic',
            'experiment',
            'experimentation',
            'experimenting',
            'exploration',
            'explore',
            'exploring',
            'fast-learning',
            'growth',
            'growth mindset',
            'improve',
            'improvement',
            'initiative',
            'innovation',
            'innovative',
            'instruction',
            'instructional',
            'knowledge',
            'knowledge sharing',
            'knowledge-sharing',
            'learn',
            'learner',
            'learning',
            'mentor',
            'mentoring',
            'mentorship',
            'new',
            'paradigm',
            'paradigms',
            'picked up',
            'proactive',
            'quickly',
            'research',
            'self-development',
            'sharing',
            'skill',
            'skills',
            'student',
            'students',
            'success',
            'surpassed',
            'teach',
            'teaching',
            'technical guidance',
            'transformation',
            'understand',
            'understanding',
            'willing',
            'willingness'
          );
        }
      }
    });

    // Remove duplicates and empty strings
    return [
      ...new Set(termsToHighlight.filter(term => term && term.length > 0)),
    ];
  }, [activeFilters, searchQuery]);
};