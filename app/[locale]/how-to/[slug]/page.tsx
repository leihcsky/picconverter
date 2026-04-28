import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SEOHead } from "@/components/seo/SEOHead";
import { InternalLinks } from "@/components/seo/InternalLinks";
import { FAQ } from "@/components/seo/FAQ";
import { HowToAvifGuideBody } from "@/components/seo/HowToAvifGuideBody";
import { HOW_TO_PAGES } from "@/data/seo/how-to-pages";
import { howToConvertAvifToJpgFaq, howToConvertAvifToJpgHowToSteps } from "@/data/seo/how-to-convert-avif-jpg";
import {
  DEFAULT_LOCALE,
  isSupportedLocale,
  localizedPath,
  SUPPORTED_LOCALES,
  type AppLocale,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { getSiteUrl } from "@/lib/siteUrl";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) => HOW_TO_PAGES.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = HOW_TO_PAGES.find((p) => p.slug === slug);
  if (!isSupportedLocale(locale) || !page) return {};
  const languages = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [l, localizedPath(l, `/how-to/${slug}`)])
  );
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: localizedPath(locale, `/how-to/${slug}`),
      languages: {
        ...languages,
        "x-default": `/how-to/${slug}`,
      },
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: localizedPath(locale, `/how-to/${slug}`),
      siteName: "PicConverter",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}

export default async function LocalizedHowToPage({ params }: Props) {
  const { locale, slug } = await params;
  const page = HOW_TO_PAGES.find((p) => p.slug === slug);
  if (!isSupportedLocale(locale) || !page) notFound();

  const safeLocale: AppLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
  const t = getDictionary(safeLocale);
  const isAvifGuide = slug === "convert-avif-to-jpg";
  const base = getSiteUrl();
  const path = localizedPath(safeLocale, `/how-to/${slug}`);
  const canonical = `${base}${path}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: howToConvertAvifToJpgFaq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to convert AVIF to JPG",
    description: page.description,
    totalTime: "PT2M",
    tool: [{ "@type": "HowToTool", name: "PicConverter" }],
    supply: [{ "@type": "HowToSupply", name: "AVIF image file" }],
    step: howToConvertAvifToJpgHowToSteps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${base}${localizedPath(safeLocale, "/")}` },
      { "@type": "ListItem", position: 2, name: page.title, item: canonical },
    ],
  };

  const convertHref = localizedPath(safeLocale, "/convert/avif-to-jpg");

  return (
    <>
      <SEOHead title={page.title} description={page.description} centered={isAvifGuide} />
      {isAvifGuide ? (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
          <HowToAvifGuideBody convertHref={convertHref} />
          <FAQ items={howToConvertAvifToJpgFaq} />
        </>
      ) : (
        <article className="prose prose-lg prose-zinc mx-auto max-w-3xl dark:prose-invert">
          <p>This how-to page is being expanded. Use the related converter below for direct image conversion.</p>
          <ul>
            <li>
              <Link href={convertHref}>AVIF to JPG</Link>
            </li>
            <li>
              <Link href={localizedPath(safeLocale, "/convert/webp-to-png")}>WebP to PNG</Link>
            </li>
          </ul>
        </article>
      )}
      <InternalLinks locale={safeLocale} />
      <p className="mt-6 text-sm">
        <Link href={localizedPath(safeLocale, "/")} className="text-brand hover:underline">
          ← {t.backHome}
        </Link>
      </p>
    </>
  );
}
