import { useTranslation as useI18nTranslation } from 'react-i18next'

export interface TranslationOptions {
  defaultValue?: string
  count?: number
  [key: string]: any
}

export const useTranslation = (namespace?: string) => {
  const { t, i18n } = useI18nTranslation(namespace)

  const translate = (key: string, options?: TranslationOptions): string => {
    try {
      return t(key, options)
    } catch (error) {
      console.warn(`Translation key "${key}" not found`)
      return options?.defaultValue || key
    }
  }

  const translateWithFallback = (key: string, fallback: string, options?: TranslationOptions): string => {
    const translation = translate(key, options)
    return translation === key ? fallback : translation
  }

  const translatePlural = (key: string, count: number, options?: Omit<TranslationOptions, 'count'>): string => {
    return translate(key, { ...options, count })
  }

  const translateWithCount = (key: string, count: number, options?: Omit<TranslationOptions, 'count'>): string => {
    // Handle pluralization based on count
    const pluralKey = count === 1 ? `${key}_one` : `${key}_other`
    const fallbackKey = count === 1 ? key : `${key}_plural`
    
    try {
      return t(pluralKey, { ...options, count })
    } catch {
      try {
        return t(fallbackKey, { ...options, count })
      } catch {
        return translate(key, { ...options, count })
      }
    }
  }

  const translateArray = (keys: string[], options?: TranslationOptions): string[] => {
    return keys.map(key => translate(key, options))
  }

  return {
    t: translate,
    tWithFallback: translateWithFallback,
    tPlural: translatePlural,
    tWithCount: translateWithCount,
    tArray: translateArray,
    i18n,
    language: i18n.language,
    isRTL: i18n.dir() === 'rtl'
  }
}
