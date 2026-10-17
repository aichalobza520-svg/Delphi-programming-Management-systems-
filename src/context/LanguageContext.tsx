import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, UI_TRANSLATIONS } from '../types/localization';

export const LANGUAGE_STORAGE_KEY = 'delphi_architect_language';
export const FONT_STORAGE_KEY = 'delphi_architect_font';
export const CURRENCY_STORAGE_KEY = 'delphi_architect_currency';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
  isRTL: boolean;
  font: string;
  setFont: (font: string) => void;
  currency: string;
  setCurrency: (curr: string) => void;
  lastSavedAt: string | null;
  resetToDefaults: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Read saved preference from localStorage
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (stored === 'ar' || stored === 'en') {
          return stored;
        }
      } catch (e) {
        console.warn('LocalStorage not accessible:', e);
      }
    }
    return 'ar';
  });

  const [font, setFontState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem(FONT_STORAGE_KEY) || 'cairo';
      } catch (e) {
        return 'cairo';
      }
    }
    return 'cairo';
  });

  const [currency, setCurrencyState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem(CURRENCY_STORAGE_KEY) || (lang === 'ar' ? 'ر.س' : 'SAR');
      } catch (e) {
        return 'ر.س';
      }
    }
    return 'ر.س';
  });

  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
        setLastSavedAt(new Date().toLocaleTimeString());
      } catch (e) {
        console.error('Failed to save language to localStorage:', e);
      }
    }
  };

  const setFont = (newFont: string) => {
    setFontState(newFont);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(FONT_STORAGE_KEY, newFont);
        setLastSavedAt(new Date().toLocaleTimeString());
      } catch (e) {
        console.error('Failed to save font to localStorage:', e);
      }
    }
  };

  const setCurrency = (newCurr: string) => {
    setCurrencyState(newCurr);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(CURRENCY_STORAGE_KEY, newCurr);
        setLastSavedAt(new Date().toLocaleTimeString());
      } catch (e) {
        console.error('Failed to save currency to localStorage:', e);
      }
    }
  };

  const resetToDefaults = () => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(LANGUAGE_STORAGE_KEY);
        localStorage.removeItem(FONT_STORAGE_KEY);
        localStorage.removeItem(CURRENCY_STORAGE_KEY);
      } catch (e) {
        console.error(e);
      }
    }
    setLang('ar');
    setFontState('cairo');
    setCurrencyState('ر.س');
    setLastSavedAt(new Date().toLocaleTimeString());
  };

  const toggleLang = () => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const t = (key: string, replacements?: Record<string, string | number>): string => {
    const item = UI_TRANSLATIONS[key];
    let text = item ? item[lang] : key;

    if (replacements) {
      Object.entries(replacements).forEach(([rKey, rVal]) => {
        text = text.replace(`{${rKey}}`, String(rVal));
      });
    }

    return text;
  };

  const isRTL = lang === 'ar';

  return (
    <LanguageContext.Provider value={{ 
      lang, 
      setLang, 
      toggleLang, 
      t, 
      isRTL, 
      font, 
      setFont, 
      currency, 
      setCurrency, 
      lastSavedAt, 
      resetToDefaults 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
