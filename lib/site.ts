export const SITE_HOST = "kiraliksevgili.net";
export const SITE_URL = `https://${SITE_HOST}`;

export function absoluteUrl(path = ""): string {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
