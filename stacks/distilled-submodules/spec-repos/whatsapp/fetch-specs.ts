#!/usr/bin/env node
/**
 * Mirrors Meta's WhatsApp Business Platform OpenAPI spec into ../specs/.
 *
 * Meta publishes the spec in https://github.com/facebook/openapi as one YAML
 * file whose name carries the Graph API version it was cut from
 * (`business-messaging-api_v23.0.yaml`). The name changes when Meta bumps the
 * version, so the file is found by listing the repository root at the default
 * branch's head and taking the highest version, never by a fixed name. Only
 * that file is downloaded; the repository is never cloned.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/openapi.yaml     the spec, verbatim, under a stable name
 *   ../specs/_manifest.json   upstream commit and the file it came from
 */

import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import { join } from "path";

const REPO = "facebook/openapi";
const SPEC_FILE = /^business-messaging-api_v(\d+)\.(\d+)\.yaml$/;
const SPECS_DIR = "../specs";
const USER_AGENT = "distilled.cloud-whatsapp-spec-mirror";

async function get(url: string, accept: string): Promise<Response> {
  const res = await fetch(url, { headers: { accept, "user-agent": USER_AGENT } });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  return res;
}

async function main() {
  const head = (await (
    await get(`https://api.github.com/repos/${REPO}/commits/HEAD`, "application/vnd.github+json")
  ).json()) as { sha: string };
  console.log(`${REPO} @ ${head.sha}`);

  const listing = (await (
    await get(
      `https://api.github.com/repos/${REPO}/contents/?ref=${head.sha}`,
      "application/vnd.github+json",
    )
  ).json()) as Array<{ name: string; type: string }>;
  const versioned = listing
    .filter((e) => e.type === "file")
    .map((e) => ({ name: e.name, match: SPEC_FILE.exec(e.name) }))
    .filter((e): e is { name: string; match: RegExpExecArray } => e.match !== null)
    .map((e) => ({ name: e.name, major: Number(e.match[1]), minor: Number(e.match[2]) }))
    .sort((a, b) => b.major - a.major || b.minor - a.minor);
  const latest = versioned[0];
  if (latest === undefined) {
    throw new Error(`${REPO} has no file matching ${SPEC_FILE}`);
  }
  console.log(`Latest spec: ${latest.name}`);

  const text = await (
    await get(`https://raw.githubusercontent.com/${REPO}/${head.sha}/${latest.name}`, "text/plain")
  ).text();
  // A rate-limit page or a truncated body is still text; refuse anything that
  // is not an OpenAPI 3 document with paths.
  if (!/^openapi: ['"]?3\./m.test(text) || !/^paths:/m.test(text)) {
    throw new Error(`${latest.name} is not an OpenAPI 3 document with paths`);
  }

  mkdirSync(SPECS_DIR, { recursive: true });
  await writeFile(join(SPECS_DIR, "openapi.yaml"), text.endsWith("\n") ? text : text + "\n");
  await writeFile(
    join(SPECS_DIR, "_manifest.json"),
    JSON.stringify({ repository: REPO, commit: head.sha, file: latest.name }, null, 2) + "\n",
  );
  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
