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
  const lastmod = new Date().toISOString();
  const urls: Array<{ loc: string; changefreq: "daily" | "weekly" | "monthly"; priority: string }> = [];

  const pushUrl = (loc: string, changefreq: "daily" | "weekly" | "monthly", priority: string) => {
    urls.push({ loc, changefreq, priority });
  };

  for (const locale of SUPPORTED_LOCALES) {
    // Main pages
    pushUrl(`${base}${localizedPath(locale, "/")}`, "daily", "1.0");

    // Tool landing pages
    for (const slug of CONVERT_SLUGS) {
      pushUrl(`${base}${localizedPath(locale, `/convert/${slug}`)}`, "weekly", "0.9");
    }

    // Informational pages
    for (const p of HOW_TO_PAGES) {
      pushUrl(`${base}${localizedPath(locale, `/how-to/${p.slug}`)}`, "weekly", "0.8");
    }
    for (const p of WHAT_IS_PAGES) {
      pushUrl(`${base}${localizedPath(locale, `/what-is/${p.slug}`)}`, "monthly", "0.7");
    }
  }

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urls
      .map(
        (item) =>
          `<url><loc>${xmlEscape(item.loc)}</loc><lastmod>${lastmod}</lastmod><changefreq>${item.changefreq}</changefreq><priority>${item.priority}</priority></url>`
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
