#!/usr/bin/env node
/**
 * Fetches the structure of the Proxmox VE API schema to ../specs/.
 *
 * Proxmox publishes its API as JSON Schema inside the API viewer's
 * `apidoc.js` (`const apiSchema = [...]`), shipped in the `pve-docs` Debian
 * package. This script pins one release of that package, verifies it
 * against Proxmox's signed package repository, extracts the schema without
 * running any JavaScript and keeps only its structure.
 *
 * The schema mixes interface structure (paths, methods, parameter names,
 * types, formats, enums, constraints, flags) with documentation text
 * (descriptions, type texts, titles, permission texts). The `pve-docs`
 * copyright file lists `*.js` under AGPL-3.0-or-later and the documentation
 * under GFDL-1.3, so the mirror stores the structure and none of the text.
 *
 * Trust chain: Proxmox serves its repository over plain HTTP, so trust comes
 * from the signed `InRelease` file. gpgv checks it against Proxmox's trixie
 * release key, fetched over HTTPS and pinned by fingerprint below. The
 * signed SHA256 list covers the package index, and the index lists the
 * SHA256 of the package.
 *
 * Requires `gpgv`, `ar` and `tar`.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * Output:
 *   ../specs/api-structure.json   the structural schema
 *   ../specs/provenance.json      what was fetched and how it was verified
 */
import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdir, mkdtemp, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { gunzipSync } from "node:zlib";

const PACKAGE = "pve-docs";
const VERSION = "9.2.4";
const OPERATIONS = 678;
const SUITE = "trixie";
const COMPONENT = "pve-no-subscription";
const REPOSITORY = "http://download.proxmox.com/debian/pve/";
const RELEASE_URL = `${REPOSITORY}dists/${SUITE}/InRelease`;
const INDEX_PATH = `${COMPONENT}/binary-amd64/Packages`;
const INDEX_URL = `${REPOSITORY}dists/${SUITE}/${INDEX_PATH}.gz`;
const KEY_URL = "https://enterprise.proxmox.com/debian/proxmox-release-trixie.gpg";
/** "Proxmox Trixie Release Key", as listed on Proxmox's ISO download pages. */
const KEY_FINGERPRINT = "24B30F06ECC1836A4E5EFECBA7BCD1420BFE778E";
const APIDOC_PATH = "usr/share/pve-docs/api-viewer/apidoc.js";
const SPECS_DIR = "../specs";
const STRUCTURE_FILE = "api-structure.json";

/**
 * Keywords kept from every parameter and return schema. Anything else
 * (`description`, `verbose_description`, `format_description`, `typetext`,
 * `title`, `renderer`, `links`, ...) is dropped. The package converter
 * applies the same list again.
 */
const KEYWORDS = new Set([
  "type",
  "properties",
  "items",
  "optional",
  "enum",
  "default",
  "default_key",
  "alias",
  "keyAlias",
  "format",
  "pattern",
  "requires",
  "minimum",
  "maximum",
  "min",
  "max",
  "minLength",
  "maxLength",
  "additionalProperties",
]);

/** Operation fields kept. Permissions are dropped; the token and protection flags remain. */
const OPERATION_FIELDS = ["name", "allowtoken", "protected"] as const;

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
type JsonObject = { [key: string]: Json };

const isObject = (value: unknown): value is JsonObject =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const sha256 = (data: string | Uint8Array) => createHash("sha256").update(data).digest("hex");

const json = (value: unknown) => JSON.stringify(value, null, 2) + "\n";

/** Fails early, with the tool names, instead of on the first spawn. */
function preflight() {
  const missing = ["gpgv", "ar", "tar"].filter(
    (tool) => spawnSync(tool, ["--version"], { stdio: "ignore" }).error !== undefined,
  );
  if (missing.length > 0) {
    throw new Error(
      `Missing required tools: ${missing.join(", ")}. ` +
        `Install gpgv, binutils (for ar) and tar, for example with ` +
        `\`apt-get install gpgv binutils tar\`.`,
    );
  }
}

async function download(url: string) {
  const response = await fetch(url, {
    headers: { "user-agent": "distilled.cloud-proxmox-spec-mirror" },
  });
  if (!response.ok) throw new Error(`Download failed: ${url}: ${response.status}`);
  return Buffer.from(await response.arrayBuffer());
}

/**
 * Verifies InRelease with gpgv against the pinned key and returns a checker
 * for the SHA256 list in its signed text.
 */
