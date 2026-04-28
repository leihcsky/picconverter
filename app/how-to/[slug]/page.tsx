import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Layout } from "@/components/layout/Layout";
import { HOW_TO_PAGES } from "@/data/seo/how-to-pages";
import { howToConvertAvifToJpgFaq, howToConvertAvifToJpgHowToSteps } from "@/data/seo/how-to-convert-avif-jpg";
import { SEOHead } from "@/components/seo/SEOHead";
import { InternalLinks } from "@/components/seo/InternalLinks";
import { FAQ } from "@/components/seo/FAQ";
import { HowToAvifGuideBody } from "@/components/seo/HowToAvifGuideBody";
import { localizedPath, SUPPORTED_LOCALES } from "@/lib/i18n/config";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return HOW_TO_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = HOW_TO_PAGES.find((p) => p.slug === slug);
  if (!page) return {};
  const languages = Object.fromEntries(
    SUPPORTED_LOCALES.map((locale) => [locale, localizedPath(locale, `/how-to/${slug}`)])
  );
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/how-to/${slug}`,
      languages: {
        ...languages,
        "x-default": `/how-to/${slug}`,
      },
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `/how-to/${slug}`,
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

export default async function HowToPage({ params }: Props) {
  const { slug } = await params;
  const page = HOW_TO_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();

  const isAvifGuide = slug === "convert-avif-to-jpg";
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://picconverter.cc";
  const canonical = `${base}/how-to/${slug}`;

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
      { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
      { "@type": "ListItem", position: 2, name: page.title, item: canonical },
    ],
  };

  return (
    <Layout locale="en">
      <SEOHead title={page.title} description={page.description} centered={isAvifGuide} />
      {isAvifGuide ? (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
          <HowToAvifGuideBody convertHref="/convert/avif-to-jpg" />
          <FAQ items={howToConvertAvifToJpgFaq} />
        </>
      ) : (
        <article className="prose prose-lg prose-zinc mx-auto max-w-3xl dark:prose-invert">
          <p>This how-to page is being expanded. Use the related converter below for direct image conversion.</p>
          <ul>
            <li>
              <Link href="/convert/avif-to-jpg">AVIF to JPG</Link>
            </li>
            <li>
              <Link href="/convert/webp-to-png">WebP to PNG</Link>
            </li>
          </ul>
        </article>
      )}
      <InternalLinks locale="en" />
    </Layout>
  );
}
