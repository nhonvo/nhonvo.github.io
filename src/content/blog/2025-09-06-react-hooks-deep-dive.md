---
title: "React Hooks Deep Dive"
description: "Master useState, useEffect, useContext, and useReducer. Understand the rules of Hooks and performance optimization with memoization."
pubDate: "9 6 2025"
published: true
tags:
  [
    "React",
    "JavaScript",
    "Front-End",
    "Hooks",
    "Web Development",
    "Functional Programming",
    "State Management",
    "Performance Optimization",
  ]
---

## Mind Map Summary

- **React Hooks**: Functions that let you use state and other React features in functional components.
- **Rules of Hooks**:
  1.  Only call Hooks at the **top level** (not in loops, conditions, or nested functions).
  2.  Only call Hooks from **React function components** or custom Hooks.
- **State Hooks**:
  - **`useState`**: Basic hook for local state. Returns `[state, setState]`.
  - **`useReducer`**: For complex state logic. Follows the Redux-style reducer pattern.
- **Effect Hook**:
  - **`useEffect`**: Handles side effects (API calls, subscriptions, DOM manipulation). Replaces class lifecycle methods.
- **Context Hook**:
  - **`useContext`**: Consumes context data without wrapper components.
- **Performance Hooks**:
  - **`useCallback`**: Memoizes a function instance to prevent unnecessary re-renders in children.
  - **`useMemo`**: Memoizes the result of an expensive calculation.

## Core Concepts

### 1. `useState`

`useState` allows components to persist data between renders. When `setState` is called, React schedules a re-render of that component and its children.

```javascript
const [count, setCount] = useState(0);
```

### 2. `useEffect`

The "dependency array" (second argument) determines when the effect runs:

- `[]`: Runs once on mount.
- `[propA, stateB]`: Runs on mount and when `propA` or `stateB` changes.
- **No array**: Runs after _every_ render (avoid unless necessary).
- **Cleanup**: Returning a function from `useEffect` cleans up resources (e.g., `clearInterval`) when the component unmounts or before the effect re-runs.

### 3. `useContext`

Simplifies data sharing across the tree. Instead of "prop drilling" (passing props through intermediate components that don't need them), you wrap a section of your app in a `Provider` and use `useContext` to pull the data directly where needed.

### 4. `useReducer`

Preferred over `useState` when state transitions are complex or depend on the previous state. It centralizes logic into a single `reducer` function, making it easier to test and debug.

## Practice Exercise

Refactor a class component that uses lifecycle methods (`componentDidMount`, `componentDidUpdate`) into a functional component using Hooks.

## Answer

### The Legacy Class Component

```jsx
class GitHubUser extends React.Component {
  state = { user: null, loading: true };

  fetchData = () => {
    this.setState({ loading: true });
    fetch(`https://api.github.com/users/${this.props.username}`)
      .then((res) => res.json())
      .then((user) => this.setState({ user, loading: false }));
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.username !== this.props.username) {
      this.fetchData();
    }
  }

  render() {
    if (this.state.loading) return <p>Loading...</p>;
    return <h1>{this.state.user.name}</h1>;
  }
}
```

### The Modern Functional Component (Refactored)

```jsx
import React, { useState, useEffect } from "react";

function GitHubUser({ username }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [username]); // Automatically handles both mount and update

  if (loading) return <p>Loading...</p>;
  return <h1>{user?.name || "User not found"}</h1>;
}
```

### Why Reach for Hooks?

1.  **Unification**: `useEffect` handles mount and update logic in one place, reducing code duplication.
2.  **Readability**: Logic is grouped by "what it does" rather than metadata about the lifecycle.
3.  **No `this`**: You avoid common `this` binding issues and the verbosity of class structures.
