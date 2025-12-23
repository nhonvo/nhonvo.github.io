---
title: "SSR, SSG, and ISR with Next.js/Remix"
description: "Master the modern rendering landscape. Learn when to use Server-Side Rendering (SSR), Static Site Generation (SSG), and the 'game-changer'—Incremental Static Regeneration (ISR)."
pubDate: "9 7 2025"
published: true
tags:
  [
    "Next.js",
    "React",
    "Frontend Development",
    "Web Performance",
    "SEO",
    "Vercel",
    "JavaScript",
    "Remix",
  ]
---

## The Rendering Spectrum

In the modern web, "one size fits all" no longer applies to rendering. Choosing the wrong strategy can lead to slow user experiences, poor SEO, or massive server costs.

### 1. Static Site Generation (SSG)

Pages are pre-rendered at **Build Time**.

- **The Flow**: You run `npm run build`, Next.js fetches data and generates HTML files for every route.
- **Best for**: Blogs, documentation, marketing sites. Data that changes rarely.
- **Why**: Fastest possible performance (served from CDN).

### 2. Server-Side Rendering (SSR)

Pages are rendered at **Request Time**.

- **The Flow**: Every time a user visits `/profile`, the server fetches fresh data and renders the HTML on the fly.
- **Best for**: Dashboards, personalized feeds, or pages where data is highly dynamic.
- **Why**: Ensures users always see the most up-to-date data.

### 3. Incremental Static Regeneration (ISR)

The hybrid approach. Pre-renders a page at build time but lets you update it **in the background** without rebuilding the whole site.

- **The Flow**: You set a `revalidate` timer. If a user visits after 10 minutes, they see the old page, but the server kicks off a background update for the _next_ visitor.
- **Best for**: E-commerce products, news sites, social media stats.

---

## Technical Comparison

| Strategy | Performance | Data Freshness             | SEO          |
| :------- | :---------- | :------------------------- | :----------- |
| **SSG**  | 🚀 Blazing  | ❄️ Cold (requires rebuild) | ✅ Excellent |
| **SSR**  | 🐢 Average  | ⚡ Real-time               | ✅ Excellent |
| **ISR**  | 🚀 Blazing  | ⛅ Eventually fresh        | ✅ Excellent |

---

## Practice Exercise: Next.js Implementations

Show the code for each strategy using the Next.js Page Router (the logic is similar in App Router's Server Components).

---

## Answer

### 1. SSG with `getStaticProps`

```javascript
export async function getStaticProps() {
  const data = await fetchMarketingData();
  return { props: { data } };
}
```

### 2. SSR with `getServerSideProps`

```javascript
export async function getServerSideProps(context) {
  const { userId } = context.query;
  const profile = await fetchUserDetails(userId);
  return { props: { profile } };
}
```

### 3. ISR with `revalidate`

```javascript
export async function getStaticProps() {
  const products = await fetchProductList();
  return {
    props: { products },
    // If a request comes in, at most once every 60 seconds,
    // it will try to re-generate the page in the background.
    revalidate: 60,
  };
}
```

## Why This Architecture Works

1.  **SEO**: All three methods send fully rendered HTML to the browser, which is critical for Googlebot and other crawlers.
2.  **User Experience**: SSG and ISR provide the fastest possible "First Contentful Paint" because the browser is just downloading a static file from a CDN node near the user.
3.  **Cost Efficiency**: ISR reduces the load on your database. Instead of querying the DB for every single visitor (like SSR), you only query it once per `revalidate` period.

## Summary

Don't settle for "standard" Client-Side Rendering (CSR).

- Use **SSG** whenever possible.
- Upgrade to **ISR** if you have thousands of pages or semi-dynamic data.
- Use **SSR** only when the content _must_ be personalized or updated in real-time.
