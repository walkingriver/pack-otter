# PackOtter

Public marketing site and privacy policy for PackOtter.

**Live:** https://packotter.walkingriver.com (Cloudflare Pages project `pack-otter`)
**Legacy:** https://walkingriver.com/pack-otter/ (GitHub Pages, same files; v1.1 of the app links here)

App source (private): [pack-otter-app](https://github.com/walkingriver/pack-otter-app)

## Pages

| Path | Purpose |
|------|---------|
| `/` | Landing page: hero, 30 s trailer, screenshot tour, features, pricing |
| `/privacy.html` | Privacy policy (linked from the app and Play Console) |
| `/import?p=…` | Opens a shared list in the app (falls back to Google Play) |
| `/.well-known/assetlinks.json` | Android App Links verification for `packotter.walkingriver.com/import` |
| `_redirects`, `_headers` | Cloudflare Pages config (ignored by GitHub Pages) |

## Deploy

**Cloudflare Pages (primary):** Workers & Pages → `pack-otter` → Create deployment → drag in this folder
(without `.git`, `.github`, `scripts`, `README.md`). Or from a terminal:

```bash
npx wrangler pages deploy . --project-name pack-otter
```

**GitHub Pages (legacy path):** push to `main`; `.github/workflows/pages.yml` deploys.

## Local preview

```bash
python3 -m http.server 8080
```

## Screenshots and trailer

Generated in the app repo, then copied here:

```bash
cd ../pack-otter-app
npm run android:screenshots:play   # emulator capture (8 phone screenshots)
npm run play:screenshots:site      # copies PNGs → assets/screenshots/
npm run trailer                    # music + trailer + poster + og-image + feature graphic
cp android/store-assets/video/packotter-trailer-16x9.mp4 android/store-assets/video/packotter-trailer-poster.jpg ../pack-otter/assets/video/
```

The trailer music is original and synthesized (`android/scripts/trailer/compose_music.py`), so it is royalty-free.

## Play Store

`https://play.google.com/store/apps/details?id=com.walkingriver.packotter`
