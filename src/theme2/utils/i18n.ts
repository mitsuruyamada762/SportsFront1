import { SUPPORTED_LANGUAGES } from '../contexts/LanguageContext'

export const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur']

export const isRTLLanguage = (languageCode: string): boolean => {
  return RTL_LANGUAGES.includes(languageCode)
}

export const getLanguageDirection = (languageCode: string): 'ltr' | 'rtl' => {
  return isRTLLanguage(languageCode) ? 'rtl' : 'ltr'
}

export const getLanguageByCode = (code: string) => {
  return SUPPORTED_LANGUAGES.find(lang => lang.code === code)
}

export const getBrowserLanguage = (): string => {
  const browserLang = navigator.language || (navigator as any).userLanguage
  const langCode = browserLang.split('-')[0]
  
  // Check if we support this language
  const supportedLang = SUPPORTED_LANGUAGES.find(lang => lang.code === langCode)
  return supportedLang ? langCode : 'en'
}

export const formatNumber = (number: number, languageCode: string): string => {
  try {
    return new Intl.NumberFormat(languageCode).format(number)
  } catch (error) {
    return number.toString()
  }
}

export const formatCurrency = (amount: number, currency: string, languageCode: string): string => {
  try {
    return new Intl.NumberFormat(languageCode, {
      style: 'currency',
      currency: currency
    }).format(amount)
  } catch (error) {
    return `${amount} ${currency}`
  }
}

export const formatDate = (date: Date, languageCode: string, options?: Intl.DateTimeFormatOptions): string => {
  try {
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options
    }
    return new Intl.DateTimeFormat(languageCode, defaultOptions).format(date)
  } catch (error) {
    return date.toLocaleDateString()
  }
}

export const formatTime = (date: Date, languageCode: string, options?: Intl.DateTimeFormatOptions): string => {
  try {
    const defaultOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      ...options
    }
    return new Intl.DateTimeFormat(languageCode, defaultOptions).format(date)
  } catch (error) {
    return date.toLocaleTimeString()
  }
}
