import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import translation files
import en from './locales/en.json'
import el from './locales/el.json'
import de from './locales/de.json'
import fr from './locales/fr.json'

const resources = {
  en: {
    translation: en
  },
  el: {
    translation: el
  },
  de: {
    translation: de
  },
  fr: {
    translation: fr
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng'
    },

    interpolation: {
      escapeValue: false // React already does escaping
    }
  })

export default i18n
