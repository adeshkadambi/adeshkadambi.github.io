# adeshkadambi.github.io

Personal site, built with [Astro](https://astro.build) and deployed to GitHub Pages on every push to `main`.

```sh
npm install
npm run dev      # http://localhost:4321 (drafts visible)
npm run build    # static output in dist/
npm run check    # type + content schema checks
```

## Writing

Everything in the feed (and `/rss.xml`) lives in `src/content/posts/` as `YYYY-MM-DD-slug.md`.

**Post**: a long-form article. Shows as title + description in the feed.

```md
---
title: "Mounting Proton Drive on Linux"
date: 2024-11-15
description: "One line for the feed, RSS, and link previews."
tags: [linux]        # optional
draft: true          # optional, hidden in production
---

Body…
```

**Update**: a short note (paper accepted, grant, talk). The whole body shows inline in the feed.

```md
---
title: "Paper accepted at ACRM RehabWeek 2025"
date: 2025-05-01
kind: update
---

One or two sentences with a [link](https://…).
```

Images go in `src/assets/posts/` and are referenced relatively (`![alt](../../assets/posts/foo.png)`).
Other files (PDFs etc.) go in `public/files/` and are linked as `/files/foo.pdf`.

## Publications and projects

- `src/data/publications.yaml`: `type` is `journal | conference | preprint | patent`. "Kadambi, A." is bolded automatically.
- `src/data/projects.yaml`: name, year, description, optional `links` (`site`, `repo`, `paper`, `post`).

Both are schema-validated at build time (`src/content.config.ts`), so a typo fails the build instead of shipping.

## Site info

Name, email, and social links: `src/data/site.ts`. Home page bio: `src/pages/index.astro`.
