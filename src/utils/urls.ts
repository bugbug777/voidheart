const rawBase = import.meta.env.BASE_URL ?? "/";
const basePath = rawBase === "/" ? "" : rawBase.replace(/\/$/, "");

export function withBase(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (!basePath) {
    return normalizedPath;
  }

  if (normalizedPath === "/") {
    return `${basePath}/`;
  }

  return `${basePath}${normalizedPath}`;
}

export function withoutBase(pathname: string) {
  if (!basePath) {
    return pathname;
  }

  if (pathname === basePath || pathname === `${basePath}/`) {
    return "/";
  }

  if (pathname.startsWith(`${basePath}/`)) {
    return pathname.slice(basePath.length);
  }

  return pathname;
}
