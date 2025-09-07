---
title: "SSR, SSG, and ISR with Next.js/Remix"
description: "Explain the differences between Server-Side Rendering, Static Site Generation, and Incremental Static Regeneration. Discuss the trade-offs and which to use for different types of web pages (e.g., a blog vs. a user dashboard)."
pubDate: "Sep 07 2025"
published: true
tags: ["Front-End: ReactJS", "Next.js", "Remix", "Web Development", "Performance", "SSR", "SSG", "ISR"]
---

### Mind Map Summary

- **Topic**: SSR, SSG, and ISR
- **Core Concepts**:
    - **Server-Side Rendering (SSR)**: The HTML for a page is generated on the server for each request. The browser receives a fully rendered HTML page, which can be displayed immediately.
    - **Static Site Generation (SSG)**: The HTML for all pages is generated at build time. The entire site is a collection of static files that can be served from a CDN.
    - **Incremental Static Regeneration (ISR)**: A hybrid approach where pages are statically generated at build time, but can be regenerated on the server after a certain time interval. This allows for static sites with dynamic data.
- **Trade-offs**:
    - **SSR**: 
        - **Pros**: Good for SEO, fast initial page load, always up-to-date data.
        - **Cons**: Slower than SSG because pages are rendered on each request, requires a server.
    - **SSG**:
        - **Pros**: Extremely fast, secure, and scalable. Can be served from a CDN.
        - **Cons**: Not suitable for pages with frequently changing data, build times can be long for large sites.
    - **ISR**:
        - **Pros**: Combines the benefits of SSG (speed) with the ability to have dynamic data.
        - **Cons**: Can serve stale data for a short period, more complex than SSG.
- **Use Cases**:
    - **SSR**: User dashboards, e-commerce sites, pages with user-specific content.
    - **SSG**: Blogs, documentation sites, marketing pages, portfolios.
    - **ISR**: News sites, social media feeds, e-commerce product pages.

### Practice Exercise

Create a simple Next.js application with three pages: one that uses SSG (e.g., an 'About' page), one that uses SSR (e.g., a user-specific 'Profile' page), and one that uses ISR (e.g., a 'Products' page that revalidates every 60 seconds).

### Answer

**1. About Page (SSG):**

```javascript
// pages/about.js

function AboutPage() {
  return <div>This is the about page.</div>;
}

export default AboutPage;
```

**2. Profile Page (SSR):**

```javascript
// pages/profile.js

function ProfilePage({ user }) {
  return <div>Welcome, {user.name}!</div>;
}

export async function getServerSideProps(context) {
  // Fetch user data from an API
  const user = { name: 'John Doe' };

  return {
    props: {
      user,
    },
  };
}

export default ProfilePage;
```

**3. Products Page (ISR):**

```javascript
// pages/products.js

function ProductsPage({ products }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  // Fetch product data from an API
  const products = [{ id: 1, name: 'Product 1' }];

  return {
    props: {
      products,
    },
    revalidate: 60, // Re-generate the page every 60 seconds
  };
}

export default ProductsPage;
```
