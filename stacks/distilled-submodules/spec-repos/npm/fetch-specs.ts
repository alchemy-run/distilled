#!/usr/bin/env node
/**
 * Mirrors the npm registry API's OpenAPI documents into ../specs/.
 *
 * npm keeps its registry API description in npm/api-documentation as several
 * OpenAPI files under `api/`: `base.yaml` (info, servers, security schemes),
 * one fragment per API area under `api/registry.npmjs.com/`, and the
 * components the fragments reference by file. `api/merge-config.yaml` lists
 * the documents npm's own build merges into one `openapi.yaml`, which is
 * never published as a file (only the rendered HTML is).
 *
 * This script downloads `merge-config.yaml`, every input it lists, and every
 * file those inputs reference by `$ref`, straight from
 * raw.githubusercontent.com — the repository is never cloned. Files keep
 * their repository paths under ../specs/, so a `$ref` resolves the same way
 * it does upstream.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/api/merge-config.yaml
 *   ../specs/api/base.yaml
 *   ../specs/api/registry.npmjs.com/<area>.yaml
 *   ../specs/api/shared-components.yaml
 */

import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import * as path from "path";
import YAML from "yaml";

/** Upstream repository, as `<owner>/<repo>`. */
const REPO = "npm/api-documentation";
/** Branch (or tag/commit) to mirror. */
const REF = "main";
/** The merge configuration that lists the documents, relative to the repo root. */
const MERGE_CONFIG = "api/merge-config.yaml";

const SPECS_DIR = "../specs";

/**
 * The raw URL for a path in {@link REPO}. Each segment is encoded
 * individually so paths containing characters like `(` survive the round
 * trip while the separators do not.
 */
const rawUrl = (file: string) =>
  `https://raw.githubusercontent.com/${REPO}/${REF}/${file
    .split("/")
    .map(encodeURIComponent)
    .join("/")}`;

/** Download one repository file; return its text and parsed YAML. */
async function download(file: string): Promise<{ text: string; doc: any }> {
  const url = rawUrl(file);
  console.log(`Fetching ${url}...`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  const text = await response.text();
  const doc = YAML.parse(text);
  if (doc === null || typeof doc !== "object") {
    throw new Error(`${url} is not a YAML document`);
  }
  return { text, doc };
}

/** Every file part of an external `$ref` in a document. */
function externalRefs(node: unknown, out: Set<string> = new Set()): Set<string> {
  if (Array.isArray(node)) {
    for (const item of node) externalRefs(item, out);
  } else if (node !== null && typeof node === "object") {
    for (const [key, value] of Object.entries(node)) {
      if (key === "$ref" && typeof value === "string" && !value.startsWith("#")) {
        out.add(value.split("#")[0]!);
      } else {
        externalRefs(value, out);
      }
    }
  }
  return out;
}

async function main() {
  const files = new Map<string, string>();
  const config = await download(MERGE_CONFIG);
  files.set(MERGE_CONFIG, config.text);

  const inputs: unknown = config.doc.inputs;
  const output: unknown = config.doc.output;
  if (!Array.isArray(inputs) || inputs.length < 2 || typeof output !== "string") {
    throw new Error(`${MERGE_CONFIG} lists no inputs or no output`);
  }

  const configDir = path.posix.dirname(MERGE_CONFIG);
  // The merged document's directory: external refs in the inputs are copied
  // into it verbatim, so they resolve relative to it.
  const mergedDir = path.posix.dirname(path.posix.join(configDir, output));

  const pending: { file: string; refBase: string }[] = [];
  for (const [index, input] of inputs.entries()) {
    const file = path.posix.join(configDir, String(input?.inputFile));
    const { text, doc } = await download(file);
    if (index === 0 && typeof doc.openapi !== "string") {
      throw new Error(`${file} is not an OpenAPI document`);
    }
    if (doc.paths === undefined && index !== 0) {
      throw new Error(`${file} has no paths`);
    }
    files.set(file, text);
    for (const ref of externalRefs(doc)) pending.push({ file: ref, refBase: mergedDir });
  }

  // Referenced files, and whatever they reference in turn (relative to themselves).
  while (pending.length > 0) {
    const { file: ref, refBase } = pending.shift()!;
    const file = path.posix.normalize(path.posix.join(refBase, ref));
    if (files.has(file)) continue;
    const { text, doc } = await download(file);
    if (doc.components === undefined) {
      throw new Error(`${file} has no components`);
    }
    files.set(file, text);
    for (const next of externalRefs(doc)) {
      pending.push({ file: next, refBase: path.posix.dirname(file) });
    }
  }

  for (const [file, text] of [...files].sort(([a], [b]) => a.localeCompare(b))) {
    const outputPath = `${SPECS_DIR}/${file}`;
    mkdirSync(path.dirname(outputPath), { recursive: true });
    console.log(`Writing ${outputPath}...`);
    await writeFile(outputPath, text);
  }

  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
