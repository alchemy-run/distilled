#!/usr/bin/env node
/**
 * Mirrors Exa's OpenAPI specs into ../specs/.
 *
 * Exa publishes two first-party OpenAPI 3.1 documents on its docs site
 * (linked from https://exa.ai/docs/admin/openapi-spec):
 *
 * - the public API (search, contents, answer, monitors, agent runs, batches
 *   and Websets), served as JSON;
 * - the Team Management API (API keys and credits), served as YAML only.
 *
 * Each file is downloaded from its stable URL and validated. The JSON
 * document is rewritten deterministically; the YAML document is mirrored
 * verbatim, and convert parses it. The separate `websets-spec.yaml` is not
 * mirrored: the public document already contains every Websets operation.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/exa-spec.json
 *   ../specs/team-management-spec.yaml
 */

import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import YAML from "yaml";

const BASE = "https://exa.ai/docs";

interface SpecFile {
  /** File name under {@link BASE}, and under ../specs/. */
  readonly file: string;
  readonly format: "json" | "yaml";
}

const FILES: SpecFile[] = [
  { file: "exa-spec.json", format: "json" },
  { file: "team-management-spec.yaml", format: "yaml" },
];

const SPECS_DIR = "../specs";

mkdirSync(SPECS_DIR, { recursive: true });

const USER_AGENT = "distilled.cloud-exa-spec-mirror";

async function main() {
  for (const { file, format } of FILES) {
    const url = `${BASE}/${file}`;
    console.log(`Fetching ${url}...`);
    const response = await fetch(url, { headers: { "user-agent": USER_AGENT } });
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
    }
    const text = await response.text();
    const spec = (format === "json" ? JSON.parse(text) : YAML.parse(text)) as {
      openapi?: unknown;
      paths?: unknown;
    };

    // A docs-site error page or a gutted response can still parse; it is
    // not an OpenAPI document.
    if (typeof spec?.openapi !== "string" || spec.paths === undefined) {
      throw new Error(`${url} is not an OpenAPI document`);
    }

    const outputPath = `${SPECS_DIR}/${file}`;
    console.log(
      `Writing ${outputPath} (OpenAPI ${spec.openapi}, ${Object.keys(spec.paths as object).length} paths)...`,
    );
    // JSON: 2-space indent + trailing newline, so a whitespace-only change
    // upstream produces no diff. YAML: verbatim.
    await writeFile(
      outputPath,
      format === "json"
        ? JSON.stringify(spec, null, 2) + "\n"
        : text.endsWith("\n")
          ? text
          : `${text}\n`,
    );
  }

  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
