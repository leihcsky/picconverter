import type { ConvertSlug } from "@/data/seo/convert-pages";

export type SeoFaqItem = { q: string; a: string };

export type ConvertSeoEntry = {
  h1: string;
  title: string;
  description: string;
  whyConvert: string;
  howItWorks: string;
  whyUse: string;
  howToSteps: string[];
  keyFeatures: string[];
  faq: SeoFaqItem[];
};

const defaultFaq = (from: string, to: string): SeoFaqItem[] => [
  {
    q: `Why convert ${from} to ${to}?`,
    a: `Converting ${from.toUpperCase()} to ${to.toUpperCase()} helps when you need broader compatibility, smaller delivery friction, or a format that fits your workflow. Some formats are excellent for compression but not fully supported in older apps, office tools, CMS editors, or social upload pipelines. By exporting to ${to.toUpperCase()}, you can share files more reliably across browsers, mobile devices, design tools, and messaging platforms.`,
  },
  {
    q: `What is ${from}?`,
    a: `${from.toUpperCase()} is an image format used to store digital pictures, often optimized for quality, compression, or web delivery. Depending on the format, you may get smaller files, better color detail, or transparency support. However, real-world compatibility still differs between platforms, so converting to another format can be useful when sharing with clients, uploading to specific websites, or opening files in older software.`,
  },
  {
    q: "Will conversion reduce image quality?",
    a: "Image quality can change during conversion depending on the source format, output format, and compression behavior. Lossy formats may discard fine detail to reduce file size, while lossless workflows preserve more information but can produce larger files. For common use cases such as web publishing, documentation, and social sharing, PicConverter targets practical output quality so files remain clear while staying easy to distribute.",
  },
  {
    q: `Is ${to} more compatible across devices and apps?`,
    a: `${to.toUpperCase()} is generally well supported across modern browsers, operating systems, messaging tools, and content platforms. This wider compatibility is often the main reason users convert from newer or niche formats. If you need predictable behavior across Windows, macOS, Android, iOS, office suites, and legacy upload systems, ${to.toUpperCase()} is often a safer delivery format.`,
  },
  {
    q: "Can I use this tool on Windows, macOS, iPhone, or Android?",
    a: "Yes. PicConverter runs in the browser, so it works on Windows, macOS, Linux, iPhone, iPad, and Android when using a modern browser. You do not need to install desktop software or mobile apps to perform basic format conversion. Performance may vary by device memory and image size, but the workflow stays the same across platforms.",
  },
  {
    q: "What file size limits are supported?",
    a: "There is no account-based upload quota in the current MVP workflow because files are processed locally in your browser. The practical limit depends on your device memory, browser capabilities, and image dimensions. Very large images may convert more slowly or fail on low-memory devices, so reducing source resolution or converting in smaller batches can improve reliability.",
  },
  {
    q: "Is conversion done on your servers?",
    a: "No. PicConverter performs conversion in your browser session, and the default flow does not upload your images to a backend conversion pipeline. This model improves privacy and can also reduce wait time because there is no server upload queue for normal usage.",
  },
  {
    q: "Why did my conversion fail?",
    a: "Conversion can fail for several reasons: unsupported source encoding variants, memory pressure on the device, browser process interruption, or unusually large dimensions. If a file fails, try refreshing the page, using a modern browser version, reducing source size, or converting one file at a time. In many cases, these steps resolve temporary conversion failures.",
  },
];

