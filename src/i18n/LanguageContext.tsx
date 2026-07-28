import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, TranslationStructure, TRANSLATIONS, ALPHABETS } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof TranslationStructure) => string;
  alphabet: string[];
  translations: TranslationStructure;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('pharma_lang');
      if (saved === 'ru' || saved === 'en' || saved === 'hy') {
        return saved;
      }
    } catch {
      // ignore error
    }
    return 'ru';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('pharma_lang', lang);
    } catch (e) {
      console.error('Failed to save language preference', e);
    }
  };

  const t = (key: keyof TranslationStructure): string => {
    const current = TRANSLATIONS[language] || TRANSLATIONS.ru;
    return current[key] || TRANSLATIONS.ru[key] || key;
  };

  const alphabet = ALPHABETS[language] || ALPHABETS.ru;
  const translations = TRANSLATIONS[language] || TRANSLATIONS.ru;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, alphabet, translations }}>
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
