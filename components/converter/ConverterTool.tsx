"use client";

import { useMemo, useState } from "react";
import type { ImageFormat } from "@/lib/formatMap";
import { convertImage } from "@/lib/convertEngine";
import { trackEvent } from "@/lib/analytics";
import { Card } from "@/components/ui/Card";
import { ConvertButton } from "./ConvertButton";
import { FileUploader } from "./FileUploader";

const OUTPUT_OPTIONS: ImageFormat[] = ["jpg", "png", "webp", "avif"];

type Props = {
  defaultTo: ImageFormat;
  /** When false, user can pick output format (home hub). */
  lockOutput?: boolean;
};

export function ConverterTool({ defaultTo }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [to, setTo] = useState<ImageFormat>(defaultTo);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState<string | null>(null);

  const effectiveTo = to;
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const accept = useMemo(() => "image/avif,image/webp,image/png,image/jpeg", []);

  const run = async () => {
    if (!file) return;
    const sourceExt = file.name.includes(".") ? file.name.split(".").pop()?.toLowerCase() ?? "unknown" : "unknown";
    trackEvent("convert_click", {
      from_format: sourceExt,
      to_format: effectiveTo,
      file_size_bytes: file.size,
    });
    setError(null);
    setLoading(true);
    setDownloadUrl(null);
    setDownloadName(null);
    try {
      const { blob, filename } = await convertImage(file, effectiveTo === "jpeg" ? "jpg" : effectiveTo);
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setDownloadName(filename);
      trackEvent("conversion_success", {
        from_format: sourceExt,
        to_format: effectiveTo,
        input_size_bytes: file.size,
        output_size_bytes: blob.size,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed");
      trackEvent("conversion_failed", {
        from_format: sourceExt,
        to_format: effectiveTo,
      });
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setDownloadUrl(null);
    setDownloadName(null);
    setFile(null);
  };

  return (
    <Card>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-base font-semibold text-zinc-800 dark:text-zinc-200">Quick converter</p>
        <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
          100% browser-based
        </span>
      </div>
      <FileUploader
        accept={accept}
        onError={(message) => setError(message)}
        onFile={(f) => {
          setFile(f);
          setTo(defaultTo);
          setError(null);
          if (downloadUrl) URL.revokeObjectURL(downloadUrl);
          setDownloadUrl(null);
          setDownloadName(null);
        }}
      />
      {file ? (
        <div className="mt-3 rounded-xl border border-brand/30 bg-brand/10 p-3">
          <div className="flex flex-wrap items-center gap-3">
            <p className="min-w-0 flex-1 text-sm text-zinc-700 dark:text-zinc-200">
              <span className="font-semibold">Selected:</span>{" "}
              <span className="font-medium">{file.name}</span>
              <span className="ml-2 text-zinc-500 dark:text-zinc-400">({formatSize(file.size)})</span>
            </p>
            <label className="inline-flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-200">
              {downloadUrl && downloadName ? (
                <>
                  <span className="font-medium">Download</span>
                  <a
                    href={downloadUrl}
                    download={downloadName}
                    onClick={() =>
                      trackEvent("download_image", {
                        file_name: downloadName,
                        to_format: effectiveTo,
                      })
                    }
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white hover:bg-brand-dark"
                    aria-label={`Download ${downloadName}`}
                    title={`Download ${downloadName}`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-4 w-4">
                      <path d="M12 3v12" />
                      <path d="m7 10 5 5 5-5" />
                      <path d="M4 21h16" />
                    </svg>
                  </a>
                </>
              ) : (
                <>
                  <span className="font-medium">Convert to</span>
                  <select
                    value={to}
                    onChange={(e) => setTo(e.target.value as ImageFormat)}
                    className="rounded-lg border border-zinc-300 bg-white px-2 py-1 text-sm outline-none focus:border-brand dark:border-zinc-600 dark:bg-zinc-900"
                    disabled={loading}
                  >
                    {OUTPUT_OPTIONS.map((f) => (
                      <option key={f} value={f}>
                        {f.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </label>
            <button
              type="button"
              onClick={clear}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-600 hover:border-brand hover:text-brand dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-300"
              aria-label="Remove selected image"
              title="Remove selected image"
            >
              ✕
            </button>
          </div>
        </div>
      ) : null}
      <div className="mt-4 flex justify-end">
        <ConvertButton onClick={run} disabled={!file} loading={loading} />
      </div>
      {error ? <p className="mt-2 text-base text-red-600">{error}</p> : null}
    </Card>
  );
}
