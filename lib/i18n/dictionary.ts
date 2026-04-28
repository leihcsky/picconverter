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
    "PicConverter is a free online image converter with a simple workflow: upload, convert, and download in your browser.",
  popularConverters: "Popular converters",
  formatCategories: "Image converter format guide",
  formatDescription:
    "Choose the right format for sharing, compatibility, and file size needs across your devices and apps.",
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
