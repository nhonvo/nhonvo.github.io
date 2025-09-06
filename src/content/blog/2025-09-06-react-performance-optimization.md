---
title: "React Performance Optimization"
description: "Discuss common performance bottlenecks in React and how to solve them. Explain concepts like memoization (React.memo), useCallback, useMemo, and code splitting."
pubDate: "Sep 06 2025"
published: true
tags: ["Front-End: ReactJS"]
---

### Mind Map Summary

- **Goal**: Make React apps faster by preventing unnecessary re-renders.
- **The Problem**: By default, a React component re-renders if its parent re-renders, or if its own state or props change. This can lead to slow performance if complex components are re-rendering when they don't need to.
- **Key Optimization Hooks & Techniques**
  - **`React.memo()` (For Components)**
    - **What**: A Higher-Order Component (HOC) that memoizes a component.
    - **How**: It prevents a component from re-rendering if its props have not changed.
    - **Use Case**: Wrap "pure" components that always render the same output for the same props.
  - **`useMemo()` (For Values)**
    - **What**: A Hook that memoizes the result of an expensive calculation.
    - **How**: It re-calculates the value only when one of its dependencies has changed.
    - **Use Case**: To avoid re-running slow, computationally heavy functions on every render.
  - **`useCallback()` (For Functions)**
    - **What**: A Hook that memoizes a function definition.
    - **How**: It returns the same function instance between renders as long as its dependencies haven't changed.
    - **Use Case**: To prevent unnecessary re-renders of child components that are wrapped in `React.memo` and receive functions as props.
- **Other Major Techniques**
  - **Code Splitting (`React.lazy` & `Suspense`)**: Splits your app into smaller chunks that are loaded on demand, improving initial load time.
  - **List Virtualization (`react-window`)**: For long lists, this technique only renders the items currently visible on the screen, drastically improving performance.

### Core Concepts

#### 1. Understanding Unnecessary Re-renders
The key to React performance is understanding that re-rendering is not free. If a component's render function is slow (e.g., it performs a complex calculation or renders a deep tree of other components), you want to avoid running it unless absolutely necessary. A common performance issue arises when a parent component's state changes, causing it to re-render, which in turn causes all of its children to re-render by default, even if their props haven't changed.

#### 2. `React.memo()`
This is your first line of defense against unnecessary re-renders. You wrap a component in `React.memo`, and it will perform a shallow comparison of its props. If the props are the same as the last render, React will skip re-rendering the component and reuse the last rendered result.

```jsx
const MyComponent = React.memo(function MyComponent(props) {
  /* render logic */
});
```

#### 3. `useCallback()`
`React.memo` works great for primitive props like strings and numbers, but it can be defeated by object or function props. In JavaScript, `() => {}` is not equal to `() => {}`; a new function is created on every render. If you pass a function as a prop to a memoized component, it will still re-render every time because it's receiving a "new" prop.

`useCallback` solves this. It tells React, "Don't recreate this function on every render. Give me back the same function instance as last time, unless one of its dependencies has changed."

```jsx
const memoizedCallback = useCallback(
  () => { doSomething(a, b); },
  [a, b], // Only recreate the function if a or b changes
);
```

#### 4. `useMemo()`
This hook is for optimizing expensive calculations, not for preventing re-renders directly. Imagine a function that filters a large list, which is a slow operation. If you call this function inside your component, it will re-run on every single render. `useMemo` lets you cache the result of this calculation. It will only re-run the expensive function if one of its dependencies changes.

```jsx
const expensiveResult = useMemo(
  () => computeExpensiveValue(a, b),
  [a, b], // Only re-compute if a or b changes
);
```

### Practice Exercise

Given a slow-rendering React component with an expensive calculation, use `useMemo` to optimize it. Profile the component using React DevTools before and after to demonstrate the performance improvement.

### Answer

#### Code Example

**1. The "Slow" Component (Before Optimization)**

```jsx
import React, { useState } from 'react';

// A deliberately slow function
const expensiveCalculation = (num) => {
  console.log('Performing expensive calculation...');
  for (let i = 0; i < 1000000000; i++) { /* busy wait */ }
  return num * 2;
};

export default function Calculator() {
  const [count, setCount] = useState(1);
  const [theme, setTheme] = useState('light');

  // This will re-run on EVERY render, even when only the theme changes.
  const calculation = expensiveCalculation(count);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <div style={{ background: theme === 'light' ? '#fff' : '#333' }}>
      <button onClick={() => setCount(c => c + 1)}>Increment Count</button>
      <h2>Count: {count}</h2>
      <h2>Calculation Result: {calculation}</h2>
      <hr />
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

**2. The "Optimized" Component (Using `useMemo`)**

```jsx
import React, { useState, useMemo } from 'react';

// ... same expensiveCalculation function ...

export default function Calculator() {
  const [count, setCount] = useState(1);
  const [theme, setTheme] = useState('light');

  // useMemo will cache the result. 
  // The expensive function only re-runs when 'count' changes.
  const calculation = useMemo(() => {
    return expensiveCalculation(count);
  }, [count]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    // ... same JSX ...
  );
}
```

#### How to Profile and See the Difference

1.  **Install React DevTools**: Get the extension for your browser.
2.  **Open the Profiler**: Open your web app, open the browser DevTools, and go to the "Profiler" tab.
3.  **Profile the "Slow" Component**:
    -   Click the "Record" button in the Profiler.
    -   Click the "Toggle Theme" button in your app a few times.
    -   Click "Stop" in the Profiler.
    -   You will see that each render took a very long time (e.g., >500ms) because `expensiveCalculation` was running every time, even though only the theme was changing.
4.  **Profile the "Optimized" Component**:
    -   Switch to the optimized code.
    -   Record a new profile.
    -   Click the "Toggle Theme" button again.
    -   Stop the recording.
    -   You will now see that the renders caused by toggling the theme are extremely fast (e.g., <5ms). The Profiler will show that the component did not have to re-run the expensive calculation. It will only run when you click the "Increment Count" button.

This demonstrates that `useMemo` successfully cached or "memoized" the expensive result, preventing the unnecessary and slow re-calculation on every render.