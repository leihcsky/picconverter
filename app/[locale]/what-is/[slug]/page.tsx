import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SEOHead } from "@/components/seo/SEOHead";
import { InternalLinks } from "@/components/seo/InternalLinks";
import { WHAT_IS_PAGES } from "@/data/seo/what-is-pages";
import {
  DEFAULT_LOCALE,
  isSupportedLocale,
  localizedPath,
  SUPPORTED_LOCALES,
  type AppLocale,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) => WHAT_IS_PAGES.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = WHAT_IS_PAGES.find((p) => p.slug === slug);
  if (!isSupportedLocale(locale) || !page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: localizedPath(locale, `/what-is/${slug}`) },
  };
}

export default async function LocalizedWhatIsPage({ params }: Props) {
  const { locale, slug } = await params;
  const page = WHAT_IS_PAGES.find((p) => p.slug === slug);
  if (!isSupportedLocale(locale) || !page) notFound();

  const safeLocale: AppLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
  const t = getDictionary(safeLocale);

  return (
    <>
      <SEOHead title={page.title} description={page.description} />
      <article className="prose prose-zinc max-w-none dark:prose-invert">
        <p>{page.description}</p>
        <p>
          <Link href={localizedPath(safeLocale, "/")} className="text-brand">
            {t.tryPicConverter}
          </Link>
        </p>
      </article>
      <InternalLinks locale={safeLocale} />
    </>
  );
}
