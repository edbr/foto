import type { MetadataRoute } from 'next';
import { site } from './site';
import { trips } from './trips';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', ...trips.map(({ slug }) => `/trips/${slug}`)].map((path) => ({
    url: new URL(path, `${site.url}/`).href,
  }));
}
