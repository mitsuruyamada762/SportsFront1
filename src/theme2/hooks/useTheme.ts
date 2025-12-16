import { useEffect, useState } from 'react';

export type Theme = 'dark' | 'light' | 'auto';
export type EffectiveTheme = 'dark' | 'light';

interface UseThemeReturn {
  theme: Theme;
  effectiveTheme: EffectiveTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  systemTheme: EffectiveTheme;
}

/**
 * Custom hook for managing application theme
 * 
 * Features:
 * - Persists theme preference to localStorage
 * - Detects system theme preference
 * - Supports auto mode (follows system)
 * - Provides toggle functionality
 * 
 * @example
 * ```tsx
 * const { theme, effectiveTheme, setTheme, toggleTheme } = useTheme();
 * 
 * return (
 *   <button onClick={toggleTheme}>
 *     Current: {effectiveTheme}
 *   </button>
 * );
 * ```
 */
export const useTheme = (): UseThemeReturn => {
  const [theme, setThemeState] = useState<Theme>('auto');
  const [systemTheme, setSystemTheme] = useState<EffectiveTheme>('dark');

  // Detect system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    // Set initial value
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Load saved theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    
    if (savedTheme && ['dark', 'light', 'auto'].includes(savedTheme)) {
      setThemeState(savedTheme);
    }
  }, []);

  // Calculate effective theme
  const effectiveTheme: EffectiveTheme = theme === 'auto' ? systemTheme : theme;

  // Apply theme to document
  useEffect(() => {
    if (effectiveTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [effectiveTheme]);

  // Set theme and persist to localStorage
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Toggle between dark and light (skips auto)
  const toggleTheme = () => {
    const newTheme = effectiveTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return {
    theme,
    effectiveTheme,
    setTheme,
    toggleTheme,
    systemTheme,
  };
};

export default useTheme;
