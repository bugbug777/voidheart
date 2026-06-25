import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import youtubePreview from "./src/remark/youtube-preview.mjs";

const site = process.env.SITE_URL ?? "https://www.voidheart.cc";
const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  site,
  base,
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [youtubePreview],
  },
});
