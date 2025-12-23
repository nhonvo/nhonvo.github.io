---
title: "React Router & API Integration"
description: "How to implement client-side routing and handle the data fetching lifecycle in Single-Page Applications (SPAs)."
pubDate: "9 6 2025"
published: true
tags:
  [
    "React",
    "JavaScript",
    "Front-End",
    "React Router",
    "API Integration",
    "SPAs",
    "Web Development",
    "State Management",
  ]
---

## Mind Map Summary

- **Client-Side Routing (React Router)**
  - **What**: Enables building Single-Page Applications (SPAs) where navigation doesn't require a full page refresh.
  - **Key Components**:
    - `<BrowserRouter>`: The routing context provider.
    - `<Routes>`: Container for matching routes.
    - `<Route>`: Defines path-to-component mapping.
    - `<Link>`: Safe navigation component (replaces `<a>`).
  - **Hooks**:
    - `useNavigate()`: Programmatic navigation.
    - `useParams()`: Access dynamic URL parameters.
- **API Integration**
  - **The Pattern**:
    - **Trigger**: `useEffect` starts the scan on mount or parameter change.
    - **States**: `data` (results), `loading` (boolean), and `error` (failure details).
    - **Mechanism**: Browser `fetch` or `axios`.

## Core Concepts

### 1. React Router

In a traditional website, clicking a link causes a full page reload. In an SPA, React Router intercepts navigation events and swaps components locally. This results in a faster, more app-like experience.

- **`<BrowserRouter>`**: Place this at the root of your application.
- **`<Routes>` and `<Route>`**: This is your site's manifest. The first matching path wins.
- **`<Link>`**: Use this instead of `<a>` to prevent the browser from reloading the entire HTML document.

### 2. API Data Fetching Lifecycle

Fetching data is an asynchronous "side effect." You must manage its state to ensure a good user experience:

1.  **Mounting**: Component shows a loading indicator (e.g., a spinner).
2.  **Request**: `useEffect` calls the API.
3.  **Success**: API returns 2xx. Update `data` and set `loading` to `false`.
4.  **Error**: API returns 4xx/5xx or network fails. Update `error` and set `loading` to `false`.

## Practice Exercise

Create a multi-page app with React Router where one page dynamically fetches GitHub profile data based on a URL parameter.

## Answer

### 1. The Main Router (`App.jsx`)

```jsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import UserProfile from "./UserProfile";

export default function App() {
  return (
    <div className="container">
      <nav>
        <Link to="/">Home</Link> | <Link to="/user/facebook">FB Example</Link>
      </nav>
      <hr />
      <Routes>
        <Route path="/" element={<h2>Home Page</h2>} />
        <Route path="/user/:username" element={<UserProfile />} />
      </Routes>
    </div>
  );
}
```

### 2. The Data Fetching Component (`UserProfile.jsx`)

```jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://api.github.com/users/${username}`)
      .then((res) => {
        if (!res.ok) throw new Error("User not found");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [username]); // Re-run whenever the URL param changes

  if (loading) return <div className="spinner">Loading profile...</div>;
  if (error) return <div className="alert">Error: {error}</div>;

  return (
    <article className="profile">
      <h2>{user.name}</h2>
      <img src={user.avatar_url} alt={user.login} width="120" />
      <p>{user.bio}</p>
    </article>
  );
}
```

### Why This Architecture Works

1.  **Declarative Navigation**: You define "what" should show for a URL, not "how" to manipulate the DOM.
2.  **Responsiveness**: The `loading` state prevents a "broken" look while waiting for slow networks.
3.  **Resilience**: The `error` state handles edge cases like invalid usernames gracefully.
4.  **Referential Integrity**: Using `[username]` in the `useEffect` dependency array ensures the component updates correctly even if the user navigates between different profile pages.

```

```
