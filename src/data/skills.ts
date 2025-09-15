// Skills taxonomy for portfolio recommendations and filtering

export interface Skill {
  readonly id: string;
  readonly name: string;
  readonly category: SkillCategory;
  readonly description: string;
  readonly priority: 'high' | 'medium' | 'low'; // For filtering relevance
}

export type SkillCategory =
  | 'engineering'
  | 'process'
  | 'leadership'
  | 'collaboration'
  | 'delivery'
  | 'personality';

export const SKILL_CATEGORIES: Record<
  SkillCategory,
  { name: string; description: string; keywords: string[] }
> = {
  engineering: {
    name: 'Engineering Skills',
    description:
      'Modern web development, UI frameworks, accessibility, Backend integration, APIs, build tools, and testing',
    keywords: [
      'React',
      'TypeScript',
      'JavaScript',
      'AngularJS',
      'CSS',
      'HTML',
      'Web Development',
      'GraphQL',
      'Node.js',
      'SQL',
      'Testing',
      'Cypress Testing',
      'Architecture',
      'Scalable Solutions',
      'Developer Experience',
      'Engineering Innovation',
      'Software Engineering',
      'Programming Paradigms',
      'Languages',
    ],
  },
  process: {
    name: 'Process Excellence',
    description: 'Agile development, CI/CD, and engineering practices',
    keywords: [
      'Code Quality',
      'Clean Code',
      'Code Reviews',
      'Quality Delivery',
      'Consistency',
    ],
  },
  leadership: {
    name: 'Team Leadership',
    description: 'Mentorship, code reviews, and knowledge sharing',
    keywords: [
      'Leadership',
      'Mentorship',
      'Knowledge Sharing',
      'Technical Guidance',
      'Documentation',
      'Technical Documentation',
      'Education',
      'Student Success',
    ],
  },
  collaboration: {
    name: 'Cross-functional Collaboration',
    description: 'Working effectively across teams and disciplines',
    keywords: [
      'Collaboration',
      'Cross-team Communication',
      'Team Collaboration',
      'Team Communication',
      'Technical Communication',
      'Design Collaboration',
      'Instructional Content',
    ],
  },
  delivery: {
    name: 'Delivery & Quality',
    description: 'Code quality, maintainability, and consistent delivery',
    keywords: [
      'Problem Solving',
      'Creative Problem-Solving',
      'Ownership',
      'Proactive Mindset',
      'Initiative',
      'Adaptability',
      'Curiosity',
      'Integrity',
      'Resilience',
      'Quick Learning',
      'Engineering Quality',
      'Customer Focus',
      'User Research',
      'Team Support',
      'Team Contribution',
      'Teamwork',
      'Communication',
    ],
  },
  personality: {
    name: 'Personality & Culture',
    description: 'Positive team impact, kindness, and collaborative spirit',
    keywords: [
      'Empathy',
      'Kindness',
      'Positivity',
      'Passion',
      'Fun',
      'Vibrant Energy',
      'Generous',
    ],
  },
} as const;

