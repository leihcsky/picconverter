import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Layout } from "@/components/layout/Layout";
import { isSupportedLocale } from "@/lib/i18n/config";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();

  return <Layout locale={locale}>{children}</Layout>;
}
