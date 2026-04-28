import { CONVERT_SLUGS } from "@/data/seo/convert-pages";
import { HOW_TO_PAGES } from "@/data/seo/how-to-pages";
import { WHAT_IS_PAGES } from "@/data/seo/what-is-pages";
import { localizedPath, SUPPORTED_LOCALES } from "@/lib/i18n/config";
import { getSiteUrl } from "@/lib/siteUrl";

function xmlEscape(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function GET() {
  const base = getSiteUrl();
  const urls: string[] = [];
  for (const locale of SUPPORTED_LOCALES) {
    urls.push(`${base}${localizedPath(locale, "/")}`);
    for (const slug of CONVERT_SLUGS) urls.push(`${base}${localizedPath(locale, `/convert/${slug}`)}`);
    for (const p of HOW_TO_PAGES) urls.push(`${base}${localizedPath(locale, `/how-to/${p.slug}`)}`);
    for (const p of WHAT_IS_PAGES) urls.push(`${base}${localizedPath(locale, `/what-is/${p.slug}`)}`);
  }

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urls
      .map(
        (loc) =>
          `<url><loc>${xmlEscape(loc)}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`
      )
      .join("") +
    `</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
