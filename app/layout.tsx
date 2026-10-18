import type { Metadata } from 'next';
import 'mapbox-gl/dist/mapbox-gl.css';
import './globals.css';
import { LanguageProvider } from './language';
import { person, site, pageDetails } from './site';
import { StructuredData } from './structured-data';

const details = pageDetails('/');

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: details.title,
  description: details.description,
  authors: [{ name: person.name, url: person.url }],
  creator: person.name,
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'en_US',
    alternateLocale: ['pt_BR'],
    title: details.title,
    description: details.description,
    images: [{ url: site.socialImage, alt: 'Photography from the sertão travel story' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: details.title,
    description: details.description,
    images: [site.socialImage],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><StructuredData data={{
    '@context': 'https://schema.org',
    '@graph': [
      person,
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        name: site.name,
        url: `${site.url}/`,
        description: details.description,
        inLanguage: ['en', 'pt-BR'],
        creator: { '@id': person['@id'] },
      },
      {
        '@type': 'WebApplication',
        '@id': `${site.url}/#application`,
        name: site.name,
        url: `${site.url}/`,
        description: details.description,
        applicationCategory: 'TravelApplication',
        operatingSystem: 'Any',
        creator: { '@id': person['@id'] },
        subjectOf: { '@type': 'Article', url: site.writeupUrl, headline: 'When Photography Becomes Data' },
      },
    ],
  }} /><LanguageProvider>{children}</LanguageProvider></body></html>;
}
