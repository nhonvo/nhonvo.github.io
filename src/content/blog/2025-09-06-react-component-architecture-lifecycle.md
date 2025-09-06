---
title: "React Component Architecture & Lifecycle"
description: "Explain the difference between functional and class components. Discuss the component lifecycle and the purpose of key lifecycle methods or their Hook equivalents (useEffect)."
pubDate: "Sep 06 2025"
published: true
tags: ["Front-End: ReactJS"]
---

### Mind Map Summary

- **React Component**: A reusable, self-contained piece of UI.
  - **Props (Properties)**
    - **What**: Data passed **down** from a parent to a child.
    - **Analogy**: Arguments to a function.
    - **Rule**: Read-only. A component cannot change its own props.
  - **State**
    - **What**: Data managed **inside** a component.
    - **Analogy**: Variables declared inside a function.
    - **Rule**: A component can change its own state. A state change triggers a re-render.
- **Component Types**
  - **Functional Components (Modern Standard)**
    - **What**: A plain JavaScript function that returns JSX.
    - **State & Lifecycle**: Managed with **Hooks** (e.g., `useState`, `useEffect`).
  - **Class Components (Legacy)**
    - **What**: An ES6 class that extends `React.Component`.
    - **State & Lifecycle**: Managed with `this.state` and lifecycle methods (e.g., `componentDidMount`).
- **Component Lifecycle (with Hooks)**
  - **1. Mounting**: Component is created and inserted into the DOM.
    - **Hook**: `useEffect(() => { ... }, [])` (empty dependency array) runs once, after the initial render.
  - **2. Updating**: Component re-renders due to a change in props or state.
    - **Hook**: `useEffect(() => { ... }, [someProp, someState])` runs after every render where `someProp` or `someState` has changed.
  - **3. Unmounting**: Component is removed from the DOM.
    - **Hook**: The **cleanup function** returned from `useEffect` runs when the component is unmounted. `useEffect(() => { return () => { /* cleanup logic */ } }, [])`.

### Core Concepts

#### 1. Props vs. State
This is the most fundamental concept in React. 
- **Props** (short for properties) are for passing data from a parent component to a child component. The data flow is one-way and immutable from the child's perspective. A child component should treat its props as read-only.
- **State** is for data that is local and private to a component. It's used for data that changes over time, usually in response to user interaction (like typing in a form or clicking a button). When a component's state changes, React will automatically re-render that component and its children to reflect the new state.

#### 2. Functional vs. Class Components
- **Class Components** were the original way to create stateful components in React. They use ES6 classes and have a `render()` method that returns the UI. State is managed in `this.state`, and lifecycle events are handled by specific methods like `componentDidMount()` and `componentDidUpdate()`.
- **Functional Components** are now the standard. They are simpler JavaScript functions. With the introduction of **Hooks**, functional components can now do everything class components could. `useState` is the Hook for managing state, and `useEffect` is the Hook for handling lifecycle events (or "side effects").

#### 3. The Component Lifecycle with `useEffect`
The `useEffect` Hook is a powerful tool that handles all side effects in a functional component. A "side effect" is anything that interacts with the world outside of React, such as fetching data from an API, setting up a subscription, or manually manipulating the DOM.

- **Running Once on Mount**: To run an effect only once after the component first renders (the equivalent of `componentDidMount`), you provide an empty dependency array `[]` as the second argument to `useEffect`. This is the perfect place to fetch initial data.
- **Running on Updates**: To run an effect whenever a specific piece of data changes, you include that data in the dependency array. `useEffect(myFunction, [propA, stateB])` will run `myFunction` whenever `propA` or `stateB` changes.
- **Cleaning Up on Unmount**: If your effect sets up something that needs to be cleaned up (like a timer or a WebSocket subscription), you can return a function from your effect. React will run this cleanup function when the component is removed from the DOM (unmounts) or before the effect runs again. This prevents memory leaks.

### Practice Exercise

Create a reusable React component (e.g., a data table or a modal) and pass props to it. Manage its state and handle events within the component.

### Answer

Here is an example of a reusable `Modal` component.

#### Code Example

**1. The Reusable `Modal` Component**

This component manages its own `isOpen` state but receives its content and a closing function via props.

```jsx
// Modal.jsx
import React, { useState } from 'react';

// Props: 
// - buttonText: The text for the button that opens the modal.
// - children: The content to be displayed inside the modal.
export default function Modal({ buttonText, children }) {
  // State: Manages whether the modal is open or closed.
  const [isOpen, setIsOpen] = useState(false);

  // Event Handlers
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // If the modal is not open, render nothing (or just the button).
  if (!isOpen) {
    return <button onClick={openModal}>{buttonText}</button>;
  }

  // If the modal is open, render the modal overlay and content.
  return (
    <>
      <button onClick={openModal}>{buttonText}</button>
      <div className="modal-overlay">
        <div className="modal-content">
          <button onClick={closeModal} className="close-btn">X</button>
          {children} {/* Render the content passed in as props */}
        </div>
      </div>
    </>
  );
}
```

**2. The Parent `App` Component**

This component uses the `Modal` and passes content into it.

```jsx
// App.jsx
import React from 'react';
import Modal from './Modal';

export default function App() {
  return (
    <div>
      <h1>My App</h1>
      
      {/* Use the Modal component */}
      <Modal buttonText="Open Login Form">
        {/* This content is passed as the 'children' prop to the Modal */}
        <h2>Login Form</h2>
        <p>Please enter your credentials.</p>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
      </Modal>

      <hr />

      <Modal buttonText="Show Terms and Conditions">
        <h2>Terms and Conditions</h2>
        <p>Here are the terms and conditions...</p>
      </Modal>
    </div>
  );
}
```

#### Explanation

1.  **Reusability**: The `Modal` component is highly reusable. It doesn't care *what* it displays; it only cares about the logic of opening and closing. We can use it for a login form, terms and conditions, or anything else.
2.  **Props**: The `App` component passes two props to `Modal`:
    -   `buttonText`: A simple string used to label the button.
    -   `children`: This is a special prop. Everything you put between the opening and closing `<Modal>` tags is automatically passed as the `children` prop. This is the standard way to pass JSX content to a container-like component.
3.  **State**: The `Modal` component defines its own piece of state: `isOpen`. This is internal to the `Modal` and is not visible to the `App` component. The `Modal` is in complete control of this state.
4.  **Events**: The `onClick` handlers for the buttons call `setIsOpen` to update the `Modal`'s internal state. This state change triggers a re-render, causing the modal to either appear or disappear.