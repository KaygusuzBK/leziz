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
  },
  loadTheme: () => {
    const cookieTheme = Cookies.get(THEME_COOKIE_KEY) as Theme | undefined;
    if (cookieTheme === 'light' || cookieTheme === 'dark') {
      set({ theme: cookieTheme });
    }
  },
})); 