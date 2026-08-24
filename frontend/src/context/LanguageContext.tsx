'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ID' | 'EN';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (idText: string, enText: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'ID',
  setLang: () => {},
  t: (idText: string) => idText,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('ID');

  useEffect(() => {
    const saved = localStorage.getItem('holicindo_lang') as Language;
    if (saved === 'ID' || saved === 'EN') {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('holicindo_lang', newLang);
  };

  const t = (idText: string, enText: string) => {
    return lang === 'EN' ? enText : idText;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
