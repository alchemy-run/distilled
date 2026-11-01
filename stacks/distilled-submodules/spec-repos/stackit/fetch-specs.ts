#!/usr/bin/env node
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
 * STACKIT Container Registry is Harbor: its management API creates Harbor
 * projects, and robot accounts, repositories, artifacts and scan reports live
 * on Harbor's own REST API, which STACKIT does not publish. So the mirror also
 * snapshots Harbor's Swagger 2.0 document (`api/v2.0/swagger.yaml` in
 * goharbor/harbor) at a release tag, trimmed to the operations in
 * HARBOR_OPERATIONS and the definitions they reach. It is a separate file, not
 * in the manifest: it has no `servers` and a different auth scheme. Bump
 * HARBOR_VERSION to move the SDK to a newer release.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/<service>.json
 *   ../specs/_manifest.json
 *   ../specs/registry_harbor.json
 */

import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import YAML from "yaml";

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
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  return response;
}

/** The Harbor release the data-plane module is generated from. */
const HARBOR_VERSION = "v2.15.4";
const HARBOR_SPEC_URL = `https://raw.githubusercontent.com/goharbor/harbor/${HARBOR_VERSION}/api/v2.0/swagger.yaml`;

/**
 * Harbor operations the SDK keeps, by `operationId`: robot accounts,
 * repositories, artifacts, tags and scan reports. `getProject` is here because
 * listing a project's robots needs the Harbor project's numeric id.
 */
const HARBOR_OPERATIONS: ReadonlySet<string> = new Set([
  "getProject",
  "ListRobot",
  "CreateRobot",
  "GetRobotByID",
  "UpdateRobot",
  "RefreshSec",
  "DeleteRobot",
  "listRepositories",
  "getRepository",
  "updateRepository",
  "deleteRepository",
  "listArtifacts",
  "getArtifact",
  "deleteArtifact",
  "createTag",
  "listTags",
  "deleteTag",
  "getVulnerabilitiesAddition",
  "scanArtifact",
  "stopScanArtifact",
  "getReportLog",
]);

/** Every `#/<section>/<name>` reference inside a JSON value. */
const refsIn = (value: unknown, found: Set<string>): void => {
  if (Array.isArray(value)) {
    for (const item of value) refsIn(item, found);
  } else if (value !== null && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      if (key === "$ref" && typeof item === "string") found.add(item);
      else refsIn(item, found);
    }
  }
};

/** Keep the listed operations and the definitions they reach, transitively. */
const trimHarborSpec = (spec: Record<string, any>): Record<string, unknown> => {
  const paths: Record<string, Record<string, unknown>> = {};
  const kept = new Set<string>();
  for (const [route, item] of Object.entries<Record<string, any>>(spec.paths)) {
    for (const [method, op] of Object.entries<any>(item)) {
      if (!HARBOR_OPERATIONS.has(op?.operationId)) continue;
      (paths[route] ??= {})[method] = op;
      kept.add(op.operationId);
    }
  }
  const missing = [...HARBOR_OPERATIONS].filter((id) => !kept.has(id));
  if (missing.length > 0) {
    throw new Error(`Harbor ${HARBOR_VERSION} has no operation ${missing.join(", ")}`);
  }

  const sections: Record<string, Record<string, unknown>> = {
    parameters: {},
    responses: {},
    definitions: {},
  };
  const seen = new Set<string>();
  const queue = new Set<string>();
  refsIn(paths, queue);
  for (const ref of queue) {
    if (seen.has(ref)) continue;
    seen.add(ref);
    const [, section, name] = ref.split("/");
    const value = spec[section!]?.[name!];
    if (value === undefined) throw new Error(`Harbor spec has a dangling $ref ${ref}`);
    sections[section!]![name!] = value;
    refsIn(value, queue);
  }

  return {
    swagger: spec.swagger,
    info: { ...spec.info, "x-harbor-release": HARBOR_VERSION },
    basePath: spec.basePath,
    schemes: ["https"],
    produces: spec.produces,
    consumes: spec.consumes,
    securityDefinitions: spec.securityDefinitions,
    security: spec.security,
    paths,
    ...sections,
  };
};

async function fetchHarborSpec(): Promise<void> {
  console.log(`Fetching ${HARBOR_SPEC_URL}...`);
  const spec = YAML.parse(await (await fetchOk(HARBOR_SPEC_URL, "application/yaml")).text());
  if (spec?.swagger !== "2.0" || spec.paths === undefined || spec.definitions === undefined) {
    throw new Error(`${HARBOR_SPEC_URL} is not a Swagger 2.0 document`);
  }
  const outputPath = `${SPECS_DIR}/registry_harbor.json`;
  await writeFile(outputPath, JSON.stringify(trimHarborSpec(spec), null, 2) + "\n");
  console.log(
    `Writing ${outputPath} (Harbor ${HARBOR_VERSION}, ${HARBOR_OPERATIONS.size} operations)...`,
  );
}

async function main() {
  await fetchHarborSpec();
  console.log(`Listing ${REPO}@${REF} …`);
  const tree = (await (
    await fetchOk(treeUrl, "application/vnd.github+json")
  ).json()) as GitTreeResponse;
  if (tree.truncated) {
    throw new Error(`${treeUrl} was truncated — the tree is too large to list without a clone`);
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
    throw new Error(`${REPO} tree had no services/<name>/<version>/*.json documents`);
  }

  const specs = [...chosen.values()].sort((a, b) => a.slug.localeCompare(b.slug));
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
    const doc = (await (await fetchOk(url, "application/json")).json()) as Record<
      string,
      unknown
    > | null;

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
    await writeFile(outputPath, JSON.stringify(doc, null, 2) + "\n");
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
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  console.log(
    `Done! ${manifest.length} STACKIT OpenAPI document(s) → ${SPECS_DIR} (manifest ${manifestPath})`,
  );
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
