import type { ConvertSlug } from "@/data/seo/convert-pages";
import type { IconKey } from "@/components/seo/ContentSections";

export type SeoFaqItem = { q: string; a: string };

export type ConvertSellingPoint = {
  title: string;
  description: string;
  icon: IconKey;
};

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
  /** Hero trust line items under H1 */
  trustBullets?: string[];
  /** “Why use this converter” cards — unique per tool when set */
  sellingPoints?: ConvertSellingPoint[];
};

const DEFAULT_TRUST = ["Fast conversion", "No sign-up", "Private processing", "Cross-platform use"];

const DEFAULT_SELLING: ConvertSellingPoint[] = [
  {
    title: "High-Quality Output",
    description:
      "The converter targets practical clarity for websites, documents, and social sharing, so converted images stay visually clean in normal viewing scenarios.",
    icon: "quality",
  },
  {
    title: "Fast and Free",
    description:
      "Conversion runs instantly in your browser with no paywall for core usage, helping you finish quick format tasks without extra setup time.",
    icon: "speed",
  },
  {
    title: "Simple to Use",
    description:
      "The workflow is intentionally short: upload, convert, and download. This keeps the tool approachable for non-technical users and fast for repeat tasks.",
    icon: "simple",
  },
  {
    title: "Secure Conversion",
    description:
      "Files are processed in your active browser session rather than sent to a remote conversion queue, which is useful for privacy-sensitive image handling.",
    icon: "secure",
  },
  {
    title: "Cross-Platform Support",
    description:
      "Use the same conversion flow on Windows, macOS, Linux, iOS, and Android in modern browsers, so your workflow remains consistent across devices.",
    icon: "device",
  },
  {
    title: "No Sign-up Needed",
    description:
      "You can start converting immediately without account creation, email verification, or trial gates, which reduces friction for one-off and daily use.",
    icon: "signup",
  },
];

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
    a: "There is no account-based upload quota in the current workflow because files are processed locally in your browser. The practical limit depends on your device memory, browser capabilities, and image dimensions. Very large images may convert more slowly or fail on low-memory devices, so reducing source resolution or converting in smaller batches can improve reliability.",
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
  const description = `Free ${from} to ${to} in-browser converter. Fast, private, no install.`;
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
      `Confirm ${to} as the output format.`,
      `Click Convert, wait for processing to finish, then download your new ${to} image.`,
    ],
    keyFeatures: [
      "Browser-based conversion with no sign-up",
      "Private processing in your current tab",
      "Simple one-file workflow for quick tasks",
      "Preset landing pages for common format pairs",
    ],
    faq: defaultFaq(from, to),
    trustBullets: DEFAULT_TRUST,
    sellingPoints: DEFAULT_SELLING,
    ...extra,
  };
}

