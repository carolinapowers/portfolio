# React Lean Optimization Playbook

> Objective: reduce wasted renders and keep component trees shallow so the UI stays responsive under real interaction.

## 1) Lean component design principles
- Optimize for effectiveness first, then efficiency. Once the product is right, build the thing right.
- Primary goals
  - Fewer commits. Every commit phase risks re-render work.
  - Shallower trees. Reconciliation cost grows with depth.
- Tactics
  - Decouple expensive children from frequently updated owners.
  - Prefer predictable data flow and clear state boundaries.
  - Favor reuse that shrinks total bundle and cognitive load.

---

## 2) Owners vs parents + slots to control re-renders
A child re-renders with its **owner**, not its visual parent. Use slots to lift ownership of expensive parts.

**Without slots** (SearchBar owned by `Header`, updates to `Header` re-render it):

```tsx
function Header() {
  return (
    <header>
      <Logo />
      <SearchBar /> {/* owned by Header */}
    </header>
  );
}
```

**With a slot** (SearchBar owned by `App`, updates to `Header` do not touch it):

```tsx
type HeaderProps = { children?: React.ReactNode };

function Header({ children }: HeaderProps) {
  return <header><Logo />{children}</header>;
}

function App() {
  const search = <SearchBar />; // owned here
  return <Header>{search}</Header>;
}
```

**Optional stabilization of JSX** if `App` re-renders often:

```tsx
function App() {
  const search = React.useMemo(() => <SearchBar />, []);
  return <Header>{search}</Header>;
}
```

Checklist
- Move expensive children to be owned by a stable ancestor.
- Pass them through slots instead of nested creation inside the owner.
- Memoize slot content only if profiling shows churn.

---

## 3) Styling choices and performance tradeoffs
| Approach | Re-render risk | Reconciliation cost | Dev ergonomics | Footprint |
|---|---|---|---|---|
| Inline `style={{...}}` objects | High unless extracted | Medium | Simple for one-offs | Neutral |
| Global CSS or pre/post processors | Low | Low | Requires discipline | Good |
| CSS Modules | Low | Low | Some indirection | Good |
| CSS-in-JS component wrappers | Medium to High | Higher due to extra nodes and runtime | Feels React-like | Varies |
| Atomic CSS (Tailwind class utilities) | Low | Low | Learning curve | Excellent |

Guidance
- For large apps, prefer CSS Modules or Atomic CSS for low runtime cost.
- Use CSS-in-JS when theming and dynamic styles outweigh cost.
- Keep component trees shallow. Avoid style wrappers that add nodes in hot paths.

---

## 4) Taming hooks with shared state and query hooks
**Problem**: scattered `useState` and `useEffect` produce churn and duplication.

**Shared state via Zustand-like store**

```tsx
import { create } from "zustand";

type Todo = { id: string; title: string; done: boolean; projectId: string };
type Store = {
  activeProjectId: string;
  todosByProject: Record<string, Record<string, Todo>>;
  addTodo: (pId: string, t: Omit<Todo, "id">) => void;
};

export const useTodoStore = create<Store>((set, get) => ({
  activeProjectId: "inbox",
  todosByProject: {},
  addTodo: (projectId, todo) =>
    set(state => {
      const byId = state.todosByProject[projectId] ?? {};
      const id = crypto.randomUUID();
      byId[id] = { ...todo, id, projectId };
      return { todosByProject: { ...state.todosByProject, [projectId]: byId } };
    })
}));

// Component subscribes to a small slice only
function LeftNav() {
  const projects = useTodoStore(s => Object.entries(s.todosByProject)
    .map(([pid, map]) => ({ pid, count: Object.keys(map).length })));
  return <nav>{projects.map(p => <div key={p.pid}>{p.pid} ({p.count})</div>)}</nav>;
}
```

**Query hook pattern** to centralize and cache async work

```tsx
function useUser(id: string) {
  const queryKey = ["user", id];
  return useQuery({ queryKey, queryFn: () => fetch(`/api/users/${id}`).then(r => r.json()) });
}
```

Benefits
- Components subscribe to minimal slices which cuts re-renders.
- Async concerns live in hooks, not components.

---

## 5) Isolating updates with render props
Render props can sandbox a subtree so owner updates do not cascade.

```tsx
type BoxProps<T> = { value: T; children: (v: T) => React.ReactNode };

function Box<T>({ value, children }: BoxProps<T>) {
  // Box re-renders when value changes, but children subtree is owned here
  return <>{children(value)}</>;
}

function Owner({ count }: { count: number }) {
  // HeavyThing is isolated inside Box
  return (
    <Box value={count}>
      {v => <HeavyThing count={v} />}
    </Box>
  );
}
```

Compare with hooks-only solutions that force you to create wrapper components and then memoize them. Render props can be simpler and shallower for isolation.

---

## 6) Consolidate local state with `useReducer`
Replace many `useState` calls with a single reducer for predictable updates.

