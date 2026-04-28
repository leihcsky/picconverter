import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Layout } from "@/components/layout/Layout";
import { ConverterTool } from "@/components/converter/ConverterTool";
import { IntroCard, SellingPoints, StyledSteps } from "@/components/seo/ContentSections";
import { FAQ } from "@/components/seo/FAQ";
import { InternalLinks } from "@/components/seo/InternalLinks";
import { SEOHead } from "@/components/seo/SEOHead";
import { CONVERT_SLUGS, type ConvertSlug } from "@/data/seo/convert-pages";
import { localizedPath, SUPPORTED_LOCALES } from "@/lib/i18n/config";
import { getConvertSeo } from "@/lib/seoMap";
import { parseConvertSlug } from "@/lib/slug";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CONVERT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!CONVERT_SLUGS.includes(slug as ConvertSlug)) return {};
  const seo = getConvertSeo(slug as ConvertSlug);
  const languages = Object.fromEntries(
    SUPPORTED_LOCALES.map((locale) => [locale, localizedPath(locale, `/convert/${slug}`)])
  );
  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: `/convert/${slug}`,
      languages: {
        ...languages,
        "x-default": `/convert/${slug}`,
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `/convert/${slug}`,
      siteName: "PicConverter",
      type: "website",
    },
  };
}

export default async function ConvertPage({ params }: Props) {
  const { slug } = await params;
  if (!CONVERT_SLUGS.includes(slug as ConvertSlug)) notFound();

  const pair = parseConvertSlug(slug);
  if (!pair) notFound();

  const seo = getConvertSeo(slug as ConvertSlug);
  const out = pair.to === "jpeg" ? "jpg" : pair.to;
  const sellingPoints = [
    {
      title: "High-Quality Output",
      description:
        "The converter targets practical clarity for websites, documents, and social sharing, so converted images stay visually clean in normal viewing scenarios.",
      icon: "quality" as const,
    },
    {
      title: "Fast and Free",
      description:
        "Conversion runs instantly in your browser with no paywall for core usage, helping you finish quick format tasks without extra setup time.",
      icon: "speed" as const,
    },
    {
      title: "Simple to Use",
      description:
        "The workflow is intentionally short: upload, convert, and download. This keeps the tool approachable for non-technical users and fast for repeat tasks.",
      icon: "simple" as const,
    },
    {
      title: "Secure Conversion",
      description:
        "Files are processed in your active browser session rather than sent to a remote conversion queue, which is useful for privacy-sensitive image handling.",
      icon: "secure" as const,
    },
    {
      title: "Cross-Platform Support",
      description:
        "Use the same conversion flow on Windows, macOS, Linux, iOS, and Android in modern browsers, so your workflow remains consistent across devices.",
      icon: "device" as const,
    },
    {
      title: "No Sign-up Needed",
      description:
        "You can start converting immediately without account creation, email verification, or trial gates, which reduces friction for one-off and daily use.",
      icon: "signup" as const,
    },
  ];
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://picconverter.cc";
  const pageUrl = `${base}/convert/${slug}`;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: seo.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to convert ${pair.from.toUpperCase()} to ${pair.to.toUpperCase()}`,
    description: seo.howItWorks,
    totalTime: "PT1M",
    supply: [{ "@type": "HowToSupply", name: `${pair.from.toUpperCase()} image` }],
    tool: [{ "@type": "HowToTool", name: "PicConverter" }],
    step: seo.howToSteps.map((step, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: step,
      text: step,
    })),
  };
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PicConverter",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: sellingPoints.map((s) => s.title),
    description: seo.description,
    url: pageUrl,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base },
      { "@type": "ListItem", position: 2, name: "Convert", item: `${base}/convert/avif-to-jpg` },
      { "@type": "ListItem", position: 3, name: `${pair.from.toUpperCase()} to ${pair.to.toUpperCase()}`, item: pageUrl },
    ],
  };
  return (
    <Layout locale="en">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="py-2">
        <SEOHead title={seo.h1} description={seo.description} centered />
        <ul className="mx-auto mt-2 flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-base text-zinc-700 dark:text-zinc-300">
          {["Fast conversion", "No sign-up", "Private processing", "Cross-platform use"].map((item) => (
            <li key={item} className="inline-flex items-center gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand/15 text-brand dark:bg-brand/25 dark:text-brand-muted">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-3.5 w-3.5">
                  <path d="m5 12 4 4 10-10" />
                </svg>
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mx-auto mt-8 max-w-3xl">
          <ConverterTool key={slug} defaultTo={out} lockOutput />
        </div>
      </section>
      <IntroCard title="Why convert" content={seo.whyConvert} />
      <IntroCard title="How it works" content={seo.howItWorks} />
      <StyledSteps title={`How to convert ${pair.from.toUpperCase()} to ${pair.to.toUpperCase()}`} steps={seo.howToSteps} />
      <SellingPoints title="Why use this converter" points={sellingPoints} />
      <section className="mt-14" aria-labelledby="key-features">
        <h2 id="key-features" className="text-2xl font-semibold text-zinc-900 dark:text-white">
          Key features
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {seo.keyFeatures.map((feature) => (
            <li key={feature} className="rounded-xl bg-zinc-50 p-4 text-base text-zinc-700 dark:bg-zinc-800/70 dark:text-zinc-300">
              <span className="inline-flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand/15 text-brand dark:bg-brand/25 dark:text-brand-muted">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-3.5 w-3.5">
                    <path d="m5 12 4 4 10-10" />
                  </svg>
                </span>
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </section>
      <p className="mt-12 text-sm">
        <Link href="/" className="text-brand hover:underline">
          ← Back to PicConverter home
        </Link>
      </p>
      <FAQ items={seo.faq} />
      <InternalLinks currentSlug={slug} />
    </Layout>
  );
}
