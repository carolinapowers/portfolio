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
      '**Community-Driven Platform Architecture:** PickleBrasil connects Brazil’s growing pickleball community through a full-stack social platform. Core features include court discovery with map and real-time availability, game organization tools, and player profiles with skill levels and multilingual interface supports Portuguese, English, and Spanish using i18next internationalization, enabling accessibility across a diverse user base.\n\n **Scalable Backend & Frontend Infrastructure:** Supabase backend provides PostgreSQL database with Row Level Security policies, real-time subscriptions for live game updates, and authentication including social login providers. Radix UI component library ensures accessibility compliance with ARIA attributes and keyboard navigation, while Tailwind CSS enables rapid UI iteration without sacrificing design consistency. Vercel’s edge network deployment provides global CDN distribution with automatic HTTPS and preview deployments for each git push.\n\n **AI-Assisted Development Workflow:** The development lifecycle demonstrates modern AI prototyping methodology: rapid validation in Bolt AI proved core feature viability within days, then Claude Code accelerated the migration to production infrastructure through iterative prompting and code generation. GitHub integration provides an immediate feedback loop from development to production, showcasing transition from prototype to scalable product.',
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
    featured: false,
    order: 3,
    // githubUrl: 'https://github.com/carolinapowers/PickleBrasil',
    liveUrl: 'https://picklebrasil.vercel.app/',
  },
  {
    id: 'bolt-rapid-prototypes',
    title: 'Bolt Rapid Prototyping Portfolio',
    category: 'ai-emerging-tech',
    story:
      'Leveraged Bolt AI to rapidly validate two distinct full-stack concepts: CodeCraft Academy, an educational platform for after-school coding instructions with curriculum management and student progress tracking, and QuestAied a gameified tasks management app addressing ADHD support for children ages 10-13. QuestAied features XP progression system, rewards store with parental approval workflow, and streak tracking to improve executive function and daily routine adherence',
    projectDetails:
      '**CodeCraft Academy: EdTech for After-School Programs:** CodeCraft Academy serves educators teaching Coding and AI fundamentals in after-school club settings. The platform includes lesson planning tools, student activity tracking, and curriculum resources designed for K-12 audiences. Built for Bolt Coding Challenge showcasing rapid concept-to-prototype workflow.\n\n **QuestAied: Gamified Task Management for ADHD Support:** QuestAied gamifies daily tasks through gamifying the assigning of chores across six categories (Cleanup, Hygiene, School, Helping Out, Self-Care, Surprise) with three difficulty levels. React and Supabase backend enables real-time XP tracking, level progression, and daily streak calculations. A parent dashboard with PIN protection allows reward approval management while maintaining child autonomy. Framer Motion animations provide engaging visual feedback optimized for neurodivergent users.\n\n**Rapid Prototyping Methodology:** Both prototypes demonstrate the ability to leverage AI to rapidly validate product-market fit across different domains (EdTech and Accessibility) while implementing sophisticated full-stack features including authentication, database design, responsive UI, and domain-specific workflows.',
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
    featured: false,
    order: 4,
    projectLinks: [
      {
        name: 'CodeCraft Academy',
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
      '**Multi-Language MCP Server Architecture:** The MCP Server exposes seven tools providing end-to-end Code Lab creation automation. The system generates structured LAB_OPPORTUNITY.md from learning objectives, scaffolds complete project infrastructure with test runners and customer reporters, and produces validated exercises with comprehensive test coverage. The modular approach enables rapid iteration across multiple instructional design phases.\n\n**Language-Agnostic Adapter Pattern:** A language adapter pattern enables automatic detection and framework selection. TypeScript projects automatically receive Vitest setup with TSQuery for AST validation. C# projects get xUnit with Roslyn-based code analysis through custom CodeLab.Validator tool. This architecture supports current languages (TypeScript, C#) while remaining extensible for Python, Go, and Java.\n\n**Comprehensive Test Generation & Validation:** The create_lab_from_opportunity tool bulk-generates all steps with markdown content, test files, and solution templates. Each validation step provides actionable feedback messages to learners, with a comprehensive test suite covering unit. This ensures consistent quality and learner experience across all supported languages.',
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
    order: 1,
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
      '**Custom Claude Code Commands & Automation:** The custom slash commands automated creation of step branches, markdown content generation, and test file scaffolding. Each command integrated with curriculum outline to maintain consistency with approved learning objectives while adhering to Pluralsight style guidelines.\n\n**AST-Based Code Validation:** AST-based validation using TSQuery enabled precise code pattern matching. Tests verified barrel file structure, export syntax, and import path optimization without relying on brittle string matching. Clear error messages guided learners toward correct implementation patterns.\n\n **AI Consistency Through Configuration:** The CLAUDE.md configuration file served as persistent context ensuring Claude Code followed specific workflow patterns, naming conventions, and quality standards. This approach demonstrated how AI tools can be effectively constrained to maintain consistency across multi-step content development while accelerating production timelines.',
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
    order: 2,
    liveUrl:
      'https://app.pluralsight.com/code-labs/contents/03dc3a20-f895-432d-8fc5-f9bb1f66a224/learn',
  },
  {
    id: 'react-testing-lab',
    title: 'React Testing Hands-on Code Lab',
    category: 'learning-experiences',
    story:
      'Developed a comprehensive hands-on Code Lab that guides learners through React Testing Library best practices using accessibility-first query strategies. Progressive exercises cover component rendering, user event simulation, async operations, and accessibility validation, emphasizing testing user behavior over implementation details. Incorporates real-world testing scenarios with form interactions, API mocking, and state management validation to build practical testing confidence',
    projectDetails:
      '**Accessibility-First Testing Philosophy**: Interactive Code Lab is structured around accessibility-first testing philosophy using React Testing Library query priority system. The learners progress through getByRole, getByLabelText, getByPlaceholderText, and getByText queries discovering how semantic HTML improves both accessibility and testability. The exercises reinforce testing from user perspective rather than implementation details, building maintainable test suites resilient to refactoring.\n\n**Real-World Testing Scenarios**: Practical exercises include testing form validation with user input simulation, async operations with API mocking using MSW (Mock Service Worker), and complex state management scenarios involving multiple user interactions. Each exercise provides immediate validation feedback through automated test runners with clear success/failure messages guiding learners toward correct implementations. The real-world component examples include authentication forms, data fetching components, and interactive UI elements.\n\n**Building Testing Confidence & Refactoring Resilience**: Code Lab emphasizes modern testing patterns including userEvent for realistic user interaction simulation over legacy fireEvent approach, waitFor utilities for handling async updates, and within queries for scoped element selection. Best practices covered include testing component behavior contracts, avoiding test implementation details like state or props, and writing tests that give confidence in code changes. The learners complete a lab and gain an understanding of how comprehensive test coverage enables confident refactoring and feature development.',
    technologies: [
      'React',
      'TypeScript',
      'Jest',
      'React Testing Library',
      'Vitest',
      'Instructional Design',
    ],
    featured: true,
    order: 3,
    liveUrl:
      'https://app.pluralsight.com/code-labs/contents/62a6025c-17b3-4d79-a28b-7ac116e8f038/learn',
  },
  {
    id: 'vue-reading-list',
    title: 'Vue.js Guided Project: Reading List Application with Forms',
    category: 'learning-experiences',
    story:
      'Designed a comprehensive Guided Project that builds upon introductory Vue.js concepts to teach advanced form handling through a practical reading list application. The progressive curriculum focuses on form composition, v-model two-way binding, user input validation, and list manipulation patterns. Content later converted to interactive Code Lab format by Pluralsight, demonstrating ability to create engaging, production-ready educational content that scales across learning formats',
    projectDetails:
      "**Progressive Curriculum Scaffolding**: Building on an introductory Guided Project where Vue.js fundamentals were established, this project expands learner knowledge through form-focused feature development. Learners build reading list applications managing book entries with title, author, and rating fields. Component composition lessons demonstrate single-file component architecture, reactive data management with Vue's data properties and methods, and computed properties for derived state calculations like filtered book lists and reading statistics.\n\n**Building Interactive Forms with Reactive Patterns**: Form handling curriculum covers v-model two-way binding patterns for text inputs, number inputs, and select dropdowns. Validation logic includes required field checks, input length constraints, and rating range validation with real-time user feedback. Event handling lessons teach form submission, list item deletion, and editing existing entries. State management patterns demonstrate lifting state up to parent components and props/events communication between child components maintaining unidirectional data flow.",
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
    id: 'interactive-portfolio',
    title: 'Interactive Portfolio - Agentic Development Showcase',
    category: 'ai-emerging-tech',
    story:
      'Built a professional portfolio application using agentic coding with Claude Code to demonstrate modern development workflows and AI-assisted development capabilities. The full-stack React application features dynamic filtering, professional recommendation showcase, and responsive design - all developed through iterative AI collaboration. Implemented comprehensive testing strategy, component-driven architecture, and accessibility-first patterns. Project serves dual purpose as both portfolio presentation and proof of concept for AI-assisted rapid application development.',
    projectDetails:
      '**Interactive Recommendation & Project Discovery**: The portfolio application showcases professional LinkedIn recommendations through interactive filtering system organizing feedback across skill categories including Technical Excellence, Collaboration & Leadership, Process Excellence, and Growth & Learning. Recommendation cards display context-aware skill tags with intelligent highlighting based on active filters. Search functionality with real-time word highlighting enables keyword discovery across recommendation text. Pagination and sorting controls provide efficient navigation through extensive professional feedback.\n\n**Development Through Agentic AI Collaboration**: The development process demonstrated end-to-end AI-assisted workflows: component architecture design with React, comprehensive accessibility-first patterns following WCAG guidelines, and production-grade testing with Vitest covering 140+ test cases. CSS Modules provide scoped styling with design system consistency while GitHub Actions enables continuous integration and deployment.\n\n**Proof of Concept for Modern Development Practices**: This project exemplifies how agentic AI collaboration streamlines full-stack development without sacrificing code quality or testing rigor. The combination of rapid prototyping, comprehensive testing, and accessibility compliance demonstrates that AI-assisted development can maintain professional standards while accelerating delivery timelines. The portfolio itself serves as both functional showcase and living documentation of modern development practices.',
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
    id: 'vue-tdd-automation',
    title: 'Vue TDD Automation - npm Package for Testing Workflows',
    category: 'developer-experience',
    story:
      'Created an npm package that removed friction from automated test-driven development workflows for Vue.js applications with GitHub integration. Developed an interactive CLI streamlines component, test generation, and issue-driven development following RED → GREEN → REFACTOR pattern. Enforces 80% code coverage thresholds and accessibility-first testing practices through pre-configured Vitest setup, Testing Library utilities, and GitHub Actions workflows. GitHub Copilot instructions enable AI-assisted test authoring while maintaining TDD methodology and Vue.js testing standards',
    projectDetails:
      '**Eliminating TDD Setup Friction**: The npm package provides a comprehensive CLI tool for automated TDD workflows in Vue.js 3 projects. Interactive prompts guide developers through component creation, composable generation, and accessibility-focused test scaffolding. Vitest configuration includes coverage thresholds, watch mode, and UI integration for optimal developer experience.\n\n**Issue-Driven Development & Team Standards**: The GitHub Actions integration enables issue-driven development with automatic branch creation and test generation from issue requirements. Pre-configured Copilot instructions assist developers in writing tests that follow Testing Library best practices and accessibility patterns. Templates enforce structured feature requests maintaining consistency across development teams.\n\n**Enforcing Quality While Enabling Speed**: The testing utilities covered components, composables, and accessibility scenarios with built-in helpers for Vue Test Utils and Testing Library patterns. Enforces 80% code coverage across statements, branches, functions, and lines. The documentation includes Vue.js testing standards compliance guide and TDD methodology training resources demonstrating systematic approach to quality assurance.',
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
    featured: false,
    order: 5,
    liveUrl:
      'https://www.npmjs.com/package/@carolinappowers/vue-tdd-automation',
  },
  {
    id: 'custom-eslint-rules',
    title: 'Custom ESLint Rules (AST Parsing) at Articulate',
    category: 'internal-tools',
    story:
      'Engineered custom ESLint rules at Articulate using Abstract Syntax Tree parsing to scale code quality across multiple development teams and prevent recurring code quality issues. These rules detect anti-patterns, enforce architecture decisions, and validate implementation standards specific to learning platform requirements. The automated detection of high-risk patterns reduces code review overhead while maintaining consistent quality standards across multiple development teams. Integrated rules into CI/CD pipeline to provide immediate feedback and prevent problematic code from reaching production',
    projectDetails:
      '**Scaling Quality Across Teams**: Custom ESLint rules enforce architectural patterns specific to learning platform development including proper error boundary implementation, accessibility compliance in interactive course components, and state management best practices. Rules detect anti-patterns like synchronous XHR requests blocking course progression, improper React lifecycle method usage causing memory leaks, and missing ARIA labels in assessment interactions. Automated detection catches issues during development before code review reducing feedback cycles and preventing production incidents affecting learner experience.\n\n**AST Parsing Implementation**: AST parsing implementation traverses JavaScript and TypeScript syntax trees using ESLint API examining node types, properties, and relationships. Rules analyze import statements detecting circular dependencies, function declarations validating naming conventions, and JSX elements ensuring proper prop types and accessibility attributes. Comprehensive test suites validate rule behavior across edge cases using ESLint RuleTester with fixture files covering valid and invalid code scenarios. Clear error messages guide developers toward correct implementations with code examples and documentation links.\n\n**Immediate Developer Feedback & Prevention**: Integration into CI/CD pipeline provides immediate feedback through pre-commit hooks and pull request checks preventing problematic code from merging. Team adoption accelerated through documentation including rule rationale, examples of violations, and migration guides for existing code. Rules evolved based on team retrospectives and production incident analysis continuously improving code quality standards. Success measured through reduced code review time, decreased production bugs related to detected patterns, and improved developer confidence in architectural decisions.',
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
      '**Migration to Modern Testing Patterns**: Migration from Enzyme to React Testing Library addressed mounting technical debt accumulated through deprecated testing patterns and shallow rendering limitations. Systematic refactoring replaced enzyme-specific APIs with accessibility-first queries matching user interaction patterns. Migration guides documented query priority system (getByRole, getByLabelText, getByText) with before/after code examples demonstrating improved test maintainability. Shared testing utilities provided reusable helpers for common patterns including form interactions, async operations, and accessibility assertions reducing boilerplate across test files. Automated codemods assisted with mechanical transformations while manual review ensured semantic correctness.\n\n**Cypress Adoption & Technical Leadership**: Cypress evaluation included technical spike comparing Cypress against existing Selenium-based E2E framework assessing developer experience, test reliability, and CI/CD integration capabilities. Prototype test suite covered critical user workflows including authentication flows, course enrollment, and assessment submission demonstrating Cypress advantages in debugging with time-travel, automatic waiting, and network stubbing. Presentation to engineering leadership included cost-benefit analysis, migration strategy, and maintenance projections supporting adoption decision. Implementation roadmap phased Cypress introduction alongside existing framework minimizing disruption during transition period.\n\n**Team Enablement & Measurable Impact**: Team adoption accelerated through comprehensive documentation including testing philosophy guides, practical examples repository, and recorded training sessions. Office hours provided hands-on support for complex testing scenarios building team confidence in new approaches. Success metrics tracked test execution time improvements (40% faster CI/CD pipelines), reduced flakiness (85% fewer intermittent failures), and developer satisfaction surveys showing increased confidence in refactoring and feature development. Modern testing infrastructure positioned team for continued velocity improvements and quality assurance reliability.',
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
