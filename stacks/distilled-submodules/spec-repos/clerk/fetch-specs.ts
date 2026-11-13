#!/usr/bin/env node
/**
 * Mirrors Clerk's Backend and Platform API OpenAPI specs into ../specs/.
 *
 * Only the two descriptions needed by the distilled Clerk SDK are downloaded,
 * straight from raw.githubusercontent.com — the upstream repository is
 * never cloned. Both files come from one resolved upstream commit.
 *
 * Keep the Backend API's dated snapshot unchanged while tracking the
 * Platform API's beta description. Both are written as deterministic JSON.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/openapi.json
 *   ../specs/platform.json
 */

import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import YAML from "yaml";

/** Upstream repository, as `<owner>/<repo>`. */
const REPO = "clerk/openapi-specs";
/** Upstream branch to mirror. */
const REF = "main";
/** Official descriptions and their stable mirror filenames. */
const SPECS = [
  { path: "bapi/2026-05-12.yml", output: "openapi.json" },
  { path: "platform/beta.yml", output: "platform.json" },
];

const SPECS_DIR = "../specs";
const USER_AGENT = "distilled.cloud-clerk-spec-mirror";

mkdirSync(SPECS_DIR, { recursive: true });

/**
 * The raw URL for a path in {@link REPO}. Each segment is encoded
 * individually so paths containing characters like `(` survive the round
 * trip while the separators do not.
 */
const rawUrl = (path: string, sha: string) =>
  `https://raw.githubusercontent.com/${REPO}/${sha}/${path
    .split("/")
    .map(encodeURIComponent)
    .join("/")}`;

async function get(url: string, accept: string): Promise<Response> {
  const response = await fetch(url, {
    headers: { accept, "user-agent": USER_AGENT },
    signal: AbortSignal.timeout(30_000),
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  return response;
}

async function main() {
  // Resolve the branch without consuming GitHub's unauthenticated API quota.
  const { stdout } = await promisify(execFile)(
    "git",
    ["ls-remote", `https://github.com/${REPO}.git`, `refs/heads/${REF}`],
    { timeout: 30_000 },
  );
  const sha = stdout.trim().split("\t")[0];
  if (sha === undefined || !/^[a-f0-9]{40}$/.test(sha)) {
    throw new Error(`Failed to resolve ${REPO}@${REF} to a commit`);
  }
  console.log(`${REPO} @ ${sha}`);

  for (const { path, output } of SPECS) {
    const url = rawUrl(path, sha);
    console.log(`Fetching ${url}...`);
    const response = await get(url, "application/yaml, text/yaml, application/json, text/plain");
    const spec = YAML.parse(await response.text()) as Record<string, unknown>;

    // A login page or a gutted response may parse as YAML, but is not OpenAPI.
    if (
      spec === null ||
      typeof spec !== "object" ||
      typeof spec.openapi !== "string" ||
      spec.paths === null ||
      typeof spec.paths !== "object" ||
      Array.isArray(spec.paths)
    ) {
      throw new Error(
        `${url} returned YAML without \`openapi\`/\`paths\` — not an OpenAPI document`,
      );
    }

    const outputPath = `${SPECS_DIR}/${output}`;
    console.log(`Writing ${outputPath}...`);
    // 2-space indent + trailing newline prevents whitespace-only upstream diffs.
    await writeFile(outputPath, JSON.stringify(spec, null, 2) + "\n");
    console.log(`Done! OpenAPI ${spec.openapi} — ${Object.keys(spec.paths).length} paths`);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
