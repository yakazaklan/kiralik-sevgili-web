export const SITE_HOST = "kiraliksevgili.net";
export const SITE_URL = `https://${SITE_HOST}/`; // Force trailing slash as the primary URL

/**
 * Returns the absolute URL for a given path, ensuring consistency with
 * the trailingSlash: true configuration.
 */
export function absoluteUrl(path = ""): string {
  // Return root
  if (!path || path === "/") return SITE_URL;

  let cleanPath = path.startsWith("/") ? path.substring(1) : path;

  // If it's not a file (doesn't contain a dot), ensure it ends with a slash
  if (!cleanPath.endsWith("/") && !cleanPath.includes(".")) {
    cleanPath += "/";
  }

  // Since SITE_URL now ends with a slash, we don't add one here
  return `${SITE_URL}${cleanPath}`;
}
