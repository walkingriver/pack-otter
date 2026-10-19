# PackOtter

Public marketing site and privacy policy for PackOtter.

**Live:** https://packotter.walkingriver.com (Cloudflare Pages project `packotter`, connected to this repo)
**Legacy:** https://walkingriver.com/pack-otter/ (GitHub Pages, same files; v1.1 of the app links here)

App source (private): [pack-otter-app](https://github.com/walkingriver/pack-otter-app)

## Pages

| Path | Purpose |
|------|---------|
| `/` | Landing page: hero, 30 s trailer, screenshot tour, features, pricing |
| `/privacy.html` | Privacy policy (linked from the app and Play Console) |
| `/404.html` | Not-found page (also stops Cloudflare Pages serving the home page for unknown paths) |
| `/robots.txt`, `/sitemap.xml` | Crawl rules (keeps `/import` out) and sitemap |
| `/import?p=…` | Opens a shared list in the app (falls back to Google Play) |
| `/.well-known/assetlinks.json` | Android App Links verification for `packotter.walkingriver.com/import` |
| `_redirects`, `_headers` | Cloudflare Pages config (ignored by GitHub Pages) |

## Deploy

Push to `main`. That publishes both copies:

- **Cloudflare Pages (primary):** project `packotter` builds from this repo on every push to `main`
  and serves it at packotter.walkingriver.com. (The separate `pack-otter` project has no deployments; don't use it.)
- **GitHub Pages (legacy path):** `.github/workflows/pages.yml` publishes walkingriver.com/pack-otter/.

After a push, check https://packotter.walkingriver.com/.well-known/assetlinks.json returns JSON and
https://packotter.walkingriver.com/import?p=test shows the import page.

## Local preview

```bash
python3 -m http.server 8080
```

## Screenshots and trailer

Generated in the app repo, then copied here:

```bash
cd ../pack-otter-app
npm run android:screenshots:play   # emulator capture (7 phone screenshots; set ANDROID_SERIAL if several devices)
npm run play:screenshots:site      # copies PNGs → assets/screenshots/ (js/tour.js lists them by name)
npm run trailer                    # music + trailer + poster + og-image + feature graphic
cp android/store-assets/video/packotter-trailer-16x9.mp4 android/store-assets/video/packotter-trailer-poster.jpg ../pack-otter/assets/video/
```

The trailer music is original and synthesized (`android/scripts/trailer/compose_music.py`), so it is royalty-free.

## Play Store

`https://play.google.com/store/apps/details?id=com.walkingriver.packotter`
