import { readdir } from 'node:fs/promises';
import path from 'node:path';
import type { Photo } from './photo';
import { itinerary } from './itinerary';

function tripCoordinates(index: number, count: number) {
  const stopIndex = count <= 1 ? 0 : Math.round(index * (itinerary.length - 1) / (count - 1));
  const stop = itinerary[stopIndex];
  // Slight separation for photos assigned to the same stop; still mock locations.
  const offset = (index % 3 - 1) * 0.0007;
  return {
    tags: [stop.name, stop.leg],
    longitude: stop.longitude + offset,
    latitude: stop.latitude,
  };
}

export async function getLocalPhotos(): Promise<Photo[]> {
  const [entries, audioEntries] = await Promise.all([
    readdir(path.join(process.cwd(), 'public', 'photos'), { withFileTypes: true }),
    readdir(path.join(process.cwd(), 'public', 'audio'), { withFileTypes: true }),
  ]);
  const audioFiles = audioEntries.filter((entry) => entry.isFile() && /\.(mp3|wav|ogg|m4a)$/i.test(entry.name))
    .map((entry) => entry.name).sort();
  const audioFor = (name: string, index: number) => {
    const stem = path.parse(name).name;
    const match = audioFiles.find((file) => path.parse(file).name === stem)
      ?? audioFiles.find((file) => path.parse(file).name === 'default')
      ?? audioFiles[index % audioFiles.length];
    return match ? `/audio/${encodeURIComponent(match)}` : undefined;
  };
  const imageFiles = entries
    .filter((entry) => entry.isFile() && /\.(jpe?g|png|webp|gif)$/i.test(entry.name))
    .sort((a, b) => a.name.localeCompare(b.name));
  return imageFiles.map(({ name }, index) => ({ id: name, name, url: `/photos/${encodeURIComponent(name)}`, audioUrl: audioFor(name, index), ...tripCoordinates(index, imageFiles.length) }));
}
