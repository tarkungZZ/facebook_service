import i18next from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";

import EN from "./Languages/en.json";
import TH from "./Languages/th.json";

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: EN,
      },
      th: {
        translation: TH,
      },
    },
    lng: "en",
  });

export default i18next;
