#!/usr/bin/env node
/**
 * Fetches RFC 8555 (ACME) to ../specs/.
 *
 * ACME is a protocol, not a vendor API: its definition is the RFC. RFC 8555
 * predates the RFC Editor's XML publication format, so the canonical
 * machine-readable form is the plain-text RFC, whose object fields follow a
 * fixed `name (required|optional, type):  description` layout.
 *
 *   ../specs/rfc8555.txt   https://www.rfc-editor.org/rfc/rfc8555.txt
 *
 * Usage:
 *   node fetch-specs.ts
 */

import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";

const URL = "https://www.rfc-editor.org/rfc/rfc8555.txt";
const SPECS_DIR = "../specs";

async function main() {
  mkdirSync(SPECS_DIR, { recursive: true });
  console.log(`Fetching ${URL}...`);
  const res = await fetch(URL, { headers: { "user-agent": "distilled.cloud-acme-spec-mirror" } });
  if (!res.ok) throw new Error(`Failed to fetch ${URL}: ${res.status} ${res.statusText}`);
  const text = await res.text();
  if (!text.includes("Automatic Certificate Management Environment (ACME)")) {
    throw new Error(`${URL} is not RFC 8555`);
  }
  await writeFile(`${SPECS_DIR}/rfc8555.txt`, text);
  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
