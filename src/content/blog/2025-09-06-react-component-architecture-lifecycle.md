---
title: "React Component Architecture & Lifecycle"
description: "Master the difference between functional and class components, and understand the modern lifecycle via Hooks."
pubDate: "9 6 2025"
published: true
tags:
  [
    "React",
    "JavaScript",
    "Front-End",
    "Web Development",
    "Component Design",
    "Hooks",
    "Software Architecture",
  ]
---

## Mind Map Summary

- **React Component**: A reusable, self-contained piece of UI.
  - **Props (Properties)**
    - **What**: Data passed **down** from a parent to a child.
    - **Analogy**: Arguments to a function.
    - **Rule**: Read-only (immutable).
  - **State**
    - **What**: Data managed **inside** a component.
    - **Analogy**: Variables declared inside a function.
    - **Rule**: Mutable via `setState`. Changes trigger a re-render.
- **Component Types**
  - **Functional Components (Modern Standard)**: Plain JS functions returning JSX. State/Lifecycle managed via **Hooks**.
  - **Class Components (Legacy)**: ES6 classes extending `React.Component`. Uses `this.state` and lifecycle methods.
- **Component Lifecycle (with Hooks)**
  - **1. Mounting**: Created and inserted into DOM. `useEffect(() => {}, [])`.
  - **2. Updating**: Re-renders due to props/state changes. `useEffect(() => {}, [deps])`.
  - **3. Unmounting**: Removed from DOM. Cleanup function: `return () => { ... }`.

## Core Concepts

### 1. Props vs. State

This is the most fundamental concept in React.

- **Props** (Properties) are for passing data from a parent component to a child. The data flow is one-way and immutable from the child's perspective.
- **State** is for data that is local and private to a component. It's used for data that changes over time, usually in response to user interaction. When state changes, React automatically re-renders the component.

### 2. Functional vs. Class Components

- **Class Components**: Original way to create stateful components. Uses `render()`, `this.state`, and methods like `componentDidMount()`.
- **Functional Components**: The modern standard. Simpler, more concise, and highly testable. With **Hooks**, functional components can handle complex state and side effects.

### 3. The Component Lifecycle with `useEffect`

The `useEffect` Hook replaces nearly all class lifecycle methods:

- **Mounting**: To run logic once after the first render (like `componentDidMount`), use an empty dependency array `[]`.
- **Updating**: To run logic when specific data changes, include those variables in the dependency array `[propA, stateB]`.
- **Unmounting**: To clean up resources (like timers or subscriptions), return a function from your effect.

## Practice Exercise

Create a reusable `Modal` component that manages its `isOpen` state internally but accepts its content via the `children` prop.

## Answer

### 1. The Reusable `Modal` Component

```jsx
import React, { useState } from "react";

// Props:
// - buttonText: Label for the toggle button.
// - children: The content to be displayed inside.
export default function Modal({ buttonText, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <div className="modal-wrapper">
      <button onClick={toggleModal}>{buttonText}</button>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={toggleModal} className="close-btn">
              Close
            </button>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
```

### 2. Implementation in Parent (`App.jsx`)

```jsx
import React from "react";
import Modal from "./Modal";

export default function App() {
  return (
    <main>
      <h1>React Component Architecture</h1>

      <Modal buttonText="Open Login Form">
        <h2>Welcome Back</h2>
        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Sign In</button>
        </form>
      </Modal>

      <Modal buttonText="View Privacy Policy">
        <h2>Privacy Policy</h2>
        <p>Your data is safe with us. We do not sell user data.</p>
      </Modal>
    </main>
  );
}
```

### Key Takeaways

1.  **Composition**: By using the `children` prop, the `Modal` is agnostic of its content, making it highly reusable.
2.  **Encapsulation**: The parent component (`App`) doesn't need to know how the modal opens or closes; it only provides the trigger label and the inner content.
3.  **Declarative UI**: Instead of manually hiding/showing DOM elements, we conditionally render the modal content based on the `isOpen` state (`isOpen && ...`).
