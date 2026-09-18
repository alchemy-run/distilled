#!/usr/bin/env bun
/**
 * Fetches all GCP API discovery documents (all versions) to ../specs/.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Discovery docs are saved to:
 *   ../specs/{name}-{version}.json
 *
 * Also saves:
 *   ../specs/_directory.json   – raw directory listing from Google
 *   ../specs/_manifest.json    – manifest of successfully fetched specs
 */

import { mkdirSync } from "fs";

const DISCOVERY_URL = "https://discovery.googleapis.com/discovery/v1/apis";
const SPECS_DIR = "../specs";

// Ensure the specs directory exists
mkdirSync(SPECS_DIR, { recursive: true });

interface DirectoryItem {
  kind: string;
  id: string;
  name: string;
  version: string;
  title: string;
  description: string;
  discoveryRestUrl: string;
  preferred: boolean;
}

interface DirectoryResponse {
  kind: string;
  discoveryVersion: string;
  items: DirectoryItem[];
}

/**
 * APIs that publish a discovery document but are not listed in Google's
 * central discovery directory at {@link DISCOVERY_URL}. Add entries here to
 * include them in the mirror.
 */
const EXTRAS: DirectoryItem[] = [
  {
    kind: "discovery#directoryItem",
    id: "lustre:v1",
    name: "lustre",
    version: "v1",
    title: "Google Cloud Managed Lustre API",
    description: "Google Cloud Managed Lustre API.",
    discoveryRestUrl:
      "https://lustre.googleapis.com/$discovery/rest?version=v1",
    preferred: true,
  },
];

const concurrency = 20;

async function main() {
  console.log("Fetching GCP API directory...");

  const dirResponse = await fetch(DISCOVERY_URL);
  if (!dirResponse.ok) {
    throw new Error(
      `Failed to fetch directory: ${dirResponse.status} ${dirResponse.statusText}`,
    );
  }
  const directory: DirectoryResponse = await dirResponse.json();

  // Save directory
  await Bun.write(
    `${SPECS_DIR}/_directory.json`,
    JSON.stringify(directory, null, 2),
  );

  // Merge in APIs published outside the central directory. Re-sort by
  // name+version so the manifest stays alphabetically stable.
  directory.items = [...directory.items, ...EXTRAS].sort((a, b) =>
    `${a.name}:${a.version}`.localeCompare(`${b.name}:${b.version}`),
  );

  console.log(
    `Found ${directory.items.length} API entries (${EXTRAS.length} from EXTRAS)`,
  );

  // Fetch ALL versions of ALL APIs — no filtering
  const items = directory.items;

  console.log(`Fetching ${items.length} discovery documents...`);

  // Fetch in batches for concurrency control
  let fetched = 0;
  let failed = 0;
  const errors: string[] = [];

  for (let i = 0; i < items.length; i += concurrency) {
    const batch = items.slice(i, i + concurrency);
    await Promise.allSettled(
      batch.map(async (item) => {
        const filename = `${item.name}-${item.version}.json`;
        const filepath = `${SPECS_DIR}/${filename}`;

        try {
          const response = await fetch(item.discoveryRestUrl);
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          const doc = await response.json();
          await Bun.write(filepath, JSON.stringify(doc, null, 2));
          fetched++;
        } catch (err) {
          failed++;
          const msg = `Failed: ${item.name}@${item.version}: ${err}`;
          errors.push(msg);
        }
      }),
    );

    const pct = Math.round(((i + batch.length) / items.length) * 100);
    process.stdout.write(
      `\r  Progress: ${fetched + failed}/${items.length} (${pct}%) - ${fetched} ok, ${failed} failed`,
    );
  }

  console.log(); // newline after progress

  if (errors.length > 0) {
    console.log("\nFailed fetches:");
    for (const err of errors) {
      console.log(`  ${err}`);
    }
  }

  // Write a manifest of all fetched specs
  const manifest = items
    .filter((item) => {
      // Check if file was actually written
      try {
        return (
          Bun.file(`${SPECS_DIR}/${item.name}-${item.version}.json`).size > 0
        );
      } catch {
        return false;
      }
    })
    .map((item) => ({
      name: item.name,
      version: item.version,
      title: item.title,
      preferred: item.preferred,
      filename: `${item.name}-${item.version}.json`,
    }));

  await Bun.write(
    `${SPECS_DIR}/_manifest.json`,
    JSON.stringify(manifest, null, 2),
  );

  console.log(`\nDone! ${fetched} specs saved to specs/, ${failed} failed.`);
  console.log(`Manifest: ${SPECS_DIR}/_manifest.json`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
