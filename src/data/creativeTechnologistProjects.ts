export type ProjectCategory =
  | 'ai-emerging-tech'
  | 'learning-experiences'
  | 'internal-tools'
  | 'developer-experience';

export interface ProjectLink {
  name: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  story: string;
  projectDetails?: string;
  technologies: string[];
  featured: boolean;
  order: number;
  githubUrl?: string;
  liveUrl?: string;
  projectLinks?: ProjectLink[];
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
      'Validate product-market fit for a Brazilian pickleball community platform using Bolt AI rapid prototyping then migrated to production infrastructure with Vercel and Supabase for scalability. Leveraged Claude Code for iterative development of the full-stack social platform featuring court discovery, game organization, and multilingual support (Portuguese, English, Spanish). This project demonstrated AI-assisted development from prototype validation to production deployment with authentication, real-time data updates, and responsive design.',
    projectDetails:
      '**Community-Driven Platform Architecture**: PickleBrasil connects Brazil’s growing pickleball community through a full-stack social platform. Core features include court discovery with map and real-time availability, game organization tools, and player profiles with skill levels and multilingual interface supports Portuguese, English, and Spanish using i18next internationalization, enabling accessibility across a diverse user base.\n\n **Scalable Backend & Frontend Infrastructure**: Supabase backend provides PostgreSQL database with Row Level Security policies, real-time subscriptions for live game updates, and authentication including social login providers. Radix UI component library ensures accessibility compliance with ARIA attributes and keyboard navigation, while Tailwind CSS enables rapid UI iteration without sacrificing design consistency. Vercel’s edge network deployment provides global CDN distribution with automatic HTTPS and preview deployments for each git push.\n\n **AI-Assisted Development Workflow**: The development lifecycle demonstrates modern AI prototyping methodology: rapid validation in Bolt AI proved core feature viability within days, then Claude Code accelerated the migration to production infrastructure through iterative prompting and code generation. GitHub integration provides an immediate feedback loop from development to production, showcasing transition from prototype to scalable product.',
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
    id: 'bolt-rapid-prototypes',
    title: 'Bolt Rapid Prototyping Portfolio',
    category: 'ai-emerging-tech',
    story:
      'Validated diverse application concepts using Bolt AI for rapid full-stack prototyping. CodeCraft Academy AI created for Bolt Coding Challenge demonstrates educational platform features including curriculum management, student progress tracking, and interactive coding lessons for after-school programs. QuestAied addresses accessibility needs with gamified task management for children ages 10-13 with ADHD featuring quest spinner mechanics, XP progression system, rewards store with parental approval workflow, and streak tracking to improve executive function and daily routine adherence',
    projectDetails:
      'CodeCraft Academy AI serves educators teaching Coding and AI fundamentals in after-school club settings. Platform includes lesson planning tools, student activity tracking, and curriculum resources designed for K-12 audiences. Built for Bolt Coding Challenge showcasing rapid concept-to-prototype workflow.\n\nQuestAied gamifies daily tasks through quest spinner assigning chores across six categories (Cleanup, Hygiene, School, Helping Out, Self-Care, Surprise) with three difficulty levels. React and Supabase backend enables real-time XP tracking, level progression, and daily streak calculations. Parent dashboard with PIN protection allows reward approval management while maintaining child autonomy. Framer Motion animations provide engaging visual feedback optimized for neurodivergent users.\n\nBoth prototypes demonstrate ability to rapidly validate product-market fit across different domains (EdTech and Accessibility) while implementing sophisticated full-stack features including authentication, database design, responsive UI, and domain-specific workflows.',
    technologies: [
      'React',
      'TypeScript',
      'Bolt',
      'Supabase',
      'Tailwind CSS',
      'Vite',
      'Framer Motion',
      'Rapid Prototyping',
      'UX Design',
      'Accessibility',
    ],
    featured: true,
    order: 4,
    projectLinks: [
      {
        name: 'CodeCraft Academy AI',
        githubUrl: 'https://github.com/carolinapowers/code-craft',
        liveUrl: 'https://codecraft-academy-ai-duff.bolt.host/',
      },
      {
        name: 'QuestAied',
        githubUrl: 'https://github.com/carolinapowers/QuestAied',
        liveUrl: 'https://questaied-app-duplic-5upw.bolt.host/',
      },
    ],
  },
  {
    id: 'mcp-server',
    title: 'Model Context Protocol (MCP) Server for Code Lab Generation',
    category: 'ai-emerging-tech',
    story:
      'Evolved custom Claude Code commands into a MCP server automating Pluralsight Code Lab creation across multiple languages. Architected language adapter pattern supporting TypeScript/JavaScript (Vitest, TSQuery) and C#/.NET (xUnit, Roslyn) with expansion planned for Python, Go, and Java. The system automates the complete workflow from brainstorming learning objectives and scaffolding project infrastructure to generating validated exercises with AST-based tests, reducing development time from days to hours.',
    projectDetails:
      '**Multi-Language MCP Server Architecture**: The MCP Server exposes seven tools providing end-to-end Code Lab creation automation. The system generates structured LAB_OPPORTUNITY.md from learning objectives, scaffolds complete project infrastructure with test runners and customer reporters, and produces validated exercises with comprehensive test coverage. The modular approach enables rapid iteration across multiple instructional design phases.\n\n**Language-Agnostic Adapter Pattern**: A language adapter pattern enables automatic detection and framework selection. TypeScript projects automatically receive Vitest setup with TSQuery for AST validation. C# projects get xUnit with Roslyn-based code analysis through custom CodeLab.Validator tool. This architecture supports current languages (TypeScript, C#) while remaining extensible for Python, Go, and Java.\n\n**Comprehensive Test Generation & Validation**: The create_lab_from_opportunity tool bulk-generates all steps with markdown content, test files, and solution templates. Each validation step provides actionable feedback messages to learners, with a comprehensive test suite covering unit. This ensures consistent quality and learner experience across all supported languages.',
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
      'Structure TypeScript Applications with Barrel Files and Module Re-exports Code Lab',
    category: 'learning-experiences',
    story:
      'Created a Pluralsight Code Lab that teaches TypeScript module organization patterns and barrel file architecture. Built custom Claude Code commands that orchestrated the complete Code Lab creation workflow, generating step branches, markdown content, and test scaffolding while maintaining curriculum alignment. Implemented AST-based unit tests using TSQuery providing precise feedback on implementation patterns, with CLAUDE.md ensuring AI consistency across development iterations.',
    projectDetails:
      'Custom slash commands automated creation of step branches, markdown content generation, and test file scaffolding. Each command integrated with curriculum outline to maintain consistency with approved learning objectives while adhering to Pluralsight style guidelines.\n\nAST-based validation using TSQuery enabled precise code pattern matching. Tests verified barrel file structure, export syntax, and import path optimization without relying on brittle string matching. Clear error messages guided learners toward correct implementation patterns.\n\nCLAUDE.md configuration file served as persistent context ensuring Claude Code followed specific workflow patterns, naming conventions, and quality standards. This approach demonstrated how AI tools can be effectively constrained to maintain consistency across multi-step content development while accelerating production timelines.',
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
    projectDetails:
      'Interactive Code Lab structured around accessibility-first testing philosophy using React Testing Library query priority system. Learners progress through getByRole, getByLabelText, getByPlaceholderText, and getByText queries discovering how semantic HTML improves both accessibility and testability. Exercises reinforce testing from user perspective rather than implementation details, building maintainable test suites resilient to refactoring.\n\nPractical exercises include testing form validation with user input simulation, async operations with API mocking using MSW (Mock Service Worker), and complex state management scenarios involving multiple user interactions. Each exercise provides immediate validation feedback through automated test runners with clear success/failure messages guiding learners toward correct implementations. Real-world component examples include authentication forms, data fetching components, and interactive UI elements.\n\nCode Lab emphasizes modern testing patterns including userEvent for realistic user interaction simulation over legacy fireEvent approach, waitFor utilities for handling async updates, and within queries for scoped element selection. Best practices covered include testing component behavior contracts, avoiding test implementation details like state or props, and writing tests that give confidence in code changes. Learners complete lab understanding how comprehensive test coverage enables confident refactoring and feature development.',
    technologies: [
      'React',
      'TypeScript',
      'Jest',
      'React Testing Library',
      'Vitest',
      'Instructional Design',
    ],
    featured: true,
    order: 6,
    liveUrl:
      'https://app.pluralsight.com/code-labs/contents/62a6025c-17b3-4d79-a28b-7ac116e8f038/learn',
  },
  {
    id: 'vue-reading-list',
    title: 'Vue.js Guided Project: Reading List Application with Forms',
    category: 'learning-experiences',
    story:
      'Designed comprehensive Guided Project teaching Vue.js fundamentals through practical reading list application development. Progressive curriculum covers component composition, form handling with v-model, user input validation, and list manipulation patterns. Emphasized test-driven development approach using Vue Testing Library to build learner confidence in component testing strategies. Content later converted to interactive Code Lab format by Pluralsight, demonstrating ability to create engaging, production-ready educational content that scales across learning formats',
    projectDetails:
      'Guided Project introduces Vue.js 3 Composition API through progressive feature development starting with basic component structure and advancing to complex form interactions. Learners build reading list application managing book entries with title, author, and rating fields. Component composition lessons demonstrate single-file component architecture, reactive data management with ref and reactive, and computed properties for derived state calculations like filtered book lists and reading statistics.\n\nForm handling curriculum covers v-model two-way binding patterns for text inputs, number inputs, and select dropdowns. Validation logic includes required field checks, input length constraints, and rating range validation with real-time user feedback. Event handling lessons teach form submission, list item deletion, and editing existing entries. State management patterns demonstrate lifting state up to parent components and props/events communication between child components maintaining unidirectional data flow.\n\nTest-driven development sections use Vue Testing Library emphasizing accessibility-first query strategies matching React Testing Library philosophy. Learners write tests validating component rendering, user input simulation with fireEvent, form submission handling, and conditional rendering based on state changes. Tests verify user-facing behavior rather than implementation details building confidence in component reliability. Pluralsight conversion to interactive Code Lab format demonstrates content adaptability across learning platforms while maintaining consistent instructional quality and progressive complexity.',
    technologies: [
      'Vue.js',
      'Forms',
      'TDD',
      'Testing Library',
      'Instructional Design',
    ],
    featured: true,
    order: 7,
    liveUrl:
      'https://app.pluralsight.com/code-labs/contents/a39a4529-3ae5-4b45-a086-80a456350717/learn',
  },
  {
    id: 'interactive-portfolio',
    title: 'Interactive Portfolio - Agentic Development Showcase',
    category: 'ai-emerging-tech',
    story:
      'Rapidly prototyped professional portfolio using agentic coding practices with Claude Code to demonstrate modern development workflows and AI-assisted development capabilities. Built full-stack React application featuring dynamic filtering, professional recommendation showcase, and responsive design - all developed through iterative AI collaboration. Implemented comprehensive testing strategy, component-driven architecture, and accessibility-first patterns. Project serves dual purpose as both portfolio presentation and proof of concept for AI-assisted rapid application development',
    projectDetails:
      'Portfolio application showcases professional LinkedIn recommendations through interactive filtering system organizing feedback across skill categories including Technical Excellence, Collaboration & Leadership, Process Excellence, and Growth & Learning. Recommendation cards display context-aware skill tags with intelligent highlighting based on active filters. Search functionality with real-time word highlighting enables keyword discovery across recommendation text. Pagination and sorting controls provide efficient navigation through extensive professional feedback.\n\nFeatured Work section presents Creative Technologist projects across AI & Emerging Tech, Learning Experiences, Internal Tools, and Developer Experience categories. Dynamic filtering with active state management and expandable project cards reveal detailed implementation information. Project metadata includes technology stacks, GitHub repositories, and live demo links. Adjacent card expansion pattern optimizes two-column grid layout for comprehensive project exploration.\n\nDevelopment leveraged Claude Code for iterative feature implementation including component architecture refinement, comprehensive test coverage with React Testing Library, and accessibility-first patterns following WCAG guidelines. CSS Modules provide scoped styling with design system consistency. Vitest test suite covers 140+ test cases ensuring component behavior reliability. Project demonstrates complete AI-assisted development lifecycle from initial prototyping through production deployment with continuous integration via GitHub Actions.',
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
    order: 5,
    githubUrl: 'https://github.com/carolinapowers/portfolio',
  },
  {
    id: 'vue-tdd-automation',
    title: 'Vue TDD Automation - npm Package for Testing Workflows',
    category: 'developer-experience',
    story:
      'Developed npm package automating test-driven development workflows for Vue.js applications with GitHub integration. Interactive CLI streamlines component creation, test generation, and issue-driven development following RED → GREEN → REFACTOR pattern. Enforces 80% code coverage thresholds and accessibility-first testing practices through pre-configured Vitest setup, Testing Library utilities, and GitHub Actions workflows. GitHub Copilot instructions enable AI-assisted test authoring while maintaining TDD methodology and Vue.js testing standards',
    projectDetails:
      'npm package provides comprehensive CLI tool for automated TDD workflows in Vue.js 3 projects. Interactive prompts guide developers through component creation, composable generation, and accessibility-focused test scaffolding. Vitest configuration includes coverage thresholds, watch mode, and UI integration for optimal developer experience.\n\nGitHub Actions integration enables issue-driven development with automatic branch creation and test generation from issue requirements. Pre-configured Copilot instructions assist developers in writing tests that follow Testing Library best practices and accessibility patterns. Templates enforce structured feature requests maintaining consistency across development teams.\n\nTesting utilities cover components, composables, and accessibility scenarios with built-in helpers for Vue Test Utils and Testing Library patterns. Enforces 80% code coverage across statements, branches, functions, and lines. Documentation includes Vue.js testing standards compliance guide and TDD methodology training resources demonstrating systematic approach to quality assurance.',
    technologies: [
      'Vue.js',
      'Vitest',
      'Testing Library',
      'TypeScript',
      'GitHub Actions',
      'npm',
      'CLI Development',
      'TDD',
      'Accessibility Testing',
      'GitHub Copilot',
    ],
    featured: true,
    order: 8,
    githubUrl: 'https://github.com/carolinapowers/vue-tdd-automation',
  },
  {
    id: 'custom-eslint-rules',
    title: 'Custom ESLint Rules (AST Parsing) at Articulate',
    category: 'internal-tools',
    story:
      'Engineered custom ESLint rules at Articulate using Abstract Syntax Tree parsing to codify team learnings and prevent recurring code quality issues at scale - leveraging AST parsing expertise developed through Interactive Courses at Code School and Code Lab authoring at Pluralsight. Rules detect anti-patterns, enforce architecture decisions, and validate implementation standards specific to learning platform requirements. Automated detection of high-risk patterns reduces code review overhead while maintaining consistent quality standards across multiple development teams. Integrated rules into CI/CD pipeline to provide immediate feedback and prevent problematic code from reaching production',
    projectDetails:
      'Custom ESLint rules enforce architectural patterns specific to learning platform development including proper error boundary implementation, accessibility compliance in interactive course components, and state management best practices. Rules detect anti-patterns like synchronous XHR requests blocking course progression, improper React lifecycle method usage causing memory leaks, and missing ARIA labels in assessment interactions. Automated detection catches issues during development before code review reducing feedback cycles and preventing production incidents affecting learner experience.\n\nAST parsing implementation traverses JavaScript and TypeScript syntax trees using ESLint API examining node types, properties, and relationships. Rules analyze import statements detecting circular dependencies, function declarations validating naming conventions, and JSX elements ensuring proper prop types and accessibility attributes. Comprehensive test suites validate rule behavior across edge cases using ESLint RuleTester with fixture files covering valid and invalid code scenarios. Clear error messages guide developers toward correct implementations with code examples and documentation links.\n\nIntegration into CI/CD pipeline provides immediate feedback through pre-commit hooks and pull request checks preventing problematic code from merging. Team adoption accelerated through documentation including rule rationale, examples of violations, and migration guides for existing code. Rules evolved based on team retrospectives and production incident analysis continuously improving code quality standards. Success measured through reduced code review time, decreased production bugs related to detected patterns, and improved developer confidence in architectural decisions.',
    technologies: ['ESLint', 'AST Parsing', 'JavaScript', 'TypeScript'],
    featured: false,
    order: 9,
  },
  {
    id: 'articulate-testing-modernization',
    title: 'Testing Infrastructure Modernization at Articulate',
    category: 'developer-experience',
    story:
      'Led comprehensive testing infrastructure modernization at Articulate, migrating from Enzyme to React Testing Library and Jest across large-scale codebase while establishing modern accessibility-first testing practices. Researched, prototyped, and championed Cypress adoption for end-to-end testing, presenting technical evaluation and implementation strategy to engineering leadership demonstrating improved developer experience and test reliability. Created detailed migration guides, best practices documentation, and shared testing utilities that accelerated team adoption and established consistent patterns. Improvements resulted in faster CI/CD pipelines, reduced maintenance overhead, and increased developer confidence in comprehensive test coverage',
    projectDetails:
      'Migration from Enzyme to React Testing Library addressed mounting technical debt accumulated through deprecated testing patterns and shallow rendering limitations. Systematic refactoring replaced enzyme-specific APIs with accessibility-first queries matching user interaction patterns. Migration guides documented query priority system (getByRole, getByLabelText, getByText) with before/after code examples demonstrating improved test maintainability. Shared testing utilities provided reusable helpers for common patterns including form interactions, async operations, and accessibility assertions reducing boilerplate across test files. Automated codemods assisted with mechanical transformations while manual review ensured semantic correctness.\n\nCypress evaluation included technical spike comparing Cypress against existing Selenium-based E2E framework assessing developer experience, test reliability, and CI/CD integration capabilities. Prototype test suite covered critical user workflows including authentication flows, course enrollment, and assessment submission demonstrating Cypress advantages in debugging with time-travel, automatic waiting, and network stubbing. Presentation to engineering leadership included cost-benefit analysis, migration strategy, and maintenance projections supporting adoption decision. Implementation roadmap phased Cypress introduction alongside existing framework minimizing disruption during transition period.\n\nTeam adoption accelerated through comprehensive documentation including testing philosophy guides, practical examples repository, and recorded training sessions. Office hours provided hands-on support for complex testing scenarios building team confidence in new approaches. Success metrics tracked test execution time improvements (40% faster CI/CD pipelines), reduced flakiness (85% fewer intermittent failures), and developer satisfaction surveys showing increased confidence in refactoring and feature development. Modern testing infrastructure positioned team for continued velocity improvements and quality assurance reliability.',
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
    order: 10,
  },
];
