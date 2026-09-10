# Foto

A small Next.js App Router + TypeScript app for placing photo thumbnails on a Mapbox map.

## Run locally

1. Run `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Set `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` to your public (`pk.`) token from https://console.mapbox.com/ . Next.js exposes this value to the browser; use a public token, never a secret token. Configure allowed URLs in Mapbox for your development and deployed origins.
4. Run `npm run dev` and open the printed local URL.

## Add local images

Copy your JPEG, PNG, WebP, or GIF files directly into `public/photos/`, then refresh the page. For example, `public/photos/vacation.jpg` is served at `/photos/vacation.jpg`.

Photos are assigned approximate positions in filename order along the itinerary in `app/itinerary.ts`: Aracaju → Propriá → Paulo Afonso → Glória → Brejo do Burgo → Raso da Catarina → Floresta → Salgueiro → Juazeiro do Norte; returning via Petrolina → Juazeiro → Canudos → Jeremoabo → Aracaju. Tags identify the stop and Ida/Volta. These are mock placements, not GPS metadata or verified photo locations. Adding or removing photos redistributes assignments. The default route visits every itinerary stop even if fewer photos are present; tag filters route between the selected photos.

The initial view fits this journey while retaining the northeast panning bounds. Raso da Catarina is a broad region: its waypoint is approximate, and Directions snaps it to the road network. Edit `app/itinerary.ts` to refine stops or access points.

Click a map thumbnail to preview it. Remove an image by deleting its file from the folder and refreshing. Files remain on disk between restarts; no S3 or database is needed.

Mapbox still requires a valid token and internet connection for map resources.

## Local ambience

Put an MP3, WAV, OGG, or M4A recording in `public/audio/` and refresh the page:

- `default.mp3` plays for every photo without its own recording.
- Match an image's filename (without its extension) for a specific ambience: `public/photos/market.jpg` uses `public/audio/market.mp3`.
- Without a matching or default recording, the app rotates through the audio files in filename order across the sorted photos. This is a placeholder assignment, not scene recognition.

Audio loops at a low volume while the slideshow is open, fades between different recordings, and stops on close. Use Mute/Unmute in the toolbar. If your browser blocks playback, click Enable sound. If the audio folder is empty, photos are silent.

## Northeast biomes

The map is restricted to northeast Brazil, with surrounding areas dimmed. A local biome overlay shows Caatinga, Cerrado, Mata Atlântica, and Amazônia. Click a biome in the legend to isolate it; click it again or Show all to restore the full overlay. Hide biomes returns to the terrain colors.

The overlay uses the complete 2004 data from the provided CSV, clipped to IBGE's regional boundary. The 2019 set has missing Amazônia geometry. See `public/geo/README.md` for provenance and regeneration instructions.

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

### Destination suggestions

The home-page form submits text to `POST /api/suggestions`, which sends a plain-text email to `edbelluti@gmail.com` using [Resend](https://resend.com/docs/api-reference/emails/send-email). Visitors need no account or email client.

Set these server-only variables in `.env` (and the deployment environment), then restart the app:

```dotenv
RESEND_API_KEY=your_resend_api_key
SUGGESTIONS_FROM_EMAIL=Stories <stories@your-verified-domain.com>
```

Use a sender verified in your Resend account. Neither variable should use the `NEXT_PUBLIC_` prefix. Missing configuration or provider failure displays an error and preserves the visitor’s text. A success means the provider accepted the email; inbox delivery is handled by Resend.

Validation limits suggestions to 2–200 characters. A per-process ceiling allows 10 email attempts per minute; it resets on restart and is not shared across deployment instances. Configure shared rate limiting for a public deployment with substantial traffic. Run `node scripts/check-suggestions.mjs` to verify the endpoint with mocked email delivery.
