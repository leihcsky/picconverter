import Link from "next/link";
import { CONVERT_SLUGS } from "@/data/seo/convert-pages";
import { localizedPath } from "@/lib/i18n/config";

export function Footer({ locale = "en" }: { locale?: string }) {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-50 py-10 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-4">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          © {new Date().getFullYear()} PicConverter — browser-based image format conversion.
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {CONVERT_SLUGS.slice(0, 6).map((slug) => (
            <li key={slug}>
              <Link href={localizedPath(locale, `/convert/${slug}`)} className="text-brand hover:underline">
                {slug.replace(/-/g, " ")}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
