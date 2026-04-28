/** Allowed convert tool slugs for SSG + validation. MVP: 10–15 routes. */
export const CONVERT_SLUGS = [
  "avif-to-jpg",
  "avif-to-png",
  "avif-to-webp",
  "webp-to-jpg",
  "webp-to-png",
  "webp-to-avif",
  "png-to-jpg",
  "png-to-webp",
  "png-to-avif",
  "jpg-to-png",
  "jpg-to-webp",
  "jpeg-to-png",
] as const;

export type ConvertSlug = (typeof CONVERT_SLUGS)[number];
