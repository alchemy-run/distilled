#!/usr/bin/env node
/**
 * Mirrors the Tencent Cloud API 3.0 models into ../specs/.
 *
 * Tencent publishes no OpenAPI document. Its own CLI,
 * TencentCloud/tencentcloud-cli (Apache-2.0), ships one machine-readable
 * model per product and API version at
 * `tccli/services/<product>/v<YYYYMMDD>/api.json`: every action with its
 * input and output object, and every object's members with type, required
 * flag and nullability. `tccli/services/__init__.py` lists each product's
 * versions in `SERVICE_VERSIONS`; the first entry is the version the CLI
 * calls by default (`tccli configure` writes `<product>.version` from it).
 * That default is not always the newest: `monitor`, `tke`, `vod` and `es`
 * default to their main API and list a small add-on API second.
 *
 * The mirror keeps the default version of each product only:
 *
 *   - `<product>/v<YYYYMMDD>/api.json` — copied verbatim
 *   - `_manifest.json` — `[{ product, version, file }]`, sorted by product
 *
 * The models are pulled with a blobless, sparse, depth-1 clone: git downloads
 * the commit and its trees, reads `SERVICE_VERSIONS`, narrows the working
 * tree to the default `api.json` files, and only then fetches their blobs.
 * The Python sources, the `examples.json` files and the history are never
 * transferred.
 *
 * Usage:
 *   node fetch-specs.ts
 */

import { spawn } from "child_process";
import { once } from "events";
import { mkdtempSync, rmSync } from "fs";
import { mkdir, readFile, rm, writeFile } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";

const CLI_REPO = "https://github.com/TencentCloud/tencentcloud-cli.git";
const CLI_REF = "master";
const SERVICES_DIR = "tccli/services";
const SPECS_DIR = "../specs";

interface ManifestEntry {
  /** Product name, the API host's first label (`cvm` → cvm.tencentcloudapi.com). */
  readonly product: string;
  /** API version sent as `X-TC-Version`, e.g. `2017-03-12`. */
  readonly version: string;
  /** Path of the model, relative to the specs directory. */
  readonly file: string;
}

const run = async (cwd: string, args: string[], capture: boolean): Promise<string> => {
  const proc = spawn("git", args, {
    cwd,
    stdio: ["ignore", capture ? "pipe" : "inherit", "inherit"],
  });
  const chunks: Buffer[] = [];
  proc.stdout?.on("data", (chunk: Buffer) => chunks.push(chunk));
  const [code] = await once(proc, "close");
  if (code !== 0) {
    throw new Error(`git ${args.join(" ")} failed with exit code ${code}`);
  }
  return Buffer.concat(chunks).toString("utf8");
};
const git = (cwd: string, ...args: string[]) => run(cwd, args, false);
const gitOutput = (cwd: string, ...args: string[]) => run(cwd, args, true);

/** `SERVICE_VERSIONS = { ... }` from `tccli/services/__init__.py`: a JSON object literal. */
const parseServiceVersions = (source: string): Record<string, string[]> => {
  const marker = "SERVICE_VERSIONS = ";
  const start = source.indexOf(marker);
  if (start === -1) throw new Error(`${SERVICES_DIR}/__init__.py has no SERVICE_VERSIONS`);
  const versions = JSON.parse(source.slice(start + marker.length)) as unknown;
  if (versions === null || typeof versions !== "object" || Array.isArray(versions)) {
    throw new Error("SERVICE_VERSIONS is not an object");
  }
  return versions as Record<string, string[]>;
};

/** `2017-03-12` → `v20170312`, the CLI's directory name for a version. */
const versionDir = (version: string): string => `v${version.replaceAll("-", "")}`;

const validateModel = (product: string, version: string, text: string): void => {
  const model = JSON.parse(text) as {
    actions?: unknown;
    objects?: unknown;
    metadata?: { apiVersion?: unknown };
  };
  if (
    model.actions === null ||
    typeof model.actions !== "object" ||
    model.objects === null ||
    typeof model.objects !== "object" ||
    Object.keys(model.actions).length === 0
  ) {
    throw new Error(`${product} ${version}: api.json has no actions or objects`);
  }
  if (model.metadata?.apiVersion !== version) {
    throw new Error(
      `${product} ${version}: api.json declares version ${String(model.metadata?.apiVersion)}`,
    );
  }
};

async function main() {
  const workdir = mkdtempSync(join(tmpdir(), "spec-mirror-tencentcloud-"));
  try {
    console.log(`Cloning ${CLI_REPO} (blobless, sparse, depth 1)...`);
    await git(
      workdir,
      "clone",
      "--filter=blob:none",
      "--no-checkout",
      "--sparse",
      "--depth=1",
      "--branch",
      CLI_REF,
      CLI_REPO,
      "repo",
    );
    const repo = join(workdir, "repo");

    const serviceVersions = parseServiceVersions(
      await gitOutput(repo, "show", `HEAD:${SERVICES_DIR}/__init__.py`),
    );
    const entries: ManifestEntry[] = Object.entries(serviceVersions)
      .filter(([, versions]) => versions.length > 0)
      .map(([product, versions]) => ({
        product,
        version: versions[0]!,
        file: `${product}/${versionDir(versions[0]!)}/api.json`,
      }))
      .sort((a, b) => (a.product < b.product ? -1 : a.product > b.product ? 1 : 0));
    if (entries.length === 0) throw new Error("SERVICE_VERSIONS lists no products");

    console.log(`Narrowing the checkout to ${entries.length} api.json files...`);
    await git(
      repo,
      "sparse-checkout",
      "set",
      "--no-cone",
      ...entries.map((e) => `/${SERVICES_DIR}/${e.file}`),
    );
    await git(repo, "checkout", CLI_REF);

    // Replace rather than merge, so a product Tencent removed upstream also
    // disappears from the mirror.
    await rm(SPECS_DIR, { recursive: true, force: true });
    for (const entry of entries) {
      const text = await readFile(join(repo, SERVICES_DIR, entry.file), "utf8");
      validateModel(entry.product, entry.version, text);
      const dest = join(SPECS_DIR, entry.file);
      await mkdir(join(dest, ".."), { recursive: true });
      await writeFile(dest, text);
    }
    const manifestPath = join(SPECS_DIR, "_manifest.json");
    console.log(`Writing ${manifestPath}...`);
    await writeFile(manifestPath, JSON.stringify(entries, null, 2) + "\n");
  } finally {
    rmSync(workdir, { recursive: true, force: true });
  }
  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
