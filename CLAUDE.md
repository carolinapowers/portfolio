# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Interactive Portfolio Experience - Development Guide

## Project Overview

A clean, focused portfolio application that showcases software engineering skills through an interactive content creation experience. Built to demonstrate React expertise, modern development practices, and attention to detail.

## Key Features

- **Skill Categorization**: Dynamic filtering and smart display
- **Recommendation Analysis**: Professional LinkedIn testimonials
- **Learning Focus**: Growth mindset and skill development emphasis
- **Content Extraction**: AI-powered skill extraction from text
- **Responsive Design**: Mobile-first with modern UI

## Technology Stack

### Core (Keep It Simple)

- **React 18** with TypeScript
- **Vite** for fast development and building
- **CSS Modules** for scoped styling
- **Apollo Client** with local mocks
- **Radix UI** for accessible components

### Development Tools

- **ESLint** + Prettier for code quality
- **React Testing Library** + Jest for component testing
- **Storybook** (optional, if time permits)
- **Playwright** for basic E2E testing

### Deployment

- **Vercel** or **Netlify** for instant deployment

## Simple Project Structure

```
interactive-portfolio/
├── src/
│   ├── components/
│   │   ├── RichTextEditor/
│   │   │   ├── RichTextEditor.tsx
│   │   │   ├── RichTextEditor.test.tsx
│   │   │   ├── Toolbar.tsx
│   │   │   ├── Toolbar.test.tsx
│   │   │   └── RichTextEditor.module.css
│   │   ├── RecommendationCard/
│   │   │   ├── RecommendationCard.tsx
│   │   │   ├── RecommendationCard.test.tsx
│   │   │   └── RecommendationCard.module.css
│   │   ├── BrainstormingSpace/
│   │   │   ├── BrainstormingSpace.tsx
│   │   │   ├── BrainstormingSpace.test.tsx
│   │   │   └── BrainstormingSpace.module.css
│   │   ├── AIAssistant/
│   │   │   ├── AIAssistant.tsx
│   │   │   ├── AIAssistant.test.tsx
│   │   │   └── AIAssistant.module.css
│   │   └── Layout/
│   │       ├── Layout.tsx
│   │       ├── Layout.test.tsx
│   │       └── Layout.module.css
│   ├── hooks/
│   │   ├── useEditor.ts
│   │   ├── useEditor.test.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useLocalStorage.test.ts
│   │   └── useApollo.ts
│   ├── apollo/
│   │   ├── client.ts
│   │   ├── mocks.ts
│   │   └── queries.ts
│   ├── data/
│   │   └── mockData.ts
│   ├── styles/
│   │   ├── globals.css
│   │   └── variables.css
│   ├── App.tsx
│   ├── App.test.tsx
│   └── main.tsx
├── public/
├── index.html
├── vite.config.ts
├── vitest.config.ts
├── tsconfig.json
├── package.json
├── claude.md
└── README.md

```

## Development Plan (Simplified)

### Phase 1: Setup (15 minutes)

```bash
# Initialize project (super fast!)
npm create vite@latest interactive-portfolio -- --template react-ts
cd interactive-portfolio

# Install dependencies
npm install @apollo/client graphql
npm install @radix-ui/react-dialog @radix-ui/react-select
npm install lucide-react clsx

# Testing dependencies
npm install -D @testing-library/react @testing-library/jest-dom
npm install -D @testing-library/user-event vitest jsdom
npm install -D @types/node

# Dev dependencies
npm install -D eslint-config-prettier prettier

# Start development
npm run dev

```

### Phase 2: Core Components (3-4 hours)

### Rich Text Editor (1.5 hours)

- ContentEditable component with ref management
- Toolbar with bold/italic/link buttons
- Character counting
- Auto-save to localStorage
- Keyboard shortcuts (Ctrl+B, Ctrl+I)

### Apollo Setup (30 minutes)

- Simple client configuration
- Mock data for recommendations
- Local state management
- Basic queries and mutations

