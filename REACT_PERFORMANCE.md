# React Performance Best Practices

## Core Principles

- **Minimize wasted renders**: Component code runs on every render, even if DOM doesn't update
- **Fix parent components first**: Children re-render when parents do
- **Prefer primitives**: Use strings, numbers, booleans over objects when possible
- **Measure before optimizing**: Use React DevTools Profiler to identify actual bottlenecks

## Quick Authoring Checklist

- [ ] Keep props small and explicit - avoid prop spreading
- [ ] Prefer primitives over objects/arrays for props
- [ ] No inline objects or arrays in JSX
- [ ] No inline functions in JSX (use useCallback)
- [ ] Add stable, semantic `key` props to lists
- [ ] Avoid prop drilling through unnecessary components
- [ ] Split contexts by update frequency
- [ ] Memoize only measured hotspots
- [ ] Add ESLint rules to prevent regressions

## Common Anti-Patterns & Solutions

### ❌ Inline Objects
```tsx
// Bad: Creates new object every render
<Card style={{ width: 200, padding: 10 }} />

// Good: Stable reference
const cardStyle = useMemo(() => ({ width: 200, padding: 10 }), []);
<Card style={cardStyle} />

// Better: Use constants for static values
const CARD_STYLE = { width: 200, padding: 10 } as const;
<Card style={CARD_STYLE} />
```

### ❌ Inline Functions
```tsx
// Bad: Creates new function every render
<Button onClick={() => handleClick(id)}>Click</Button>

// Good: Stable callback
const handleButtonClick = useCallback(() => handleClick(id), [id]);
<Button onClick={handleButtonClick}>Click</Button>
```

### ❌ Inline Arrays
```tsx
// Bad: New array every render
<List items={[1, 2, 3]} />

// Good: Memoized array
const items = useMemo(() => [1, 2, 3], []);
<List items={items} />

// Better: Constant for static arrays
const ITEMS = [1, 2, 3] as const;
<List items={ITEMS} />
```

### ❌ Prop Spreading
```tsx
// Bad: Spreads all properties, harder to track
<Component {...apiResponse} />

// Good: Explicit props
<Component 
  name={apiResponse.name} 
  age={apiResponse.age}
  email={apiResponse.email}
/>
```

### ❌ Array Index as Key
```tsx
// Bad: Unstable keys cause re-mounts
{items.map((item, index) => (
  <Item key={index} {...item} />
))}

// Good: Stable, unique identifier
{items.map(item => (
  <Item key={item.id} {...item} />
))}
```

## Optimization Hooks

### useCallback - Stable Function Identity
```tsx
// Use for event handlers and dependencies
const handleSubmit = useCallback((data: FormData) => {
  api.submit(data);
}, []); // Empty deps for functions that don't use props/state

const handleDelete = useCallback((id: string) => {
  api.delete(id);
  setItems(prev => prev.filter(item => item.id !== id));
}, []); // setItems is stable, no need in deps
```

### useMemo - Cache Expensive Computations
```tsx
// Use for expensive calculations
const sortedItems = useMemo(() => 
  items.sort((a, b) => b.score - a.score),
  [items]
);

// Use for stable object references
const contextValue = useMemo(() => ({
  user,
  settings,
  updateSettings
}), [user, settings, updateSettings]);
```

### React.memo - Skip Re-renders
```tsx
// Basic memo for components with primitive props
const Card = React.memo(function Card({ title, count }: CardProps) {
  return (
    <div>
      <h3>{title}</h3>
      <span>{count}</span>
    </div>
  );
});

// Custom comparison for complex props (use sparingly)
const DataGrid = React.memo(function DataGrid({ data, config }) {
  return <Grid data={data} config={config} />;
}, (prevProps, nextProps) => {
  // Return true if props are equal (skip render)
  return (
    prevProps.data.length === nextProps.data.length &&
    prevProps.config.sortBy === nextProps.config.sortBy
  );
});
```

