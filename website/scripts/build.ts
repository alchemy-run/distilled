#!/usr/bin/env bun
import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const websiteRoot = fileURLToPath(new URL("..", import.meta.url));
const repoRoot = join(websiteRoot, "..");
const publicDir = join(websiteRoot, "public");
const distDir = join(websiteRoot, "dist");
const packagesDir = join(repoRoot, "packages");

type Pkg = { name: string; dir: string; version: string };

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const readPackages = async (): Promise<Pkg[]> => {
  const entries = await readdir(packagesDir, { withFileTypes: true });
  const packages: Pkg[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const pkgPath = join(packagesDir, entry.name, "package.json");
    try {
      const pkg = JSON.parse(await readFile(pkgPath, "utf8")) as {
        name?: unknown;
        version?: unknown;
        private?: unknown;
      };
      if (pkg.private === true) continue;
      if (
        typeof pkg.name !== "string" ||
        !pkg.name.startsWith("@distilled.cloud/")
      ) {
        continue;
      }
      packages.push({
        name: pkg.name,
        dir: entry.name,
        version: typeof pkg.version === "string" ? pkg.version : "",
      });
    } catch {
      // Skip directories without a readable package.json.
    }
  }
  packages.sort((a, b) => a.name.localeCompare(b.name));
  return packages;
};

const listItems = (packages: Pkg[]): string =>
  packages
    .map((pkg) => {
      const name = escapeHtml(pkg.name);
      const dir = escapeHtml(pkg.dir);
      const version = pkg.version ? escapeHtml(pkg.version) : "";
      return `<li data-name="${name}"><a href="https://www.npmjs.com/package/${name}"><code>${name}</code></a>${version ? ` <span class="ver">${version}</span>` : ""} <a class="src" href="https://github.com/alchemy-run/distilled/tree/main/packages/${dir}">src</a></li>`;
    })
    .join("\n");

const packages = await readPackages();

await rm(distDir, { recursive: true, force: true });
await mkdir(distDir, { recursive: true });
await cp(publicDir, distDir, { recursive: true });

const indexPath = join(distDir, "index.html");
let html = await readFile(indexPath, "utf8");
html = html.replace("<!-- PACKAGES -->", listItems(packages));
html = html.replaceAll("<!-- PACKAGE_COUNT -->", String(packages.length));
await writeFile(indexPath, html);

console.log(`built ${packages.length} packages → ${distDir}`);
