import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './theme1/i18n/index.ts'
import { ThemeProvider, ScreenSizeProvider, LanguageProvider } from './theme1/contexts/index.ts'
import { WebSocketProvider } from './theme1/contexts/WebSocketContext.tsx'

// Prevent zoom gestures
const preventZoom = (e: Event) => {
  if ((e as any).touches && (e as any).touches.length > 1) {
    e.preventDefault();
  }
};

// Prevent double-tap zoom
let lastTouchEnd = 0;
const preventDoubleTapZoom = (e: Event) => {
  const now = new Date().getTime();
  if (now - lastTouchEnd <= 300) {
    e.preventDefault();
  }
  lastTouchEnd = now;
};

// Add event listeners
document.addEventListener('touchstart', preventZoom, { passive: false });
document.addEventListener('touchend', preventDoubleTapZoom, { passive: false });
document.addEventListener('gesturestart', (e) => e.preventDefault());
document.addEventListener('gesturechange', (e) => e.preventDefault());
document.addEventListener('gestureend', (e) => e.preventDefault());

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <WebSocketProvider>
      <LanguageProvider>
        <ThemeProvider>
          <ScreenSizeProvider breakpoint={768}>
            <App />
          </ScreenSizeProvider>
        </ThemeProvider>
      </LanguageProvider>
    </WebSocketProvider>
  </React.StrictMode>
)