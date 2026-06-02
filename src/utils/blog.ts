import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;

export async function getPublishedPosts() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

export function getAllTags(posts: BlogPost[]) {
  return Array.from(new Set(posts.flatMap((post) => post.data.tags))).sort(
    (a, b) => a.localeCompare(b, "zh-Hant"),
  );
}

export function getPostsByTag(posts: BlogPost[], tag: string) {
  return posts.filter((post) => post.data.tags.includes(tag));
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function getReadingTime(body = "") {
  const words = body
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<[^>]*>/g, "")
    .trim();
  const cjkCharacters = words.match(/[\u4e00-\u9fff]/g)?.length ?? 0;
  const latinWords = words.match(/[A-Za-z0-9]+/g)?.length ?? 0;
  const minutes = Math.max(1, Math.ceil((cjkCharacters + latinWords) / 450));
  return `${minutes} 分鐘閱讀`;
}
