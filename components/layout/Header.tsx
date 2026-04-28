import Image from "next/image";
import Link from "next/link";
import { localizedPath } from "@/lib/i18n/config";

export function Header({ locale = "en" }: { locale?: string }) {
  return (
    <header className="border-b-4 border-brand bg-white/80 backdrop-blur dark:border-brand dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link
          href={localizedPath(locale, "/")}
          className="inline-flex items-center text-zinc-900 dark:text-white"
        >
          <Image src="/logo.svg" alt="PicConverter" width={220} height={44} className="h-10 w-auto" priority />
        </Link>
        <nav className="flex gap-4 text-sm text-zinc-600 dark:text-zinc-400">
          <Link href={localizedPath(locale, "/")} className="hover:text-brand">
            Home
          </Link>
          <Link href={localizedPath(locale, "/convert/avif-to-jpg")} className="hover:text-brand">
            AVIF → JPG
          </Link>
          <Link href={localizedPath(locale, "/how-to/convert-avif-to-jpg")} className="hover:text-brand">
            How-to
          </Link>
        </nav>
      </div>
    </header>
  );
}
