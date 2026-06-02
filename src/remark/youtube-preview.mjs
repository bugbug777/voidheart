const YOUTUBE_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "youtu.be",
]);

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function getPlainText(node) {
  if (!node) {
    return "";
  }

  if (node.type === "text") {
    return node.value;
  }

  if ("children" in node && Array.isArray(node.children)) {
    return node.children.map(getPlainText).join("");
  }

  return "";
}

function getYoutubeId(value) {
  let url;

  try {
    url = new URL(value);
  } catch {
    return null;
  }

  if (!YOUTUBE_HOSTS.has(url.hostname)) {
    return null;
  }

  if (url.hostname === "youtu.be") {
    return url.pathname.split("/").filter(Boolean)[0] ?? null;
  }

  if (url.pathname === "/watch") {
    return url.searchParams.get("v");
  }

  const [, route, id] = url.pathname.split("/");
  if (["embed", "shorts", "live"].includes(route)) {
    return id ?? null;
  }

  return null;
}

function isPreviewEnabled(node) {
  const title = node.title?.trim().toLowerCase();
  return title === "preview" || title === "youtube-preview";
}

function removeControlTitle(node) {
  if (node.title && ["preview", "youtube-preview", "no-preview", "plain"].includes(node.title.trim().toLowerCase())) {
    node.title = null;
  }
}

function getYoutubePreviewData(paragraph) {
  const children = (paragraph.children ?? []).filter((child) => {
    return child.type !== "text" || child.value.trim() !== "";
  });

  if (children.length !== 1) {
    return null;
  }

  const [child] = children;

  if (child.type === "link") {
    const videoId = getYoutubeId(child.url);
    if (!videoId) {
      return null;
    }

    if (!isPreviewEnabled(child)) {
      removeControlTitle(child);
      return null;
    }

    removeControlTitle(child);
    const title = getPlainText(child).trim() || "YouTube 影片";
    return { title, url: child.url, videoId };
  }

  if (child.type === "text") {
    const url = child.value.trim();
    const videoId = getYoutubeId(url);
    if (!videoId) {
      return null;
    }

    return null;
  }

  return null;
}

function createYoutubePreviewHtml({ title, url, videoId }) {
  const safeTitle = escapeHtml(title);
  const safeUrl = escapeHtml(url);
  const safeVideoId = encodeURIComponent(videoId);
  const imageUrl = `https://i.ytimg.com/vi/${safeVideoId}/hq720.jpg`;

  return `<a class="youtube-preview" href="${safeUrl}" target="_blank" rel="noopener noreferrer">
  <span class="youtube-preview__media">
    <img src="${imageUrl}" alt="${safeTitle} 的 YouTube 預覽圖" loading="lazy" />
    <span class="youtube-preview__play" aria-hidden="true"></span>
  </span>
  <span class="youtube-preview__body">
    <span class="youtube-preview__label">Video</span>
    <span class="youtube-preview__title">${safeTitle}</span>
    <span class="youtube-preview__source">YouTube</span>
  </span>
</a>`;
}

export default function remarkYoutubePreview() {
  return (tree) => {
    function visit(node) {
      if (node.type !== "paragraph") {
        for (const child of node.children ?? []) {
          visit(child);
        }
        return;
      }

      const previewData = getYoutubePreviewData(node);
      if (!previewData) {
        return;
      }

      node.type = "html";
      node.value = createYoutubePreviewHtml(previewData);
      delete node.children;
    }

    visit(tree);
  };
}
