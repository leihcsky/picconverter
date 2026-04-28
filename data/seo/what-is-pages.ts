export type WhatIsPage = {
  slug: string;
  title: string;
  description: string;
};

export const WHAT_IS_PAGES: WhatIsPage[] = [
  {
    slug: "avif",
    title: "What is AVIF?",
    description: "AVIF is a modern image format with strong compression and quality.",
  },
  {
    slug: "webp",
    title: "What is WebP?",
    description: "WebP is a raster format from Google, supporting lossy and lossless modes.",
  },
];