async function verifyRelease(directory: string) {
  // A fresh home directory keeps the user's own keyrings out of the check.
  const home = join(directory, "gnupg");
  await mkdir(home, { mode: 0o700 });
  const keyring = join(home, "proxmox-release.gpg");
  await writeFile(keyring, await download(KEY_URL));
  await writeFile(join(home, "InRelease"), await download(RELEASE_URL));
  const result = spawnSync(
    "gpgv",
    ["--homedir", home, "--keyring", keyring, "--status-fd", "2", "--output", "-", "InRelease"],
    { cwd: home, encoding: "utf8" },
  );
  if (result.error) throw new Error(`gpgv could not run: ${result.error.message}`);
  // gpgv exits 0 only for good signatures. VALIDSIG ends with the primary key fingerprint.
  const signers = [...result.stderr.matchAll(/^\[GNUPG:\] VALIDSIG .* ([0-9A-F]{40})$/gm)].map(
    (match) => match[1],
  );
  if (result.status !== 0 || signers.length === 0 || signers.some((fpr) => fpr !== KEY_FINGERPRINT))
    throw new Error("InRelease is not signed by the pinned Proxmox release key");
  // Only the text gpgv verified is parsed, never the downloaded file.
  const text = result.stdout;
  if (text.match(/^Codename: (.+)$/m)?.[1] !== SUITE) throw new Error("Unexpected InRelease suite");
  const listed = new Map(
    (text.match(/^SHA256:\n((?: .+\n)+)/m)?.[1] ?? "")
      .trim()
      .split("\n")
      .map((line) => {
        const [hash, size, path] = line.trim().split(/\s+/);
        return [path, { hash, size: Number(size) }] as const;
      }),
  );
  return (path: string, data: Uint8Array) => {
    const expected = listed.get(path);
    if (!expected || sha256(data) !== expected.hash || data.length !== expected.size)
      throw new Error(`${path} does not match its SHA256 entry in InRelease`);
  };
}

/** The pinned package's entry in the verified index. */
function packageEntry(index: string) {
  const entry = index
    .split(/\n\n/)
    .find(
      (block) => block.includes(`Package: ${PACKAGE}\n`) && block.includes(`Version: ${VERSION}\n`),
    );
  if (!entry) throw new Error(`${PACKAGE} ${VERSION} is missing from ${INDEX_URL}`);
  const field = (name: string) => {
    const value = entry.match(new RegExp(`^${name}: (.+)$`, "m"))?.[1];
    if (!value) throw new Error(`Missing ${name} in the package index entry`);
    return value;
  };
  return {
    url: new URL(field("Filename"), REPOSITORY).href,
    size: Number(field("Size")),
    sha256: field("SHA256"),
  };
}

/** Copies a schema with the structural keywords only, recursing into nested schemas. */
function structural(schema: JsonObject): JsonObject {
  const copy: JsonObject = {};
  for (const [key, value] of Object.entries(schema)) {
    if (!KEYWORDS.has(key)) continue;
    // Some defaults describe computed behavior in words instead of giving a value.
    if (key === "default" && typeof value === "string" && /\s/.test(value)) continue;
    if (!isObject(value)) copy[key] = value;
    else if (key === "properties" || key === "format") copy[key] = structuralMap(value);
    else if (key === "items" || key === "additionalProperties") copy[key] = structural(value);
    else copy[key] = value;
  }
  return copy;
}

const structuralMap = (schemas: JsonObject): JsonObject =>
  Object.fromEntries(
    Object.entries(schemas).map(([key, value]) => [
      key,
      isObject(value) ? structural(value) : value,
    ]),
  );

/** One tree node with its operations reduced to structure. Counts operations on the way. */
function stripNode(node: unknown, counter: { operations: number }): JsonObject {
  if (!isObject(node) || typeof node.path !== "string") throw new Error("Invalid schema tree node");
  const info = node.info ?? {};
  const children = node.children ?? [];
  if (!isObject(info) || !Array.isArray(children)) throw new Error("Invalid schema tree structure");
  const out: JsonObject = { path: node.path };
  const operations = Object.entries(info);
  if (operations.length > 0) {
    out.info = Object.fromEntries(
      operations.map(([method, operation]) => {
        if (!/^(?:GET|POST|PUT|DELETE)$/.test(method) || !isObject(operation))
          throw new Error(`Invalid operation ${method} ${node.path}`);
        counter.operations++;
        const kept: JsonObject = {};
        for (const field of OPERATION_FIELDS) {
          const value = operation[field];
          if (value !== undefined) kept[field] = value;
        }
        if (isObject(operation.parameters)) kept.parameters = structural(operation.parameters);
        if (isObject(operation.returns)) kept.returns = structural(operation.returns);
        return [method, kept];
      }),
    );
  }
  if (children.length > 0) out.children = children.map((child) => stripNode(child, counter));
  return out;
}