// Skills organized by job-relevant categories
export const SKILLS: readonly Skill[] = [
  // Frontend Excellence (Highest Priority for GolfNow role)
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    description: 'Modern frontend framework (3+ years experience)',
    priority: 'high',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    description: 'Type-safe JavaScript development (3+ years)',
    priority: 'high',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'frontend',
    description: 'Core web programming language (3+ years)',
    priority: 'high',
  },
  {
    id: 'css',
    name: 'CSS',
    category: 'frontend',
    description: 'Modern CSS and styling frameworks',
    priority: 'high',
  },
  {
    id: 'html',
    name: 'HTML',
    category: 'frontend',
    description: 'Semantic HTML and web standards',
    priority: 'high',
  },
  {
    id: 'web-accessibility',
    name: 'Web Accessibility',
    category: 'frontend',
    description: 'Building accessible web applications',
    priority: 'high',
  },
  {
    id: 'tailwind',
    name: 'TailwindCSS',
    category: 'frontend',
    description: 'Utility-first CSS framework',
    priority: 'medium',
  },
  {
    id: 'vuejs',
    name: 'Vue.js',
    category: 'frontend',
    description: 'Progressive frontend framework',
    priority: 'medium',
  },
  {
    id: 'angular',
    name: 'Angular',
    category: 'frontend',
    description: 'Enterprise frontend framework',
    priority: 'low',
  },

  // API & Integration (High Priority)
  {
    id: 'graphql',
    name: 'GraphQL',
    category: 'integration',
    description: 'Modern API query language and runtime',
    priority: 'high',
  },
  {
    id: 'rest-apis',
    name: 'REST APIs',
    category: 'integration',
    description: 'RESTful web services and integration',
    priority: 'high',
  },
  {
    id: 'node-js',
    name: 'Node.js',
    category: 'integration',
    description: 'Server-side JavaScript runtime',
    priority: 'high',
  },
  {
    id: 'testing',
    name: 'Testing & QA',
    category: 'integration',
    description: 'Client-side and server-side testing',
    priority: 'high',
  },
  {
    id: 'build-tools',
    name: 'Build Tools',
    category: 'integration',
    description: 'Webpack, Vite, Bun and modern build systems',
    priority: 'high',
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'integration',
    description: 'Database design and querying',
    priority: 'medium',
  },

  // Process Excellence (High Priority)
  {
    id: 'agile',
    name: 'Agile Development',
    category: 'process',
    description: 'Agile development methodologies and practices',
    priority: 'high',
  },
  {
    id: 'ci-cd',
    name: 'CI/CD',
    category: 'process',
    description: 'Continuous integration and deployment',
    priority: 'high',
  },
  {
    id: 'github-actions',
    name: 'GitHub Actions',
    category: 'process',
    description: 'Automated workflows and CI/CD pipelines',
    priority: 'medium',
  },
  {
    id: 'code-quality',
    name: 'Code Quality',
    category: 'process',
    description: 'Maintainable, clean, and documented code',
    priority: 'high',
  },

  // Team Leadership (High Priority for GolfNow)
  {
    id: 'mentorship',
    name: 'Mentorship',
    category: 'leadership',
    description: 'Mentoring junior team members and sharing best practices',
    priority: 'high',
  },
  {
    id: 'code-reviews',
    name: 'Code Reviews',
    category: 'leadership',
    description: 'Peer review and technical documentation',
    priority: 'high',
  },
  {
    id: 'technical-leadership',
    name: 'Technical Leadership',
    category: 'leadership',
    description: 'Defining engineering standards and best practices',
    priority: 'high',
  },
  {
    id: 'knowledge-sharing',
    name: 'Knowledge Sharing',
    category: 'leadership',
    description: 'Contributing to technical documentation',
    priority: 'high',
  },

  // Cross-functional Collaboration (High Priority)
  {
    id: 'cross-team-collaboration',
    name: 'Cross-Team Collaboration',
    category: 'collaboration',
    description: 'Working with designers, product managers, and stakeholders',
    priority: 'high',
  },
  {
    id: 'technical-communication',
    name: 'Technical Communication',
    category: 'collaboration',
    description: 'Communicating progress and decisions to stakeholders',
    priority: 'high',
  },
  {
    id: 'remote-collaboration',
    name: 'Remote & Multicultural Teams',
    category: 'collaboration',
    description: 'Effective collaboration in distributed teams',
    priority: 'high',
  },
  {
    id: 'design-collaboration',
    name: 'Design Collaboration',
    category: 'collaboration',
    description: 'Translating design requirements into code',
    priority: 'medium',
  },

  // Delivery & Quality (High Priority)
  {
    id: 'code-quality',
    name: 'Code Quality & Maintainability',
    category: 'delivery',
    description: 'Focus on maintainable, scalable solutions',
    priority: 'high',
  },
  {
    id: 'problem-solving',
    name: 'Problem Solving',
    category: 'delivery',
    description: 'Strong analytical and problem-solving skills',
    priority: 'high',
  },
  {
    id: 'ownership',
    name: 'Proactive Ownership',
    category: 'delivery',
    description: 'Proactive mindset with focus on quality',
    priority: 'high',
  },
  {
    id: 'continuous-improvement',
    name: 'Continuous Improvement',
    category: 'delivery',
    description: 'Contributing to culture of innovation',
    priority: 'medium',
  },
  {
    id: 'scalable-solutions',
    name: 'Scalable Solutions',
    category: 'delivery',
    description: 'Building high-performance web applications',
    priority: 'high',
  },
  {
    id: 'user-experience',
    name: 'User Experience Focus',
    category: 'delivery',
    description: 'Delivering rich, interactive user experiences',
    priority: 'medium',
  },
] as const;

