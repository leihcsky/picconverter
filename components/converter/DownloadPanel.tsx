"use client";

import { Button } from "@/components/ui/Button";

type Props = {
  url: string | null;
  filename: string | null;
  onClear?: () => void;
};

export function DownloadPanel({ url, filename, onClear }: Props) {
  if (!url || !filename) return null;
  return (
    <div className="mt-4 flex flex-wrap items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
      <a
        href={url}
        download={filename}
        className="inline-flex rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
      >
        Download {filename}
      </a>
      {onClear ? (
        <Button type="button" variant="ghost" onClick={onClear}>
          Clear
        </Button>
      ) : null}
    </div>
  );
}
