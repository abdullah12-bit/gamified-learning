import React, { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { DEFAULT_LANG, getLanguageMeta, translate } from '../data/uiText';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof localStorage === 'undefined') return DEFAULT_LANG;
    return localStorage.getItem('taqah_lang') || DEFAULT_LANG;
  });

  useEffect(() => {
    const meta = getLanguageMeta(lang);
    localStorage.setItem('taqah_lang', lang);
    document.documentElement.dir = meta.dir;
    document.documentElement.lang = meta.code;
  }, [lang]);

  const toggleLanguage = useCallback(() => {
    setLang(prev => (prev === 'en' ? 'ar' : 'en'));
  }, []);

  const t = useCallback((key, params) => translate(key, lang, params), [lang]);

  const value = useMemo(() => ({
    lang,
    setLang,
    toggleLanguage,
    t,
    isArabic: lang === 'ar',
    languageMeta: getLanguageMeta(lang),
  }), [lang, toggleLanguage, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
