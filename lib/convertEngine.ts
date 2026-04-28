"use client";

import type { ImageFormat } from "./formatMap";
import { MIME_BY_FORMAT } from "./formatMap";

function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });
}

async function decodeAvifToImageData(file: File): Promise<ImageData> {
  const { default: decode } = await import("@jsquash/avif/decode");
  const decoded = await decode(await file.arrayBuffer());
  if (!decoded) throw new Error("AVIF decode returned empty result");
  return decoded;
}

function isAvifFile(file: File): boolean {
  const lower = file.name.toLowerCase();
  return file.type === "image/avif" || lower.endsWith(".avif");
}

/**
 * Client-side decode → canvas → encode. AVIF/WebP depend on browser support.
 */
export async function convertImage(
  file: File,
  to: ImageFormat
): Promise<{ blob: Blob; dataUrl: string; filename: string }> {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  if (isAvifFile(file)) {
    try {
      const img = await loadImageFromFile(file);
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);
    } catch {
      try {
        const imageData = await decodeAvifToImageData(file);
        canvas.width = imageData.width;
        canvas.height = imageData.height;
        ctx.putImageData(imageData, 0, 0);
      } catch {
        throw new Error("Your browser cannot decode this AVIF file yet. Please try another browser or source image.");
      }
    }
  } else {
    const img = await loadImageFromFile(file);
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
  }

  const mime =
    to === "jpg" || to === "jpeg" ? MIME_BY_FORMAT.jpg : MIME_BY_FORMAT[to];

  const blob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Encode failed"))),
      mime,
      mime === "image/jpeg" ? 0.92 : undefined
    );
  });

  const dataUrl = canvas.toDataURL(mime, mime === "image/jpeg" ? 0.92 : undefined);
  const base = file.name.replace(/\.[^.]+$/, "") || "converted";
  const ext = to === "jpeg" ? "jpg" : to;
  const filename = `${base}.${ext}`;

  return { blob, dataUrl, filename };
}
