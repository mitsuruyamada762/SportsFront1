import { Routes, Route } from 'react-router-dom'
import { NotFoundPage } from '@/theme1/pages'
import { HomePage } from '@/theme1/pages/'
import '@/theme1/i18n/index.ts'
import { ThemeProvider, ScreenSizeProvider, LanguageProvider, WebSocketProvider } from '@/theme1/contexts/index.ts'

export const Theme1 = () => {
  return (
    <WebSocketProvider>
      <LanguageProvider>
        <ThemeProvider>
          <ScreenSizeProvider breakpoint={768}>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </ScreenSizeProvider>
        </ThemeProvider>
      </LanguageProvider>
    </WebSocketProvider >
  )
}

