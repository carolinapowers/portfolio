// Skill categories for filtering and grouping recommendations
// Based on what employers value most in engineering roles

export type SkillCategory = 
  | 'technical'
  | 'leadership'
  | 'mentorship'
  | 'teamwork'
  | 'initiative'
  | 'code-quality'
  | 'communication'
  | 'product'
  | 'culture';

export const SKILL_CATEGORIES = {
  technical: {
    name: 'Technical Skills',
    description: 'Programming, architecture, and technical problem-solving',
    keywords: ['React', 'TypeScript', 'JavaScript', 'Node.js', 'SQL', 'Testing', 'Architecture', 'Developer Experience']
  },
  leadership: {
    name: 'Leadership',
    description: 'Leading teams, technical decisions, and driving initiatives',
    keywords: ['Technical Leadership', 'Initiative', 'Ownership', 'Team Development']
  },
  mentorship: {
    name: 'Mentorship',
    description: 'Teaching, developing others, and knowledge sharing',
    keywords: ['Mentorship', 'Knowledge Sharing', 'Teaching', 'Documentation', 'Student Success']
  },
  teamwork: {
    name: 'Collaboration',
    description: 'Cross-team work, partnership, and collective problem-solving',
    keywords: ['Cross-team Communication', 'Team Collaboration', 'Partnership', 'Support']
  },
  initiative: {
    name: 'Proactivity',
    description: 'Taking ownership, driving improvements, and self-direction',
    keywords: ['Initiative', 'Proactive', 'Innovation', 'Improvement', 'Ownership']
  },
  'code-quality': {
    name: 'Code Quality',
    description: 'Clean code, testing, reviews, and engineering excellence',
    keywords: ['Clean Code', 'Code Reviews', 'Testing', 'Quality', 'Maintainable']
  },
  communication: {
    name: 'Communication',
    description: 'Technical communication, documentation, and clarity',
    keywords: ['Technical Communication', 'Documentation', 'Clear Communication']
  },
  product: {
    name: 'Product Focus',
    description: 'User-centered thinking, customer focus, and business impact',
    keywords: ['Customer Focus', 'User Research', 'Product', 'Business Impact']
  },
  culture: {
    name: 'Culture & Values',
    description: 'Kindness, empathy, positive team impact, and inclusive collaboration',
    keywords: ['Kindness', 'Empathy', 'Culture', 'Inclusive', 'Positive Impact']
  }
} as const;

// Simple interface for recommendation skills
export interface RecommendationSkill {
  category: SkillCategory;
  highlight: string; // Key skill or trait highlighted in this recommendation
}

// Helper to get category info
export const getCategoryInfo = (category: SkillCategory) => SKILL_CATEGORIES[category];

// Helper to get all categories for filtering UI
export const getAllCategories = (): SkillCategory[] => Object.keys(SKILL_CATEGORIES) as SkillCategory[];