function entry(
  from: string,
  to: string,
  extra?: Partial<Omit<ConvertSeoEntry, "title" | "description">>
): ConvertSeoEntry {
  const h1 = `Convert ${from} to ${to} online for free`;
  const title = `Convert ${from} to ${to} online free`;
  const description = `Free ${from} to ${to} converter in the browser. Fast, private, no install.`;
  return {
    h1,
    title,
    description,
    whyConvert: `Switch from ${from} to ${to} when you need broader compatibility or a different workflow.`,
    howItWorks:
      "Upload your image, choose output format, convert, then download. All processing happens locally in your tab.",
    whyUse:
      "Use this converter when you need a fast, private workflow with no account, no upload queue, and no software installation.",
    howToSteps: [
      `Upload your ${from} file.`,
      `Confirm ${to} as output format.`,
      "Click Convert and wait for processing to finish.",
      `Download your new ${to} image.`,
    ],
    keyFeatures: [
      "Browser-based conversion with no sign-up",
      "Private processing in your current tab",
      "Simple one-file workflow for quick tasks",
      "Preset landing pages for common format pairs",
    ],
    faq: defaultFaq(from, to),
    ...extra,
  };
}

export const seoMap: Partial<Record<ConvertSlug, ConvertSeoEntry>> = {
  "avif-to-jpg": entry("AVIF", "JPG", {
    faq: [
      {
        q: "What is an AVIF file?",
        a: "AVIF (AV1 Image File Format) is a modern image format designed to provide strong compression efficiency while keeping high visual quality. It is based on AV1 codec technology and is popular for web performance use cases where smaller file sizes matter. AVIF can support rich color depth and transparency, but compatibility can still vary depending on the app, platform, or publishing system.",
      },
      {
        q: "Why convert AVIF to JPG?",
        a: "Many users convert AVIF to JPG because JPG is universally recognized by legacy software, office tools, CMS editors, and social upload workflows. If a recipient cannot open AVIF directly, a JPG export avoids friction and reduces support issues. Converting to JPG is especially useful when sharing with mixed device environments or non-technical stakeholders.",
      },
      {
        q: "Will converting AVIF to JPG affect image quality?",
        a: "JPG uses lossy compression, which means some detail may be removed to keep file sizes practical. In most everyday scenarios, output remains visually strong for web pages, documents, and messaging. If your use case is highly detail-sensitive (for example, print production or archival workflows), you may want to compare outputs and keep the original AVIF as a master file.",
      },
      {
        q: "Is AVIF to JPG conversion compatible with all platforms?",
        a: "The resulting JPG is broadly compatible with Windows, macOS, iOS, Android, web browsers, and most image editors. That broad compatibility is why JPG is commonly used as a delivery format. Even when AVIF support is limited in a specific app, JPG output usually opens without extra plugins.",
      },
      {
        q: "Is my AVIF image uploaded to a server?",
        a: "No. Conversion happens locally in your browser, and your AVIF file is not sent to a remote conversion server in the normal workflow. This approach improves privacy and also avoids upload wait time.",
      },
      {
        q: "What if AVIF to JPG conversion does not complete?",
        a: "If conversion does not complete, try refreshing the page, reopening the file, or testing with a smaller image to reduce memory pressure. Using an up-to-date browser can also help because AVIF decode support continues to improve. If one file fails repeatedly, it may contain an uncommon encoding variant, so re-exporting the source from another tool can resolve the issue.",
      },
    ],
  }),
  "avif-to-png": entry("AVIF", "PNG"),
  "avif-to-webp": entry("AVIF", "WebP"),
  "webp-to-jpg": entry("WebP", "JPG"),
  "webp-to-png": entry("WebP", "PNG"),
  "webp-to-avif": entry("WebP", "AVIF"),
  "png-to-jpg": entry("PNG", "JPG"),
  "png-to-webp": entry("PNG", "WebP"),
  "png-to-avif": entry("PNG", "AVIF"),
  "jpg-to-png": entry("JPG", "PNG"),
  "jpg-to-webp": entry("JPG", "WebP"),
  "jpeg-to-png": entry("JPEG", "PNG"),
};

export function getConvertSeo(slug: ConvertSlug): ConvertSeoEntry {
  return (
    seoMap[slug] ??
    entry(slug.split("-to-")[0]?.toUpperCase() ?? "Image", slug.split("-to-")[1]?.toUpperCase() ?? "Image")
  );
}
