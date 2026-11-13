#!/usr/bin/env -S node --conditions=bun
/**
 * convert — Dokploy's OpenAPI description → Smithy JSON models in
 * .generated-specs.
 *
 * Dokploy publishes ONE OpenAPI 3.1 document, generated from its tRPC routers
 * (mirrored at `specs/spec-mirror-dokploy/specs/openapi.json`). Every path is
 * one procedure, `/<router>.<procedure>`, tagged with its router. The layout
 * wants one Smithy model — one service module — per router, so operations are
 * bucketed by their tag (`application`, `compose`, `previewDeployment` → the
 * `preview_deployment` module).
 *
 * Every failure is the same tRPC error body (`{ message, code, issues? }`),
 * declared per operation under 400/401/403/404/500; the converter's default
 * status classes cover them.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { clearModels, writeModel } from "@distilled.cloud/dev/codegen/models";
import { convertOpenApiToSmithy } from "@distilled.cloud/dev/codegen/openapi";
import { finalizeConvert } from "@distilled.cloud/dev/codegen/patches";
import { singularize } from "@distilled.cloud/dev/codegen/rewrite-operation-ids";
import { resolveSpecPath } from "@distilled.cloud/dev/codegen/spec-path";

const rootDir = path.resolve(import.meta.dirname, "..");
const specPath = resolveSpecPath(rootDir, "specs/spec-mirror-dokploy/specs/openapi.json");
const outDir = path.join(rootDir, ".generated-specs");

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

/** `previewDeployment` → `preview_deployment`. */
const toSlug = (tag: string): string =>
  tag
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();

const toPascal = (slug: string): string =>
  slug
    .split("_")
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");

const upperFirst = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

/** `withSSHKey` → `with`, `SSH`, `Key`; `fail2banStatus` → `fail2ban`, `Status`. */
const tokens = (s: string): string[] => s.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z0-9]+/g) ?? [];

const pascalTokens = (parts: readonly string[]): string => parts.map(upperFirst).join("");

/** `patch` → `patches`, `registry` → `registries`, `certificates` unchanged. */
const plural = (noun: string): string =>
  noun.endsWith("s")
    ? noun
    : /(?:ch|sh|x|z)$/.test(noun)
      ? `${noun}es`
      : /[^aeiou]y$/.test(noun)
        ? `${noun.slice(0, -1)}ies`
        : `${noun}s`;

const sameNoun = (a: string, b: string): boolean =>
  singularize(a).toLowerCase() === singularize(b).toLowerCase();

/** Where `noun` occurs as a run of whole tokens in `parts`, or -1. */
const indexOfRun = (parts: readonly string[], noun: readonly string[]): number => {
  for (let i = 0; i + noun.length <= parts.length; i++) {
    if (noun.every((t, j) => sameNoun(parts[i + j]!, t))) return i;
  }
  return -1;
};

/**
 * The router noun followed by `rest`, without repeating the words they
 * share: `dockerVolume` + `VolumeFiles` → `DockerVolumeFiles`.
 */
const nounThen = (noun: readonly string[], rest: readonly string[]): string => {
  for (let k = Math.min(noun.length, rest.length); k > 0; k--) {
    if (noun.slice(-k).every((t, j) => sameNoun(t, rest[j]!))) {
      return pascalTokens([...noun.slice(0, -k), ...rest]);
    }
  }
  return pascalTokens([...noun, ...rest]);
};

/**
 * Leading procedure words that already read as the operation's verb
 * (`deploy`, `saveBuildType`, `testSlackConnection`).
 */
const VERBS = new Set(
  [
    "activate add analyze assign ban build cancel change check clean clear complete",
    "configure count create deactivate delete deploy disable disconnect drop duplicate",
    "enable enforce ensure export fetch generate get import inspect invite kill list load",
    "mark move preview process prune randomize read rebuild receive recreate redeploy",
    "refresh register reload remove request reset restart resync revoke run save search",
    "send set setup show start stop suggest test toggle unban update upgrade upload",
    "validate write",
  ]
    .join(" ")
    .split(" "),
);

/** Leading words of yes/no queries, which keep their own wording (`haveRootAccess`). */
const PREDICATES = new Set(["can", "has", "have", "is"]);

/** Irregular names, by operationId. */
const OPERATION_NAMES: Readonly<Record<string, string>> = {
  // The caller's own member record; `user-one` is `getUser`.
  "user-get": "getCurrentUser",
};

/**
 * verbNoun names for tRPC procedure ids, `<router>-<procedure>`, with the
 * router as the noun:
 *
 *   application-one             → getApplication
 *   project-all                 → listProjects
 *   domain-byApplicationId      → listDomainsByApplicationId
 *   application-saveBuildType   → saveApplicationBuildType
 *   dockerVolume-listVolumeFiles → listDockerVolumeFiles
 *   project-homeStats (a query) → getProjectHomeStats
 *
 * A procedure that already names its router keeps its own words
 * (`registry-testRegistry` → `testRegistry`).
 */
