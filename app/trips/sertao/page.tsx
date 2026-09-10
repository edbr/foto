import type { Metadata } from 'next';
import PhotoMap from '../../photo-map';
import { connection } from 'next/server';
import { getLocalPhotos } from '../../local-photos';

export const metadata: Metadata = { title: 'Along the roads of the sertão — Stories' };

export default async function SertaoTrip() {
  await connection();
  return <PhotoMap photos={await getLocalPhotos()} />;
}
