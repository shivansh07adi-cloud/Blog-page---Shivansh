# Shivansh Kumar — Engineering Journal

A responsive personal developer blog for long-form writing about software systems, cloud infrastructure, AI, architecture, debugging, and the layers beneath everyday abstractions.

The publication is built with Next.js and local MDX files. It does not require a database, CMS, authentication service, or environment variables.

## Features

- Responsive editorial homepage with pinned and selected articles
- Complete searchable article archive
- Topic and category filtering
- MDX articles with GitHub-flavored Markdown
- Syntax-highlighted code blocks with copy controls
- Generated table of contents and reading progress
- Previous, next, and related-article navigation
- Light and dark themes saved in the browser
- Per-article metadata, canonical links, JSON-LD, sitemap, and robots configuration
- Static generation for fast delivery

## Tech stack

- [Next.js 16](https://nextjs.org/) with the App Router
- [React 19](https://react.dev/)
- TypeScript
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)
- [gray-matter](https://github.com/jonschlinkert/gray-matter)
- `remark-gfm`, `rehype-slug`, and `rehype-pretty-code`

## Run locally

Requirements: Node.js 20.9 or newer and npm.

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available commands

```bash
npm run dev      # Start the development server
npm run lint     # Run ESLint
npm run build    # Create the production build
npm run start    # Serve the production build
npm run check    # Run lint and the production build
```

Run `npm run check` before pushing changes.

## Project structure

```text
content/articles/          MDX article files
public/covers/             Article banner images
src/app/                   Routes, metadata, and global styles
src/app/articles/[slug]/   Individual article route
src/components/            Navigation, search, cards, TOC, and reading UI
src/lib/articles.ts        Article loading, sorting, dates, and TOC helpers
src/lib/site.ts            Identity, links, navigation, and site URL
```

## Add an article

Create a kebab-case `.mdx` file inside `content/articles`. The filename becomes the URL slug.

```mdx
---
title: "A Clear Article Title"
description: "A concise description used on cards and in page metadata."
date: "2026-09-09"
tags: [Systems, Debugging]
category: "Systems"
author: "Shivansh Kumar"
readingTime: "7 min read"
published: true
featured: false
cover: "/covers/article-banner.png"
---

Opening paragraph.

## First section

Article content goes here.
```

Place the banner in `public/covers`. A landscape image close to 16:9 works best. Set `published: false` to keep a draft out of public listings and generated routes. Only one article should normally use `featured: true`.

The archive, topic pages, sitemap, post count, related articles, and static article routes are derived automatically from frontmatter.

## Customize the identity

Edit `src/lib/site.ts` to change:

- Author name and site title
- Production URL and email address
- Portfolio, GitHub, and LinkedIn links
- Main navigation
- Topic descriptions

Homepage article selections are intentionally curated by slug in `src/app/page.tsx`.

## Deploy

### Vercel

1. Push this folder to GitHub.
2. Import the repository into [Vercel](https://vercel.com/new).
3. Keep the detected Next.js settings.
4. Deploy.

No environment variables are required.

### Other Node.js hosts

```bash
npm ci
npm run build
npm run start
```

The hosting platform must support a Node.js Next.js server.

## Before publishing

Update `siteConfig.url` in `src/lib/site.ts` if the final domain changes. Canonical URLs, sitemap entries, article sharing links, and structured metadata depend on it.

## Content and images

Article text and cover images belong to the site owner. Review image licensing before making the repository public or using the assets commercially.
