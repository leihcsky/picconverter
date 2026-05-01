import type { Metadata } from "next";
import { Layout } from "@/components/layout/Layout";
import { ConverterTool } from "@/components/converter/ConverterTool";
import { SellingPoints, StyledSteps } from "@/components/seo/ContentSections";
import { FAQ } from "@/components/seo/FAQ";
import { InternalLinks } from "@/components/seo/InternalLinks";
import { SEOHead } from "@/components/seo/SEOHead";
import { getSiteUrl } from "@/lib/siteUrl";

export const metadata: Metadata = {
  title: "Free online image converter",
  description:
    "Free image converter for AVIF, WebP, PNG & JPEG in your browser: upload, pick output, download. Private default path; dedicated pages for popular pairs.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Free online image converter",
    description:
      "Free image converter for AVIF, WebP, PNG & JPEG in your browser: upload, pick output, download. Private path; dedicated pages for popular pairs.",
    url: "/",
    siteName: "PicConverter",
    type: "website",
  },
};

const homeFaq = [
  {
    q: "Is this image converter free to use?",
    a: "Yes. PicConverter is a free online image converter for standard image conversion tasks, and you can start using it immediately without creating an account. The basic workflow is designed for quick everyday use such as preparing images for websites, documents, and sharing.",
  },
  {
    q: "Does this image converter upload my files?",
    a: "No, in the normal workflow your image is processed locally in your browser. That means files are not sent to a remote conversion server for the core conversion path, which helps protect privacy and reduces waiting time when using this image converter.",
  },
  {
    q: "What image formats are supported?",
    a: "This image converter supports common web and modern image types including AVIF, WebP, PNG, and JPG/JPEG in the current experience. Support may vary slightly by browser capabilities, especially for advanced decode paths.",
  },
  {
    q: "Will conversion reduce image quality?",
    a: "Quality depends on the source and output format. Lossy formats can reduce fine detail to save size, while other conversions preserve more detail but can produce larger files. For typical web and sharing use cases, output quality is tuned to remain visually clear.",
  },
  {
    q: "Can I use PicConverter on mobile and desktop?",
    a: "Yes. PicConverter runs in modern browsers on Windows, macOS, Linux, iOS, and Android. You can use the same upload-convert-download flow across devices without installing extra software.",
  },
  {
    q: "Why does URL import sometimes fail?",
    a: "Some external image hosts block automated fetch requests or apply restrictive policies. If URL import fails, try downloading the image locally and uploading it directly, which is usually the most reliable path.",
  },
];

export default function HomePage() {
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
      description:
        "Core conversion processing happens in-browser, so your files stay in your local session during normal use.",
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
    url: base,
    potentialAction: {
      "@type": "SearchAction",
      target: `${base}/convert/{query}`,
      "query-input": "required name=query",
    },
  };
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PicConverter",
    url: base,
    logo: `${base}/logo.svg`,
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
    description:
      "Online image converter for AVIF, WebP, PNG, and JPG with a fast browser-based workflow.",
    featureList: homeSellingPoints.map((s) => s.title),
    url: base,
  };

  return (
    <Layout locale="en">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <SEOHead
        title="Free online image converter"
        description="Free image converter for AVIF, WebP, PNG & JPEG in your browser: upload, pick output, download. Private path; dedicated pages for popular pairs."
        centered
      />
      <section className="mb-10">
        <h2 className="sr-only">Main converter</h2>
        <ConverterTool defaultTo="jpg" lockOutput={false} />
      </section>
      <section className="mt-12" aria-labelledby="formats">
        <h2 id="formats" className="text-xl font-semibold text-zinc-900 dark:text-white">
          Image converter format guide
        </h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          AVIF and WebP excel at smaller web files; PNG keeps transparency and sharp UI edges; JPEG is still the safest attachment format when recipients use mixed software. Use this hub when you already know the output, or open a dedicated converter page when you need copy, FAQs, and steps tailored to one pair—such as AVIF→JPG for CMS uploads or WebP→PNG for design imports.
        </p>
      </section>
      <SellingPoints title="Why use this image converter" points={homeSellingPoints} />
      <StyledSteps
        title="How this image converter works"
        steps={["Upload your image file.", "Choose output format and click Convert.", "Download the converted image."]}
      />
      <FAQ items={homeFaq} />
      <InternalLinks />
    </Layout>
  );
}
