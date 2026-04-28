import type { Metadata } from "next";
import { ConverterTool } from "@/components/converter/ConverterTool";
import { SellingPoints, StyledSteps } from "@/components/seo/ContentSections";
import { FAQ } from "@/components/seo/FAQ";
import { InternalLinks } from "@/components/seo/InternalLinks";
import { SEOHead } from "@/components/seo/SEOHead";
import {
  DEFAULT_LOCALE,
  isSupportedLocale,
  localizedPath,
  SUPPORTED_LOCALES,
  type AppLocale,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { getSiteUrl } from "@/lib/siteUrl";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale: AppLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
  const t = getDictionary(safeLocale);
  return {
    title: t.homeTitle,
    description: t.homeDescription,
    alternates: {
      canonical: localizedPath(safeLocale, "/"),
      languages: {
        en: localizedPath("en", "/"),
        fr: localizedPath("fr", "/"),
        de: localizedPath("de", "/"),
        "x-default": "/",
      },
    },
    openGraph: {
      title: t.homeTitle,
      description: t.homeDescription,
      url: localizedPath(safeLocale, "/"),
      siteName: "PicConverter",
      type: "website",
    },
  };
}

export default async function LocalizedHomePage({ params }: Props) {
  const { locale } = await params;
  const safeLocale: AppLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
  const t = getDictionary(safeLocale);

  const homeFaq = [
    {
      q: "Is this image converter free to use?",
      a: "Yes. PicConverter is a free online image converter for standard image conversion tasks, and you can start using it immediately without creating an account.",
    },
    {
      q: "Does this image converter upload my files?",
      a: "No, in the normal workflow your image is processed locally in your browser instead of being uploaded to a remote conversion server.",
    },
    {
      q: "What image formats are supported?",
      a: "This image converter currently supports common web image formats such as AVIF, WebP, PNG, and JPG/JPEG, with compatibility depending on browser capabilities.",
    },
    {
      q: "Will conversion reduce image quality?",
      a: "Output quality depends on source format and target format. For daily usage, PicConverter balances clarity and file size for practical sharing and publishing.",
    },
    {
      q: "Can I use PicConverter on mobile and desktop?",
      a: "Yes. PicConverter works in modern browsers on desktop and mobile platforms using the same upload-convert-download workflow.",
    },
    {
      q: "Why does URL import sometimes fail?",
      a: "Some image hosts block automated remote fetch requests. If URL import fails, download the image locally first, then upload directly.",
    },
  ];
  const homeSellingPoints = [
    { title: "High-Quality Output", description: "Balanced quality and file size for daily use.", icon: "quality" as const },
    {
      title: "Fast and Free",
      description:
        "Convert files quickly with a lightweight browser workflow and no account barrier, making this image converter easy for one-off tasks and daily usage.",
      icon: "speed" as const,
    },
    {
      title: "Simple to Use",
      description:
        "The image converter interface is built for clarity: choose or paste an image, select output format, convert, and download in just a few steps.",
      icon: "simple" as const,
    },
    {
      title: "Secure Conversion",
      description: "Core conversion processing happens in-browser, so your files stay in your local session during normal use.",
      icon: "secure" as const,
    },
    {
      title: "Cross-Platform Support",
      description:
        "Use this image converter on desktop and mobile browsers with a consistent flow, whether you are working on client files or personal images.",
      icon: "device" as const,
    },
    {
      title: "Practical Format Coverage",
      description:
        "Dedicated converter pages and presets help you move between modern and widely supported formats without manual setup.",
      icon: "seo" as const,
    },
  ];
  const base = getSiteUrl();
  const homePath = localizedPath(safeLocale, "/");
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PicConverter",
    url: `${base}${homePath}`,
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
    description: t.homeDescription,
    featureList: homeSellingPoints.map((s) => s.title),
    url: `${base}${homePath}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <SEOHead title={t.homeTitle} description={t.homeDescription} centered />
      <section className="mb-10">
        <h2 className="sr-only">{t.mainConverter}</h2>
        <ConverterTool defaultTo="jpg" lockOutput={false} />
      </section>
      <section className="mt-12" aria-labelledby="formats">
        <h2 id="formats" className="text-xl font-semibold text-zinc-900 dark:text-white">
          {t.formatCategories}
        </h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{t.formatDescription}</p>
      </section>
      <SellingPoints title="Why use this image converter" points={homeSellingPoints} />
      <StyledSteps
        title="How this image converter works"
        steps={["Upload your image file.", "Choose output format and click Convert.", "Download the converted image."]}
      />
      <FAQ items={homeFaq} heading={t.faqTitle} />
      <InternalLinks locale={safeLocale} />
    </>
  );
}
