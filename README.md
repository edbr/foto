# Foto

A small Next.js App Router + TypeScript app for placing photo thumbnails on a Mapbox map.

## Run locally

1. Run `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Set `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` to your public (`pk.`) token from https://console.mapbox.com/ . Next.js exposes this value to the browser; use a public token, never a secret token. Configure allowed URLs in Mapbox for your development and deployed origins.
4. Run `npm run dev` and open the printed local URL.

## Add local images

Copy your JPEG, PNG, WebP, or GIF files directly into `public/photos/`, then refresh the page. For example, `public/photos/vacation.jpg` is served at `/photos/vacation.jpg`.

The app automatically assigns mock coordinates near cities across northeast Brazil, including Recife, Fortaleza, Natal, Salvador, and São Luís. Locations are stable per filename across refreshes and when other photos are added. Renaming a file changes its location. These are mock locations, not GPS metadata.

Click a map thumbnail to preview it. Remove an image by deleting its file from the folder and refreshing. Files remain on disk between restarts; no S3 or database is needed.

Mapbox still requires a valid token and internet connection for map resources.

## Local ambience

Put an MP3, WAV, OGG, or M4A recording in `public/audio/` and refresh the page:

- `default.mp3` plays for every photo without its own recording.
- Match an image's filename (without its extension) for a specific ambience: `public/photos/market.jpg` uses `public/audio/market.mp3`.
- Without a matching or default recording, the app rotates through the audio files in filename order across the sorted photos. This is a placeholder assignment, not scene recognition.

Audio loops at a low volume while the slideshow is open, fades between different recordings, and stops on close. Use Mute/Unmute in the toolbar. If your browser blocks playback, click Enable sound. If the audio folder is empty, photos are silent.

## Commands

- `npm run dev` — development server
- `npm run build` — TypeScript check and production build
- `npm start` — serve the production build locally

## Structure

- `app/photo-map.tsx` — map setup, markers, and popups
- `public/photos/` — local image files
- `app/local-photos.ts` — image discovery and mock coordinates
- `app/globals.css` — layout and photo marker styles
- `.env.example` — public token configuration template

Mapbox setup follows https://docs.mapbox.com/mapbox-gl-js/guides/get-started/use-with-npm/ .
