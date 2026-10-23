export const SITE_HOST = "kiraliksevgili.net";
export const SITE_URL = `https://${SITE_HOST}`; // No trailing slash here for cleaner joining

/**
 * Returns the absolute URL for a given path, ensuring consistency with
 * the trailingSlash: true configuration.
 */
export function absoluteUrl(path = ""): string {
  // Root case
  if (!path || path === "/") return `${SITE_URL}/`;

  let cleanPath = path.startsWith("/") ? path.substring(1) : path;

  // If it's a file (contains a dot), don't add a slash
  if (cleanPath.includes(".")) {
    return `${SITE_URL}/${cleanPath}`;
  }

  // Ensure path ends with a slash for Next.js trailingSlash: true
  if (!cleanPath.endsWith("/")) {
    cleanPath += "/";
  }

  return `${SITE_URL}/${cleanPath}`;
}
