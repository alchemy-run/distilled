#!/usr/bin/env node
/**
 * Mirrors the Codex app-server protocol JSON Schemas into ../specs/.
 *
 * openai/codex publishes the app-server protocol (JSON-RPC over stdio,
 * `codex app-server`) as JSON Schema under
 * `codex-rs/app-server-protocol/schema/json/`. Only the files the distilled
 * codex generator reads are downloaded, straight from
 * raw.githubusercontent.com — the (large) upstream repository is never
 * cloned:
 *
 *   • the four method unions — `ClientRequest.json`, `ClientNotification.json`,
 *     `ServerRequest.json`, `ServerNotification.json` — each a `oneOf` of
 *     `{ method, params }` variants plus a `definitions` map holding every
 *     params type;
 *   • every `*Response.json` (root, `v1/`, `v2/`): request RESULT types are
 *     not part of the unions, so they come from the per-type files.
 *
 * The directory listings come from the GitHub contents API (3 calls; set
 * GITHUB_TOKEN to lift the unauthenticated 60/hour limit). The mirror is
 * pinned to the last upstream commit that touched the schema directory, which
 * is recorded in `_upstream.json` — so the daily refetch produces no diff
 * until the protocol actually changes.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/{ClientRequest,ClientNotification,ServerRequest,ServerNotification}.json
 *   ../specs/*Response.json, ../specs/v1/*Response.json, ../specs/v2/*Response.json
 *   ../specs/_upstream.json
 */

import { mkdirSync } from "fs";
import { mkdir, rm, writeFile } from "fs/promises";

/** Upstream repository, as `<owner>/<repo>`. */
const REPO = "openai/codex";
/** Branch (or tag) to follow. */
const REF = "main";
/** The schema directory within {@link REPO}. */
const SCHEMA_DIR = "codex-rs/app-server-protocol/schema/json";
/** Subdirectories of {@link SCHEMA_DIR} holding per-type files. */
const SUBDIRS = ["", "v1", "v2"] as const;
/** The method unions (always at the root of {@link SCHEMA_DIR}). */
const UNIONS = ["ClientRequest", "ClientNotification", "ServerRequest", "ServerNotification"];

const SPECS_DIR = "../specs";
const CONCURRENCY = 12;

const headers = (api: boolean): Record<string, string> => ({
  "user-agent": "distilled.cloud-codex-spec-mirror",
  ...(api ? { accept: "application/vnd.github+json" } : {}),
  ...(api && process.env.GITHUB_TOKEN
    ? { authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
});

async function fetchJson(url: string, api = false): Promise<unknown> {
  for (let attempt = 0; ; attempt++) {
    const response = await fetch(url, { headers: headers(api) });
    if (response.ok) return JSON.parse(await response.text());
    if (response.status < 500 || attempt >= 3) {
      throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
    }
    await new Promise((resolve) => setTimeout(resolve, 500 * 2 ** attempt));
  }
}

const isObject = (u: unknown): u is Record<string, unknown> =>
  typeof u === "object" && u !== null && !Array.isArray(u);

/** The last commit on {@link REF} that touched {@link SCHEMA_DIR}. */
async function resolveSha(): Promise<string> {
  const commits = await fetchJson(
    `https://api.github.com/repos/${REPO}/commits?sha=${REF}&path=${SCHEMA_DIR}&per_page=1`,
    true,
  );
  const sha = Array.isArray(commits) && isObject(commits[0]) ? commits[0].sha : undefined;
  if (typeof sha !== "string" || !/^[0-9a-f]{40}$/.test(sha)) {
    throw new Error(`Could not resolve the commit for ${SCHEMA_DIR} on ${REF}`);
  }
  return sha;
}

/** `*Response.json` files in one schema subdirectory, as paths relative to {@link SCHEMA_DIR}. */
async function listResponses(sha: string, subdir: string): Promise<string[]> {
  const dir = subdir ? `${SCHEMA_DIR}/${subdir}` : SCHEMA_DIR;
  const entries = await fetchJson(
    `https://api.github.com/repos/${REPO}/contents/${dir}?ref=${sha}`,
    true,
  );
  if (!Array.isArray(entries)) throw new Error(`Listing ${dir} did not return an array`);
  return entries
    .filter(
      (e): e is { name: string; type: string } =>
        isObject(e) && typeof e.name === "string" && e.type === "file",
    )
    .map((e) => e.name)
    .filter((name) => name.endsWith("Response.json"))
    .map((name) => (subdir ? `${subdir}/${name}` : name))
    .sort();
}

const rawUrl = (sha: string, path: string) =>
  `https://raw.githubusercontent.com/${REPO}/${sha}/${SCHEMA_DIR}/${path}`;

/** Validate a downloaded schema before it is allowed anywhere near the mirror. */
function validate(path: string, doc: unknown): Record<string, unknown> {
  if (!isObject(doc)) throw new Error(`${path}: not a JSON object`);
  const name = path.replace(/^.*\//, "").replace(/\.json$/, "");
  if (UNIONS.includes(name)) {
    if (!Array.isArray(doc.oneOf) || doc.oneOf.length === 0) {
      throw new Error(`${path}: expected a non-empty oneOf method union`);
    }
  } else if (doc.title !== name && doc.type === undefined && doc.oneOf === undefined) {
    throw new Error(`${path}: does not look like the ${name} JSON Schema`);
  }
  return doc;
}

async function main() {
  const sha = await resolveSha();
  console.log(`Mirroring ${REPO}@${sha} (${SCHEMA_DIR})`);

  const responses = (await Promise.all(SUBDIRS.map((d) => listResponses(sha, d)))).flat();
  if (responses.length < 50) {
    throw new Error(`Only ${responses.length} *Response.json files found — refusing to mirror`);
  }
  const paths = [...UNIONS.map((u) => `${u}.json`), ...responses];

  // Download everything first; only touch ../specs once every file is valid.
  const docs = new Map<string, Record<string, unknown>>();
  let next = 0;
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (next < paths.length) {
        const path = paths[next++]!;
        docs.set(path, validate(path, await fetchJson(rawUrl(sha, path))));
      }
    }),
  );

  await rm(SPECS_DIR, { recursive: true, force: true });
  mkdirSync(SPECS_DIR, { recursive: true });
  for (const path of [...docs.keys()].sort()) {
    const out = `${SPECS_DIR}/${path}`;
    await mkdir(out.replace(/\/[^/]+$/, ""), { recursive: true });
    await writeFile(out, JSON.stringify(docs.get(path), null, 2) + "\n");
  }
  await writeFile(
    `${SPECS_DIR}/_upstream.json`,
    JSON.stringify({ repo: REPO, ref: REF, sha, path: SCHEMA_DIR, files: docs.size }, null, 2) +
      "\n",
  );
  console.log(`Wrote ${docs.size} schema files. Done!`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
