import { Routes, Route } from 'react-router-dom'
import { NotFoundPage } from '@/theme1/pages'
import { HomePage } from '@/theme1/pages/'

export const ThemeOnePage = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

