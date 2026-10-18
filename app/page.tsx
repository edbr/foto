import type { Metadata } from 'next';
import HomeContent from './home-content';
import { pageDetails, site } from './site';

const details = pageDetails('/');
export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website', siteName: site.name, url: '/',
    title: details.title, description: details.description,
    images: [{ url: site.socialImage, alt: 'Photography from the sertão travel story' }],
    locale: 'en_US', alternateLocale: ['pt_BR'],
  },
};

export default function Home() { return <HomeContent />; }