/**
 * A second guard behind the allowlist: names and values are identifiers, so a
 * string with whitespace outside a regular expression is text that slipped
 * through.
 */
function assertNoText(value: Json, key = ""): void {
  if (typeof value === "string") {
    if (key !== "pattern" && /\s/.test(value))
      throw new Error(`Text left in a "${key}" value after stripping`);
  } else if (Array.isArray(value)) {
    for (const item of value) assertNoText(item, key);
  } else if (isObject(value)) {
    for (const [name, item] of Object.entries(value)) {
      if (/\s/.test(name)) throw new Error("Text left in a key after stripping");
      assertNoText(item, name);
    }
  }
}

async function main() {
  preflight();
  const temp = await mkdtemp(join(tmpdir(), "spec-mirror-proxmox-"));
  try {
    console.log(`Verifying ${RELEASE_URL} against key ${KEY_FINGERPRINT}...`);
    const check = await verifyRelease(temp);
    const compressed = await download(INDEX_URL);
    check(`${INDEX_PATH}.gz`, compressed);
    const index = gunzipSync(compressed);
    check(INDEX_PATH, index);

    const entry = packageEntry(index.toString());
    console.log(`Downloading ${entry.url}...`);
    const deb = await download(entry.url);
    if (deb.length !== entry.size || sha256(deb) !== entry.sha256)
      throw new Error("Package size or SHA256 does not match the package index");
    await writeFile(join(temp, "package.deb"), deb);
    execFileSync("ar", ["x", "package.deb"], { cwd: temp });
    const archive = (await readdir(temp)).find((file) => file.startsWith("data.tar"));
    if (!archive) throw new Error("The Debian package has no data archive");
    execFileSync("tar", ["xf", archive, `./${APIDOC_PATH}`], { cwd: temp });

    // Read the array literal as JSON. The script itself is never evaluated.
    const apidocFile = join(temp, APIDOC_PATH);
    const apidoc = await readFile(apidocFile, "utf8");
    const literal = apidoc.match(/^const apiSchema = (\[[\s\S]*?^\])/m)?.[1];
    if (!literal) throw new Error("apidoc.js has no apiSchema array");
    const schema: unknown = JSON.parse(literal);
    if (!Array.isArray(schema) || schema.length === 0) throw new Error("The schema is empty");

    const counter = { operations: 0 };
    const structure = schema.map((node) => stripNode(node, counter));
    if (counter.operations !== OPERATIONS)
      throw new Error(`Expected ${OPERATIONS} operations, found ${counter.operations}`);
    assertNoText(structure);

    const payload = json(structure);
    // tar keeps the modification time recorded in the package, which Debian
    // builds set from the changelog. It is stable for a given package.
    const built = (await stat(apidocFile)).mtime.toISOString().slice(0, 10);
    // Only values that are fixed for the pinned package, so a refetch writes
    // the same bytes. InRelease and the index change whenever Proxmox
    // publishes any package; they are verified on every run instead.
    const provenance = {
      package: PACKAGE,
      version: VERSION,
      repository: REPOSITORY,
      suite: SUITE,
      component: COMPONENT,
      release: { url: RELEASE_URL, verifiedWith: "gpgv" },
      key: { url: KEY_URL, fingerprint: KEY_FINGERPRINT },
      index: { url: INDEX_URL },
      deb: { url: entry.url, size: entry.size, sha256: entry.sha256 },
      apidoc: { path: APIDOC_PATH, date: built, sha256: sha256(apidoc) },
      structure: { file: STRUCTURE_FILE, operations: OPERATIONS, sha256: sha256(payload) },
    };

    await mkdir(SPECS_DIR, { recursive: true });
    await writeFile(join(SPECS_DIR, STRUCTURE_FILE), payload);
    await writeFile(join(SPECS_DIR, "provenance.json"), json(provenance));
    console.log(`Done! ${PACKAGE} ${VERSION}: ${counter.operations} operations`);
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
