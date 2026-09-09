#!/usr/bin/env bun
// Renders assets/og.html to public/og.png (1200×630) with a local headless
// Chromium. Run by hand when the card changes; the PNG is committed so the
// site build never needs a browser.
import { existsSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const websiteRoot = fileURLToPath(new URL("..", import.meta.url));
const src = join(websiteRoot, "assets", "og.html");
const out = join(websiteRoot, "public", "og.png");

const findChromium = async (): Promise<string> => {
  if (process.env.CHROMIUM) return process.env.CHROMIUM;
  const cache = join(homedir(), ".cache", "ms-playwright");
  if (existsSync(cache)) {
    for (const dir of (await readdir(cache)).sort().reverse()) {
      for (const candidate of [
        join(
          cache,
          dir,
          "chrome-headless-shell-linux64",
          "chrome-headless-shell",
        ),
        join(cache, dir, "chrome-linux64", "chrome"),
        join(cache, dir, "chrome-linux", "chrome"),
      ]) {
        if (existsSync(candidate)) return candidate;
      }
    }
  }
  for (const bin of [
    "chromium",
    "chromium-browser",
    "google-chrome",
    "google-chrome-stable",
  ]) {
    const found = Bun.which(bin);
    if (found) return found;
  }
  throw new Error("no Chromium found; set CHROMIUM=/path/to/chrome");
};

const chromium = await findChromium();
const proc = Bun.spawn(
  [
    chromium,
    "--headless=new",
    "--no-sandbox",
    "--disable-gpu",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    "--window-size=1200,630",
    `--screenshot=${out}`,
    "--virtual-time-budget=2000",
    `file://${src}`,
  ],
  { stdout: "ignore", stderr: "pipe" },
);
const code = await proc.exited;
if (code !== 0) {
  console.error(await new Response(proc.stderr).text());
  process.exit(code);
}
console.log(`wrote ${out}`);
