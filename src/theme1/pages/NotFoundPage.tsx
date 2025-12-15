import React from 'react'
import { useTranslation } from '@/theme1/hooks'

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">
          {t('pages.notFound.title')}
        </h2>
        <p className="text-gray-600 mb-8 max-w-md">
          {t('pages.notFound.message')}
        </p>
        <div className="space-x-4">
          <button
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            onClick={() => window.location.href = '/'}
          >
            {t('pages.notFound.goHome')}
          </button>
        </div>
      </div>
    </div>
  )
}
