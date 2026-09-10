import PhotoMap from './photo-map';
import { connection } from 'next/server';
import { getLocalPhotos } from './local-photos';

export default async function Home() {
  await connection();
  return <PhotoMap photos={await getLocalPhotos()} />;
}
