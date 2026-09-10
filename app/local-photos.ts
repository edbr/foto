import { readdir } from 'node:fs/promises';
import path from 'node:path';
import type { Photo } from './photo';

// Mock locations across northeast Brazil: Recife, Fortaleza, Natal,
// João Pessoa, Maceió, Aracaju, Salvador, São Luís, Teresina, and Petrolina.
const locations = [
  [-34.877, -8.0476], [-38.5267, -3.7319], [-35.211, -5.7945],
  [-34.8631, -7.1195], [-35.735, -9.6498], [-37.0731, -10.9472],
  [-38.5014, -12.9777], [-44.2825, -2.5307], [-42.8034, -5.0892],
  [-40.507, -9.3891],
];

function mockCoordinates(filename: string) {
  let hash = 2166136261;
  for (const character of filename) {
    hash = Math.imul(hash ^ character.charCodeAt(0), 16777619) >>> 0;
  }
  const [longitude, latitude] = locations[hash % locations.length];
  // Small offsets separate photos near the same city; filenames keep locations stable.
  return {
    longitude: longitude + ((Math.floor(hash / 10) % 1000) / 1000 - 0.5) * 0.02,
    latitude: latitude + ((Math.floor(hash / 10000) % 1000) / 1000 - 0.5) * 0.02,
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
  return entries
    .filter((entry) => entry.isFile() && /\.(jpe?g|png|webp|gif)$/i.test(entry.name))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(({ name }, index) => ({ id: name, name, url: `/photos/${encodeURIComponent(name)}`, audioUrl: audioFor(name, index), ...mockCoordinates(name) }));
}
