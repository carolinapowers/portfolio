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
      'Rapid prototyping with Bolt AI to validate product-market fit, then migrated to production infrastructure with Vercel and Supabase for scalability. Leveraged Claude Code for iterative development of full-stack social platform features including court discovery, game organization, and multilingual support (Portuguese, English, Spanish). Implemented authentication, real-time data sync, and responsive design using Radix UI components - demonstrating AI-assisted development workflow from concept to production deployment',
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
    order: 3,
    // githubUrl: 'https://github.com/carolinapowers/PickleBrasil',
    liveUrl: 'https://picklebrasil.vercel.app/',
  },
  {
    id: 'mcp-server',
    title: 'Model Context Protocol (MCP) Server for Code Lab Generation',
    category: 'ai-emerging-tech',
    story:
      'Evolved from custom Claude commands workflow into production-ready MCP server supporting multi-language Code Lab development. Implements language adapter pattern for JavaScript/TypeScript (complete) and C# (in development, Go planned next). Automates brainstorming, project scaffolding, step generation, and AST-based test creation - reducing Code Lab development time from days to hours',
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
    order: 1,
    liveUrl:
      'https://app.pluralsight.com/code-labs/contents/03dc3a20-f895-432d-8fc5-f9bb1f66a224/learn',
  },
  {
    id: 'react-testing-lab',
    title: 'React Testing Hands-on Code Lab',
    category: 'learning-experiences',
    story:
      'Developed comprehensive hands-on Code Lab guiding learners through React Testing Library best practices using accessibility-first query strategies. Progressive exercises cover component rendering, user event simulation, async operations, and accessibility validation - emphasizing testing user behavior over implementation details. Incorporates real-world testing scenarios with form interactions, API mocking, and state management validation to build practical testing confidence',
    technologies: [
      'React',
      'TypeScript',
      'Jest',
      'React Testing Library',
      'Vitest',
      'Instructional Design',
    ],
    featured: true,
    order: 5,
    liveUrl:
      'https://app.pluralsight.com/code-labs/contents/62a6025c-17b3-4d79-a28b-7ac116e8f038/learn',
  },
  {
    id: 'vue-reading-list',
    title: 'Vue.js Guided Project: Reading List Application with Forms',
    category: 'learning-experiences',
    story:
      'Designed comprehensive Guided Project teaching Vue.js fundamentals through practical reading list application development. Progressive curriculum covers component composition, form handling with v-model, user input validation, and list manipulation patterns. Emphasized test-driven development approach using Vue Testing Library to build learner confidence in component testing strategies. Content later converted to interactive Code Lab format by Pluralsight, demonstrating ability to create engaging, production-ready educational content that scales across learning formats',
    technologies: [
      'Vue.js',
      'Forms',
      'TDD',
      'Testing Library',
      'Instructional Design',
    ],
    featured: true,
    order: 6,
    liveUrl:
      'https://app.pluralsight.com/code-labs/contents/a39a4529-3ae5-4b45-a086-80a456350717/learn',
  },
  {
    id: 'interactive-portfolio',
    title: 'Interactive Portfolio - Agentic Development Showcase',
    category: 'ai-emerging-tech',
    story:
      'Rapidly prototyped professional portfolio using agentic coding practices with Claude Code to demonstrate modern development workflows and AI-assisted development capabilities. Built full-stack React application featuring dynamic filtering, professional recommendation showcase, and responsive design - all developed through iterative AI collaboration. Implemented comprehensive testing strategy, component-driven architecture, and accessibility-first patterns. Project serves dual purpose as both portfolio presentation and proof of concept for AI-assisted rapid application development',
    technologies: [
      'React',
      'TypeScript',
      'CSS Modules',
      'Vite',
      'React Testing Library',
      'Claude Code',
      'Agentic Development',
      'Component Architecture',
    ],
    featured: true,
    order: 4,
    githubUrl: 'https://github.com/carolinapowers/portfolio',
  },
  {
    id: 'custom-eslint-rules',
    title: 'Custom ESLint Rules (AST Parsing) at Articulate',
    category: 'internal-tools',
    story:
      'Engineered custom ESLint rules at Articulate using Abstract Syntax Tree parsing to codify team learnings and prevent recurring code quality issues at scale - leveraging AST parsing expertise developed through Interactive Courses at Code School and Code Lab authoring at Pluralsight. Rules detect anti-patterns, enforce architecture decisions, and validate implementation standards specific to learning platform requirements. Automated detection of high-risk patterns reduces code review overhead while maintaining consistent quality standards across multiple development teams. Integrated rules into CI/CD pipeline to provide immediate feedback and prevent problematic code from reaching production',
    technologies: ['ESLint', 'AST Parsing', 'JavaScript', 'TypeScript'],
    featured: false,
    order: 7,
  },
  {
    id: 'articulate-testing-modernization',
    title: 'Testing Infrastructure Modernization at Articulate',
    category: 'developer-experience',
    story:
      'Led comprehensive testing infrastructure modernization at Articulate, migrating from Enzyme to React Testing Library and Jest across large-scale codebase while establishing modern accessibility-first testing practices. Researched, prototyped, and championed Cypress adoption for end-to-end testing, presenting technical evaluation and implementation strategy to engineering leadership demonstrating improved developer experience and test reliability. Created detailed migration guides, best practices documentation, and shared testing utilities that accelerated team adoption and established consistent patterns. Improvements resulted in faster CI/CD pipelines, reduced maintenance overhead, and increased developer confidence in comprehensive test coverage',
    technologies: [
      'React Testing Library',
      'Jest',
      'Cypress',
      'Enzyme',
      'E2E Testing',
      'Documentation',
      'Technical Leadership',
      'Testing Strategy',
    ],
    featured: false,
    order: 8,
  },
];
