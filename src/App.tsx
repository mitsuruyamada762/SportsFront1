import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ThemeOnePage } from '@/routes/themeOnePage'
import { ThemeTwoPage } from '@/routes/themeTwoPage'
import { NotFoundPage } from '@/theme1/pages'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/theme1/*" element={<ThemeOnePage />} />
        <Route path="/theme2/*" element={<ThemeTwoPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}

export default App