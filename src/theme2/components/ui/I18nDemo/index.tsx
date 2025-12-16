import React from 'react'
import { useTranslation } from '../../../hooks'
import { useLanguage } from '../../../contexts'
import { formatDate, formatCurrency, formatNumber } from '../../../utils/i18n'

export const I18nDemo: React.FC = () => {
  const { t } = useTranslation()
  const { currentLanguage, isRTL, direction } = useLanguage()

  const demoDate = new Date()
  const demoAmount = 1234.56

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        {t('language.select')} - {currentLanguage.name} {currentLanguage.flag}
      </h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
              Basic Translation
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {t('pages.home.title')}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('pages.home.subtitle')}
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
              Common Terms
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {t('common.loading')} | {t('common.error')} | {t('common.success')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
              Number Formatting
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Number: {formatNumber(demoAmount, currentLanguage.code)}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Currency: {formatCurrency(demoAmount, 'EUR', currentLanguage.code)}
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
              Date Formatting
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Date: {formatDate(demoDate, currentLanguage.code)}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Time: {demoDate.toLocaleTimeString(currentLanguage.code)}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
            Language Information
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600 dark:text-gray-400">Language Code:</p>
              <p className="text-gray-900 dark:text-white font-mono">{currentLanguage.code}</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Direction:</p>
              <p className="text-gray-900 dark:text-white font-mono">{direction.toUpperCase()}</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">RTL Support:</p>
              <p className="text-gray-900 dark:text-white font-mono">{isRTL ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Browser Locale:</p>
              <p className="text-gray-900 dark:text-white font-mono">{navigator.language}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded">
          <h3 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">
            Sports Categories
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <span className="text-blue-800 dark:text-blue-200">{t('sports.football')}</span>
            <span className="text-blue-800 dark:text-blue-200">{t('sports.basketball')}</span>
            <span className="text-blue-800 dark:text-blue-200">{t('sports.tennis')}</span>
            <span className="text-blue-800 dark:text-blue-200">{t('sports.iceHockey')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