## Context Best Practices

### Split by Update Frequency
```tsx
// Bad: Single context with everything
const AppContext = { user, theme, notifications, scrollPosition };

// Good: Separate contexts
const UserContext = { user };           // Changes rarely
const ThemeContext = { theme };         // Changes rarely  
const UIContext = { scrollPosition };   // Changes frequently
```

### Optimize Context Consumers
```tsx
// Bad: Whole component re-renders on any context change
function Profile() {
  const { user, notifications } = useContext(AppContext);
  return <div>{user.name}</div>; // Only uses user!
}

// Good: Only subscribes to needed data
function Profile() {
  const { user } = useContext(UserContext);
  return <div>{user.name}</div>;
}
```

## TypeScript Patterns for Performance

### Readonly Props
```tsx
interface Props {
  readonly title: string;
  readonly items: ReadonlyArray<Item>;
  readonly config: Readonly<Config>;
}
```

### Const Assertions for Stable References
```tsx
// Stable configuration objects
const DEFAULT_CONFIG = {
  pageSize: 20,
  sortBy: 'date',
  direction: 'desc'
} as const;

// Stable style objects
const STYLES = {
  container: { display: 'flex', gap: 16 },
  card: { padding: 20, borderRadius: 8 }
} as const;
```

### Discriminated Unions for Props
```tsx
// Instead of optional object props
type Props = 
  | { mode: 'view'; data: Data }
  | { mode: 'edit'; data: Data; onChange: (data: Data) => void }
  | { mode: 'create'; onCreate: (data: Data) => void };
```

## Component Patterns

### Container/Presentational Split
```tsx
// Container handles logic and state
function TodoListContainer() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const handleToggle = useCallback((id: string) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  }, []);
  
  return <TodoList todos={todos} onToggle={handleToggle} />;
}

// Presentational component is pure and memoizable
const TodoList = React.memo(function TodoList({ todos, onToggle }) {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </ul>
  );
});
```

### Compound Components for Flexibility
```tsx
// Parent manages shared state
function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const value = useMemo(() => ({ activeTab, setActiveTab }), [activeTab]);
  
  return (
    <TabsContext.Provider value={value}>
      {children}
    </TabsContext.Provider>
  );
}

// Children are independently memoizable
const TabList = React.memo(function TabList({ children }) {
  return <div role="tablist">{children}</div>;
});

const TabPanel = React.memo(function TabPanel({ children, name }) {
  const { activeTab } = useContext(TabsContext);
  if (activeTab !== name) return null;
  return <div role="tabpanel">{children}</div>;
});
```

## State Management Patterns

### Colocate State Near Usage
```tsx
// Bad: State at top level when only one component uses it
function App() {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <>
      <Header />
      <SearchBar term={searchTerm} onTermChange={setSearchTerm} />
      <Content />
    </>
  );
}

// Good: State where it's used
function App() {
  return (
    <>
      <Header />
      <SearchBar /> {/* Manages its own searchTerm state */}
      <Content />
    </>
  );
}
```

### Use State Reducers for Complex Updates
```tsx
// Instead of multiple useState calls that trigger multiple renders
function useComplexState() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  // Batch multiple updates in one render
  const updateMultiple = useCallback((updates) => {
    dispatch({ type: 'BATCH_UPDATE', payload: updates });
  }, []);
  
  return [state, updateMultiple];
}
```

## Measuring Performance

### React DevTools Profiler
1. Open React DevTools → Profiler tab
2. Click record and interact with your app
3. Stop recording and analyze:
   - **Ranked view**: Shows components by render time
   - **Flamegraph**: Shows component tree and render duration
   - **Check "Record why each component rendered"** for detailed info