// Utility functions for working with skills
export const getSkillById = (id: string): Skill | undefined =>
  SKILLS.find(skill => skill.id === id);

export const getSkillsByCategory = (
  category: SkillCategory
): readonly Skill[] => SKILLS.filter(skill => skill.category === category);

export const getHighPrioritySkills = (): readonly Skill[] =>
  SKILLS.filter(skill => skill.priority === 'high');

export const getSkillsByPriority = (
  priority: Skill['priority']
): readonly Skill[] => SKILLS.filter(skill => skill.priority === priority);

// For UI display and filtering
export const SKILL_MAP = Object.fromEntries(
  SKILLS.map(skill => [skill.id, skill])
) as Record<string, Skill>;

export type SkillId = (typeof SKILLS)[number]['id'];

// Mapping of actual recommendation skills to categories
export const SKILL_TO_CATEGORY_MAP: Record<string, SkillCategory> = {
  // Frontend Excellence
  React: 'engineering',
  TypeScript: 'engineering',
  JavaScript: 'engineering',
  AngularJS: 'engineering',
  'Web Development': 'engineering',
  CSS: 'engineering',
  HTML: 'engineering',
  'Cypress Testing': 'engineering',
  Testing: 'engineering',

  // API & Integration
  'Node.js': 'engineering',
  SQL: 'engineering',
  GraphQL: 'engineering',
  'Developer Experience': 'engineering',
  'Engineering Innovation': 'engineering',
  Architecture: 'engineering',
  'Scalable Solutions': 'engineering',
  'Software Engineering': 'engineering',
  'Programming Paradigms': 'engineering',
  Languages: 'engineering',

  // Process Excellence
  'Clean Code': 'process',
  'Code Reviews': 'process',
  'Quality Delivery': 'process',
  Consistency: 'process',

  // Team Leadership
  Leadership: 'leadership',
  Mentorship: 'leadership',
  'Technical Guidance': 'leadership',
  'Knowledge Sharing': 'leadership',
  'Technical Documentation': 'leadership',
  Documentation: 'leadership',
  'Student Success': 'leadership',
  Education: 'leadership',

  // Cross-functional Collaboration
  Collaboration: 'collaboration',
  'Cross-team Communication': 'collaboration',
  'Team Collaboration': 'collaboration',
  'Team Communication': 'collaboration',
  'Technical Communication': 'collaboration',
  'Design Collaboration': 'collaboration',
  'Instructional Content': 'collaboration',

  // Delivery & Quality
  'Problem Solving': 'delivery',
  'Creative Problem-Solving': 'delivery',
  Ownership: 'delivery',
  Initiative: 'delivery',
  Adaptability: 'delivery',
  Curiosity: 'delivery',
  Integrity: 'delivery',
  Resilience: 'delivery',
  'Quick Learning': 'delivery',
  'Team Contribution': 'delivery',
  'Customer Focus': 'delivery',
  'Team Support': 'delivery',
  'User Research': 'delivery',
  Teamwork: 'delivery',
  Communication: 'delivery',
  'Engineering Quality': 'delivery',

  // Personality & Culture
  Empathy: 'personality',
  Kindness: 'personality',
  Positivity: 'personality',
  Fun: 'personality',
  Passion: 'personality',
  'Vibrant Energy': 'personality',
  Generous: 'personality',

  // Missing skills from recommendations - now properly categorized
  'Proactive Mindset': 'delivery',
  'Code Quality': 'process',
};

// Utility function to get skill category
export const getSkillCategory = (skillName: string): SkillCategory | undefined =>
  SKILL_TO_CATEGORY_MAP[skillName];

// Simple interface for recommendation skills (from skillCategories.ts)
export interface RecommendationSkill {
  category: SkillCategory;
  highlight: string; // Key skill or trait highlighted in this recommendation
}

// Helper to get category info (from skillCategories.ts)
export const getCategoryInfo = (category: SkillCategory) => SKILL_CATEGORIES[category];

// Helper to get all categories for filtering UI (from skillCategories.ts)
export const getAllCategories = (): SkillCategory[] => Object.keys(SKILL_CATEGORIES) as SkillCategory[];