import { defineCollection, reference } from "astro:content"
import { file, glob } from "astro/loaders"
import { z } from "astro/zod"

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    kind: z.enum(["post", "update"]).default("post"),
    description: z.string().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
})

const publications = defineCollection({
  loader: file("src/data/publications.yaml"),
  schema: z.object({
    type: z.enum(["journal", "conference", "preprint", "patent"]),
    year: z.number(),
    title: z.string(),
    authors: z.string(),
    venue: z.string(),
    details: z.string().optional(),
    url: z.string().optional(),
    note: z.string().optional(),
  }),
})

const projects = defineCollection({
  loader: file("src/data/projects.yaml"),
  schema: z.object({
    name: z.string(),
    year: z.coerce.string().optional(),
    description: z.string(),
    links: z
      .object({
        site: z.string().optional(),
        repo: z.string().optional(),
        paper: z.string().optional(),
        thesis: z.string().optional(),
        post: z.string().optional(),
      })
      .default({}),
    papers: z.array(reference("publications")).default([]),
  }),
})

export const collections = { posts, publications, projects }
