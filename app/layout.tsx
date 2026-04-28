import type { Metadata } from "next";
import Script from "next/script";
import "@/styles/globals.css";
import { getSiteUrlObject } from "@/lib/siteUrl";

export const metadata: Metadata = {
  metadataBase: getSiteUrlObject(),
  title: {
    default: "PicConverter — free online image converter",
    template: "%s | PicConverter",
  },
  description:
    "Convert images online in your browser with PicConverter. Fast, private, and easy to use with no install required.",
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
    title: "PicConverter — free online image converter",
    description:
      "Convert images online in your browser. Fast, private, and easy to use.",
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
