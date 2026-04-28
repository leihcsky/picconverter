import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/lib/i18n/config";

function hasLocalePrefix(pathname: string): boolean {
  return SUPPORTED_LOCALES.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!hasLocalePrefix(pathname)) return NextResponse.next();

  // Keep explicit locale prefixes for non-default locales, but canonicalize `/en/*` to no prefix.
  if (pathname === `/${DEFAULT_LOCALE}` || pathname.startsWith(`/${DEFAULT_LOCALE}/`)) {
    const url = req.nextUrl.clone();
    const rest = pathname.slice(`/${DEFAULT_LOCALE}`.length);
    url.pathname = rest.length > 0 ? rest : "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico|sitemap.xml|robots.txt).*)"],
};
