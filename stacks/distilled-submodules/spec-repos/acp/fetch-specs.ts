#!/usr/bin/env node
/**
 * Fetches the Agent Client Protocol (ACP) JSON Schema to ../specs/.
 *
 * ACP publishes its schema as GitHub release assets of
 * agentclientprotocol/agent-client-protocol, on releases tagged
 * `schema-v<semver>`. Each such release carries four files:
 *
 *   schema.json            stable JSON Schema ($defs annotated with
 *                          `x-side` / `x-method`)
 *   meta.json              wire method names by side
 *                          (agentMethods / clientMethods / protocolMethods)
 *   schema.unstable.json   + unstable (draft) methods
 *   meta.unstable.json
 *
 * We mirror the latest STABLE v1 schema release (`schema-v1.*`, not a
 * prerelease). The `schema-v2.*` releases are alpha and out of scope.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * The files are saved to:
 *   ../specs/schema.json
 *   ../specs/meta.json
 *   ../specs/schema.unstable.json
 *   ../specs/meta.unstable.json
 *   ../specs/_manifest.json
 */

import { existsSync, mkdirSync } from "fs";
import { writeFile } from "fs/promises";

const REPO = "agentclientprotocol/agent-client-protocol";
const RELEASES_URL = `https://api.github.com/repos/${REPO}/releases?per_page=100`;
const TAG_PATTERN = /^schema-v1\.(\d+)\.(\d+)$/;
const ASSETS = ["schema.json", "meta.json", "schema.unstable.json", "meta.unstable.json"] as const;
const SPECS_DIR = "../specs";
const USER_AGENT = "distilled.cloud-acp-spec-mirror";

if (!existsSync(SPECS_DIR)) {
  mkdirSync(SPECS_DIR, { recursive: true });
}

interface Release {
  readonly tag_name: string;
  readonly prerelease: boolean;
  readonly draft: boolean;
  readonly assets: ReadonlyArray<{ readonly name: string; readonly browser_download_url: string }>;
}

const headers = (accept: string): Record<string, string> => ({
  accept,
  "user-agent": USER_AGENT,
  ...(process.env.GITHUB_TOKEN ? { authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
});

const fetchJson = async (url: string, accept = "application/json"): Promise<unknown> => {
  const response = await fetch(url, { headers: headers(accept) });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  return await response.json();
};

const isObject = (u: unknown): u is Record<string, unknown> =>
  typeof u === "object" && u !== null && !Array.isArray(u);

/** Pick the highest `schema-v1.<minor>.<patch>` that is neither draft nor prerelease. */
const latestStable = (releases: ReadonlyArray<Release>): Release => {
  const candidates = releases
    .filter((r) => !r.draft && !r.prerelease)
    .flatMap((r) => {
      const m = TAG_PATTERN.exec(r.tag_name);
      return m ? [{ release: r, minor: Number(m[1]), patch: Number(m[2]) }] : [];
    })
    .filter(({ release }) => ASSETS.every((a) => release.assets.some((x) => x.name === a)))
    .sort((a, b) => b.minor - a.minor || b.patch - a.patch);
  const best = candidates[0];
  if (!best) throw new Error(`no stable schema-v1.* release with all of ${ASSETS.join(", ")}`);
  return best.release;
};

/** A schema must be JSON Schema with `$defs` carrying ACP's method annotations. */
const validateSchema = (name: string, spec: unknown) => {
  if (!isObject(spec) || !isObject(spec.$defs)) {
    throw new Error(`${name}: not a JSON Schema document with $defs`);
  }
  const annotated = Object.values(spec.$defs).filter(
    (d) => isObject(d) && typeof d["x-method"] === "string" && typeof d["x-side"] === "string",
  );
  if (annotated.length < 10) {
    throw new Error(`${name}: only ${annotated.length} x-method/x-side definitions — gutted?`);
  }
  return annotated.length;
};

const validateMeta = (name: string, meta: unknown) => {
  if (!isObject(meta) || !isObject(meta.agentMethods) || !isObject(meta.clientMethods)) {
    throw new Error(`${name}: missing agentMethods / clientMethods`);
  }
};

async function main() {
  console.log(`Listing releases of ${REPO}...`);
  const releases = (await fetchJson(RELEASES_URL)) as ReadonlyArray<Release>;
  if (!Array.isArray(releases)) throw new Error(`${RELEASES_URL} did not return an array`);
  const release = latestStable(releases);
  console.log(`Latest stable schema release: ${release.tag_name}`);

  const files: Record<string, unknown> = {};
  for (const asset of ASSETS) {
    const url = release.assets.find((a) => a.name === asset)!.browser_download_url;
    console.log(`Fetching ${url}...`);
    files[asset] = await fetchJson(url, "application/octet-stream, application/json");
  }

  const methods = validateSchema("schema.json", files["schema.json"]);
  validateSchema("schema.unstable.json", files["schema.unstable.json"]);
  validateMeta("meta.json", files["meta.json"]);
  validateMeta("meta.unstable.json", files["meta.unstable.json"]);

  for (const asset of ASSETS) {
    // 2-space indent + trailing newline so a whitespace-only change upstream
    // produces no diff.
    await writeFile(`${SPECS_DIR}/${asset}`, JSON.stringify(files[asset], null, 2) + "\n");
  }

  const manifest = {
    repository: `https://github.com/${REPO}`,
    release: release.tag_name,
    files: [...ASSETS],
  };
  await writeFile(`${SPECS_DIR}/_manifest.json`, JSON.stringify(manifest, null, 2) + "\n");

  console.log(`Done! ${release.tag_name} — ${methods} annotated method definitions`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
