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

Every entry shows as its title + `description` in the feed and links to its own page.

**Post**: a long-form article.

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

**Update**: a short note (paper accepted, grant, talk). Gets an "Update" label in the feed.

```md
---
title: "Paper accepted at ACRM RehabWeek 2025"
date: 2025-05-01
kind: update
description: "One line for the feed."
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
