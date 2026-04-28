import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Layout } from "@/components/layout/Layout";
import { WHAT_IS_PAGES } from "@/data/seo/what-is-pages";
import { SEOHead } from "@/components/seo/SEOHead";
import { InternalLinks } from "@/components/seo/InternalLinks";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return WHAT_IS_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = WHAT_IS_PAGES.find((p) => p.slug === slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/what-is/${slug}` },
  };
}

export default async function WhatIsPage({ params }: Props) {
  const { slug } = await params;
  const page = WHAT_IS_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();

  return (
    <Layout locale="en">
      <SEOHead title={page.title} description={page.description} />
      <article className="prose prose-zinc max-w-none dark:prose-invert">
        <p>{page.description}</p>
        <p>
          <Link href="/" className="text-brand">
            Try PicConverter
          </Link>
        </p>
      </article>
      <InternalLinks />
    </Layout>
  );
}
