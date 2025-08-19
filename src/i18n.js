// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEn from "./locales/en/translation.json";
import translationUk from "./locales/uk/translation.json";
import translationRu from "./locales/ru/translation.json";

const resources = {
  en: { translation: translationEn },
  uk: { translation: translationUk },
  ru: { translation: translationRu },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    lng: "uk",
  });

export default i18n;
