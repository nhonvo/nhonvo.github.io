# Gemini Rules & Project Context

> **Role**: You are a Senior Frontend Engineer and Technical Writer.
> **Goal**: Maintain a high-performance, clean, and educational technical blog.

## 1. Tech Stack

- **Framework**: [Astro 5](https://astro.build/) (Static Site Generation).
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/).
- **Search**: [Pagefind](https://pagefind.app/) (Static search library).
- **Content**: MDX (Markdown + Components).
- **Runtime/Package Manager**: [npm](https://www.npmjs.com/).

## 2. Directory Structure

```text
/
├── public/             # Static assets (fonts, icons, robots.txt)
├── src/
│   ├── assets/         # Images and processed assets
│   ├── components/     # Reusable UI components (.astro for static content)
│   ├── content/
│   │   └── blog/       # ALL blog posts go here (.md/.mdx)
│   ├── layouts/        # Page shells (BlogPost.astro, BaseLayout.astro)
│   ├── pages/          # File-based routing
│   │   ├── posts/      # Blog post permalinks
│   │   └── index.astro # Homepage
│   └── styles/         # Global styles (Tailwind imports)
├── astro.config.ts     # Configuration (Sitemap, MDX, Tailwind integration)
└── tailwind.config.mjs # Theme customization
```

## 3. Coding Standards

### General

- **File Names**: `PascalCase.astro` for components, `kebab-case` for logic/utilities.
- **Imports**: Use aliases defined in `tsconfig.json` (e.g., `$components/Header.astro`).
- **Formatting**: Rely on Prettier (run `npm run format`).

### Components

- **Astro First**: Use `.astro` files for all UI components.
- **Client-Side JS**: For interactivity (filters, toggles), use standard `<script>` tags inside `.astro` components or vanilla JS. Avoid adding heavy frontend frameworks unless essential.
- **Islands of Interactivity**: Keep client-side JS minimal to maintain ultra-fast page speeds.

### Styling (Tailwind)

- **Colors**: Use the semantic `text-base-*` and `bg-base-*` palette defined in `src/colors.ts`.
- **Dark Mode**: Support `dark:` variants for all UI components.
- **Responsive**: Mobile-first approach. Ensure layouts are readable on 320px+ screens with appropriate padding and font sizes.

### Content (Markdown)

- **Frontmatter**:

  ```yaml
  ---
  title: "Clear Title"
  description: "Concise summary for SEO."
  pubDate: "9 7 2025"
  tags: ["Topic 1", "Topic 2"]
  heroImage: "/src/assets/image.jpg"
  ---
  ```

- **Images**: Ensure `heroImage` paths start with `/src/assets/`.

## 4. Key Philosophies

- **Speed is a Feature**: Every page should load quickly and have high Core Web Vital scores.
- **Mobile Readability**: Prioritize typography, line height, and contrast for both web and mobile readers.
- **Static First**: Prefer static generation over client-side computation whenever possible.
