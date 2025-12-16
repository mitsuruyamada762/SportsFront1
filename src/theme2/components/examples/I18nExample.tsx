import React, { useState } from 'react'
import { useTranslation } from '../../hooks'
import { useLanguage } from '../../contexts'
import { LanguageSelector } from '../ui/LanguageSelector'
import { formatDate, formatCurrency, formatNumber } from '../../utils/i18n'

/**
 * Example component demonstrating comprehensive i18n usage
 */
export const I18nExample: React.FC = () => {
  const { t, tWithFallback, tArray } = useTranslation()
  const { currentLanguage, isRTL, direction } = useLanguage()
  const [selectedSport, setSelectedSport] = useState('football')

  // Sample data for formatting examples
  const sampleData = {
    date: new Date(),
    amount: 1234.56,
    currency: 'EUR',
    count: 5,
    items: ['football', 'basketball', 'tennis', 'iceHockey']
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header with language selector */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t('pages.home.title')}
        </h1>
        <LanguageSelector />
      </div>

      {/* Language information */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2 text-blue-900 dark:text-blue-100">
          Language Information
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="font-medium text-blue-800 dark:text-blue-200">Language:</span>
            <p className="text-blue-700 dark:text-blue-300">{currentLanguage.name} {currentLanguage.flag}</p>
          </div>
          <div>
            <span className="font-medium text-blue-800 dark:text-blue-200">Code:</span>
            <p className="text-blue-700 dark:text-blue-300">{currentLanguage.code}</p>
          </div>
          <div>
            <span className="font-medium text-blue-800 dark:text-blue-200">Direction:</span>
            <p className="text-blue-700 dark:text-blue-300">{direction.toUpperCase()}</p>
          </div>
          <div>
            <span className="font-medium text-blue-800 dark:text-blue-200">RTL:</span>
            <p className="text-blue-700 dark:text-blue-300">{isRTL ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>

      {/* Basic translations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Basic Translations
          </h2>
          <div className="space-y-2">
            <p><span className="font-medium">Home:</span> {t('pages.home.title')}</p>
            <p><span className="font-medium">Subtitle:</span> {t('pages.home.subtitle')}</p>
            <p><span className="font-medium">Loading:</span> {t('common.loading')}</p>
            <p><span className="font-medium">Error:</span> {t('common.error')}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Sports Categories
          </h2>
          <div className="space-y-2">
            {sampleData.items.map((sport) => (
              <p key={sport}>
                <span className="font-medium capitalize">{sport}:</span> {t(`sports.${sport}`)}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Number and date formatting */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Number Formatting
          </h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Number:</span>{' '}
              {formatNumber(sampleData.amount, currentLanguage.code)}
            </p>
            <p>
              <span className="font-medium">Currency:</span>{' '}
              {formatCurrency(sampleData.amount, sampleData.currency, currentLanguage.code)}
            </p>
            <p>
              <span className="font-medium">Count:</span>{' '}
              {formatNumber(sampleData.count, currentLanguage.code)}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Date Formatting
          </h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Full Date:</span>{' '}
              {formatDate(sampleData.date, currentLanguage.code)}
            </p>
            <p>
              <span className="font-medium">Short Date:</span>{' '}
              {formatDate(sampleData.date, currentLanguage.code, { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
            <p>
              <span className="font-medium">Time:</span>{' '}
              {sampleData.date.toLocaleTimeString(currentLanguage.code)}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive example */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Interactive Example
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select a sport:
            </label>
            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {sampleData.items.map((sport) => (
                <option key={sport} value={sport}>
                  {t(`sports.${sport}`)}
                </option>
              ))}
            </select>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
            <p className="text-gray-900 dark:text-white">
              <span className="font-medium">Selected sport:</span>{' '}
              {t(`sports.${selectedSport}`)}
            </p>
          </div>
        </div>
      </div>

      {/* Fallback example */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-yellow-900 dark:text-yellow-100">
          Fallback Example
        </h2>
        <div className="space-y-2">
          <p className="text-yellow-800 dark:text-yellow-200">
            <span className="font-medium">With fallback:</span>{' '}
            {tWithFallback('non.existent.key', 'This is a fallback text')}
          </p>
          <p className="text-yellow-800 dark:text-yellow-200">
            <span className="font-medium">Array translation:</span>{' '}
            {tArray(['sports.football', 'sports.basketball']).join(', ')}
          </p>
        </div>
      </div>
    </div>
  )
}
