#!/usr/bin/env node
/**
 * Screenshot-only sizzle reel for PackOtter (no screen recording).
 * Output: assets/video/packotter-sizzle-9x16.mp4 (vertical, ~26s)
 *
 * Usage: node scripts/generate-sizzle-video.mjs
 */

import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const shotsDir = join(root, "assets/screenshots");
const outDir = join(root, "assets/video");
const workDir = join(outDir, ".sizzle-build");
const output = join(outDir, "packotter-sizzle-9x16.mp4");

const FONT =
  process.platform === "darwin"
    ? "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
    : "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf";

const FPS = 30;
const SLIDE_SEC = 2.4;
const FADE_SEC = 0.45;
const SLIDE_FRAMES = Math.round(SLIDE_SEC * FPS);
const FADE_FRAMES = Math.round(FADE_SEC * FPS);

const slides = [
  {
    file: "01_home.png",
    caption: "All your trips on one screen",
    title: "PackOtter",
    subtitle: "Packing lists that don't disappear",
    isIntro: true,
  },
  { file: "02_wizard_travelers.png", caption: "Add who's traveling" },
  { file: "03_wizard_trip_type.png", caption: "Choose trip type & activities" },
  { file: "04_wizard_climate.png", caption: "Set climate and luggage" },
  { file: "05_checklist.png", caption: "Get a tailored packing list" },
  { file: "06_checklist_packed.png", caption: "Check off as you pack" },
  { file: "07_share_menu.png", caption: "Share lists or export" },
  { file: "08_settings.png", caption: "No account. No ads. No tracking." },
  {
    file: "06_checklist_packed.png",
    caption: "Get it on Google Play",
    isOutro: true,
  },
];

function run(cmd, args) {
  execFileSync(cmd, args, { stdio: "inherit" });
}

function escDrawtext(text) {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/:/g, "\\:")
    .replace(/'/g, "\\'");
}

function buildSlide(index, slide) {
  const input = join(shotsDir, slide.file);
  const segment = join(workDir, `slide-${String(index).padStart(2, "0")}.mp4`);

  const base =
    `scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,` +
    `zoompan=z='min(1+0.0009*on,1.07)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':` +
    `d=${SLIDE_FRAMES}:s=1080x1920:fps=${FPS}`;

  const caption = escDrawtext(slide.caption);
  let vf = base;

  if (slide.isIntro) {
    const title = escDrawtext(slide.title);
    const subtitle = escDrawtext(slide.subtitle);
    vf +=
      `,drawbox=x=0:y=0:w=iw:h=ih:color=black@0.45:t=fill` +
      `,drawtext=fontfile='${FONT}':text='${title}':fontsize=88:fontcolor=white:x=(w-text_w)/2:y=h*0.38` +
      `,drawtext=fontfile='${FONT}':text='${subtitle}':fontsize=40:fontcolor=white@0.92:x=(w-text_w)/2:y=h*0.38+110`;
  } else if (slide.isOutro) {
    vf +=
      `,drawbox=x=0:y=0:w=iw:h=ih:color=black@0.5:t=fill` +
      `,drawtext=fontfile='${FONT}':text='${caption}':fontsize=52:fontcolor=white:x=(w-text_w)/2:y=h*0.46`;
  } else {
    vf +=
      `,drawbox=x=0:y=h-150:w=iw:h=150:color=black@0.55:t=fill` +
      `,drawtext=fontfile='${FONT}':text='${caption}':fontsize=38:fontcolor=white:x=(w-text_w)/2:y=h-95`;
  }

  run("ffmpeg", [
    "-y",
    "-loop",
    "1",
    "-i",
    input,
    "-vf",
    vf,
    "-t",
    String(SLIDE_SEC),
    "-pix_fmt",
    "yuv420p",
    "-an",
    segment,
  ]);

  return segment;
}

function concatWithCrossfade(segments) {
  if (segments.length === 1) return segments[0];

  let current = segments[0];
  let currentDuration = SLIDE_SEC;

  for (let i = 1; i < segments.length; i++) {
    const next = segments[i];
    const merged = join(workDir, `merge-${i}.mp4`);
    const offset = currentDuration - FADE_SEC;

    run("ffmpeg", [
      "-y",
      "-i",
      current,
      "-i",
      next,
      "-filter_complex",
      `[0:v][1:v]xfade=transition=fade:duration=${FADE_SEC}:offset=${offset},format=yuv420p[v]`,
      "-map",
      "[v]",
      "-an",
      merged,
    ]);

    currentDuration += SLIDE_SEC - FADE_SEC;
    current = merged;
  }

  return current;
}

mkdirSync(outDir, { recursive: true });
if (existsSync(workDir)) rmSync(workDir, { recursive: true, force: true });
mkdirSync(workDir, { recursive: true });

console.log("Building screenshot sizzle reel…");
const segments = slides.map((slide, i) => buildSlide(i, slide));
const merged = concatWithCrossfade(segments);
run("ffmpeg", ["-y", "-i", merged, "-c", "copy", output]);
rmSync(workDir, { recursive: true, force: true });

const duration = (slides.length * SLIDE_SEC - (slides.length - 1) * FADE_SEC).toFixed(1);
console.log(`\nDone: ${output}`);
console.log(`Format: 1080×1920 vertical, ~${duration}s, silent (add music in an editor if desired).`);