```tsx
type Address = { name: string; city: string; promo?: string };
type Action =
  | { type: "update"; field: keyof Address; value: string }
  | { type: "applyPromo"; code: string };

function reducer(state: Address, action: Action): Address {
  switch (action.type) {
    case "update": return { ...state, [action.field]: action.value };
    case "applyPromo": return { ...state, promo: action.code.trim() };
    default: return state;
  }
}

function CheckoutAddress() {
  const [addr, dispatch] = React.useReducer(reducer, { name: "", city: "" });
  return (
    <>
      <input value={addr.name} onChange={e => dispatch({ type: "update", field: "name", value: e.target.value })} />
      <input value={addr.city} onChange={e => dispatch({ type: "update", field: "city", value: e.target.value })} />
    </>
  );
}
```

Benefits
- Fewer hooks and fewer commits.
- Clear sync point for async workflows: do async work, then `dispatch` a result.

---

## 7) Derived state, selectors, and slicing for O(1) reads
Avoid repeated O(N) scans. Store data in lookup maps that match usage.

```tsx
// Before: O(N) to get todos for a project
type StateA = { todos: Array<Todo> };

// After: O(1) by project and by id
type StateB = {
  todosByProject: Record<string, Record<string, Todo>>;
  todosById: Record<string, Todo>;
};
```

Selector example

```tsx
const selectProjectSummary = (s: StateB) =>
  Object.entries(s.todosByProject).map(([pid, byId]) => ({ pid, count: Object.keys(byId).length }));

const selectTodosForActive = (s: StateB) => s.todosByProject[s.activeProjectId] ?? {};
```

Memoized selectors with Reselect-style composition keep heavy transforms from repeating across components.

---

## 8) Reduce DOM updates with `useRef` and controlled vs uncontrolled
Controlled inputs are predictable but may re-render on every keystroke. For extreme cases like rich text, use refs to bypass React updates.

```tsx
function RichText({ initialHtml, onChange }: { initialHtml: string; onChange: (html: string) => void }) {
  const ref = React.useRef<HTMLDivElement>(null);

  // sync initial content once
  React.useEffect(() => {
    if (ref.current) ref.current.innerHTML = initialHtml;
  }, [initialHtml]);

  const handleInput = () => {
    if (ref.current) onChange(ref.current.innerHTML);
  };

  return <div ref={ref} contentEditable onInput={handleInput} />;
}
```

Caution
- Sanitize HTML input to avoid XSS.
- Uncontrolled patterns trade maintainability for speed. Use only where profiling demands it.

---

## 9) Prioritize input with Suspense-friendly APIs
Mark heavy updates as non-urgent so typing stays snappy.

**useDeferredValue**

```tsx
function Search() {
  const [query, setQuery] = React.useState("");
  const deferred = React.useDeferredValue(query); // trails behind during typing
  const results = useSearchResults(deferred);
  return <Input value={query} onChange={e => setQuery(e.target.value)} results={results} />;
}
```

**useTransition**

```tsx
const [isPending, startTransition] = React.useTransition();

function onRouteChange(next: string) {
  startTransition(() => setRoute(next)); // mark as non-urgent
}
```

---

## 10) Practical micro-optimizations
Avoid new object identities in hot paths.

```tsx
// Bad: new objects each render
<div style={{ marginTop: 8 }} onClick={() => doThing(id)} />;

// Better
const style = { marginTop: 8 };
const onClick = React.useCallback(() => doThing(id), [id]);
<div style={style} onClick={onClick} />;
```

Stable dependency arrays

```tsx
const opts = React.useMemo(() => ({ limit: 20, sort: "desc" as const }), []);
useEffect(() => { fetchData(opts); }, [opts]);
```

Prefer `React.memo` for pure leaf components that receive stable props.

---

## 11) Tooling guardrails
Recommended ESLint rules
- `react/jsx-no-bind` with smart exceptions for event handlers.
- `react-hooks/exhaustive-deps` to keep effects predictable.
- `react/no-array-index-key` to keep list diffing stable.
- `@typescript-eslint/consistent-type-imports` to ensure type-only imports do not affect bundles.
- `@typescript-eslint/no-misused-promises` and `promise/no-multiple-resolved` for async safety.
- `import/no-default-export` in component libraries to aid tree shaking.

Helpful TS patterns
- Prefer `type` exports with `export type { Foo }` or `import type { Foo }`.
- Model props as `Readonly<...>` and literal options as `as const`.
- Use discriminated unions for component modes to avoid invalid prop combos.

---

## Quick checklist
- Can I move expensive children to be owned by a stable ancestor via slots
- Are any hot paths creating new objects or inline functions each render
- Is state shaped for O(1) reads with selectors instead of repeated scans
- Should local state be consolidated with a reducer
- Can a render prop isolate a subtree better than hook wrappers
- Is my styling approach adding avoidable depth or runtime work
- Would `useDeferredValue` or `useTransition` improve perceived input latency

