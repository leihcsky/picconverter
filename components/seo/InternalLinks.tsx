import Link from "next/link";
import { CONVERT_SLUGS } from "@/data/seo/convert-pages";
import { localizedPath } from "@/lib/i18n/config";

export function InternalLinks({ currentSlug, locale = "en" }: { currentSlug?: string; locale?: string }) {
  const others = CONVERT_SLUGS.filter((s) => s !== currentSlug).slice(0, 8);
  const firstRow = others.slice(0, 4);
  const secondRow = others.slice(4, 8);
  return (
    <section className="mt-12" aria-labelledby="related-converters">
      <h2 id="related-converters" className="text-xl font-semibold text-zinc-900 dark:text-white">
        Popular converters
      </h2>
      <div className="mt-4 space-y-3">
        <ul className="flex flex-wrap justify-center gap-3">
          {firstRow.map((slug) => (
            <li key={slug}>
              <Link
                href={localizedPath(locale, `/convert/${slug}`)}
                className="flex h-11 w-52 items-center justify-center rounded-full border border-zinc-200 bg-white px-4 text-center text-sm font-medium text-zinc-700 shadow-sm transition hover:-translate-y-0.5 hover:border-brand hover:text-brand dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
              >
                {slug.replace(/-/g, " ")}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap justify-center gap-3">
          {secondRow.map((slug) => (
            <li key={slug}>
              <Link
                href={localizedPath(locale, `/convert/${slug}`)}
                className="flex h-11 w-52 items-center justify-center rounded-full border border-zinc-200 bg-white px-4 text-center text-sm font-medium text-zinc-700 shadow-sm transition hover:-translate-y-0.5 hover:border-brand hover:text-brand dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
              >
                {slug.replace(/-/g, " ")}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
