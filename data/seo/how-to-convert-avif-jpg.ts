import type { SeoFaqItem } from "@/lib/seoMap";

/** Long-form guide + FAQ for `/how-to/convert-avif-to-jpg` (English). */
export const howToConvertAvifToJpgFaq: SeoFaqItem[] = [
  {
    q: "What is the easiest way to convert AVIF to JPG?",
    a: "Use an online AVIF to JPG converter: open the tool page, upload your AVIF file, set the output format to JPG, run the conversion, then download the JPEG. This avoids installing desktop software and works on most modern browsers.",
  },
  {
    q: "Will AVIF to JPG conversion reduce image quality?",
    a: "JPG is a lossy format, so some fine detail can be smoothed or compressed compared with AVIF. For typical web, email, and document use, results usually look good. If you need maximum fidelity, keep the original AVIF as your master file and treat JPG as a sharing or delivery copy.",
  },
  {
    q: "Can I convert AVIF to JPG on iPhone or Android?",
    a: "Yes. Open the converter in your mobile browser, upload the AVIF image from your photo library or files app, choose JPG, convert, and download. The steps match desktop; performance depends on image size and available device memory.",
  },
  {
    q: "Why does my AVIF file fail to convert?",
    a: "Common causes include an uncommon AVIF encoding profile, a very large image that exceeds device memory, or a browser that cannot decode that AVIF variant. Try updating the browser, using a smaller export from your design tool, or converting the file on a desktop with more RAM.",
  },
  {
    q: "Is my AVIF image uploaded to a server when I convert?",
    a: "Conversion runs in your browser. Files are not sent to PicConverter for processing in the normal workflow. If you use URL import, the image is fetched through the site’s fetch endpoint so the browser can receive the bytes; choose local upload when you want the file to stay entirely on your device.",
  },
];

export const howToConvertAvifToJpgHowToSteps = [
  {
    name: "Upload your AVIF image",
    text: "Open the AVIF to JPG converter and upload your AVIF file from your device, or paste an image from the clipboard when supported.",
  },
  {
    name: "Choose JPG as the output format",
    text: "Select JPG (JPEG) in the output dropdown so the result is widely compatible with apps, CMS tools, and messaging platforms.",
  },
  {
    name: "Convert and download",
    text: "Start the conversion, wait for it to finish, then download the JPG file. Use the new file for sharing, uploads, or documents that require JPEG.",
  },
] as const;

export const howToConvertAvifToJpgCopy = {
  quickAnswer:
    "To convert AVIF to JPG, upload your AVIF file, choose JPG as the output format, convert, and download the JPEG. AVIF is great for compression; JPG is still the most predictable format when you need files to open everywhere without extra plugins or updates.",

  whenToConvert: {
    intro:
      "Convert AVIF to JPG when compatibility matters more than the last few percent of compression efficiency. AVIF support is strong in modern browsers, but many desktop apps, office suites, older mobile workflows, and enterprise tools still expect JPG.",
    bullets: [
      "Sharing with clients who use mixed devices and software versions",
      "Uploading to platforms or CMS modules that reject or mishandle AVIF",
      "Embedding images in PDFs, slides, or legacy editors that prefer JPEG",
      "Reducing support questions when recipients do not know how to open AVIF",
    ],
  },

  quality: {
    intro:
      "JPG uses lossy compression, so converting from AVIF to JPG can change fine texture, gradients, and sharp edges. That is normal. For most everyday uses—web articles, thumbnails, social posts—the difference is small.",
    bullets: [
      "Keep the AVIF original when you may need to re-export later",
      "Use JPG as the handoff format for maximum compatibility",
      "Preview the output before sending it to others if quality is critical",
    ],
  },

  pasteAndUrl:
    "If your AVIF is already on the clipboard, paste it into the converter when the page is focused. You can also import some remote images by URL when the source allows fetching; if a URL import fails, download the file locally first and upload it instead.",

  troubleshooting: {
    intro: "If conversion fails or the preview looks wrong, try the following:",
    bullets: [
      "Update your browser to the latest stable version",
      "Retry with a smaller image if the file is very large",
      "Re-export AVIF from your editor using standard settings",
      "Switch from URL import to a local file if the remote host blocks access",
    ],
  },
};
