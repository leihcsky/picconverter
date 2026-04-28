import type { SeoFaqItem } from "@/lib/seoMap";

export function FAQ({ items, heading = "FAQ" }: { items: SeoFaqItem[]; heading?: string }) {
  if (!items.length) return null;
  return (
    <section className="mt-16" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-2xl font-semibold text-zinc-900 dark:text-white">
        {heading}
      </h2>
      <dl className="mt-5 space-y-4">
        {items.map((item) => (
          <div
            key={item.q}
            className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
          >
            <dt className="flex items-start gap-2 text-lg font-semibold text-zinc-900 dark:text-white">
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand dark:bg-brand/25 dark:text-brand-muted">
                Q
              </span>
              <span>{item.q}</span>
            </dt>
            <dd className="mt-2 pl-7 text-base leading-7 text-zinc-600 dark:text-zinc-300">{item.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
