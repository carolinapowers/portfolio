// Skills taxonomy for portfolio recommendations and filtering

export interface Skill {
  readonly id: string;
  readonly name: string;
  readonly category: SkillCategory;
  readonly description: string;
  readonly priority: 'high' | 'medium' | 'low'; // For filtering relevance
}

export type SkillCategory = 
  | 'technical'
  | 'leadership'
  | 'collaboration'
  | 'learning'
  | 'delivery';

export const SKILL_CATEGORIES: Record<SkillCategory, { name: string; description: string }> = {
  technical: {
    name: 'Technical Excellence',
    description: 'Core engineering and development capabilities'
  },
  leadership: {
    name: 'Leadership & Mentorship',
    description: 'Guiding teams and developing others'
  },
  collaboration: {
    name: 'Collaboration & Communication',
    description: 'Cross-functional teamwork and communication'
  },
  learning: {
    name: 'Learning & Innovation',
    description: 'Adaptability and continuous improvement'
  },
  delivery: {
    name: 'Delivery & Impact',
    description: 'Results-driven execution and quality focus'
  }
} as const;

// Standardized skills derived from recommendations analysis
export const SKILLS: readonly Skill[] = [
  // Technical Excellence (High Priority)
  {
    id: 'react',
    name: 'React',
    category: 'technical',
    description: 'Frontend framework expertise',
    priority: 'high'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'technical',
    description: 'Type-safe JavaScript development',
    priority: 'high'
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'technical',
    description: 'Core web programming language',
    priority: 'high'
  },
  {
    id: 'node-js',
    name: 'Node.js',
    category: 'technical',
    description: 'Server-side JavaScript runtime',
    priority: 'high'
  },
  {
    id: 'testing',
    name: 'Testing & QA',
    category: 'technical',
    description: 'Automated testing and quality assurance',
    priority: 'high'
  },
  {
    id: 'developer-experience',
    name: 'Developer Experience',
    category: 'technical',
    description: 'Tooling and workflow improvements',
    priority: 'high'
  },
  
  // Technical (Medium Priority)
  {
    id: 'sql',
    name: 'SQL',
    category: 'technical',
    description: 'Database design and querying',
    priority: 'medium'
  },
  {
    id: 'cypress',
    name: 'Cypress Testing',
    category: 'technical',
    description: 'End-to-end testing framework',
    priority: 'medium'
  },
  {
    id: 'web-development',
    name: 'Web Development',
    category: 'technical',
    description: 'Full-stack web application development',
    priority: 'medium'
  },
  {
    id: 'clean-code',
    name: 'Clean Code',
    category: 'technical',
    description: 'Writing maintainable, readable code',
    priority: 'high'
  },
  {
    id: 'architecture',
    name: 'System Architecture',
    category: 'technical',
    description: 'Designing scalable software systems',
    priority: 'high'
  },

  // Leadership & Mentorship (High Priority)
  {
    id: 'mentorship',
    name: 'Mentorship',
    category: 'leadership',
    description: 'Developing junior developers and team members',
    priority: 'high'
  },
  {
    id: 'technical-leadership',
    name: 'Technical Leadership',
    category: 'leadership',
    description: 'Leading technical decisions and initiatives',
    priority: 'high'
  },
  {
    id: 'knowledge-sharing',
    name: 'Knowledge Sharing',
    category: 'leadership',
    description: 'Documentation and teaching complex concepts',
    priority: 'high'
  },
  {
    id: 'team-development',
    name: 'Team Development',
    category: 'leadership',
    description: 'Building stronger engineering teams',
    priority: 'medium'
  },

  // Collaboration & Communication (High Priority)
  {
    id: 'cross-team-collaboration',
    name: 'Cross-Team Collaboration',
    category: 'collaboration',
    description: 'Working effectively across organizational boundaries',
    priority: 'high'
  },
  {
    id: 'technical-communication',
    name: 'Technical Communication',
    category: 'collaboration',
    description: 'Explaining complex concepts clearly',
    priority: 'high'
  },
  {
    id: 'code-reviews',
    name: 'Code Reviews',
    category: 'collaboration',
    description: 'Collaborative code quality improvement',
    priority: 'medium'
  },
  {
    id: 'design-collaboration',
    name: 'Design Collaboration',
    category: 'collaboration',
    description: 'Working closely with design teams',
    priority: 'medium'
  },
  {
    id: 'stakeholder-management',
    name: 'Stakeholder Management',
    category: 'collaboration',
    description: 'Managing relationships with business stakeholders',
    priority: 'medium'
  },

  // Learning & Innovation (High Priority)
  {
    id: 'adaptability',
    name: 'Adaptability',
    category: 'learning',
    description: 'Learning new technologies and paradigms quickly',
    priority: 'high'
  },
  {
    id: 'problem-solving',
    name: 'Problem Solving',
    category: 'learning',
    description: 'Creative and analytical approach to complex challenges',
    priority: 'high'
  },
  {
    id: 'continuous-learning',
    name: 'Continuous Learning',
    category: 'learning',
    description: 'Staying current with technology trends',
    priority: 'medium'
  },
  {
    id: 'innovation',
    name: 'Innovation',
    category: 'learning',
    description: 'Bringing creative solutions and new ideas',
    priority: 'medium'
  },

  // Delivery & Impact (High Priority)
  {
    id: 'ownership',
    name: 'Ownership',
    category: 'delivery',
    description: 'Taking full responsibility for outcomes',
    priority: 'high'
  },
  {
    id: 'quality-delivery',
    name: 'Quality Delivery',
    category: 'delivery',
    description: 'Consistent delivery of high-quality results',
    priority: 'high'
  },
  {
    id: 'project-execution',
    name: 'Project Execution',
    category: 'delivery',
    description: 'Managing complex projects to completion',
    priority: 'high'
  },
  {
    id: 'scalable-solutions',
    name: 'Scalable Solutions',
    category: 'delivery',
    description: 'Building systems that grow with business needs',
    priority: 'high'
  },
  {
    id: 'customer-focus',
    name: 'Customer Focus',
    category: 'delivery',
    description: 'Prioritizing user and customer needs',
    priority: 'medium'
  },
  {
    id: 'reliability',
    name: 'Reliability',
    category: 'delivery',
    description: 'Dependable execution and follow-through',
    priority: 'medium'
  }
] as const;

// Utility functions for working with skills
export const getSkillById = (id: string): Skill | undefined => 
  SKILLS.find(skill => skill.id === id);

export const getSkillsByCategory = (category: SkillCategory): readonly Skill[] => 
  SKILLS.filter(skill => skill.category === category);

export const getHighPrioritySkills = (): readonly Skill[] => 
  SKILLS.filter(skill => skill.priority === 'high');

export const getSkillsByPriority = (priority: Skill['priority']): readonly Skill[] => 
  SKILLS.filter(skill => skill.priority === priority);

// For UI display and filtering
export const SKILL_MAP = Object.fromEntries(
  SKILLS.map(skill => [skill.id, skill])
) as Record<string, Skill>;

export type SkillId = typeof SKILLS[number]['id'];