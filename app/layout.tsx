import type { Metadata } from 'next';
import 'mapbox-gl/dist/mapbox-gl.css';
import './globals.css';
import { LanguageProvider } from './language';

export const metadata: Metadata = {
  title: 'Stories — Paths of discovery',
  description: 'Explore stories, sounds, and places on an interactive map.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><LanguageProvider>{children}</LanguageProvider></body></html>;
}