### Main Layout (2 hours)

- Responsive grid layout
- Recommendation cards
- Brainstorming sticky notes
- AI suggestions panel

### Phase 3: Polish & Deploy (1-2 hours)

- Responsive design refinements
- Loading states and animations
- Deploy to Vercel
- Final testing

## Key Implementation Details

### Simple Rich Text Editor

```tsx
// src/components/RichTextEditor/RichTextEditor.tsx
import React, { useRef, useCallback, useEffect } from 'react';
import { useEditor } from '../../hooks/useEditor';
import { Toolbar } from './Toolbar';
import styles from './RichTextEditor.module.css';

export const RichTextEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const { content, setContent, formatText, characterCount } = useEditor();

  const handleInput = useCallback(
    (e: React.FormEvent) => {
      const text = e.currentTarget.textContent || '';
      setContent(text);
    },
    [setContent]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'b':
            e.preventDefault();
            formatText('bold');
            break;
          case 'i':
            e.preventDefault();
            formatText('italic');
            break;
        }
      }
    },
    [formatText]
  );

  return (
    <div className={styles.editor}>
      <Toolbar onFormat={formatText} />
      <div
        ref={editorRef}
        className={styles.content}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        placeholder="Start brainstorming your thoughts..."
      />
      <div className={styles.footer}>
        <span className={characterCount > 250 ? styles.warning : ''}>
          {characterCount}/280 characters
        </span>
        <span className={styles.saved}>✓ Auto-saved</span>
      </div>
    </div>
  );
};
```

### Example Component Test (Colocated)

```tsx
// src/components/RichTextEditor/RichTextEditor.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RichTextEditor } from './RichTextEditor';

describe('RichTextEditor', () => {
  it('renders with placeholder text', () => {
    render(<RichTextEditor />);
    expect(
      screen.getByText('Start brainstorming your thoughts...')
    ).toBeInTheDocument();
  });

  it('updates character count when typing', async () => {
    const user = userEvent.setup();
    render(<RichTextEditor />);

    const editor = screen.getByRole('textbox');
    await user.type(editor, 'Hello world');

    expect(screen.getByText('11/280 characters')).toBeInTheDocument();
  });

  it('shows warning when character limit exceeded', async () => {
    const user = userEvent.setup();
    render(<RichTextEditor />);

    const editor = screen.getByRole('textbox');
    const longText = 'a'.repeat(281);
    await user.type(editor, longText);

    const charCount = screen.getByText('281/280 characters');
    expect(charCount).toHaveClass('warning');
  });

  it('handles keyboard shortcuts', async () => {
    const user = userEvent.setup();
    render(<RichTextEditor />);

    const editor = screen.getByRole('textbox');
    await user.click(editor);

    // Test Ctrl+B for bold
    await user.keyboard('{Control>}b{/Control}');
    expect(screen.getByLabelText('Bold')).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });

  it('saves content automatically', async () => {
    render(<RichTextEditor />);
    expect(screen.getByText('✓ Auto-saved')).toBeInTheDocument();
  });
});
```

### Example Hook Test (Colocated)

```tsx
// src/hooks/useLocalStorage.test.ts
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  it('updates localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(localStorage.getItem('test-key')).toBe('"updated"');
  });

  it('retrieves value from localStorage on mount', () => {
    localStorage.setItem('test-key', '"stored-value"');

    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    expect(result.current[0]).toBe('stored-value');
  });

  it('handles localStorage errors gracefully', () => {
    // Mock localStorage to throw error
    const mockSetItem = vi.spyOn(Storage.prototype, 'setItem');
    mockSetItem.mockImplementation(() => {
      throw new Error('localStorage error');
    });

    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    act(() => {
      result.current[1]('new-value');
    });

    // Should not throw error
    expect(result.current[0]).toBe('new-value');

    mockSetItem.mockRestore();
  });
});
```

### Example Apollo Component Test

