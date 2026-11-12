#!/usr/bin/env node
/**
 * Fetches all GCP API discovery documents (all versions) to ../specs/.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * Discovery docs are saved to:
 *   ../specs/{name}-{version}.json
 *
 * Also saves:
 *   ../specs/_directory.json   – raw directory listing from Google
 *   ../specs/_manifest.json    – manifest of successfully fetched specs
 *
 * And, from googleapis/googleapis, the per-method retry policies Google's
 * client libraries use (discovery documents carry none):
 *   ../specs/googleapis/<dir>/*_grpc_service_config.json  – verbatim
 *   ../specs/googleapis/http-rules.json  – `<package>.<Service>/<Method>` →
 *     its `google.api.http` bindings, read from the .proto files next to
 *     each service config, so a generator can match a gRPC method name to a
 *     discovery method (same HTTP method and path)
 *
 * googleapis is pulled with a blobless, depth-1 clone: the tree listing
 * picks the directories that have a service config, and only their
 * `*_grpc_service_config.json` and `*.proto` blobs are fetched.
 */

import { spawn } from "child_process";
import { once } from "events";
import { mkdirSync, mkdtempSync, rmSync, statSync } from "fs";
import { cp, mkdir, readFile, readdir, rm, writeFile } from "fs/promises";
import { tmpdir } from "os";
import { dirname, join } from "path";

const DISCOVERY_URL = "https://discovery.googleapis.com/discovery/v1/apis";
const SPECS_DIR = "../specs";

// Ensure the specs directory exists
mkdirSync(SPECS_DIR, { recursive: true });

interface DirectoryItem {
  kind: string;
  id: string;
  name: string;
  version: string;
  title: string;
  description: string;
  discoveryRestUrl: string;
  preferred: boolean;
}

interface DirectoryResponse {
  kind: string;
  discoveryVersion: string;
  items: DirectoryItem[];
}

/**
 * APIs that publish a discovery document but are not listed in Google's
 * central discovery directory at {@link DISCOVERY_URL}. Add entries here to
 * include them in the mirror.
 */
const EXTRAS: DirectoryItem[] = [
  {
    kind: "discovery#directoryItem",
    id: "lustre:v1",
    name: "lustre",
    version: "v1",
    title: "Google Cloud Managed Lustre API",
    description: "Google Cloud Managed Lustre API.",
    discoveryRestUrl: "https://lustre.googleapis.com/$discovery/rest?version=v1",
    preferred: true,
  },
  {
    kind: "discovery#directoryItem",
    id: "storageinsights:v1",
    name: "storageinsights",
    version: "v1",
    title: "Storage Insights API",
    description: "Provides insights capability on Google Cloud Storage.",
    discoveryRestUrl: "https://storageinsights.googleapis.com/$discovery/rest?version=v1",
    preferred: true,
  },
];

const concurrency = 20;

const GOOGLEAPIS_REPO = "https://github.com/googleapis/googleapis.git";
const GOOGLEAPIS_REF = "master";
const SERVICE_CONFIG_SUFFIX = "_grpc_service_config.json";

const git = async (cwd: string, args: string[], input?: string): Promise<string> => {
  const proc = spawn("git", args, { cwd, stdio: ["pipe", "pipe", "inherit"] });
  let out = "";
  proc.stdout.on("data", (chunk) => (out += chunk));
  proc.stdin.end(input ?? "");
  const [code] = await once(proc, "close");
  if (code !== 0) throw new Error(`git ${args.join(" ")} failed with exit code ${code}`);
  return out;
};

/** The body of the `{ … }` block that starts at `open`, and the index after it. */
const block = (text: string, open: number): [string, number] => {
  let depth = 0;
  for (let i = open; i < text.length; i++) {
    if (text[i] === "{") depth++;
    else if (text[i] === "}" && --depth === 0) return [text.slice(open + 1, i), i + 1];
  }
  return [text.slice(open + 1), text.length];
};

