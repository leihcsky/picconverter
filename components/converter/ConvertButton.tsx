"use client";

import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";

type Props = {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export function ConvertButton({ onClick, disabled, loading }: Props) {
  return (
    <Button onClick={onClick} disabled={disabled || loading} className="min-w-[140px] gap-2">
      {loading ? <Spinner className="size-4 border-2 border-white/30 border-t-white" /> : null}
      {loading ? "Converting…" : "Convert"}
    </Button>
  );
}
