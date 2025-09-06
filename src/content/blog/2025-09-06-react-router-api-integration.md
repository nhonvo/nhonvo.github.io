---
title: "React Router & API Integration"
description: "Explain how to implement client-side routing. Discuss strategies for fetching data from an API, including handling loading and error states."
pubDate: "Sep 06 2025"
published: true
tags: ["Front-End: ReactJS"]
---

### Mind Map Summary

- **Client-Side Routing (React Router)**
  - **What**: Allows you to build a Single-Page Application (SPA) with multiple "pages" or views without a full page refresh.
  - **Key Components**:
    - `<BrowserRouter>`: Wraps your entire app to enable routing.
    - `<Routes>`: A container that holds all of your individual routes.
    - `<Route path="/about" element={<AboutPage />} />`: Maps a URL path to a specific component.
    - `<Link to="/about">About</Link>`: A component for creating navigation links.
  - **Hooks**:
    - `useNavigate()`: To programmatically navigate (e.g., after a form submission).
    - `useParams()`: To access URL parameters (e.g., the `id` from `/users/:id`).
- **API Integration**
  - **What**: Fetching data from a server to display in your React components.
  - **The Data Fetching Pattern**:
    - **Trigger**: Use the `useEffect` Hook to initiate the data fetch when the component mounts.
    - **State Management**: Use `useState` to manage three crucial states:
      1.  `data`: To hold the successfully fetched data (e.g., `null` initially).
      2.  `loading`: A boolean to indicate if the request is in progress. Used to show a spinner.
      3.  `error`: To hold any error messages if the fetch fails.
    - **Tool**: Use the browser's built-in `fetch` API or a library like `axios`.

### Core Concepts

#### 1. React Router
In a traditional website, clicking a link makes a new request to the server, which sends back a new HTML page, causing a full page reload. In a Single-Page Application (SPA), the user experience is much smoother. React Router intercepts navigation events and, instead of making a server request, it dynamically swaps out the components being rendered on the page to match the new URL. This creates the illusion of multiple pages while remaining a single, fast-loading application.

- **`<BrowserRouter>`**: Should be placed at the top level of your component tree. It uses the HTML5 history API to keep your UI in sync with the URL.
- **`<Routes>` and `<Route>`**: This is where you define your URL structure. The `<Routes>` component will look at the current URL and render the first `<Route>` whose `path` matches.
- **`<Link>`**: This is the correct way to create navigation links. Using a standard `<a href="...">` tag will cause a full page reload, defeating the purpose of a SPA.

#### 2. API Data Fetching Lifecycle
When a component needs data from an API, it goes through a lifecycle that you must manage in your state.
1.  **Initial State**: The component mounts. `data` is `null`, `loading` is `true`, `error` is `null`. You should render a loading indicator (like a spinner).
2.  **Fetch Initiated**: The `useEffect` hook runs, and the `fetch` request is made.
3.  **Success**: The API returns a successful response. You parse the data, call your state update function to put the data in your `data` state variable, and set `loading` to `false`. React re-renders the component, which now displays the data.
4.  **Error**: The API returns an error. You catch the error, put an error message in your `error` state variable, and set `loading` to `false`. React re-renders, which now displays the error message.

Managing all three states is crucial for a good user experience. The user should always know if something is loading, if it succeeded, or if it failed.

### Practice Exercise

Create a multi-page application using React Router. One page should fetch data from a public API (e.g., GitHub or a weather API) and display it to the user, correctly handling the loading and error UI states.

### Answer

First, install React Router: `npm install react-router-dom`

#### Code Example

**1. Setup Router (`index.js` or `main.jsx`)**

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

**2. Main App Component with Routes and Navigation (`App.jsx`)**

```jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import UserProfile from './UserProfile';

export default function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/user/facebook">Fetch Profile</Link>
      </nav>
      <hr />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/:username" element={<UserProfile />} />
      </Routes>
    </div>
  );
}
```

**3. The Data Fetching Component (`UserProfile.jsx`)**

```jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function UserProfile() {
  // Get the username from the URL using the useParams hook
  const { username } = useParams();

  // Setup the three states for our data fetching lifecycle
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect to fetch data when the component mounts or username changes
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://api.github.com/users/${username}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('User not found');
        }
        return response.json();
      })
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });

  }, [username]); // Re-run the effect if the username prop changes

  // Conditional rendering based on the current state
  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>{user.name} (@{user.login})</h2>
      <img src={user.avatar_url} alt={user.name} width="100" />
      <p>{user.bio}</p>
    </div>
  );
}
```

#### Explanation

1.  **Routing**: In `App.jsx`, we set up two routes. The `/` path renders a simple `HomePage` component, and the `/user/:username` path renders our `UserProfile` component. The `:username` part is a URL parameter.
2.  **URL Parameters**: In `UserProfile.jsx`, the `useParams()` hook from React Router extracts the `username` value directly from the URL.
3.  **State Management**: We declare three state variables: `user`, `loading`, and `error`.
4.  **Data Fetching**: The `useEffect` hook contains all the logic for fetching the data. Its dependency array `[username]` ensures that if the user navigates from, say, `/user/facebook` to `/user/google`, the component will re-run the effect to fetch the new user's data.
5.  **UI States**: The component uses `if` statements to render different UI based on the state. It shows a "Loading..." message, an error message, or the user profile data, providing a clear and robust user experience.