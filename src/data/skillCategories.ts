// Skill categories for filtering and grouping recommendations
// Based on what employers value most in engineering roles

export type SkillCategory = 
  | 'frontend'
  | 'integration'
  | 'process'
  | 'leadership'
  | 'collaboration'
  | 'delivery'
  | 'personality';

export const SKILL_CATEGORIES = {
  frontend: {
    name: 'Frontend Excellence',
    description: 'Modern web development, UI frameworks, and accessibility',
    keywords: ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 'Web Accessibility']
  },
  integration: {
    name: 'API & Integration',
    description: 'Backend integration, APIs, build tools, and testing',
    keywords: ['GraphQL', 'REST APIs', 'Node.js', 'Testing', 'Build Tools', 'SQL']
  },
  process: {
    name: 'Process Excellence',
    description: 'Agile development, CI/CD, and engineering practices',
    keywords: ['Agile', 'CI/CD', 'GitHub Actions', 'Code Quality']
  },
  leadership: {
    name: 'Team Leadership',
    description: 'Mentorship, code reviews, and knowledge sharing',
    keywords: ['Mentorship', 'Code Reviews', 'Technical Leadership', 'Knowledge Sharing']
  },
  collaboration: {
    name: 'Cross-functional Collaboration',
    description: 'Working effectively across teams and disciplines',
    keywords: ['Cross-Team Collaboration', 'Technical Communication', 'Remote Teams', 'Design Collaboration']
  },
  delivery: {
    name: 'Delivery & Quality',
    description: 'Code quality, maintainability, and consistent delivery',
    keywords: ['Code Quality', 'Problem Solving', 'Ownership', 'Scalable Solutions']
  },
  personality: {
    name: 'Personality & Culture',
    description: 'Positive team impact, kindness, and collaborative spirit',
    keywords: ['Empathy', 'Kindness', 'Positivity', 'Passion', 'Fun']
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