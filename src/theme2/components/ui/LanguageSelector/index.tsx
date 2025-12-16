import React, { useState } from 'react'
import { useLanguage, SUPPORTED_LANGUAGES } from '../../../contexts/LanguageContext'
import { useClickOutside } from '../../../hooks'
import './index.scss'

interface LanguageSelectorProps {
  className?: string
  variant?: 'default' | 'minimal'
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  className = '', 
  variant = 'default' 
}) => {
  const { currentLanguage, setLanguage, isLoading } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false))

  const handleLanguageSelect = async (languageCode: string) => {
    if (languageCode !== currentLanguage.code) {
      await setLanguage(languageCode)
    }
    setIsOpen(false)
  }

  if (variant === 'minimal') {
    return (
      <div className={`language-selector-minimal ${className}`} ref={dropdownRef}>
        <button
          className="language-button-minimal"
          onClick={() => setIsOpen(!isOpen)}
          disabled={isLoading}
          aria-label="Select language"
        >
          <span className="flag">{currentLanguage.flag}</span>
        </button>
        
        {isOpen && (
          <div className="language-dropdown-minimal">
            {SUPPORTED_LANGUAGES.map((language) => (
              <button
                key={language.code}
                className={`language-option-minimal ${
                  language.code === currentLanguage.code ? 'active' : ''
                }`}
                onClick={() => handleLanguageSelect(language.code)}
              >
                <span className="flag">{language.flag}</span>
                <span className="name">{language.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`language-selector ${className}`} ref={dropdownRef}>
      <button
        className="language-button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        aria-label="Select language"
      >
        <span className="flag">{currentLanguage.flag}</span>
        <span className="name">{currentLanguage.name}</span>
        <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      
      {isOpen && (
        <div className="language-dropdown">
          {SUPPORTED_LANGUAGES.map((language) => (
            <button
              key={language.code}
              className={`language-option ${
                language.code === currentLanguage.code ? 'active' : ''
              }`}
              onClick={() => handleLanguageSelect(language.code)}
            >
              <span className="flag">{language.flag}</span>
              <span className="name">{language.name}</span>
              {language.code === currentLanguage.code && (
                <span className="check">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
