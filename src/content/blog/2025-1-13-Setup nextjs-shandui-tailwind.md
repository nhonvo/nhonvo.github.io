---
title: Setup nextjs x shandui x tailwind css
description: Setup nextjs x shandui x tailwind css
pubDate: "1 13 2025"
published: true
tags: [tailwind, nextjs, shandui]
---

### 1. **Set up a Next.js project**

If you don't already have a Next.js project, you can create one by following these steps:

#### Step 1: Install Next.js

In your terminal, run the following commands to set up a new Next.js project:

```bash
# Create a new Next.js app
npx create-next-app@latest my-next-shadcn-app
# Or with Yarn
# yarn create next-app my-next-shadcn-app
```

#### Step 2: Navigate to the project directory

```bash
cd my-next-shadcn-app
```

### 2. **Install ShadCN UI**

Now that you have your Next.js app, you can add ShadCN UI to it.

#### Step 1: Install ShadCN UI and Tailwind CSS

ShadCN UI is designed to be used with Tailwind CSS, so you need to set up Tailwind as well. Run these commands to install the necessary packages:

```bash
# Install ShadCN UI and Tailwind CSS
npm install @shadcn/ui tailwindcss postcss autoprefixer
# Or with Yarn
# yarn add @shadcn/ui tailwindcss postcss autoprefixer
```

#### Step 2: Set up Tailwind CSS

To configure Tailwind CSS in your project, follow the steps:

1. **Initialize Tailwind CSS**:

   Run the following command to generate the necessary configuration files for Tailwind CSS:

```bash
npx shadcn@latest init
```

2. **Configure Tailwind**: Open the `tailwind.config.js` file and update the `content` property to include the paths to your React components:

   ```bash
   // tailwind.config.js
   module.exports = {
     content: [
       './pages/**/*.{js,ts,jsx,tsx}',
       './components/**/*.{js,ts,jsx,tsx}',
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

3. **Add Tailwind directives to CSS**:

   Open the `styles/globals.css` file and replace the contents with the following Tailwind setup:

   ```css
   /* styles/globals.css */
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

### 3. **Using ShadCN UI in your project**

```bash
npx shadcn@latest add button
```

```bash
npm run dev
```
