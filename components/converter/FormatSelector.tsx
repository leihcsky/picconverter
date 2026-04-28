"use client";

import type { ImageFormat } from "@/lib/formatMap";
import { FORMAT_LABELS } from "@/lib/formatMap";

type Props = {
  value: ImageFormat;
  onChange: (f: ImageFormat) => void;
  options: ImageFormat[];
  disabled?: boolean;
};

export function FormatSelector({ value, onChange, options, disabled }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((f) => (
        <button
          key={f}
          type="button"
          disabled={disabled}
          onClick={() => onChange(f)}
          className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
            value === f
              ? "border-brand bg-brand text-white"
              : "border-zinc-200 bg-white text-zinc-700 hover:border-brand dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200"
          }`}
        >
          {FORMAT_LABELS[f]}
        </button>
      ))}
    </div>
  );
}
