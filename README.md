# PackOtter

Public marketing site and privacy policy for PackOtter.

App source (private): [pack-otter-app](https://github.com/walkingriver/pack-otter-app)

Deployed to GitHub Pages at **https://walkingriver.github.io/pack-otter/** (enable Pages → GitHub Actions on the repo).

## Local preview

```bash
python3 -m http.server 8080
```

Open http://localhost:8080

## Screenshots

Phone screenshots live in `assets/screenshots/` (copied from `pack-otter-app/android/fastlane/metadata/android/en-US/images/phoneScreenshots/`). The homepage tour section (`#tour`) steps through them via `js/tour.js`.

To refresh after re-capturing Play Store assets:

```bash
cp ../pack-otter-app/android/fastlane/metadata/android/en-US/images/phoneScreenshots/*.png assets/screenshots/
```

## Sizzle video (screenshots only)

Vertical promo reel built from the same tour frames (~26s, silent, 1080×1920):

```bash
node scripts/generate-sizzle-video.mjs
```

Output: `assets/video/packotter-sizzle-9x16.mp4` — slow Ken Burns zoom, crossfades, caption bars. Add music in iMovie/CapCut if you want sound.

## Play Store

The Google Play link uses package id `com.walkingriver.packotter`:

`https://play.google.com/store/apps/details?id=com.walkingriver.packotter`

That URL is correct now, but Play will return a “not found” page until at least one release is published on Play Console (internal testing is enough). You do not need to change the link when the app goes live — only if the application id changes.
