import i18next from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";
import localStorage from 'localStorage';

import EN from "./Languages/en.json";
import TH from "./Languages/th.json";

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "th",
    backend: {
      backends: [
        {
          loadPath: "./Languages/{{lng}}.json",
        },
      ],
    },
    detection: {
      order: ["querystring", "localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
    react: {
      useSuspense: true,
    },

    resources: {
      en: {
        translation: EN,
      },
      th: {
        translation: TH,
      },
    },
    lng: localStorage.getItem("language") || "en",
  });

export default i18next;
