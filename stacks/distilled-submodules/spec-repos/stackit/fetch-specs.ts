#!/usr/bin/env bun
/**
 * Mirrors STACKIT's OpenAPI documents into ../specs/.
 *
 * STACKIT publishes one OpenAPI file per product and version in
 * stackitcloud/stackit-api-specifications (`services/<name>/<version>/<name>.json`).
 * That is the same source https://docs.api.stackit.cloud/ renders — the docs
 * site is a SPA, not a spec host — so the mirror downloads the files from
 * raw.githubusercontent.com and never clones the repository.
 *
 * Each product keeps several versions (v1, v2, v1beta, …). The generator
 * reads one document per product, so this script keeps the latest: stable
 * over beta over alpha, then the highest version number. Adding a product
 * upstream is picked up on the next daily refetch.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/<service>.json
 *   ../specs/_manifest.json
 */

import { mkdirSync } from "fs";

/** Upstream repository, as `<owner>/<repo>`. */
const REPO = "stackitcloud/stackit-api-specifications";
/** Branch (or tag/commit) to mirror. */
const REF = "main";

const SPECS_DIR = "../specs";
const USER_AGENT = "distilled.cloud-stackit-spec-mirror";

mkdirSync(SPECS_DIR, { recursive: true });

const rawUrl = (path: string) =>
  `https://raw.githubusercontent.com/${REPO}/${REF}/${path
    .split("/")
    .map(encodeURIComponent)
    .join("/")}`;

const treeUrl = `https://api.github.com/repos/${REPO}/git/trees/${REF}?recursive=1`;

interface GitTreeEntry {
  readonly path: string;
  readonly type: string;
  readonly size?: number;
}

interface GitTreeResponse {
  readonly tree: GitTreeEntry[];
  readonly truncated: boolean;
}

/** `services/<name>/<version>/<file>.json` */
const SPEC_PATH = /^services\/([^/]+)\/([^/]+)\/([^/]+\.json)$/;

interface VersionRank {
  readonly major: number;
  /** 2 = stable, 1 = beta, 0 = alpha. */
  readonly channel: number;
  readonly extra: number;
}

/**
 * Rank a STACKIT API version folder (`v2`, `v1beta`, `v3beta2`, `v2alpha1`,
 * `v0`). Stable beats beta beats alpha; then higher major; then the trailing
 * number on beta/alpha (`v3beta2` > `v3beta1`).
 */
const rankVersion = (version: string): VersionRank | undefined => {
  const m = /^v(\d+)(?:(alpha|beta)(\d+)?)?$/.exec(version);
  if (!m) return undefined;
  return {
    major: Number(m[1]),
    channel: m[2] === "alpha" ? 0 : m[2] === "beta" ? 1 : 2,
    extra: m[3] !== undefined ? Number(m[3]) : 0,
  };
};

const isBetterVersion = (candidate: string, current: string): boolean => {
  const a = rankVersion(candidate);
  const b = rankVersion(current);
  if (a === undefined) return false;
  if (b === undefined) return true;
  if (a.channel !== b.channel) return a.channel > b.channel;
  if (a.major !== b.major) return a.major > b.major;
  return a.extra > b.extra;
};

/** `alb-waf` → `alb_waf` (the mirror filename and the generated module). */
const toSlug = (service: string): string =>
  service
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();

interface ChosenSpec {
  readonly service: string;
  readonly version: string;
  readonly path: string;
  readonly slug: string;
}

async function fetchOk(url: string, accept: string): Promise<Response> {
  const response = await fetch(url, {
    headers: {
      "user-agent": USER_AGENT,
      accept,
    },
  });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
    );
  }
  return response;
}

async function main() {
  console.log(`Listing ${REPO}@${REF} …`);
  const tree = (await (
    await fetchOk(treeUrl, "application/vnd.github+json")
  ).json()) as GitTreeResponse;
  if (tree.truncated) {
    throw new Error(
      `${treeUrl} was truncated — the tree is too large to list without a clone`,
    );
  }

  const chosen = new Map<string, ChosenSpec>();
  for (const entry of tree.tree) {
    if (entry.type !== "blob") continue;
    const m = SPEC_PATH.exec(entry.path);
    if (!m) continue;
    const service = m[1]!;
    const version = m[2]!;
    const current = chosen.get(service);
    if (current !== undefined && !isBetterVersion(version, current.version)) {
      continue;
    }
    chosen.set(service, {
      service,
      version,
      path: entry.path,
      slug: toSlug(service),
    });
  }

  if (chosen.size === 0) {
    throw new Error(
      `${REPO} tree had no services/<name>/<version>/*.json documents`,
    );
  }

  const specs = [...chosen.values()].sort((a, b) =>
    a.slug.localeCompare(b.slug),
  );
  const manifest: Array<{
    service: string;
    version: string;
    path: string;
    output: string;
    openapi: string;
    paths: number;
  }> = [];

  for (const spec of specs) {
    const url = rawUrl(spec.path);
    console.log(`Fetching ${url}...`);
    const doc = (await (
      await fetchOk(url, "application/json")
    ).json()) as Record<string, unknown> | null;

    if (
      doc === null ||
      typeof doc !== "object" ||
      typeof doc.openapi !== "string" ||
      doc.paths === undefined
    ) {
      throw new Error(
        `${url} returned JSON without \`openapi\`/\`paths\` — not an OpenAPI document`,
      );
    }

    const output = `${spec.slug}.json`;
    const outputPath = `${SPECS_DIR}/${output}`;
    const pathCount = Object.keys(doc.paths as object).length;
    console.log(
      `Writing ${outputPath} (OpenAPI ${doc.openapi}, ${spec.version}, ${pathCount} paths)...`,
    );
    await Bun.write(outputPath, JSON.stringify(doc, null, 2) + "\n");
    manifest.push({
      service: spec.service,
      version: spec.version,
      path: spec.path,
      output,
      openapi: doc.openapi,
      paths: pathCount,
    });
  }

  const manifestPath = `${SPECS_DIR}/_manifest.json`;
  await Bun.write(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  console.log(
    `Done! ${manifest.length} STACKIT OpenAPI document(s) → ${SPECS_DIR} (manifest ${manifestPath})`,
  );
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
