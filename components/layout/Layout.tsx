import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function Layout({ children, locale = "en" }: { children: ReactNode; locale?: string }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header locale={locale} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12">{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
