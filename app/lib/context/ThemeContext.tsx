'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useThemeStore } from '../store';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const loadTheme = useThemeStore((state) => state.loadTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    loadTheme();
    setMounted(true);
  }, [loadTheme]);

  useEffect(() => {
    if (mounted) {
      // HTML elementine tema class'ını ekle
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (!mounted) {
    return null; // Hydration sorunlarını önlemek için
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 