```tsx
// src/components/RecommendationCard/RecommendationCard.test.tsx
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { RecommendationCard } from './RecommendationCard';

const mockRecommendation = {
  id: '1',
  name: 'John Doe',
  title: 'Senior Engineer',
  company: 'TechCorp',
  avatar: 'JD',
  text: 'Great developer with excellent skills.',
  skills: ['React', 'TypeScript', 'GraphQL'],
};

describe('RecommendationCard', () => {
  it('renders recommendation data correctly', () => {
    render(
      <MockedProvider>
        <RecommendationCard recommendation={mockRecommendation} />
      </MockedProvider>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Senior Engineer @ TechCorp')).toBeInTheDocument();
    expect(
      screen.getByText('Great developer with excellent skills.')
    ).toBeInTheDocument();
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders skill tags', () => {
    render(
      <MockedProvider>
        <RecommendationCard recommendation={mockRecommendation} />
      </MockedProvider>
    );

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('GraphQL')).toBeInTheDocument();
  });
});
```

````

### Simple Apollo Setup
```typescript
// src/apollo/client.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { mockResolvers } from './mocks';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  resolvers: mockResolvers,
  typeDefs: `
    type Recommendation {
      id: ID!
      name: String!
      title: String!
      company: String!
      text: String!
      skills: [String!]!
    }

    type Query {
      recommendations: [Recommendation!]!
    }
  `,
});

// Initialize cache with data
client.writeQuery({
  query: GET_RECOMMENDATIONS,
  data: {
    recommendations: mockRecommendations,
  },
});

````

### Local Storage Integration

```tsx
// src/hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue] as const;
}
```

## Vite Configuration (Simple)

```tsx
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
```

## Vitest Configuration

```tsx
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

## Test Setup

```tsx
// src/test/setup.ts
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
```

## CSS Modules Setup

```tsx
// src/vite-env.d.ts (add this for CSS modules typing)
/// <reference types="vite/client" />
/// <reference types="vitest/globals" />

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
```

## Quick Commands

```bash
# Development
npm run dev              # Start dev server (super fast!)
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint

# Testing
npm run test             # Run all tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage
npm run test:ui          # Run tests with Vitest UI

# Deployment
npm run build && npx vercel --prod  # Deploy to Vercel

# Optional
npm run storybook        # If time permits
npm run test:e2e         # Basic Playwright tests

```

## Package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix"
  }
}
```

## Time Estimation (Realistic with Vite + Testing)

- **Setup**: 20 minutes (including test setup)
- **Rich Text Editor**: 2 hours (including tests)
- **Main Components**: 2.5 hours (including tests)
- **Apollo Integration**: 45 minutes (including mocks)
- **Styling & Polish**: 45 minutes
- **Deployment**: 10 minutes
- **Total**: 6 hours

## Success Criteria (Focused)

- ✅ Working rich text editor with formatting
- ✅ Apollo Client integration (shows you understand their stack)
- ✅ Comprehensive test coverage with colocated tests
- ✅ Responsive design
- ✅ Clean, professional code
- ✅ Fast deployment with Vite
- ✅ Demonstrates React + TypeScript expertise

## What This Still Showcases

- **Modern React patterns** (hooks, functional components)
- **TypeScript proficiency** (proper typing throughout)
- **Apollo Client knowledge** (relevant for GraphQL implementations)
- **Component architecture** (clean, reusable components)
- **CSS Modules** (scoped styling approach)
- **Testing best practices** (colocated tests, React Testing Library)
- **Modern tooling** (Vite + Vitest shows you stay current)
- **Performance considerations** (Vite's optimization)

## Testing Strategy Benefits

- **Colocated tests** - Shows you understand component organization
- **React Testing Library** - Industry standard for React testing
- **Component isolation** - Tests focus on behavior, not implementation
- **Hook testing** - Demonstrates understanding of custom hook patterns
- **Apollo testing** - Shows you can test GraphQL integrations
- **Coverage reporting** - Professional approach to code quality

## React Testing Library Query Priority Rules

**MANDATORY**: All React Testing Library tests MUST follow the accessibility-focused query priority guide:

### **Priority 1: Accessible to Everyone**

1. `getByRole()` - Primary choice for interactive elements
2. `getByLabelText()` - Form elements with labels
3. `getByPlaceholderText()` - Form inputs with placeholders
4. `getByText()` - Non-interactive text content
5. `getByDisplayValue()` - Form elements with current values

### **Priority 2: Semantic Queries**

6. `getByAltText()` - Images with alt text
7. `getByTitle()` - Elements with title attributes

### **Priority 3: Test IDs (Last Resort)**

8. `getByTestId()` - Only when semantic queries aren't possible

### **Examples of Good vs Bad Queries**

```typescript
// ❌ BAD: Using test IDs unnecessarily
expect(screen.getByTestId('submit-button')).toBeInTheDocument();

