import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"

export default defineConfig({
  site: "https://adeshkadambi.github.io",
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { themes: { light: "github-light", dark: "github-dark" } },
  },
  // Old Quartz URLs
  redirects: {
    "/Blog/Maya-Post-Mortem": "/posts/2024-03-12-maya-post-mortem/",
    "/Blog/Proton-Drive-rClone": "/posts/2024-11-15-proton-drive-rclone/",
    "/Blog/Typst-Template": "/posts/2024-10-20-typst-thesis-template/",
    "/experience": "/",
  },
})