### Custom Performance Marks
```tsx
function ExpensiveComponent() {
  useEffect(() => {
    performance.mark('ExpensiveComponent-start');
    
    // Expensive operation
    const result = calculateExpensiveValue();
    
    performance.mark('ExpensiveComponent-end');
    performance.measure(
      'ExpensiveComponent',
      'ExpensiveComponent-start',
      'ExpensiveComponent-end'
    );
  }, []);
}
```

### why-did-you-render (Development Only)
```tsx
// Setup in development
if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackHooks: true,
  });
}

// Track specific component
MyComponent.whyDidYouRender = true;
```

## Performance Debugging Workflow

1. **Profile First**: Use React DevTools to identify actual bottlenecks
2. **Fix Parent Churn**: Stop unnecessary parent re-renders first
3. **Stabilize References**: Use useCallback and useMemo for stable props
4. **Reduce Prop Surface**: Remove spreads, split contexts
5. **Isolate Heavy Components**: Apply React.memo to expensive children
6. **Re-measure**: Verify improvements and keep minimal changes

## ESLint Rules for Performance

Add these to your `.eslintrc.json`:

```json
{
  "rules": {
    "react/jsx-no-bind": ["warn", {
      "allowArrowFunctions": false,
      "allowFunctions": false,
      "allowBind": false,
      "ignoreDOMComponents": true
    }],
    "react/jsx-props-no-spreading": ["warn", {
      "html": "enforce",
      "custom": "enforce",
      "explicitSpread": "enforce"
    }],
    "react/no-array-index-key": "error",
    "react/jsx-key": ["error", {
      "checkFragmentShorthand": true,
      "checkKeyMustBeforeSpread": true
    }],
    "react/no-unstable-nested-components": ["error", {
      "allowAsProps": false
    }],
    "react/jsx-no-constructed-context-values": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/rules-of-hooks": "error"
  }
}
```

## Quick Reference Card

### When to Use Each Hook
- **useState**: Local component state
- **useReducer**: Complex state logic, multiple sub-values
- **useCallback**: Stable function identity for child props
- **useMemo**: Expensive calculations, stable object/array references
- **useEffect**: Side effects, subscriptions, DOM manipulation
- **useLayoutEffect**: DOM measurements before paint
- **useRef**: DOM references, mutable values that don't trigger renders

### Red Flags in Code Review
- 🚩 Inline arrow functions in JSX
- 🚩 Inline object/array literals in props
- 🚩 Prop spreading into components
- 🚩 Array index as key
- 🚩 Large objects in context
- 🚩 Missing dependencies in hooks
- 🚩 State that could be derived
- 🚩 Effects that could be event handlers

### Performance Quick Wins
- ✅ Extract static values outside components
- ✅ Split large contexts into smaller ones
- ✅ Move state closer to where it's used
- ✅ Use primitive props when possible
- ✅ Batch state updates with reducers
- ✅ Lazy load heavy components
- ✅ Virtualize long lists

## Testing Performance Optimizations

```tsx
// Test that memoization works
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

test('memoized component skips re-render', () => {
  const renderSpy = vi.fn();
  
  const MemoChild = React.memo(function Child({ value }) {
    renderSpy();
    return <div>{value}</div>;
  });
  
  const { rerender } = render(<MemoChild value="test" />);
  expect(renderSpy).toHaveBeenCalledTimes(1);
  
  // Same props, should skip render
  rerender(<MemoChild value="test" />);
  expect(renderSpy).toHaveBeenCalledTimes(1);
  
  // Different props, should re-render
  rerender(<MemoChild value="changed" />);
  expect(renderSpy).toHaveBeenCalledTimes(2);
});
```

## Additional Resources

- [React DevTools Profiler](https://react.dev/learn/react-developer-tools)
- [React Performance Documentation](https://react.dev/reference/react)
- [Web.dev React Performance](https://web.dev/react/)
- [React Rendering Behavior](https://blog.isquaredsoftware.com/2020/05/blogged-answers-a-mostly-complete-guide-to-react-rendering-behavior/)