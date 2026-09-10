'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import messages from './translations.json';
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
    document.title = pathname.startsWith('/trips/') ? `${t('Pelos caminhos do sertão')} — ${t('Stories')}` : t('Foto — Photos on a map');
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('Place your photos on an interactive map.'));
  }, [pathname, t]);
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