export const seoMap: Partial<Record<ConvertSlug, ConvertSeoEntry>> = {
  "avif-to-jpg": {
    h1: "Convert AVIF to JPG online for free",
    title: "Convert AVIF to JPG online free — fast browser converter",
    description:
      "Turn AVIF into JPG for email, CMS & legacy apps. Upload AVIF, export JPEG, download in-browser—private, no install.",
    whyConvert:
      "AVIF is excellent for small file sizes on the web, but JPG remains the most predictable format when recipients use mixed software versions. Converting AVIF to JPG is the practical fix when someone cannot preview AVIF in their viewer, when a publishing tool only accepts JPEG uploads, or when you want a universal attachment format for clients and stakeholders.",
    howItWorks:
      "PicConverter decodes your AVIF in the browser, draws pixels to a canvas, then encodes a new JPG you can download. You choose the file, pick JPG as the output, run conversion once, and save the result locally. No account is required, and the default path keeps processing in your tab rather than uploading the image to a conversion server.",
    whyUse:
      "This page is built specifically for the AVIF→JPEG handoff: fewer support tickets, fewer “I can’t open this file” moments, and a workflow that matches how teams actually share images today.",
    howToSteps: [
      "Upload your AVIF (drag-and-drop, file picker, paste from clipboard, or import a public image URL when supported).",
      "Confirm JPG as the output format so the result opens everywhere JPEG is accepted.",
      "Click Convert, wait until the download control appears, then save the JPG for email, documents, social posts, or legacy CMS uploads.",
    ],
    keyFeatures: [
      "AVIF-focused workflow with JPG as the delivery target",
      "Designed for compatibility-first sharing and uploads",
      "Private in-browser processing for normal conversion use",
      "Clear four-step flow: upload → confirm format → convert → download",
    ],
    trustBullets: ["AVIF decode in browser", "JPEG delivery format", "No install", "Works on desktop and mobile"],
    sellingPoints: [
      {
        title: "Built for the AVIF compatibility gap",
        description:
          "When AVIF is perfect for your site but wrong for your recipient, JPG is still the lowest-friction format. This converter focuses on that exact export path.",
        icon: "seo",
      },
      {
        title: "Quality tuned for real-world sharing",
        description:
          "JPEG is lossy by nature, but the goal here is practical clarity: readable text in screenshots, clean product thumbnails, and predictable color for everyday viewing.",
        icon: "quality",
      },
      {
        title: "Fast enough for daily tasks",
        description:
          "If you process images often, you want a short path from file-in-hand to file-ready-to-send. The UI stays minimal so you can repeat the workflow quickly.",
        icon: "speed",
      },
      {
        title: "Private by default",
        description:
          "The default conversion path runs locally in your browser session, which is helpful when you are handling client screenshots or internal documents.",
        icon: "secure",
      },
      {
        title: "Simple controls",
        description:
          "You should not need training to convert one image. Upload, choose JPG, convert, download—then move on with your day.",
        icon: "simple",
      },
      {
        title: "Use anywhere you have a modern browser",
        description:
          "Whether you are on Windows at work or iOS on the go, the same flow applies: open the page, convert, download.",
        icon: "device",
      },
    ],
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
  },

  "avif-to-png": {
    h1: "Convert AVIF to PNG online for free",
    title: "Convert AVIF to PNG online free — lossless-friendly export",
    description:
      "Export AVIF to PNG for transparency, design tools, and lossless workflows. Free browser converter: upload AVIF, download PNG — private, no install.",
    whyConvert:
      "PNG is still the default interchange format when you need lossless editing steps, alpha transparency, or predictable imports into design tools and screenshot pipelines. AVIF may be smaller on the web, but PNG is often the safer intermediate when you plan to mask, composite, or archive a pixel-perfect version before publishing.",
    howItWorks:
      "Your AVIF is decoded in the browser, rasterized to pixels, then written out as a PNG file you can download. Because PNG is typically larger than AVIF for photographic content, expect bigger downloads—that tradeoff is normal when you prioritize transparency and lossless-friendly workflows.",
    whyUse:
      "Use AVIF→PNG when your next step is editing, layering, or handing assets to a team that standardizes on PNG imports—even if the final web format will be AVIF or WebP later.",
    howToSteps: [
      "Upload an AVIF that contains the transparency or detail you need to preserve in PNG form.",
      "Select PNG as the output format when alpha channels matter.",
      "Convert, download the PNG, then continue masking, compositing, or exporting to other formats in your editor.",
    ],
    keyFeatures: [
      "PNG export path for transparency and design-tool compatibility",
      "Explains the typical AVIF vs PNG size tradeoff in practical terms",
      "Browser-based workflow without sign-up friction",
      "Useful bridge format between modern capture and classic tooling",
    ],
    trustBullets: ["Alpha-friendly PNG output", "No install", "Private in-browser processing", "Built for design handoffs"],
    sellingPoints: [
      {
        title: "When transparency matters more than smallest bytes",
        description:
          "If you need clean edges on logos, UI captures, or cutouts, PNG is still the most boring—and therefore most reliable—choice for many workflows.",
        icon: "quality",
      },
      {
        title: "A practical bridge from modern capture to classic tools",
        description:
          "Some teams still ingest PNG first, then export to web formats. This converter matches that real-world habit instead of forcing a single-format pipeline.",
        icon: "seo",
      },
      {
        title: "Private processing for screenshots and client assets",
        description:
          "Because conversion happens in your browser session in the default flow, you can avoid uploading sensitive captures to unknown servers.",
        icon: "secure",
      },
      {
        title: "Fast one-file workflow",
        description:
          "You are not configuring a batch server. Upload, convert, download—then return to Figma, Photoshop, or your CMS.",
        icon: "speed",
      },
      {
        title: "Simple enough for non-engineers",
        description:
          "If you just need a PNG on disk, you should not need command-line tools or codec tutorials.",
        icon: "simple",
      },
      {
        title: "Works across common desktop and mobile browsers",
        description:
          "Use the same flow on the machine where the file already lives—no install step required.",
        icon: "device",
      },
    ],
    faq: [
      {
        q: "Why would AVIF to PNG be larger than the AVIF?",
        a: "AVIF is often highly compressed for web delivery, while PNG stores pixels in a way that preserves detail and transparency more directly. For photographic images, PNG files are frequently larger—that is expected when you optimize for editability and alpha support instead of minimum transfer size.",
      },
      {
        q: "Does PNG support transparency from AVIF?",
        a: "If your AVIF includes transparency, exporting to PNG is a common way to preserve an alpha channel for tools that prefer PNG imports. Always verify the result in your target editor if your pipeline is pixel-sensitive.",
      },
      {
        q: "Is PNG better than JPG for screenshots?",
        a: "PNG is often better when you need sharp text and UI edges without JPEG ringing. JPG is usually smaller for photos but can introduce artifacts around high-contrast UI elements.",
      },
      {
        q: "Will I lose quality converting AVIF to PNG?",
        a: "PNG is typically lossless for this kind of raster export, but the output is still a flattened bitmap. The main quality risk is not PNG itself, but misunderstanding color management or scaling in downstream tools.",
      },
      {
        q: "Can I convert AVIF to PNG on mobile?",
        a: "Yes, in modern mobile browsers. Very large images may take longer or stress device memory, so resizing before conversion can help on phones.",
      },
      {
        q: "Is my file uploaded to a server?",
        a: "No. The default conversion path processes locally in your browser session rather than uploading your image to a remote conversion pipeline.",
      },
    ],
  },

  "avif-to-webp": {
    h1: "Convert AVIF to WebP online for free",
    title: "Convert AVIF to WebP online free — modern web image export",
    description:
      "Turn AVIF into WebP for CMS themes, CDNs, and responsive images. Free browser converter: upload AVIF, export WebP — private, no install.",
    whyConvert:
      "Teams sometimes end up with AVIF sources (exports, captures, or upstream deliveries) but need WebP for a specific build pipeline, WordPress plugin, or CDN rule. WebP also remains a pragmatic middle ground: broadly supported in modern browsers and often easier to standardize than juggling multiple next-gen formats across legacy templates.",
    howItWorks:
      "PicConverter reads your AVIF, renders the pixels, then encodes a WebP you can download. The intent is a straightforward handoff: same image intent, different container format—useful when your deployment target expects WebP assets even though your source arrived as AVIF.",
    whyUse:
      "Pick AVIF→WebP when your deployment checklist says WebP but your asset folder says AVIF—without installing heavyweight desktop batch tools for a single file.",
    howToSteps: [
      "Upload the AVIF asset you need to match to a WebP-oriented pipeline.",
      "Choose WebP as the output format.",
      "Convert, download the WebP, then replace the asset in your build or CMS and re-check page weight and cache headers.",
    ],
    keyFeatures: [
      "Focused on the AVIF→WebP deployment mismatch problem",
      "Useful when templates or plugins expect WebP assets",
      "Browser-based conversion without sign-up",
      "Private default workflow for normal use",
    ],
    trustBullets: ["WebP export", "Modern browser workflow", "No install", "Built for asset handoffs"],
    sellingPoints: [
      {
        title: "Solves the “wrong next-gen format” problem",
        description:
          "You should not have to rebuild an entire pipeline because one file arrived as AVIF when your system expects WebP.",
        icon: "seo",
      },
      {
        title: "Practical for CMS and static-site workflows",
        description:
          "Many publishing stacks still standardize on WebP for responsive images. This converter matches that reality.",
        icon: "device",
      },
      {
        title: "Fast for single assets",
        description:
          "When you only need one file converted, a browser tool often beats spinning up a local script environment.",
        icon: "speed",
      },
      {
        title: "Simple flow",
        description:
          "Upload, pick WebP, convert, download—then commit the asset and move on.",
        icon: "simple",
      },
      {
        title: "Privacy-friendly default path",
        description:
          "Keep routine marketing assets in your local session during conversion in the default workflow.",
        icon: "secure",
      },
      {
        title: "Quality expectations explained honestly",
        description:
          "WebP can be lossy or lossless depending on downstream usage; here the goal is a clean export for typical web publishing needs.",
        icon: "quality",
      },
    ],
    faq: [
      {
        q: "When should I choose WebP instead of JPG?",
        a: "WebP is often used for web delivery because it can provide strong compression with good visual results in many cases. JPG is still the most universal format for non-web sharing. Choose WebP when your site or pipeline already optimizes around WebP assets.",
      },
      {
        q: "Will WebP be smaller than AVIF?",
        a: "Not always. AVIF can beat WebP on compression for some content types. If your only goal is minimum bytes, you might keep AVIF—but if your goal is format compliance, WebP may still be the right output.",
      },
      {
        q: "Does WebP support transparency?",
        a: "WebP can support transparency. If your AVIF includes transparency, verify the exported WebP in your target environment to confirm the alpha channel behaves as expected.",
      },
      {
        q: "Is WebP supported everywhere?",
        a: "Modern browsers generally support WebP well. Very old environments may not. If your audience includes legacy software, consider testing or providing a fallback format.",
      },
      {
        q: "Is conversion private?",
        a: "Yes, in the default workflow conversion runs in your browser session rather than uploading your image to a remote conversion server.",
      },
      {
        q: "Why did conversion fail?",
        a: "Common causes include unusual AVIF variants, very large dimensions, or device memory limits. Try a smaller export, update your browser, or convert one file at a time.",
      },
    ],
  },

  "webp-to-jpg": {
    h1: "Convert WebP to JPG online for free",
    title: "Convert WebP to JPG online free — universal JPEG export",
    description:
      "Save WebP images as JPG for email, print shops, and legacy apps. Free browser converter: upload WebP, download JPEG — private, no install.",
    whyConvert:
      "WebP is common on the web, but JPG is still the default attachment format for email, many PDF pipelines, and older enterprise viewers. Converting WebP to JPG is the quickest way to eliminate “unsupported image type” errors when a recipient double-clicks a file on a desktop that never installed WebP codecs beyond the browser.",
    howItWorks:
      "Your WebP is decoded locally, rasterized, and encoded into a JPEG file. Because JPG is lossy, fine texture can change slightly—this is normal when optimizing for compatibility and smaller handoff sizes rather than pixel-perfect archival.",
    whyUse:
      "Use this page when you have a WebP asset from a website or export, but your next step demands JPEG—contracts, HR forms, school portals, or print kiosks that only ingest JPG.",
    howToSteps: [
      "Upload a WebP file (or paste/import when your workflow allows).",
      "Select JPG for maximum viewer compatibility.",
      "Convert, download the JPEG, then attach or upload it where WebP was rejected.",
    ],
    keyFeatures: [
      "Explains the WebP→JPEG compatibility use case in plain language",
      "Notes the lossy JPEG tradeoff so expectations stay realistic",
      "Browser-based conversion without sign-up",
      "Designed for quick one-off rescues and daily attachments",
    ],
    trustBullets: ["JPEG for maximum compatibility", "Rescue WebP downloads", "No install", "Private in-browser path"],
    sellingPoints: [
      {
        title: "Built for “this attachment won’t open” moments",
        description:
          "If someone needs a JPG on disk, giving them a WebP often creates friction. This converter targets that exact fix.",
        icon: "simple",
      },
      {
        title: "Practical for email and office workflows",
        description:
          "JPEG is still the lingua franca of attachments. WebP is great on the web, but JPG is still the safe choice for mixed recipients.",
        icon: "seo",
      },
      {
        title: "Fast conversion for single files",
        description:
          "You should not need a desktop suite just to re-wrap one image format.",
        icon: "speed",
      },
      {
        title: "Honest quality expectations",
        description:
          "JPEG trades some detail for compatibility. For most sharing, that trade is worth it.",
        icon: "quality",
      },
      {
        title: "Private default workflow",
        description:
          "Keep routine documents and screenshots in your local session during conversion in the default flow.",
        icon: "secure",
      },
      {
        title: "Works where modern browsers run",
        description:
          "Desktop or mobile: upload, convert, download—same steps.",
        icon: "device",
      },
    ],
    faq: [
      {
        q: "Why does WebP fail to open in some desktop apps?",
        a: "Some older desktop viewers do not register WebP as a standard photo type even if your browser displays it fine. Exporting to JPG sidesteps that ecosystem gap.",
      },
      {
        q: "Will WebP to JPG reduce quality?",
        a: "JPEG is lossy, so some fine detail may smooth. For most thumbnails, screenshots, and product images viewed on screens, results are usually acceptable.",
      },
      {
        q: "Does JPG support transparency?",
        a: "Standard JPEG does not preserve transparency. If you need alpha, export to PNG instead.",
      },
      {
        q: "Can I convert animated WebP to JPG?",
        a: "Many browser workflows handle the first frame or a static rasterization. If you need animation preserved, use a tool designed for animated formats.",
      },
      {
        q: "Is conversion private?",
        a: "Yes, in the default workflow conversion runs in your browser session rather than uploading your image to a remote conversion server.",
      },
      {
        q: "What if my WebP is huge?",
        a: "Very large pixel dimensions can stress memory. Try resizing in your editor first, or convert on a desktop with more RAM.",
      },
    ],
  },

  "webp-to-png": {
    h1: "Convert WebP to PNG online for free",
    title: "Convert WebP to PNG online free — lossless export",
    description:
      "Turn WebP into PNG for transparency & design edits. Upload WebP, download PNG in-browser—private, no install.",
    whyConvert:
      "WebP is efficient, but PNG remains the safest import format when you need alpha channels, crisp UI edges, or a lossless-friendly intermediate before editing. Converting WebP to PNG is common when a web asset must become a layer in Photoshop/Figma, or when a screenshot pipeline standardizes on PNG artifacts.",
    howItWorks:
      "The WebP is decoded to pixels locally, then saved as PNG. Expect larger files than WebP for photo-like content—that is normal when you optimize for editability and transparency instead of minimum transfer bytes.",
    whyUse:
      "Choose WebP→PNG when your next step is editing, masking, or archiving a raster version that downstream tools accept without debate.",
    howToSteps: [
      "Upload a WebP that includes transparency or UI detail you want to preserve.",
      "Select PNG as the output format.",
      "Convert, download the PNG, then import into your editor for compositing or retouching.",
    ],
    keyFeatures: [
      "Highlights transparency and lossless-friendly editing reasons",
      "Explains typical file size increases vs WebP",
      "Browser-based conversion without sign-up",
      "Targets design-tool import workflows",
    ],
    trustBullets: ["PNG for transparency workflows", "Design-friendly export", "No install", "Private processing"],
    sellingPoints: [
      {
        title: "Great for UI captures and logos",
        description:
          "PNG avoids JPEG ringing around sharp edges, which matters for screenshots and interface graphics.",
        icon: "quality",
      },
      {
        title: "A predictable import format",
        description:
          "If your team’s templates say “PNG only,” this converter gets you there from WebP quickly.",
        icon: "seo",
      },
      {
        title: "Private default path",
        description:
          "Useful when you are converting client-facing assets and want to avoid uploads in the normal workflow.",
        icon: "secure",
      },
      {
        title: "Fast for one-off rescues",
        description:
          "You downloaded a WebP from a site and need PNG—this is a short path.",
        icon: "speed",
      },
      {
        title: "Simple controls",
        description:
          "No advanced panels: upload, pick PNG, convert, download.",
        icon: "simple",
      },
      {
        title: "Cross-device",
        description:
          "Run it wherever the file already is: laptop, desktop, or tablet browser.",
        icon: "device",
      },
    ],
    faq: [
      {
        q: "Will PNG be larger than WebP?",
        a: "Often yes, especially for photographic content. PNG prioritizes predictable pixels and transparency support over minimum file size.",
      },
      {
        q: "Can PNG preserve WebP transparency?",
        a: "If the WebP includes transparency, PNG is a common export target to keep an alpha channel for editing tools. Verify in your editor if your pipeline is strict.",
      },
      {
        q: "Is PNG better than JPG for text screenshots?",
        a: "Usually yes, because PNG avoids JPEG compression artifacts around sharp text edges.",
      },
      {
        q: "Is conversion private?",
        a: "Yes, in the default workflow conversion runs in your browser session rather than uploading your image to a remote conversion server.",
      },
      {
        q: "Why did conversion fail?",
        a: "Uncommon WebP variants, huge dimensions, or low device memory are frequent causes. Try updating the browser or reducing image size.",
      },
      {
        q: "Does this replace a full design export tool?",
        a: "This tool focuses on format conversion. Color management, resizing, and batch workflows should still be handled in your design toolchain when needed.",
      },
    ],
  },

  "webp-to-avif": {
    h1: "Convert WebP to AVIF online for free",
    title: "Convert WebP to AVIF online free — smaller modern images",
    description:
      "Re-encode WebP to AVIF for leaner pages and modern browsers. Free browser converter: upload WebP, export AVIF — private, no install.",
    whyConvert:
      "If your source assets are WebP but your performance budget wants AVIF for key hero images, converting WebP to AVIF can reduce bytes for many photographic scenes. This is not a guarantee AVIF will always be smaller—compression depends on content—but it is a legitimate pipeline step when your CDN or framework prefers AVIF delivery.",
    howItWorks:
      "The WebP is decoded locally, then encoded into AVIF for download. Use this when you are standardizing formats across a site redesign, migrating templates, or producing AVIF variants alongside existing WebP fallbacks.",
    whyUse:
      "Pick WebP→AVIF when your performance checklist says AVIF-first, but your upstream vendor shipped WebP exports.",
    howToSteps: [
      "Upload the WebP you want to modernize into AVIF distribution.",
      "Select AVIF as the output format.",
      "Convert, download the AVIF, then wire it into responsive image markup and validate savings with your CDN.",
    ],
    keyFeatures: [
      "Explains AVIF-first performance motivation without overpromising byte ratios",
      "Useful for migration scenarios (WebP sources → AVIF delivery)",
      "Browser-based conversion without sign-up",
      "Private default workflow for normal use",
    ],
    trustBullets: ["AVIF export path", "Performance-oriented", "No install", "Private in-browser conversion"],
    sellingPoints: [
      {
        title: "For performance teams standardizing on AVIF",
        description:
          "If your site roadmap includes AVIF delivery, you need a practical way to generate AVIF from whatever sources you already have—including WebP.",
        icon: "seo",
      },
      {
        title: "Honest about compression variability",
        description:
          "AVIF often wins on photos, but not always. Treat output size as something you verify against your own imagery.",
        icon: "quality",
      },
      {
        title: "Fast for single assets",
        description:
          "When you only need one hero image converted, a browser workflow can be enough.",
        icon: "speed",
      },
      {
        title: "Simple flow",
        description:
          "Upload, pick AVIF, convert, download—then integrate into your build.",
        icon: "simple",
      },
      {
        title: "Private default path",
        description:
          "Keep marketing imagery in your local session during conversion in the default workflow.",
        icon: "secure",
      },
      {
        title: "Cross-platform",
        description:
          "Use the same steps on macOS, Windows, or Linux browsers.",
        icon: "device",
      },
    ],
    faq: [
      {
        q: "Will AVIF always be smaller than WebP?",
        a: "Not always. Compression depends on image content, encoder settings, and transparency. Measure with your real assets rather than assuming a universal rule.",
      },
      {
        q: "Is AVIF supported everywhere?",
        a: "Modern browsers generally support AVIF well, but some older tools may not. Many teams ship AVIF with a WebP or JPG fallback using responsive images.",
      },
      {
        q: "Does AVIF support transparency?",
        a: "AVIF can support transparency in many workflows. Always verify in your target browsers and tools if alpha is critical.",
      },
      {
        q: "Is conversion private?",
        a: "Yes, in the default workflow conversion runs in your browser session rather than uploading your image to a remote conversion server.",
      },
      {
        q: "Why did conversion fail?",
        a: "Very large images, memory limits, or browser encoder limitations can cause failures. Try a smaller export or update your browser.",
      },
      {
        q: "Should I keep the WebP original?",
        a: "If WebP is your archival source, keep it. Use AVIF as a delivery variant when it helps your performance metrics.",
      },
    ],
  },

  "png-to-jpg": {
    h1: "Convert PNG to JPG online for free",
    title: "Convert PNG to JPG online free — smaller photos for sharing",
    description:
      "Shrink PNG photos to JPEG for email, social, and CMS uploads. Free browser converter: upload PNG, download JPG — private, no install.",
    whyConvert:
      "PNG is lossless and great for transparency, but it is often oversized for photographic content. Converting PNG to JPG is the standard move when you do not need an alpha channel and want smaller attachments, faster uploads, or a format that older portals accept without special handling.",
    howItWorks:
      "PicConverter rasterizes your PNG and encodes a JPEG. Transparency in PNG becomes a flat background in JPG (typically white or the canvas background), which is expected because JPEG does not carry an alpha channel.",
    whyUse:
      "Use PNG→JPG when your goal is smaller bytes for photo-like PNGs, not when you must preserve transparency.",
    howToSteps: [
      "Upload a PNG that does not require transparency in the final deliverable.",
      "Select JPG as the output format.",
      "Convert, download the JPEG, and upload it where large PNGs were rejected—JPG is usually smaller for photos.",
    ],
    keyFeatures: [
      "Explains the transparency limitation of JPEG outputs",
      "Targets oversized photographic PNGs (common real-world pain)",
      "Browser-based conversion without sign-up",
      "Practical for email and upload limits",
    ],
    trustBullets: ["JPEG for smaller photo files", "No transparency in JPG", "No install", "Private processing"],
    sellingPoints: [
      {
        title: "Built for oversized PNG photos",
        description:
          "Screenshots and exports often land as huge PNGs even when transparency is not needed. JPG is the classic fix.",
        icon: "seo",
      },
      {
        title: "Clear transparency expectation",
        description:
          "If your PNG uses alpha, assume it will flatten in JPEG. If that is unacceptable, use PNG or WebP instead.",
        icon: "quality",
      },
      {
        title: "Fast for one file",
        description:
          "Upload, convert, download—ideal when you just need the attachment under a size cap.",
        icon: "speed",
      },
      {
        title: "Simple workflow",
        description:
          "No advanced export dialogs required for a basic format swap.",
        icon: "simple",
      },
      {
        title: "Private default path",
        description:
          "Keep personal photos and work screenshots in your local session during conversion in the default workflow.",
        icon: "secure",
      },
      {
        title: "Cross-platform",
        description:
          "Works in modern browsers on desktop and mobile.",
        icon: "device",
      },
    ],
    faq: [
      {
        q: "Will PNG to JPG make the file smaller?",
        a: "Often yes for photographic PNGs, because JPEG is designed for efficient photo compression. For simple graphics with large flat areas, results vary.",
      },
      {
        q: "What happens to transparency?",
        a: "Standard JPEG does not preserve transparency. Transparent areas are typically flattened against a background. If you need alpha, export to PNG or WebP instead.",
      },
      {
        q: "Will JPG look worse than PNG?",
        a: "JPEG is lossy, so fine detail can change. For many web and sharing scenarios, the difference is small, but for pixel-perfect UI assets you may prefer PNG.",
      },
      {
        q: "Is conversion private?",
        a: "Yes, in the default workflow conversion runs in your browser session rather than uploading your image to a remote conversion server.",
      },
      {
        q: "Why did conversion fail?",
        a: "Very large PNG dimensions can stress memory. Try resizing first or converting on a machine with more RAM.",
      },
      {
        q: "Should I keep the PNG original?",
        a: "If the PNG is your master asset, keep it. Use JPG as a delivery format when compatibility and size matter more.",
      },
    ],
  },

  "png-to-webp": {
    h1: "Convert PNG to WebP online for free",
    title: "Convert PNG to WebP online free — lighter web assets",
    description:
      "Compress PNG to WebP for faster pages while keeping strong visuals. Free browser converter: upload PNG, download WebP — private, no install.",
    whyConvert:
      "PNG is excellent for sharp edges and transparency, but it is often heavier than necessary for web delivery. Converting PNG to WebP is a common optimization step when you want smaller downloads for UI graphics, marketing banners, and product tiles while staying in a modern browser-friendly format.",
    howItWorks:
      "Your PNG is decoded locally and encoded into WebP. If you rely on PNG transparency, WebP can often preserve alpha—still verify in your target pipeline because tooling and export paths differ.",
    whyUse:
      "Use PNG→WebP when your performance report flags PNG weight, but you still want a raster format suited to responsive images and CDNs.",
    howToSteps: [
      "Upload a PNG you plan to serve on the web (hero, banner, icon sheet, etc.).",
      "Select WebP as the output format.",
      "Convert, download the WebP, then swap it in your bundle and re-check caching, dimensions, and visual fidelity.",
    ],
    keyFeatures: [
      "Explains web performance motivation distinct from PNG→JPG",
      "Notes transparency verification as a practical step",
      "Browser-based conversion without sign-up",
      "Targets front-end asset optimization workflows",
    ],
    trustBullets: ["WebP for modern pages", "Smaller than many PNGs", "No install", "Private processing"],
    sellingPoints: [
      {
        title: "A performance-oriented alternative to “PNG everywhere”",
        description:
          "PNG is not wrong, but it is often heavier than needed for web delivery. WebP is a common next step.",
        icon: "seo",
      },
      {
        title: "Still mindful of transparency",
        description:
          "If alpha matters, treat WebP as a candidate format and verify—not assume—your pipeline preserves it correctly.",
        icon: "quality",
      },
      {
        title: "Fast for single assets",
        description:
          "Optimize one banner without opening a heavyweight desktop suite.",
        icon: "speed",
      },
      {
        title: "Simple flow",
        description:
          "Upload, pick WebP, convert, download.",
        icon: "simple",
      },
      {
        title: "Private default workflow",
        description:
          "Keep site assets local during conversion in the normal workflow.",
        icon: "secure",
      },
      {
        title: "Cross-platform",
        description:
          "Use wherever you manage front-end files.",
        icon: "device",
      },
    ],
    faq: [
      {
        q: "Will WebP always be smaller than PNG?",
        a: "Often for photographic and complex PNGs, but not guaranteed for every graphic. Measure with your real files.",
      },
      {
        q: "Does WebP preserve PNG transparency?",
        a: "WebP can support transparency. Always verify in your target browsers and build tools if alpha is essential.",
      },
      {
        q: "Should I use WebP or AVIF for minimum bytes?",
        a: "Both can be strong. AVIF sometimes wins on photos; WebP can still be easier to standardize depending on your stack. Benchmark your own images.",
      },
      {
        q: "Is conversion private?",
        a: "Yes, in the default workflow conversion runs in your browser session rather than uploading your image to a remote conversion server.",
      },
      {
        q: "Why did conversion fail?",
        a: "Huge PNG dimensions or low device memory are common causes. Resize first if needed.",
      },
      {
        q: "Will this replace image CDN optimization?",
        a: "No. CDNs and responsive image policies still matter. This tool helps you produce the right source format for your pipeline.",
      },
    ],
  },

  "png-to-avif": entry("PNG", "AVIF"),
  "jpg-to-png": entry("JPG", "PNG"),
  "jpg-to-webp": entry("JPG", "WebP"),
  "jpeg-to-png": entry("JPEG", "PNG"),
};

export function getConvertSeo(slug: ConvertSlug): ConvertSeoEntry {
  const resolved =
    seoMap[slug] ??
    entry(slug.split("-to-")[0]?.toUpperCase() ?? "Image", slug.split("-to-")[1]?.toUpperCase() ?? "Image");
  return {
    ...resolved,
    trustBullets: resolved.trustBullets ?? DEFAULT_TRUST,
    sellingPoints: resolved.sellingPoints ?? DEFAULT_SELLING,
  };
}