// ✅ GOOD: Using semantic role
expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();

// ❌ BAD: Generic text query
expect(screen.getByText('Email')).toBeInTheDocument();

// ✅ GOOD: Accessible form query
expect(screen.getByLabelText('Email address')).toBeInTheDocument();

// ❌ BAD: CSS selector or class name
expect(screen.getByClassName('nav-link')).toBeInTheDocument();

// ✅ GOOD: Navigation role and accessible name
expect(screen.getByRole('navigation')).toContain(
  screen.getByRole('link', { name: 'Home' })
);
```

### **Testing Benefits**

- Tests reflect how users actually interact with the app
- Catches accessibility issues during development
- More robust tests that don't break with CSS changes
- Encourages proper semantic HTML and ARIA usage

**All test failures due to inaccessible markup should be fixed by improving the component accessibility, not by using worse queries.**

## Slash Commands

### `/rtl-queries` - React Testing Library Query Priority Guide

Enforce accessibility-first testing approach with proper query selection:

**Priority 1: Accessible to Everyone (Use First)**

1. `getByRole()` - Interactive elements, landmarks, headings
2. `getByLabelText()` - Form controls with associated labels
3. `getByPlaceholderText()` - Form inputs with placeholder text
4. `getByText()` - Non-interactive text content, buttons with text
5. `getByDisplayValue()` - Form inputs/textareas with current values

**Priority 2: Semantic Queries (Use When Priority 1 Unavailable)** 6. `getByAltText()` - Images and areas with alt attributes 7. `getByTitle()` - Elements with title attributes

**Priority 3: Test IDs (Last Resort Only)** 8. `getByTestId()` - When no semantic query is possible

**Quick Decision Tree:**

- Interactive element? → `getByRole()`
- Form field? → `getByLabelText()` or `getByPlaceholderText()`
- Text content? → `getByText()`
- Image? → `getByAltText()`
- Nothing else works? → `getByTestId()` (but consider improving markup first)

**Remember:** Tests should reflect how users interact with your app, not implementation details.

### `/add-rtl-tests` - Generate React Testing Library Tests

Generate comprehensive RTL tests for React components following accessibility-first query priorities:

**Usage:** `/add-rtl-tests ComponentName [file-path]`

**What it generates:**

- Component test file with `.test.tsx` extension (colocated)
- Accessibility-first queries following RTL priority guide
- Common test scenarios (rendering, user interactions, accessibility)
- Proper test structure with describe/it blocks
- Mock setup for props and dependencies
- User event testing with `@testing-library/user-event`

**Test scenarios included:**

- Basic rendering with semantic queries
- User interactions (clicks, typing, form submissions)
- Accessibility features (ARIA attributes, roles, labels)
- State changes and prop updates
- Error states and edge cases
- Keyboard navigation and screen reader support

**Example output structure:**

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders with accessible content', () => {
    render(<ComponentName />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('handles user interactions', async () => {
    const user = userEvent.setup();
    render(<ComponentName />);

    const button = screen.getByRole('button', { name: 'Submit' });
    await user.click(button);

    expect(screen.getByRole('alert')).toHaveTextContent('Success');
  });
});
```

