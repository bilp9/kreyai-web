# KreyAI Web

Public KreyAI website and customer workflows for transcription, aTelier, Dekk, Adwaz, pricing, downloads, checkout, release notes, privacy, and terms.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Checks

```bash
npm run lint
npm run build
```

## Configuration

Runtime configuration is supplied through environment variables. Keep secrets in local environment files or the hosting provider, never in Git.

Common public configuration includes:

- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_ATELIER_DOWNLOAD_URL`
- `NEXT_PUBLIC_ATELIER_WINDOWS_DOWNLOAD_URL`
- Dekk download and checkout configuration

## aTelier Releases

`public/atelier/releases/latest.json` is the canonical release manifest for update checks, platform downloads, hashes, and release-note links. Product pages and download routes should derive release information from this manifest rather than duplicating version numbers.

Release-note pages live in `app/atelier/releases/`.

## Deployment

Production is deployed through Vercel. Before deployment:

1. Run lint and the production build.
2. Verify Privacy and Terms match current product behavior.
3. Verify desktop download URLs and checksums.
4. Test checkout, license delivery, and mobile download layouts.
5. Confirm canonical URLs and sitemap entries.
