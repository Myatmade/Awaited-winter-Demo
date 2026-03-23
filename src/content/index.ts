import { en } from "./en";
import { jp } from "./jp";
import { Language, SiteContent } from "./types";

const contentByLanguage: Record<Language, SiteContent> = {
  en,
  jp,
};

export function getContent(language: Language): SiteContent {
  return contentByLanguage[language];
}