/** `proto` without comments; `/*` and `//` inside strings (HTTP paths, URLs) stay. */
const stripComments = (proto: string): string => {
  let out = "";
  for (let i = 0; i < proto.length; i++) {
    const c = proto[i]!;
    if (c === '"') {
      const end = proto.indexOf('"', i + 1);
      const stop = end === -1 ? proto.length : end + 1;
      out += proto.slice(i, stop);
      i = stop - 1;
    } else if (c === "/" && proto[i + 1] === "/") {
      const end = proto.indexOf("\n", i);
      i = (end === -1 ? proto.length : end) - 1;
    } else if (c === "/" && proto[i + 1] === "*") {
      const end = proto.indexOf("*/", i + 2);
      i = (end === -1 ? proto.length : end + 2) - 1;
    } else {
      out += c;
    }
  }
  return out;
};

interface HttpBinding {
  readonly method: string;
  readonly path: string;
}

/**
 * `<package>.<Service>/<Method>` → the method's `google.api.http` bindings
 * (the primary one first, then `additional_bindings`) in one .proto file.
 */
const httpRulesOf = (proto: string): Record<string, HttpBinding[]> => {
  const text = stripComments(proto);
  const pkg = /\bpackage\s+([\w.]+)\s*;/.exec(text)?.[1];
  const rules: Record<string, HttpBinding[]> = {};
  if (pkg === undefined) return rules;
  for (const service of text.matchAll(/\bservice\s+(\w+)\s*\{/g)) {
    const [body] = block(text, service.index + service[0].length - 1);
    const rpcs = /\brpc\s+(\w+)\s*\([^)]*\)\s*returns\s*\([^)]*\)\s*([{;])/g;
    for (let rpc = rpcs.exec(body); rpc !== null; rpc = rpcs.exec(body)) {
      if (rpc[2] !== "{") continue;
      const [rpcBody, end] = block(body, rpc.index + rpc[0].length - 1);
      rpcs.lastIndex = end;
      const option = /option\s*\(\s*google\.api\.http\s*\)\s*=\s*\{/.exec(rpcBody);
      if (option === null) continue;
      const [http] = block(rpcBody, option.index + option[0].length - 1);
      const bindings = [...http.matchAll(/\b(get|put|post|delete|patch)\s*:\s*"([^"]*)"/g)].map(
        (m) => ({ method: m[1]!.toUpperCase(), path: m[2]! }),
      );
      if (bindings.length > 0) rules[`${pkg}.${service[1]}/${rpc[1]}`] = bindings;
    }
  }
  return rules;
};

async function fetchServiceConfigs() {
  const workdir = mkdtempSync(join(tmpdir(), "spec-mirror-gcp-"));
  try {
    console.log(`Cloning ${GOOGLEAPIS_REPO} (blobless, depth 1)...`);
    await git(workdir, [
      "clone",
      "--filter=blob:none",
      "--no-checkout",
      "--depth=1",
      "--branch",
      GOOGLEAPIS_REF,
      GOOGLEAPIS_REPO,
      "repo",
    ]);
    const repo = join(workdir, "repo");
    // Trees are local after a blobless clone: pick paths without any blob.
    const paths = (await git(repo, ["ls-tree", "-r", "--name-only", "HEAD"])).split("\n");
    const dirs = new Set(
      paths.filter((p) => p.endsWith(SERVICE_CONFIG_SUFFIX)).map((p) => dirname(p)),
    );
    const keep = paths.filter(
      (p) => dirs.has(dirname(p)) && (p.endsWith(SERVICE_CONFIG_SUFFIX) || p.endsWith(".proto")),
    );
    console.log(`Checking out ${keep.length} files from ${dirs.size} directories...`);
    await git(
      repo,
      ["sparse-checkout", "set", "--no-cone", "--stdin"],
      keep.map((p) => `/${p}\n`).join(""),
    );
    await git(repo, ["checkout", GOOGLEAPIS_REF]);

    const dest = `${SPECS_DIR}/googleapis`;
    // Replace rather than merge, so a config Google removed also disappears.
    await rm(dest, { recursive: true, force: true });
    const rules: Record<string, HttpBinding[]> = {};
    for (const path of keep) {
      if (path.endsWith(SERVICE_CONFIG_SUFFIX)) {
        await mkdir(join(dest, dirname(path)), { recursive: true });
        await cp(join(repo, path), join(dest, path));
      } else {
        Object.assign(rules, httpRulesOf(await readFile(join(repo, path), "utf8")));
      }
    }
    const sorted = Object.fromEntries(Object.entries(rules).sort(([a], [b]) => a.localeCompare(b)));
    await writeFile(`${dest}/http-rules.json`, JSON.stringify(sorted, null, 2));
    const configs = (await readdir(dest, { recursive: true })).filter((p) =>
      String(p).endsWith(SERVICE_CONFIG_SUFFIX),
    );
    console.log(
      `Wrote ${configs.length} service configs and ${Object.keys(sorted).length} HTTP rules to ${dest}/`,
    );
  } finally {
    rmSync(workdir, { recursive: true, force: true });
  }
}

