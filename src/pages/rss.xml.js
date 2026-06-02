import rss from "@astrojs/rss";
import { SITE } from "../site.config";
import { getPublishedPosts } from "../utils/blog";
import { withBase } from "../utils/urls";

export async function GET(context) {
  const posts = await getPublishedPosts();
  const site = new URL(withBase("/"), context.site).href;

  return rss({
    title: SITE.title,
    description: SITE.description,
    site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: withBase(`/blog/${post.slug}/`),
    })),
  });
}
