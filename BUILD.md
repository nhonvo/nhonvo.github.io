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

## Key Features

- **Modern UI/UX**: Premium design with glassmorphism, smooth animations (Astro View Transitions), and a refined dark mode.
- **Advanced Search**: Client-side filtering and sorting in the Archive page.
- **Reading Experience**: Staggered post animations, Table of Contents, Reading Progress Bar, Reading Time estimates, and Copy Code buttons.
- **Social Engagement**: Integrated social share buttons and centralized social media links in Header/Footer.
- **Polished UX**: Premium custom 404 page, smooth transitions, and consistent dark mode flow.
- **Content-First**: Written in Markdown/MDX with automatic SEO and Open Graph image generation.

## Project Structure

- **`src/content/blog/`**: Markdown/MDX files for blog posts.
- **`src/components/`**:
  - `ThemeToggle.astro`: Managed dark/light mode with persistence.
  - `SearchFilter.astro`: Advanced filter/sort grid for the archive.
  - `TableOfContents.astro`: Dynamic H2/H3 navigation.
  - `CopyCodeButton.astro`: Interactive code block utility.
- **`src/pages/`**: File-based routing (e.g., `index.astro`, `[...slug].astro`).
- **`src/layouts/`**: Page wrapper layouts (BaseLayout, BlogPost list).

## Deployment

The project is configured for static site generation (SSG) and automated deployment via GitHub Actions.

1. **Build**: `npm run build` (This also triggers the Pagefind search indexing).
2. **Output**: The production-ready files are generated in the `dist/` directory.
