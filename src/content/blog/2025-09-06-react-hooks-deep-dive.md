---
title: "React Hooks Deep Dive"
description: "Explain the purpose and usage of useState, useEffect, useContext, and useReducer. Discuss the rules of Hooks."
pubDate: "Sep 06 2025"
published: true
tags: ["Front-End: ReactJS"]
---

### Mind Map Summary

- **React Hooks**: Functions that let you use state and other React features in functional components.
  - **Rules of Hooks**
    1.  Only call Hooks at the **top level** (not in loops, conditions, or nested functions).
    2.  Only call Hooks from **React function components** or custom Hooks.
  - **State Hooks**
    - **`useState`**: The basic hook for adding state to a component. Returns `[currentState, setState]`. 
    - **`useReducer`**: An alternative for managing more complex state logic, especially when the next state depends on the previous one. `const [state, dispatch] = useReducer(reducer, initialState);`
  - **Effect Hooks**
    - **`useEffect`**: For handling side effects (data fetching, subscriptions, DOM manipulation). It replaces `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`.
  - **Context Hooks**
    - **`useContext`**: Subscribes to React context to read a value without using a `Context.Consumer`, avoiding wrapper hell.
  - **Performance Hooks**
    - **`useCallback`**: Memoizes a *function*. Returns the same function instance between renders if its dependencies haven't changed. Prevents unnecessary re-renders of child components.
    - **`useMemo`**: Memoizes a *value*. Re-runs an expensive calculation only when its dependencies have changed.

### Core Concepts

#### 1. `useState`
This is the most fundamental hook. It allows a functional component to hold its own local state. You call it with an initial state value, and it returns an array containing two elements: the current state value, and a function to update that value. When you call the update function, React re-renders the component with the new state.
`const [count, setCount] = useState(0);`

#### 2. `useEffect`
This hook is the solution for all side effects. The function you pass to `useEffect` will run after the component renders. The second argument is a "dependency array," which controls *when* the effect runs.
- `useEffect(fn, [])`: Runs **once** after the initial render (like `componentDidMount`).
- `useEffect(fn, [dep1, dep2])`: Runs after the initial render, and then again **only if** `dep1` or `dep2` has changed since the last render (like `componentDidUpdate`).
- `useEffect(fn)`: (No dependency array) Runs after **every** render. Use with caution.
- **Cleanup**: If you return a function from your effect, React will run it when the component unmounts or before the effect runs again. This is crucial for preventing memory leaks from subscriptions or timers.

#### 3. `useContext`
This hook makes consuming context much cleaner. Context is React's way of passing data deep down the component tree without having to manually pass props through every level. Before `useContext`, you had to wrap your component in a `<MyContext.Consumer>`. Now, you can just call `const value = useContext(MyContext);` to get the value directly.

#### 4. `useReducer`
For components with complex state logic, `useState` can become cumbersome. `useReducer` is borrowed from the Redux pattern. You provide a `reducer` function that takes the current `state` and an `action` object and returns the new state. You then dispatch actions to update the state. This is great for managing state transitions and when the next state depends heavily on the previous one.

### Practice Exercise

Refactor a class component that uses lifecycle methods (`componentDidMount`, `componentDidUpdate`) and state into a functional component using `useState` and `useEffect` hooks.

### Answer

Let's refactor a component that fetches data about a specific GitHub user and updates when the username prop changes.

#### "Before" Code: The Class Component

```jsx
import React from 'react';

class GitHubUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true,
    };
  }

  fetchUserData = () => {
    this.setState({ loading: true });
    fetch(`https://api.github.com/users/${this.props.username}`)
      .then(res => res.json())
      .then(user => this.setState({ user, loading: false }));
  }

  // Runs once after the component mounts
  componentDidMount() {
    this.fetchUserData();
  }

  // Runs whenever props are updated
  componentDidUpdate(prevProps) {
    // We must check if the prop actually changed to avoid an infinite loop!
    if (prevProps.username !== this.props.username) {
      this.fetchUserData();
    }
  }

  render() {
    const { user, loading } = this.state;
    if (loading) return <p>Loading...</p>;
    return <h1>{user.name}</h1>;
  }
}
```

#### "After" Code: The Functional Component with Hooks

```jsx
import React, { useState, useEffect } from 'react';

function GitHubUser({ username }) {
  // 1. useState replaces the constructor and this.state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. useEffect replaces componentDidMount and componentDidUpdate
  useEffect(() => {
    setLoading(true);
    fetch(`https://api.github.com/users/${username}`)
      .then(res => res.json())
      .then(user => {
        setUser(user);
        setLoading(false);
      });
  }, [username]); // 3. The dependency array

  if (loading) return <p>Loading...</p>;
  return <h1>{user.name}</h1>;
}
```

#### Explanation of the Refactoring

1.  **State Management**: Instead of a constructor and `this.state`, we use two separate `useState` calls for `user` and `loading`. This makes the state logic more granular and easier to read.

2.  **Lifecycle Unification**: The `useEffect` hook elegantly replaces *both* `componentDidMount` and `componentDidUpdate`. The logic for fetching data is now in one place.

3.  **Dependency Array**: The dependency array `[username]` is the key to making this work. It tells React: "Run this effect after the first render, and then re-run it *only if* the `username` prop has changed since the last render." This single line achieves the same goal as the `if (prevProps.username !== this.props.username)` check in `componentDidUpdate`, but in a much more declarative and less error-prone way.

The resulting functional component is more concise, easier to read, and less prone to bugs (like forgetting the `if` check in `componentDidUpdate`).