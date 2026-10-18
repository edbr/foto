'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import messages from './translations.json';
import { pageDetails } from './site';
import { usePathname } from 'next/navigation';

type Language = 'en' | 'pt';
const dictionary: Record<string, Record<Language, string>> = messages;
const Context = createContext({ language: 'en' as Language, setLanguage: (_: Language) => {}, t: (text: string) => text });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [language, updateLanguage] = useState<Language>('en');
  useEffect(() => {
    try { const stored = localStorage.getItem('foto-language'); if (stored === 'en' || stored === 'pt') updateLanguage(stored); } catch {}
  }, []);
  useEffect(() => { document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en'; }, [language]);
  const setLanguage = useCallback((value: Language) => {
    updateLanguage(value);
    try { localStorage.setItem('foto-language', value); } catch {}
  }, []);
  const t = useCallback((text: string) => dictionary[text]?.[language] ?? text, [language]);
  useEffect(() => {
    const details = pageDetails(pathname, language);
    document.title = details.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', details.description);
  }, [pathname, language]);
  return <Context.Provider value={{ language, setLanguage, t }}>{children}</Context.Provider>;
}

export const useLanguage = () => useContext(Context);

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();
  return <div className="language-switch" role="group" aria-label={language === 'pt' ? 'Idioma' : 'Language'}>
    <button lang="en" aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>English</button>
    <button lang="pt-BR" aria-pressed={language === 'pt'} onClick={() => setLanguage('pt')}>Português</button>
  </div>;
}
