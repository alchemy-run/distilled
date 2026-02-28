#!/usr/bin/env bun
/**
 * Setup script for distilled-gcp.
 *
 * 1. Creates necessary directories
 * 2. Fetches discovery documents
 * 3. Generates service files
 */

import * as fs from "node:fs";

// Ensure directories exist
for (const dir of ["specs", "patch", "src/services"]) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

console.log("Directories created.");
console.log("");
console.log("Next steps:");
console.log("  1. bun fetch-specs          # Download GCP discovery docs");
console.log("  2. bun generate             # Generate service files");
console.log("");
