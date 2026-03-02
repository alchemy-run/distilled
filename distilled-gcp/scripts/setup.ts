#!/usr/bin/env bun
/**
 * Fetches all GCP API discovery documents to a local cache.
 *
 * Usage:
 *   bun run scripts/fetch-specs.ts              # Fetch all APIs
 *   bun run scripts/fetch-specs.ts --service storage  # Fetch single service
 *   bun run scripts/fetch-specs.ts --preferred   # Only preferred versions (default)
 *   bun run scripts/fetch-specs.ts --all         # All versions
 *
 * Discovery docs are saved to:
 *   specs/{name}-{version}.json
 *
 * Also saves the directory listing to:
 *   specs/_directory.json
 */

const DISCOVERY_URL = "https://discovery.googleapis.com/discovery/v1/apis";

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

// Parse args
const args = process.argv.slice(2);
const serviceFilter = args.includes("--service")
  ? args[args.indexOf("--service") + 1]
  : undefined;
const allVersions = args.includes("--all");
const preferredOnly = !allVersions;
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
    "specs/_directory.json",
    JSON.stringify(directory, null, 2),
  );

  console.log(`Found ${directory.items.length} API entries`);

  // Filter items
  let items = directory.items;

  if (serviceFilter) {
    items = items.filter((item) => item.name === serviceFilter);
    if (items.length === 0) {
      console.error(`No API found with name: ${serviceFilter}`);
      console.log(
        "Available:",
        [...new Set(directory.items.map((i) => i.name))].sort().join(", "),
      );
      process.exit(1);
    }
  }

  if (preferredOnly) {
    items = items.filter((item) => item.preferred);
  }

  console.log(`Fetching ${items.length} discovery documents...`);

  // Fetch in batches for concurrency control
  let fetched = 0;
  let failed = 0;
  const errors: string[] = [];

  for (let i = 0; i < items.length; i += concurrency) {
    const batch = items.slice(i, i + concurrency);
    const results = await Promise.allSettled(
      batch.map(async (item) => {
        const filename = `${item.name}-${item.version}.json`;
        const filepath = `specs/${filename}`;

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
        return Bun.file(`specs/${item.name}-${item.version}.json`).size > 0;
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

  await Bun.write("specs/_manifest.json", JSON.stringify(manifest, null, 2));

  console.log(
    `\nDone! ${fetched} specs saved to specs/, ${failed} failed.`,
  );
  console.log(`Manifest: specs/_manifest.json`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