**Automatically follows RTL query priorities:**

1. `getByRole()` for interactive elements
2. `getByLabelText()` for form controls
3. `getByText()` for content
4. Only uses `getByTestId()` when semantic queries aren't possible

This approach is much more realistic for a same-day build while still demonstrating strong technical skills. The focus is on quality implementation rather than over-engineering.

# Segment Analytics Implementation Plan

## Overview

This plan outlines implementing Segment analytics tracking in the React/TypeScript portfolio to capture user interactions and behavioral data. The implementation will use the modern `@segment/analytics-react` package for optimal React integration.

## Prerequisites

- Segment account (free tier supports 1,000 monthly visitors)
- Write key from Segment source configuration
- Existing React 18 + TypeScript + Vite setup (✅ already in place)

## Implementation Strategy

### Phase 1: Basic Setup (15-30 minutes)

1. **Install Dependencies**

   ```bash
   npm install @segment/analytics-react @segment/analytics-next
   ```

2. **Environment Configuration**
   - Add `VITE_SEGMENT_WRITE_KEY` to `.env` file
   - Update `.env.example` with the new variable
   - Ensure `.env` is in `.gitignore`

3. **Provider Setup**
   - Wrap main App component with `AnalyticsProvider`
   - Initialize Segment client with write key
   - Configure for development vs production environments

### Phase 2: Core Tracking Implementation (30-45 minutes)

#### Page View Tracking

- Implement automatic page view tracking for navigation
- Track route changes and section transitions
- Capture page metadata (title, path, referrer)

#### User Identification

- Track anonymous users by default
- Optional: Add user identification for returning visitors
- Capture basic user traits (device, browser, location)

### Phase 3: Feature-Specific Event Tracking (45-60 minutes)

#### Rich Text Editor Events

- **Text Input Tracking**
  - Character count milestones (100, 500, 1000+ characters)
  - Formatting usage (bold, italic, underline, links)
  - Auto-save triggers
  - Content clear/reset actions

- **Editor Interactions**
  - Toolbar button clicks
  - Keyboard shortcut usage
  - Focus/blur events with session duration

#### Brainstorming Space Events

- **Sticky Note Actions**
  - Note creation with color selection
  - Note editing and text updates
  - Note deletion
  - Drag and drop positioning
  - Color changes

- **Workspace Interactions**
  - Workspace clearing
  - Bulk note operations
  - Session duration in brainstorming mode

#### Navigation & Engagement

- **Section Transitions**
  - Time spent in each portfolio section
  - Scroll depth tracking
  - Navigation method (menu, scroll, direct)

- **Recommendation Interactions**
  - LinkedIn recommendation card views
  - Skill tag clicks
  - Recommendation filtering/sorting

### Phase 4: Advanced Analytics (30-45 minutes)

#### Custom Properties

- **User Context**
  - Device type (mobile, tablet, desktop)
  - Browser and OS information
  - Screen resolution and viewport size
  - Geographic location (if permitted)

- **Session Properties**
  - Session duration
  - Pages per session
  - Return visitor vs new visitor
  - Traffic source and referrer

#### Performance Metrics

- **User Experience**
  - Time to first interaction
  - Feature adoption rates
  - Error tracking and recovery
  - Accessibility feature usage

## Technical Implementation Details

### File Structure

```
src/
├── analytics/
│   ├── index.ts              # Main analytics exports
│   ├── client.ts             # Segment client configuration
│   ├── events.ts             # Event definitions and types
│   ├── hooks/
│   │   ├── usePageTracking.ts    # Page view tracking hook
│   │   ├── useEditorTracking.ts  # Rich text editor tracking
│   │   └── useBrainstormTracking.ts # Brainstorm space tracking
│   └── utils/
│       ├── eventHelpers.ts   # Event utility functions
│       └── userTraits.ts     # User trait collection
```

