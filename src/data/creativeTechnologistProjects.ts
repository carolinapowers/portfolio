export type ProjectCategory =
  | 'ai-emerging-tech'
  | 'learning-experiences'
  | 'internal-tools'
  | 'developer-experience';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  story: string;
  technologies: string[];
  featured: boolean;
  order: number;
  githubUrl?: string;
  liveUrl?: string;
}

export const categoryDisplayNames: Record<ProjectCategory, string> = {
  'ai-emerging-tech': 'AI & Emerging Tech',
  'learning-experiences': 'Learning Experiences',
  'internal-tools': 'Internal Tools & Automation',
  'developer-experience': 'Developer Experience',
};

export const creativeTechnologistProjects: Project[] = [
  {
    id: 'picklebrasil',
    title: 'PickleBrasil - Pickleball Community Platform',
    category: 'ai-emerging-tech',
    story:
      'Rapid prototyping with Bolt to validate concept, then migrated to Vercel and Supabase for production deployment, leveraging Claude Code for iterative development of a full-stack social platform connecting pickleball players across Brazil',
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'Supabase',
      'Tailwind CSS',
      'Bolt',
      'Claude Code',
      'Vercel',
      'Radix UI',
      'i18next',
    ],
    featured: true,
    order: 1,
    // githubUrl: 'https://github.com/carolinapowers/PickleBrasil',
    liveUrl: 'https://picklebrasil.vercel.app/',
  },
  {
    id: 'mcp-server',
    title: 'Model Context Protocol (MCP) Server for Code Lab Generation',
    category: 'ai-emerging-tech',
    story:
      'Evolved from custom Claude commands workflow into production-ready MCP server supporting multi-language Code Lab development. Implements language adapter pattern for JavaScript/TypeScript (complete) and C# (in development, Go planned next). Automates brainstorming, project scaffolding, step generation, and AST-based test creation—reducing Code Lab development time from days to hours',
    technologies: [
      'TypeScript',
      'Model Context Protocol',
      'AST Parsing (TSQuery)',
      'Roslyn',
      'Node.js',
      'CI/CD',
      'Vitest',
      'Language Adapters',
      'Automation Workflows',
      'Instructional Design',
    ],
    featured: true,
    order: 2,
    githubUrl: 'https://github.com/carolinapowers/code-lab-mcp-server',
  },
  {
    id: 'typescript-barrel-files-codelab',
    title:
      'Structure TypeScript Applications with Barrel Files and Module Re-exports',
    category: 'ai-emerging-tech',
    story:
      'Showcased AI-assisted development by creating custom Claude Code commands to generate Code Lab steps from approved curriculum outline and AST-based unit tests for guided feedback, using claude.md to enforce personal workflow guidelines and Pluralsight standards throughout the development process',
    technologies: [
      'TypeScript',
      'Claude Code',
      'AST Parsing',
      'Vite',
      'Custom Commands',
      'Instructional Design',
      'Design Systems',
      'Module Architecture',
    ],
    featured: true,
    order: 3,
    liveUrl:
      'https://app.pluralsight.com/code-labs/contents/03dc3a20-f895-432d-8fc5-f9bb1f66a224/learn',
  },
  {
    id: 'react-testing-lab',
    title: 'React Testing Hands-on Code Lab',
    category: 'learning-experiences',
    story:
      'Designed scaffolded exercises that help learners build confidence in testing strategies, assertions, and component behavior',
    technologies: [
      'React',
      'TypeScript',
      'Jest',
      'React Testing Library',
      'Vitest',
      'Instructional Design',
    ],
    featured: true,
    order: 4,
    liveUrl:
      'https://app.pluralsight.com/code-labs/contents/62a6025c-17b3-4d79-a28b-7ac116e8f038/learn',
  },
  {
    id: 'vue-reading-list',
    title: 'Vue.js Guided Project: Reading List Application with Forms',
    category: 'learning-experiences',
    story:
      'Created Vue.js Guided Project teaching forms and user interaction through a practical reading list application, later converted to Code Lab format by Pluralsight',
    technologies: [
      'Vue.js',
      'Forms',
      'TDD',
      'Testing Library',
      'Instructional Design',
    ],
    featured: true,
    order: 5,
    liveUrl:
      'https://app.pluralsight.com/code-labs/contents/a39a4529-3ae5-4b45-a086-80a456350717/learn',
  },
  {
    id: 'ast-validation',
    title: 'AST-Based Validation System',
    category: 'internal-tools',
    story:
      'Implemented AST-based validation to provide immediate, meaningful learner feedback and enforce learning standards at scale',
    technologies: [
      'TypeScript',
      'AST Parsing',
      'TSQuery',
      'Vitest',
      'Automation',
    ],
    featured: true,
    order: 6,
  },
  {
    id: 'custom-eslint-rules',
    title: 'Custom ESLint Rules (AST Parsing)',
    category: 'internal-tools',
    story:
      'Designed custom ESLint rules using AST parsing to encode learnings into reusable tooling and prevent high-risk patterns at scale',
    technologies: ['ESLint', 'AST Parsing', 'JavaScript', 'TypeScript'],
    featured: false,
    order: 7,
  },
  {
    id: 'enzyme-rtl-migration',
    title: 'Enzyme → React Testing Library Migration',
    category: 'developer-experience',
    story:
      'Led migration from Enzyme to React Testing Library and Jest, documenting findings and best practices to improve reliability and shared understanding',
    technologies: [
      'React Testing Library',
      'Jest',
      'Enzyme',
      'Documentation',
      'Technical Leadership',
    ],
    featured: false,
    order: 8,
  },
];