const procedureName = (operationId: string, method: string): string | undefined => {
  const irregular = OPERATION_NAMES[operationId];
  if (irregular !== undefined) return irregular;
  const match = /^([A-Za-z0-9]+)-([A-Za-z0-9]+)$/.exec(operationId);
  if (!match) return undefined;
  const router = match[1]!;
  const procedure = match[2]!;
  const noun = [...tokens(router).slice(0, -1), singularize(tokens(router).at(-1)!)];
  const parts = tokens(procedure);
  const first = parts[0]!;
  const rest = parts.slice(1);
  const one = pascalTokens(noun);
  const many = pascalTokens([...noun.slice(0, -1), plural(tokens(router).at(-1)!)]);
  const isQuery = method.toLowerCase() === "get";

  // `rollback-rollback`: the procedure is its router's only verb.
  if (procedure === router) return `run${one}`;
  if (procedure === "one") return `get${one}`;
  if (procedure === "remove") return `delete${one}`;
  if (procedure === "all" || procedure === "getAll" || procedure === "list") {
    return `list${many}`;
  }
  if (first === "by" || (first === "list" && rest[0] === "By")) {
    return `list${many}${pascalTokens(first === "by" ? parts : rest)}`;
  }
  if (first === "all") {
    // `allInvitations` lists a child noun; `allByType`/`allCentralized` the router's own.
    const child = rest[0] !== undefined && !/^(By|For)$/.test(rest[0]) && rest[0].endsWith("s");
    return `list${child ? one : many}${pascalTokens(rest)}`;
  }
  if (PREDICATES.has(first)) return procedure;
  if (indexOfRun(parts, noun) >= 0) {
    return VERBS.has(first) || !isQuery ? procedure : `get${upperFirst(procedure)}`;
  }
  if (VERBS.has(first)) {
    if (rest.length === 0) return `${first}${first === "count" ? many : one}`;
    return `${first}${nounThen(noun, rest)}`;
  }
  return isQuery ? `get${nounThen(noun, parts)}` : `${first}${nounThen(noun, rest)}`;
};

// ---- 1. Read the full spec -------------------------------------------------
if (!fs.existsSync(specPath)) {
  throw new Error(
    `${specPath} not found — run \`pnpm specs:local dokploy\` (or specs:fetch) first`,
  );
}
const fullSpec = JSON.parse(fs.readFileSync(specPath, "utf-8"));

// ---- 2. Bucket paths by router ---------------------------------------------
const buckets = new Map<string, Record<string, Record<string, unknown>>>();
for (const [pathTemplate, pathItem] of Object.entries<Record<string, unknown>>(fullSpec.paths)) {
  for (const method of HTTP_METHODS) {
    const op = (pathItem as Record<string, any>)[method];
    if (!op) continue;
    const tag: string | undefined = Array.isArray(op.tags) ? op.tags[0] : undefined;
    if (tag === undefined) {
      throw new Error(`${method.toUpperCase()} ${pathTemplate} has no tag to place it in a module`);
    }
    const slug = toSlug(tag);
    if (!buckets.has(slug)) buckets.set(slug, {});
    const bucketPaths = buckets.get(slug)!;
    if (!bucketPaths[pathTemplate]) {
      const pathParams = (pathItem as Record<string, any>).parameters;
      bucketPaths[pathTemplate] = pathParams ? { parameters: pathParams } : {};
    }
    (bucketPaths[pathTemplate] as Record<string, unknown>)[method] = op;
  }
}

// ---- 3. Convert each bucket ------------------------------------------------
clearModels(outDir);

let written = 0;
let totalOps = 0;
for (const slug of [...buckets.keys()].sort()) {
  const paths = buckets.get(slug)!;
  const model = convertOpenApiToSmithy(
    { ...fullSpec, paths },
    {
      deferNaming: true,
      namespace: `com.dokploy.${slug}`,
      serviceName: toPascal(slug),
      // The two multipart uploads (`application.dropDeployment`'s `zip`,
      // `docker.uploadFileToContainer`'s `file`) are `format: binary` parts.
      binaryTypes: true,
      operationNames: (operationId, { method }) => procedureName(operationId, method),
    },
  );

  const operations = Object.values<any>(model.shapes).filter((s) => s.type === "operation");
  if (operations.length === 0) {
    throw new Error(`${slug}: no operations converted`);
  }

  writeModel(path.join(outDir, `${slug}.json`), model);
  written++;
  totalOps += operations.length;
}

console.log(`✅ ${written} Smithy models (${totalOps} operations) → ${outDir}`);

// The converter computed the names (procedureName above); finalize only applies them.
await finalizeConvert({ root: rootDir, operationNaming: "as-is" });
