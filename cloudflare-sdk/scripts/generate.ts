/**
 * Cloudflare SDK Code Generator
 *
 * Generates from the Cloudflare TypeScript SDK source code AST.
 * This parser extracts API resource classes from the SDK and converts them
 * to Effect-native schemas and operations.
 *
 * The generated output shape matches the original distilled-cloudflare SDK:
 * - One file per service in src/services/
 * - Each file contains schemas, error classes, and operations
 * - Operations use encodeKeys for camelCase/snake_case mapping
 *
 * NOTE: This is a scaffold. The full TypeScript AST parser from the original
 * distilled-cloudflare/scripts/generate-from-sdk.ts (~1308 lines) plus its
 * companion parse.ts and model.ts modules need to be ported here.
 */
import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import { applyAllPatches } from "@distilled.cloud/sdk-core/json-patch";

// ============================================================================
// Main
// ============================================================================

async function main() {
  const rootDir = path.join(import.meta.dir, "..");
  const sdkDir = path.join(rootDir, "specs/cloudflare-typescript");
  const patchDir = path.join(rootDir, "patches");
  const servicesDir = path.join(rootDir, "src/services");

  if (!fs.existsSync(sdkDir)) {
    console.error(
      `Cloudflare SDK directory not found: ${sdkDir}\nRun 'bun run specs:fetch' first.`,
    );
    process.exit(1);
  }

  if (!fs.existsSync(servicesDir)) {
    fs.mkdirSync(servicesDir, { recursive: true });
  }

  // Optional: filter by --service flag
  const serviceFilter = process.argv.find((a) => a.startsWith("--service="));
  const filterName = serviceFilter?.split("=")[1];

  // Find resource directories in the Cloudflare SDK
  const resourcesDir = path.join(sdkDir, "src/resources");
  if (!fs.existsSync(resourcesDir)) {
    console.error(`Resources directory not found: ${resourcesDir}`);
    process.exit(1);
  }

  const resourceDirs = fs.readdirSync(resourcesDir).filter((d) => {
    const fullPath = path.join(resourcesDir, d);
    return fs.statSync(fullPath).isDirectory() && !d.startsWith(".");
  });

  console.log(`Found ${resourceDirs.length} resource directories`);
  console.log(
    "\nNOTE: Full Cloudflare SDK generation requires the TypeScript AST parser.",
  );
  console.log(
    "This scaffold sets up the structure. The parser needs to be ported from",
  );
  console.log(
    "the original distilled-cloudflare/scripts/generate-from-sdk.ts.\n",
  );

  // TODO: Port the TypeScript AST parser from the original project
  // The original uses:
  // 1. parse.ts - TypeScript AST walking to extract APIResource classes
  // 2. model.ts - TypeInfo intermediate representation
  // 3. generate-from-sdk.ts - Main generator that:
  //    - Walks the SDK source tree
  //    - Extracts operations, parameters, response types
  //    - Resolves TypeInfo (deep type resolution)
  //    - Loads per-operation JSON patches
  //    - Generates Effect Schema with encodeKeys
  //    - Groups operations by resource

  console.log(
    `Scaffold ready. ${resourceDirs.length} resource directories available.`,
  );
  if (filterName) {
    console.log(`Filter: --service=${filterName}`);
  }

  console.log("Done!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
