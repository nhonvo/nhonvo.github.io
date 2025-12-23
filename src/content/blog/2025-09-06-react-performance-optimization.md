---
title: "React Performance Optimization"
description: "Master techniques to identify and solve performance bottlenecks in React using memoization, code splitting, and virtualization."
pubDate: "9 6 2025"
published: true
tags:
  [
    "React",
    "JavaScript",
    "Front-End",
    "Performance Optimization",
    "Memoization",
    "Code Splitting",
    "Web Development",
    "Software Architecture",
  ]
---

## Mind Map Summary

- **Goal**: Prevent unnecessary re-renders to maintain a smooth 60fps UI.
- **The Problem**: By default, React re-renders a component if its parent re-renders, regardless of whether its own props changed.
- **Core Optimization Tools**:
  - **`React.memo()` (For Components)**: Prevents a component from re-rendering if its props are shallowly equal.
  - **`useMemo()` (For Values)**: Caches the result of an expensive calculation.
  - **`useCallback()` (For Functions)**: Caches a function definition to maintain referential equality across renders.
- **Architectural Techniques**:
  - **Code Splitting (`React.lazy` & `Suspense`)**: Load components only when needed.
  - **List Virtualization (`react-window`)**: Render only the visible rows in a large dataset.
  - **State Colocation**: Keep state as close as possible to where it's used to limit re-render scope.

## Core Concepts

### 1. Understanding Unnecessary Re-renders

The key to React performance is referential equality. If a component's render function is slow, you must avoid running it unless data has actually changed. A common pitfall is the "re-render cascade" where a top-level state change (like a theme toggle) triggers a re-render of every child in the application.

### 2. `React.memo()`

This is an HOC (Higher-Order Component) that performs a shallow comparison of props. If the props are identical, React skips the render phase for that component.

```jsx
const UserProfile = React.memo(({ user }) => {
  return <div>{user.name}</div>;
});
```

### 3. `useCallback()` vs. `useMemo()`

- **`useCallback`** is used when you need to pass a function to a child component that is wrapped in `React.memo`. Without `useCallback`, the function is recreated on every render, causing the child's `React.memo` to fail.
- **`useMemo`** is for expensive computations (e.g., sorting a 10,000-item list). It caches the result and only re-runs the logic when dependencies change.

## Practice Exercise

Given a component with an expensive calculation, use `useMemo` to ensure that toggling a UI theme doesn't trigger the slow calculation again.

## Answer

### 1. The Bottleneck (Before Optimization)

```jsx
import React, { useState } from "react";

const expensiveCalculation = (num) => {
  console.log("Calculating...");
  for (let i = 0; i < 1000000000; i++) {
    /* Block thread */
  }
  return num * 2;
};

export default function Calculator() {
  const [count, setCount] = useState(1);
  const [darkMode, setDarkMode] = useState(false);

  // Slows down the entire app, even when just toggling darkMode!
  const calculationResult = expensiveCalculation(count);

  return (
    <div className={darkMode ? "dark" : "light"}>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <p>Result: {calculationResult}</p>
      <button onClick={() => setDarkMode(!darkMode)}>Toggle Theme</button>
    </div>
  );
}
```

### 2. The Solution (With `useMemo`)

```jsx
import React, { useState, useMemo } from "react";

export default function OptimizedCalculator() {
  const [count, setCount] = useState(1);
  const [darkMode, setDarkMode] = useState(false);

  // Now, toggling theme is instant because the calculation is cached.
  const calculationResult = useMemo(() => {
    return expensiveCalculation(count);
  }, [count]);

  return (
    <div className={darkMode ? "dark" : "light"}>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <p>Result: {calculationResult}</p>
      <button onClick={() => setDarkMode(!darkMode)}>Toggle Theme</button>
    </div>
  );
}
```

### How to Verify Fixes

1.  **React DevTools (Profiler)**: Record a session. Check the "Why did this render?" section.
2.  **Chrome Performance Tab**: Look for long "Scripting" tasks (Long Tasks).
3.  **Lighthouse**: Check the "Total Blocking Time" (TBT) score.

### Summary

Optimization should be **intentional**. Overusing `useMemo` and `useCallback` adds complexity and can occasionally be slower due to memory overhead and dependency checks. Always **measure first** using the React Profiler before adding optimizations.
