import type { Metadata } from 'next';
import 'mapbox-gl/dist/mapbox-gl.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Foto — Photos on a map',
  description: 'Place your photos on an interactive map.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
