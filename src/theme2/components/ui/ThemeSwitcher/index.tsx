import React, { useEffect, useState } from 'react';
import './index.scss';

type Theme = 'dark' | 'light' | 'auto';

/**
 * ThemeSwitcher Component
 * 
 * Example component demonstrating how to implement theme switching
 * using the CSS variables system.
 * 
 * Features:
 * - Dark/Light theme toggle
 * - Auto mode (follows system preference)
 * - localStorage persistence
 * - Smooth transitions
 */
export const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('auto');
  const [systemTheme, setSystemTheme] = useState<'dark' | 'light'>('dark');

  // Detect system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Load saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && ['dark', 'light', 'auto'].includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    const effectiveTheme = theme === 'auto' ? systemTheme : theme;
    
    if (effectiveTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme, systemTheme]);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <div className="theme-switcher">
      <div className="theme-switcher-label">Theme</div>
      <div className="theme-switcher-buttons">
        <button
          className={`theme-button ${theme === 'dark' ? 'active' : ''}`}
          onClick={() => handleThemeChange('dark')}
          title="Dark theme"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor"
            width="20"
            height="20"
          >
            <path d="M21.64 13a1 1 0 0 0-1.05-.14 8.05 8.05 0 0 1-3.37.73 8.15 8.15 0 0 1-8.14-8.1 8.59 8.59 0 0 1 .25-2A1 1 0 0 0 8 2.36a10.14 10.14 0 1 0 14 11.69 1 1 0 0 0-.36-1.05z"/>
          </svg>
          <span>Dark</span>
        </button>

        <button
          className={`theme-button ${theme === 'light' ? 'active' : ''}`}
          onClick={() => handleThemeChange('light')}
          title="Light theme"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor"
            width="20"
            height="20"
          >
            <path d="M12 6a1 1 0 0 0 1-1V3a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1zm9 5h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zM6 12a1 1 0 0 0-1-1H3a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1zm.22-7a1 1 0 0 0-1.39 1.47l1.44 1.39a1 1 0 0 0 .73.28 1 1 0 0 0 .72-.31 1 1 0 0 0 0-1.41zM17 8.14a1 1 0 0 0 .69-.28l1.44-1.39A1 1 0 0 0 17.78 5l-1.44 1.42a1 1 0 0 0 0 1.41 1 1 0 0 0 .66.31zM12 18a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1zm5.73-1.86a1 1 0 0 0-1.39 1.44L17.78 19a1 1 0 0 0 .69.28 1 1 0 0 0 .72-.3 1 1 0 0 0 0-1.42zm-11.46 0l-1.44 1.39a1 1 0 0 0 0 1.42 1 1 0 0 0 .72.3 1 1 0 0 0 .67-.25l1.44-1.39a1 1 0 0 0-1.39-1.44zM12 8a4 4 0 1 0 4 4 4 4 0 0 0-4-4z"/>
          </svg>
          <span>Light</span>
        </button>

        <button
          className={`theme-button ${theme === 'auto' ? 'active' : ''}`}
          onClick={() => handleThemeChange('auto')}
          title="Auto (follow system)"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor"
            width="20"
            height="20"
          >
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 0 1 0-16v16z"/>
          </svg>
          <span>Auto</span>
        </button>
      </div>
      
      {theme === 'auto' && (
        <div className="theme-switcher-info">
          Using {systemTheme} theme (system preference)
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
