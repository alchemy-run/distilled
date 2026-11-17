#!/usr/bin/env node
/**
 * Fetches Polymarket's REST OpenAPI documents to ../specs/.
 *
 * Polymarket lists its machine-readable descriptions in
 * https://docs.polymarket.com/llms.txt ("OpenAPI Specs"). Every REST one is
 * mirrored; the AsyncAPI (WebSocket) documents are not.
 *
 *   ../specs/gamma.yaml        Gamma (markets, events, tags, search)
 *   ../specs/clob.yaml         CLOB (order book, prices, orders, trades)
 *   ../specs/data.json         Data API v2 (positions, activity, holders)
 *   ../specs/relayer.yaml      Relayer (gasless transactions)
 *   ../specs/bridge.yaml       Bridge (deposits, withdrawals)
 *   ../specs/combos-rfq.yaml   Combinatorial RFQ
 *   ../specs/perps.json        Perps HTTP API
 *
 * YAML documents are written verbatim; JSON documents are re-serialized so
 * a whitespace-only upstream change produces no diff.
 *
 * Usage:
 *   node fetch-specs.ts
 */

import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import YAML from "yaml";

const SPECS_DIR = "../specs";
const DOCS = "https://docs.polymarket.com/api-spec";

const SPECS: ReadonlyArray<{ readonly url: string; readonly output: string }> = [
  { url: `${DOCS}/gamma-openapi.yaml`, output: "gamma.yaml" },
  { url: `${DOCS}/clob-openapi.yaml`, output: "clob.yaml" },
  { url: "https://data-api.polymarket.com/v2/openapi.json", output: "data.json" },
  { url: `${DOCS}/relayer-openapi.yaml`, output: "relayer.yaml" },
  { url: `${DOCS}/bridge-openapi.yaml`, output: "bridge.yaml" },
  { url: `${DOCS}/combos-rfq-openapi.yaml`, output: "combos-rfq.yaml" },
  { url: `${DOCS}/perps-openapi.json`, output: "perps.json" },
];

function assertOpenApi(url: string, doc: any) {
  if (typeof doc?.openapi !== "string" || typeof doc.paths !== "object" || doc.paths === null) {
    throw new Error(`${url} returned a document without \`openapi\`/\`paths\``);
  }
  if (Object.keys(doc.paths).length === 0) {
    throw new Error(`${url} returned an OpenAPI document with no paths`);
  }
}

async function main() {
  mkdirSync(SPECS_DIR, { recursive: true });

  for (const { url, output } of SPECS) {
    console.log(`Fetching ${url}...`);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
    }
    const text = await response.text();
    const isJson = output.endsWith(".json");
    const doc = isJson ? JSON.parse(text) : YAML.parse(text);
    assertOpenApi(url, doc);

    const outputPath = `${SPECS_DIR}/${output}`;
    console.log(`Writing ${outputPath}...`);
    await writeFile(outputPath, isJson ? JSON.stringify(doc, null, 2) + "\n" : text);
  }

  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
