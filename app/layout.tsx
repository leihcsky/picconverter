import type { Metadata } from "next";
import Script from "next/script";
import "@/styles/globals.css";
import { getSiteUrlObject } from "@/lib/siteUrl";

export const metadata: Metadata = {
  metadataBase: getSiteUrlObject(),
  title: "Free online image converter & format tools",
  description:
    "Convert AVIF, WebP, PNG & JPEG in your browser: upload, pick output, download. Fast, private, no install.",
  applicationName: "PicConverter",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Free online image converter & format tools",
    description: "Convert AVIF, WebP, PNG & JPEG in your browser—fast, private, no install.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    siteName: "PicConverter",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Q32SXERW1M"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Q32SXERW1M');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
