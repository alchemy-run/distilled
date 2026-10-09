#!/usr/bin/env node
/**
 * Publishes celld's hand-written Smithy models to ../specs/.
 *
 * celld (https://github.com/denoland/celld) publishes no API description,
 * and its routes and request bodies are not declared anywhere a converter
 * could read them reliably. The models are therefore written by hand from
 * the celld source; their metadata pins the release, revision and source
 * files they were derived from. They live in alchemy-run/distilled at
 * stacks/distilled-submodules/spec-repos/celld/models/, the stack deploys
 * them to .meta/models/, and this script copies them into specs/.
 *
 *   ../specs/node.json      node administration API
 *   ../specs/runtime.json   reserved-class operator API (D1, KV, Queues)
 *
 * Usage:
 *   node fetch-specs.ts
 */

import { copyFileSync, mkdirSync, readdirSync, readFileSync, rmSync } from "fs";
import { join } from "path";

const MODELS_DIR = "models";
const SPECS_DIR = "../specs";

const models = readdirSync(MODELS_DIR).filter((f) => f.endsWith(".json"));
if (models.length === 0) throw new Error(`${MODELS_DIR}/ has no models`);
mkdirSync(SPECS_DIR, { recursive: true });
for (const f of readdirSync(SPECS_DIR)) if (!models.includes(f)) rmSync(join(SPECS_DIR, f));
for (const f of models) {
  const model = JSON.parse(readFileSync(join(MODELS_DIR, f), "utf8"));
  if (model.smithy !== "2.0" || typeof model.shapes !== "object") {
    throw new Error(`${f} is not a Smithy 2.0 model`);
  }
  copyFileSync(join(MODELS_DIR, f), join(SPECS_DIR, f));
}
console.log(`Done: ${models.join(", ")}`);
