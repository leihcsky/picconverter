/** Supported image formats for MVP (HEIC deferred per roadmap). */
export type ImageFormat = "avif" | "webp" | "png" | "jpg" | "jpeg";

export const FORMAT_LABELS: Record<ImageFormat, string> = {
  avif: "AVIF",
  webp: "WebP",
  png: "PNG",
  jpg: "JPG",
  jpeg: "JPEG",
};

export const MIME_BY_FORMAT: Record<ImageFormat, string> = {
  avif: "image/avif",
  webp: "image/webp",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
};

export function normalizeFormat(f: string): ImageFormat | null {
  const k = f.toLowerCase() as ImageFormat;
  if (k === "jpeg") return "jpeg";
  if (k in MIME_BY_FORMAT) return k as ImageFormat;
  return null;
}
