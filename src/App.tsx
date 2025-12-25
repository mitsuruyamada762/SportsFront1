import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Theme1 } from '@/routes/theme1'
import { Theme2 } from '@/routes/theme2'
import { NotFoundPage } from '@/theme1/pages'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/theme1/*" element={<Theme1 />} />
        <Route path="/theme2/*" element={<Theme2 />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}

export default App