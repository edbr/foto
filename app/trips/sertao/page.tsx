import type { Metadata } from 'next';
import { pageDetails, site } from '../../site';
import PhotoMap from '../../photo-map';
import { connection } from 'next/server';
import { getLocalPhotos } from '../../local-photos';

const details = pageDetails('/trips/sertao');
export const metadata: Metadata = {
  title: details.title,
  description: details.description,
  alternates: { canonical: '/trips/sertao' },
  openGraph: {
    type: 'website', siteName: site.name, url: '/trips/sertao',
    title: details.title, description: details.description,
    images: [{ url: site.socialImage, alt: 'Photography from the sertão travel story' }],
    locale: 'en_US', alternateLocale: ['pt_BR'],
  },
  twitter: {
    card: 'summary_large_image', title: details.title,
    description: details.description, images: [site.socialImage],
  },
};

export default async function SertaoTrip() {
  await connection();
  return <PhotoMap photos={await getLocalPhotos()} />;
}
