# Build & Setup Guide

This project is a static technical blog built with **Astro**, **Tailwind CSS**, and **Pagefind**.

## Prerequisites

- **Node.js**: v18 or later.
- **npm**: v9 or later.

## Quick Start

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Run Development Server**:

   ```bash
   npm run dev
   ```

   Open [http://localhost:4321](http://localhost:4321) in your browser.

## Scripts

| Command           | Description                                                                                      |
| :---------------- | :----------------------------------------------------------------------------------------------- |
| `npm run dev`     | Starts the Astro dev server with hot reloading.                                                  |
| `npm run build`   | Builds the static site for production (outputs to `dist/`). Runs `pagefind` for search indexing. |
| `npm run preview` | Previews the built `dist/` folder locally.                                                       |
| `npm run format`  | Formats code using Prettier.                                                                     |

## Project Structure

- **`src/content/blog/`**: Markdown/MDX files for blog posts.
- **`src/components/`**: Reusable `.astro` components.
- **`src/pages/`**: File-based routing (e.g., `index.astro`, `[...slug].astro`).
- **`src/layouts/`**: Page wrapper layouts (Header, Footer, Meta tags).

## Deployment

The project is configured for static site generation (SSG).

1. **Run `npm run build`**.
2. **Deploy the `dist/` folder to GitHub Pages, Vercel, or Netlify.**
