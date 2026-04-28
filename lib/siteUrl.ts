const DEFAULT_SITE_URL = "https://picconverter.cc";

/**
 * Returns a normalized site origin for metadata, sitemap, robots, and JSON-LD.
 * Accepts values like "picconverter.cc" and upgrades them to "https://picconverter.cc".
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return DEFAULT_SITE_URL;

  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(withProtocol).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export function getSiteUrlObject(): URL {
  return new URL(getSiteUrl());
}
