import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { NotFoundPage } from './theme1/pages'
import { ThemeRouter } from './routes/themeRouter'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/theme/:id/*" element={<ThemeRouter />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}

export default App