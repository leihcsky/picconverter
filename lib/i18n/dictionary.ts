import type { AppLocale } from "./config";

export type HomeDictionary = {
  homeTitle: string;
  homeDescription: string;
  popularConverters: string;
  formatCategories: string;
  formatDescription: string;
  mainConverter: string;
};

export type CommonDictionary = {
  homeNav: string;
  howToNav: string;
  backHome: string;
  whyConvert: string;
  howItWorks: string;
  faqTitle: string;
  tryPicConverter: string;
};

export type Dictionary = HomeDictionary & CommonDictionary;

const EN: Dictionary = {
  homeTitle: "Free online image converter",
  homeDescription:
    "Free image converter for AVIF, WebP, PNG & JPEG in your browser: upload, pick output, download. Private default path; dedicated pages for popular pairs.",
  popularConverters: "Popular converters",
  formatCategories: "Image converter format guide",
  formatDescription:
    "AVIF and WebP target lean web delivery; PNG preserves transparency and crisp UI edges; JPEG stays the most compatible handoff format. Pick the output that matches your next step—or open a dedicated converter page for tailored guidance on one format pair.",
  mainConverter: "Main converter",
  homeNav: "Home",
  howToNav: "How-to",
  backHome: "Back to PicConverter home",
  whyConvert: "Why convert",
  howItWorks: "How it works",
  faqTitle: "FAQ",
  tryPicConverter: "Try PicConverter",
};

// Placeholder dictionaries; replace values with native copy when enabling locale.
const FR: Dictionary = { ...EN };
const DE: Dictionary = { ...EN };

const TABLE: Record<AppLocale, Dictionary> = {
  en: EN,
  fr: FR,
  de: DE,
};

export function getDictionary(locale: AppLocale): Dictionary {
  return TABLE[locale];
}