async function main() {
  console.log("Fetching GCP API directory...");

  const dirResponse = await fetch(DISCOVERY_URL);
  if (!dirResponse.ok) {
    throw new Error(`Failed to fetch directory: ${dirResponse.status} ${dirResponse.statusText}`);
  }
  const directory: DirectoryResponse = await dirResponse.json();

  // Save directory
  await writeFile(`${SPECS_DIR}/_directory.json`, JSON.stringify(directory, null, 2));

  // Merge in APIs published outside the central directory. Re-sort by
  // name+version so the manifest stays alphabetically stable.
  directory.items = [...directory.items, ...EXTRAS].sort((a, b) =>
    `${a.name}:${a.version}`.localeCompare(`${b.name}:${b.version}`),
  );

  console.log(`Found ${directory.items.length} API entries (${EXTRAS.length} from EXTRAS)`);

  // Fetch ALL versions of ALL APIs — no filtering
  const items = directory.items;

  console.log(`Fetching ${items.length} discovery documents...`);

  // Fetch in batches for concurrency control
  let fetched = 0;
  let failed = 0;
  const errors: string[] = [];

  for (let i = 0; i < items.length; i += concurrency) {
    const batch = items.slice(i, i + concurrency);
    await Promise.allSettled(
      batch.map(async (item) => {
        const filename = `${item.name}-${item.version}.json`;
        const filepath = `${SPECS_DIR}/${filename}`;

        try {
          const response = await fetch(item.discoveryRestUrl);
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          const doc = await response.json();
          await writeFile(filepath, JSON.stringify(doc, null, 2));
          fetched++;
        } catch (err) {
          failed++;
          const msg = `Failed: ${item.name}@${item.version}: ${err}`;
          errors.push(msg);
        }
      }),
    );

    const pct = Math.round(((i + batch.length) / items.length) * 100);
    process.stdout.write(
      `\r  Progress: ${fetched + failed}/${items.length} (${pct}%) - ${fetched} ok, ${failed} failed`,
    );
  }

  console.log(); // newline after progress

  if (errors.length > 0) {
    console.log("\nFailed fetches:");
    for (const err of errors) {
      console.log(`  ${err}`);
    }
  }

  // Write a manifest of all fetched specs
  const manifest = items
    .filter((item) => {
      // Check if file was actually written
      try {
        return statSync(`${SPECS_DIR}/${item.name}-${item.version}.json`).size > 0;
      } catch {
        return false;
      }
    })
    .map((item) => ({
      name: item.name,
      version: item.version,
      title: item.title,
      preferred: item.preferred,
      filename: `${item.name}-${item.version}.json`,
    }));

  await writeFile(`${SPECS_DIR}/_manifest.json`, JSON.stringify(manifest, null, 2));

  console.log(`\nDone! ${fetched} specs saved to specs/, ${failed} failed.`);
  console.log(`Manifest: ${SPECS_DIR}/_manifest.json`);

  await fetchServiceConfigs();
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
