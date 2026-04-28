"use client";

import type { ChangeEvent, ClipboardEvent, DragEvent } from "react";
import { useCallback, useState } from "react";

type Props = {
  onFile: (file: File | null) => void;
  onError?: (message: string | null) => void;
  accept?: string;
};

export function FileUploader({ onFile, onError, accept = "image/*" }: Props) {
  const [drag, setDrag] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [urlLoading, setUrlLoading] = useState(false);

  const pick = useCallback(
    (file: File | undefined) => {
      onError?.(null);
      onFile(file ?? null);
    },
    [onError, onFile]
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    pick(e.target.files?.[0]);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDrag(false);
    pick(e.dataTransfer.files?.[0]);
  };

  const onPaste = (e: ClipboardEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement | null;
    const isTextInput =
      target?.tagName === "INPUT" ||
      target?.tagName === "TEXTAREA" ||
      Boolean(target?.closest("[contenteditable='true']"));
    if (isTextInput) return;

    const items = Array.from(e.clipboardData.items);
    const imageItem = items.find((item) => item.type.startsWith("image/"));
    if (imageItem) {
      e.preventDefault();
      const blob = imageItem.getAsFile();
      if (!blob) return;
      const ext = blob.type.split("/")[1] || "png";
      const originalName = blob.name?.trim();
      const fallbackName = `pasted-image-${Date.now()}.${ext}`;
      const safeName =
        originalName && originalName !== "image.png" && originalName !== "image.jpg"
          ? originalName
          : fallbackName;
      const file = new File([blob], safeName, { type: blob.type });
      pick(file);
      return;
    }

    const pastedText = e.clipboardData.getData("text/plain")?.trim();
    if (pastedText.startsWith("http://") || pastedText.startsWith("https://")) {
      setUrlInput(pastedText);
    }
  };

  const importFromUrl = async () => {
    const url = urlInput.trim();
    if (!url) return;
    if (!/^https?:\/\//i.test(url)) {
      onError?.("Please enter a valid image URL starting with http:// or https://");
      return;
    }
    try {
      setUrlLoading(true);
      onError?.(null);
      const res = await fetch(`/api/fetch-image?url=${encodeURIComponent(url)}`);
      if (!res.ok) throw new Error("Failed to fetch image URL");
      const ct = res.headers.get("content-type") || "";
      if (!ct.startsWith("image/")) {
        throw new Error("The provided URL did not return an image");
      }
      const blob = await res.blob();
      const path = res.headers.get("x-source-filename") || new URL(url).pathname.split("/").pop() || "remote-image";
      const fileName = /\.[a-z0-9]+$/i.test(path) ? path : `${path}.jpg`;
      const file = new File([blob], fileName, { type: blob.type });
      pick(file);
    } catch {
      onError?.("Unable to import this URL. Please ensure it points to a public image and try again.");
    } finally {
      setUrlLoading(false);
    }
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={onDrop}
      onPaste={onPaste}
      className={`rounded-xl border-2 border-dashed p-5 text-center transition ${
        drag ? "border-brand bg-teal-50 dark:bg-zinc-800" : "border-zinc-300 dark:border-zinc-600"
      }`}
    >
      <label className="cursor-pointer text-base text-zinc-600 dark:text-zinc-400">
        <span className="font-medium text-brand">Select image</span> or drag and drop here
        <input type="file" accept={accept} className="sr-only" onChange={onChange} />
      </label>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">You can also paste an image or import from URL.</p>
      <div className="mx-auto mt-3 flex max-w-xl flex-wrap items-center justify-center gap-2">
        <input
          type="url"
          placeholder="https://example.com/image.avif"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          className="min-w-[240px] flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand dark:border-zinc-600 dark:bg-zinc-900"
        />
        <button
          type="button"
          onClick={importFromUrl}
          disabled={urlLoading}
          className="rounded-lg bg-brand px-3 py-2 text-sm font-medium text-white hover:bg-brand-dark disabled:opacity-60"
        >
          {urlLoading ? "Loading..." : "Import URL"}
        </button>
      </div>
    </div>
  );
}
