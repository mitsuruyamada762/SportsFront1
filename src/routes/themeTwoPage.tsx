import { Routes, Route } from 'react-router-dom'
import { HomePage } from '@/theme2/pages/HomePage'
import { NotFoundPage } from '@/theme2/pages/NotFoundPage'
import LoginPage from '@/theme2/pages/Login'
import { LiveBettingPage } from '@/theme2/pages/LiveBetting'
import { LiveSchedulePage } from '../theme2/pages/LiveSchedule'
import { Layout } from '@/theme2/components/layout'
import { SportPage } from '@/theme2/pages/SportPage'
import { LiveBettingDetailPage } from '@/theme2/pages/LiveBettingDetail'
import { MatchesPage } from '@/theme2/pages/MatchesPage'
import { SportsCompetition } from '@/theme2/pages/SportsCompetition'
import '@/theme2/i18n'
import { ThemeProvider, ScreenSizeProvider, LanguageProvider, WebSocketProvider } from '@/theme2/contexts'

export const ThemeTwoPage = () => {
  return (
    <WebSocketProvider>
      <LanguageProvider>
        <ThemeProvider>
          <ScreenSizeProvider breakpoint={768}>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/live-betting" element={<LiveBettingPage />} />
                <Route path="/live-schedule" element={<LiveSchedulePage />} />
                <Route path="/sports/:sportName" element={<SportPage />} />
                <Route path="/sports/:sportName/competitions/:competitionId" element={<SportsCompetition />} />
                <Route path="/sports/matches" element={<MatchesPage />} />
                <Route path="/live-betting/:id" element={<LiveBettingDetailPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Layout>
          </ScreenSizeProvider>
        </ThemeProvider>
      </LanguageProvider>
    </WebSocketProvider>
  )
}
