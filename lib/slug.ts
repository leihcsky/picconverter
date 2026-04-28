import type { ImageFormat } from "./formatMap";
import { normalizeFormat } from "./formatMap";

const PAIR_RE = /^([a-z0-9]+)-to-([a-z0-9]+)$/;

export type ConvertPair = { from: ImageFormat; to: ImageFormat; slug: string };

/** Parses convert URL slug e.g. `avif-to-jpg` → from/to. */
export function parseConvertSlug(slug: string): ConvertPair | null {
  const m = slug.trim().toLowerCase().match(PAIR_RE);
  if (!m) return null;
  const from = normalizeFormat(m[1]);
  const to = normalizeFormat(m[2]);
  if (!from || !to || from === to) return null;
  return { from, to, slug: `${from}-to-${to}` };
}

export function convertPairPath(pair: ConvertPair): string {
  return `/convert/${pair.from}-to-${pair.to}`;
}