### TypeScript Interfaces

```typescript
// Event property interfaces
interface EditorEvent {
  action: 'format' | 'input' | 'save' | 'clear';
  characterCount: number;
  formatType?: 'bold' | 'italic' | 'underline' | 'link';
  sessionDuration: number;
}

interface BrainstormEvent {
  action: 'create' | 'edit' | 'delete' | 'move' | 'color_change';
  noteId: string;
  color: string;
  position?: { x: number; y: number };
  noteCount: number;
}

interface NavigationEvent {
  section: string;
  previousSection?: string;
  timeSpent: number;
  scrollDepth: number;
}
```

### Key Components to Modify

1. **Main App Component** - Add AnalyticsProvider wrapper
2. **RichTextEditor Components** - Add editor event tracking
3. **BrainstormingSpace Components** - Add sticky note tracking
4. **Navigation Components** - Add section transition tracking
5. **RecommendationCard Components** - Add interaction tracking

### Event Naming Convention

Use consistent, descriptive event names:

- `page_viewed` - For page/section views
- `editor_text_formatted` - For text formatting actions
- `brainstorm_note_created` - For sticky note creation
- `recommendation_viewed` - For recommendation card interactions
- `session_started` / `session_ended` - For session tracking

## Testing & Validation

### Development Testing

- Use Segment debugger to verify events in real-time
- Test all interactive elements and user flows
- Validate event properties and user traits
- Ensure no PII (personally identifiable information) is collected

### Quality Assurance

- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Mobile responsiveness testing
- Performance impact assessment
- Error handling and fallback scenarios

## Privacy & Compliance

### Data Collection Guidelines

- Collect only necessary behavioral data
- Respect user privacy preferences
- Implement opt-out mechanisms if required
- Follow GDPR/CCPA guidelines for data handling

### Data Retention

- Configure appropriate data retention policies in Segment
- Document what data is collected and why
- Ensure compliance with privacy policies

## Deployment Strategy

### Environment Configuration

- **Development**: Use test Segment source
- **Staging**: Use production Segment source with debug mode
- **Production**: Full production tracking with error monitoring

### Rollout Plan

1. Deploy with analytics disabled initially
2. Enable basic page tracking first
3. Gradually enable feature-specific tracking
4. Monitor for performance impact and errors

## Success Metrics

### Implementation Success

- All planned events firing correctly
- No performance degradation
- Clean event data in Segment debugger
- Successful data flow to destination tools

### Analytics Insights Goals

- Understand user engagement patterns
- Identify most-used portfolio features
- Track user journey through portfolio sections
- Measure content effectiveness and user retention

## Maintenance & Monitoring

### Ongoing Tasks

- Regular review of event data quality
- Update tracking as new features are added
- Monitor Segment MTU usage (free tier: 1,000/month)
- Performance impact assessment

### Analytics Review Schedule

- Weekly: Event data quality check
- Monthly: User behavior analysis
- Quarterly: Tracking strategy review and optimization

## Resources & Documentation

### Segment Resources

- [Analytics React Documentation](https://segment.com/docs/connections/sources/catalog/libraries/website/react/)
- [Event Tracking Best Practices](https://segment.com/docs/protocols/tracking-plan/best-practices/)
- [Segment Debugger Guide](https://segment.com/docs/connections/find-writekey/#debugging)

### Implementation References

- TypeScript integration examples
- React hooks for analytics
- Event naming conventions
- Privacy-compliant tracking patterns

---

## Ready for Implementation

This plan provides a comprehensive roadmap for implementing Segment analytics in the portfolio. The phased approach allows for incremental implementation and testing, ensuring a robust and privacy-compliant analytics solution.

**Estimated Total Implementation Time: 2.5-3 hours**
**Maintenance Time: 30 minutes/month**
