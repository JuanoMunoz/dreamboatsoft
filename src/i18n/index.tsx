import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { es } from './es';
import { en } from './en';

type Language = 'es' | 'en';
type Translations = typeof es;

interface I18nContextType {
  lang: Language;
  t: Translations;
  setLang: (lang: Language) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const ThemeI18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>('es');
  
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const applyThemeToDOM = (selectedTheme: 'light' | 'dark') => {
    document.documentElement.setAttribute('data-theme', selectedTheme);
    if (selectedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      applyThemeToDOM(next);
      return next;
    });
  };

  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  const value = {
    lang,
    t: lang === 'es' ? es : en,
    setLang,
    theme,
    toggleTheme
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within ThemeI18nProvider');
  return context;
};
