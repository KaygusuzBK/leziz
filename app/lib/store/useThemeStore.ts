import { create } from 'zustand';
import Cookies from 'js-cookie';

export type Theme = 'light' | 'dark';

type ThemeState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  loadTheme: () => void;
};

const THEME_COOKIE_KEY = 'theme';

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'light',
  setTheme: (theme) => {
    Cookies.set(THEME_COOKIE_KEY, theme, { expires: 365 });
    set({ theme });
    
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
    }
  },
  loadTheme: () => {
    const cookieTheme = Cookies.get(THEME_COOKIE_KEY) as Theme | undefined;
    
    let theme: Theme = 'light';
    
    if (cookieTheme === 'light' || cookieTheme === 'dark') {
      theme = cookieTheme;
    } else if (typeof window !== 'undefined') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      theme = systemTheme;
      
      Cookies.set(THEME_COOKIE_KEY, theme, { expires: 365 });
    }
    
    set({ theme });
    
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
    }
  },
})); 