import React, { createContext, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocalStorage } from '../hooks'
import { getLanguageDirection, isRTLLanguage } from '../utils/i18n'

export interface Language {
  code: string
  name: string
  flag: string
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'no', name: 'Norsk', flag: '🇳🇴' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
  { code: 'ro', name: 'Română', flag: '🇷🇴' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦' },
  { code: 'he', name: 'עברית', flag: '🇮🇱' },
]

interface LanguageContextType {
  currentLanguage: Language
  setLanguage: (languageCode: string) => void
  supportedLanguages: Language[]
  isLoading: boolean
  isRTL: boolean
  direction: 'ltr' | 'rtl'
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: React.ReactNode
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { i18n } = useTranslation()
  const [storedLanguage, setStoredLanguage] = useLocalStorage<string>('language', 'en')
  const [isLoading, setIsLoading] = useState(true)

  // Get current language object
  const currentLanguage = SUPPORTED_LANGUAGES.find(lang => lang.code === i18n.language) || SUPPORTED_LANGUAGES[0]
  const isRTL = isRTLLanguage(i18n.language)
  const direction = getLanguageDirection(i18n.language)

  const setLanguage = async (languageCode: string) => {
    setIsLoading(true)
    try {
      await i18n.changeLanguage(languageCode)
      setStoredLanguage(languageCode)

      // Update document direction for RTL support
      const newDirection = getLanguageDirection(languageCode)
      document.documentElement.dir = newDirection
    } catch (error) {
      console.error('Error changing language:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Initialize language on mount
    const initializeLanguage = async () => {
      if (storedLanguage && storedLanguage !== i18n.language) {
        await i18n.changeLanguage(storedLanguage)
      }

      // Set initial document direction
      document.documentElement.dir = direction
      setIsLoading(false)
    }

    initializeLanguage()
  }, [i18n, storedLanguage, direction])

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      setIsLoading(false)
    }

    i18n.on('languageChanged', handleLanguageChange)

    return () => {
      i18n.off('languageChanged', handleLanguageChange)
    }
  }, [i18n])

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        supportedLanguages: SUPPORTED_LANGUAGES,
        isLoading,
        isRTL,
        direction
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
