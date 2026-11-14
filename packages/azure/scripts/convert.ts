#!/usr/bin/env -S node --conditions=bun
/**
 * convert — turn the Azure ARM Swagger 2.0 specs into Smithy 2.0 JSON models,
 * one merged model per Azure service, plus one model per data-plane group
 * (see the "Data planes" section).
 *
 * Input:  specs/spec-mirror-azure/specs/specification/<service>/resource-manager/
 *         <Microsoft.Provider>[/<subService>]/stable/<version>/*.json
 *         specs/spec-mirror-azure/specs/specification/<service>/data-plane/
 *         <group>[/<sub>]/stable/<version>/*.json
 * Output: .generated-specs/<service>.json, .generated-specs/<service>-<group>.json
 *         (+ manual-specs/<module>.json copied in, see "Manual specs")
 *
 * Ported from distilled v0's `packages/azure/scripts/generate.ts` (the
 * spec-side half). The pipeline per spec file:
 *
 *   1. discovery — latest STABLE api-version per Microsoft.* resource
 *      provider (flat `stable/` and nested `<subService>/stable/` layouts;
 *      preview, data-plane, and common-types are skipped)
 *   2. mergeSiblingDefinitions — union `definitions` + `parameters` from
 *      sibling JSONs in the same version directory
 *   3. resolveExternalRefs — inline cross-file `$ref`s (common-types etc.)
 *      with circular-ref guards, transplanting missing `#/definitions/X`
 *      from external documents into the main spec
 *   4. collectMissingDefinitions — second pass scavenging dangling refs from
 *      the whole file cache
 *   5. `convertOpenApiToSmithy` (the shared converter) with
 *      `apiVersion: <resolved stable version>` — drops the `api-version`
 *      query param and records the version as an operation trait; the
 *      version is then folded into the op's `smithy.api#http` trait so the
 *      generated `T.Http` carries it (the protocol appends `?api-version=`)
 *   6. per-service merge — v0 collision semantics: an operation whose
 *      name (or Request/Response shape name) is already taken by an earlier
 *      spec of the same service is SKIPPED (first spec wins); non-operation
 *      shape-name collisions are structurally deduplicated (graph equality)
 *      or renamed with a numeric suffix
 *
 * v0 parity notes: `statusToErrorClass: {}` mirrors v0's
 * `includeOperationErrors: false` (Azure errors are entirely client-level);
 * `skipDeprecated: true` matches v0.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import {
  clearModels,
  modelExists,
  writeModel,
  writeModelText,
} from "@distilled.cloud/dev/codegen/models";
import {
  API_VERSION_TRAIT,
  convertOpenApiToSmithy,
  type SmithyModel,
} from "@distilled.cloud/dev/codegen/openapi";
import { finalizeConvert } from "@distilled.cloud/dev/codegen/patches";
import {
  RENAME_METADATA_KEY,
  renameShapes,
} from "@distilled.cloud/dev/codegen/rewrite-operation-ids";
import { resolveSpecPath } from "@distilled.cloud/dev/codegen/spec-path";

const rootDir = path.resolve(import.meta.dirname, "..");
const specsRoot = resolveSpecPath(rootDir, "specs/spec-mirror-azure/specs/specification");
const outDir = path.join(rootDir, ".generated-specs");

// ============================================================================
// External $ref resolution (ported verbatim from v0)
// ============================================================================

const fileCache = new Map<string, any>();

function loadJsonFile(filePath: string): any {
  const resolved = path.resolve(filePath);
  if (fileCache.has(resolved)) return fileCache.get(resolved);
  try {
    const content = fs.readFileSync(resolved, "utf-8");
    const parsed = JSON.parse(content);
    fileCache.set(resolved, parsed);
    return parsed;
  } catch {
    return null;
  }
}

function resolvePointer(doc: any, pointer: string): any {
  if (!pointer.startsWith("#/")) return undefined;
  const segments = pointer.slice(2).split("/");
  let current = doc;
  for (const seg of segments) {
    current = current?.[decodeURIComponent(seg)];
    if (current === undefined) return undefined;
  }
  return current;
}

/**
 * Track which external document a piece of inlined content came from,
 * so we can transplant missing `#/definitions/X` refs later.
 */
interface ExternalRefContext {
  /** The main spec object — we'll add missing definitions here */
  mainSpec: any;
  /** Set of definition names currently being transplanted (to avoid infinite loops) */
  transplanting: Set<string>;
}

/**
 * Given an object that was resolved from an external document, find all
 * `#/definitions/X` refs within it and transplant the referenced definitions
 * from the external document into the main spec if they don't already exist.
 */
function transplantMissingDefinitions(
  obj: any,
  externalDoc: any,
  externalDir: string,
  ctx: ExternalRefContext,
): void {
  if (obj === null || obj === undefined || typeof obj !== "object") return;

  if (Array.isArray(obj)) {
    for (const item of obj) {
      transplantMissingDefinitions(item, externalDoc, externalDir, ctx);
    }
    return;
  }

  if (typeof obj.$ref === "string" && obj.$ref.startsWith("#/definitions/")) {
    const defName = obj.$ref.slice("#/definitions/".length);
    if (!ctx.mainSpec.definitions?.[defName] && !ctx.transplanting.has(defName)) {
      // Look for the definition in the external doc
      const externalDef = externalDoc?.definitions?.[defName];
      if (externalDef) {
        ctx.transplanting.add(defName);
        if (!ctx.mainSpec.definitions) ctx.mainSpec.definitions = {};

        // Deep clone and resolve any external refs within the transplanted definition
        const resolvedDef = resolveExternalRefs(
          JSON.parse(JSON.stringify(externalDef)),
          externalDir,
          new Set(),
          ctx,
        );
        ctx.mainSpec.definitions[defName] = resolvedDef;

        // Recursively transplant any #/definitions/ refs within this new definition
        transplantMissingDefinitions(resolvedDef, externalDoc, externalDir, ctx);
      }
    }
    return;
  }

  for (const value of Object.values(obj)) {
    transplantMissingDefinitions(value, externalDoc, externalDir, ctx);
  }
}

function resolveExternalRefs(
  obj: any,
  specDir: string,
  visited: Set<string> = new Set(),
  ctx?: ExternalRefContext,
): any {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj !== "object") return obj;

  if (Array.isArray(obj)) {
    return obj.map((item) => resolveExternalRefs(item, specDir, visited, ctx));
  }

  if (typeof obj.$ref === "string" && !obj.$ref.startsWith("#/")) {
    const ref = obj.$ref;
    if (visited.has(ref)) {
      return { type: "object", description: `(circular ref: ${ref})` };
    }

    const hashIdx = ref.indexOf("#");
    let filePart: string;
    let pointer: string;
    if (hashIdx >= 0) {
      filePart = ref.slice(0, hashIdx);
      pointer = ref.slice(hashIdx);
    } else {
      filePart = ref;
      pointer = "#";
    }

    const externalPath = path.resolve(specDir, filePart);
    const externalDoc = loadJsonFile(externalPath);
    if (!externalDoc) {
      return { type: "object", description: `(unresolved ref: ${ref})` };
    }

    let resolved: any;
    if (pointer === "#" || pointer === "") {
      resolved = externalDoc;
    } else {
      resolved = resolvePointer(externalDoc, pointer);
    }
    if (resolved === undefined) {
      return { type: "object", description: `(unresolved pointer: ${ref})` };
    }

    const externalDir = path.dirname(externalPath);
    const resolvedCopy = resolveExternalRefs(
      JSON.parse(JSON.stringify(resolved)),
      externalDir,
      new Set([...visited, ref]),
      ctx,
    );

    // Transplant any #/definitions/X refs from the external doc into the main spec
    if (ctx) {
      transplantMissingDefinitions(resolvedCopy, externalDoc, externalDir, ctx);
    }

    return resolvedCopy;
  }

  const result: any = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = resolveExternalRefs(value, specDir, visited, ctx);
  }
  return result;
}

/**
 * Scan the entire resolved spec for #/definitions/X refs where X is missing,
 * and search through all cached files to find and transplant them.
 * This handles cases where definitions were referenced inside allOf/properties
 * chains that weren't caught during the initial resolveExternalRefs pass.
 */
function collectMissingDefinitions(
  spec: any,
  specDir: string,
  root: any,
  visited: Set<string> = new Set(),
): void {
  // Collect all #/definitions/X refs in the spec
  const missingRefs = new Set<string>();
  findMissingDefRefs(spec, root, missingRefs);

  if (missingRefs.size === 0) return;

  // Search through all cached files for the missing definitions
  for (const defName of missingRefs) {
    if (visited.has(defName)) continue;
    visited.add(defName);

    if (root.definitions?.[defName]) continue;

    // Search in all cached files for this definition
    for (const [, doc] of fileCache) {
      if (doc?.definitions?.[defName]) {
        if (!root.definitions) root.definitions = {};
        const docDir = findFileDir(doc);
        const cloned = JSON.parse(JSON.stringify(doc.definitions[defName]));
        // Resolve any external refs within the transplanted definition
        const resolved = resolveExternalRefs(cloned, docDir || specDir, new Set());
        root.definitions[defName] = resolved;

        // Also transplant any definitions this one references
        collectMissingDefinitions(resolved, docDir || specDir, root, visited);
        break;
      }
    }
  }
}

/** Find the directory for a cached document */
function findFileDir(doc: any): string | null {
  for (const [filePath, cachedDoc] of fileCache) {
    if (cachedDoc === doc) {
      return path.dirname(filePath);
    }
  }
  return null;
}

/** Recursively find all #/definitions/X refs that are missing from the spec */
function findMissingDefRefs(obj: any, root: any, missing: Set<string>): void {
  if (obj === null || obj === undefined || typeof obj !== "object") return;

  if (Array.isArray(obj)) {
    for (const item of obj) {
      findMissingDefRefs(item, root, missing);
    }
    return;
  }

  if (typeof obj.$ref === "string" && obj.$ref.startsWith("#/definitions/")) {
    const defName = obj.$ref.slice("#/definitions/".length);
    if (!root.definitions?.[defName]) {
      missing.add(defName);
    }
    return;
  }

  for (const value of Object.values(obj)) {
    findMissingDefRefs(value, root, missing);
  }
}

// ============================================================================
// Sibling spec merging (ported verbatim from v0)
// ============================================================================

function mergeSiblingDefinitions(spec: any, versionDir: string): any {
  const jsonFiles = fs
    .readdirSync(versionDir)
    .filter((f) => f.endsWith(".json") && !f.startsWith("examples") && f !== "examples")
    .sort();

  for (const jsonFile of jsonFiles) {
    const filePath = path.join(versionDir, jsonFile);
    if (filePath.includes(`${path.sep}examples${path.sep}`) || filePath.includes("/examples/")) {
      continue;
    }

    try {
      const sibling = loadJsonFile(filePath);
      if (!sibling) continue;

      if (sibling.definitions) {
        if (!spec.definitions) spec.definitions = {};
        for (const [name, def] of Object.entries(sibling.definitions)) {
          if (!spec.definitions[name]) {
            spec.definitions[name] = def;
          }
        }
      }

      if (sibling.parameters) {
        if (!spec.parameters) spec.parameters = {};
        for (const [name, param] of Object.entries(sibling.parameters)) {
          if (!spec.parameters[name]) {
            spec.parameters[name] = param;
          }
        }
      }
    } catch {
      // Skip files that can't be parsed
    }
  }

  return spec;
}

// ============================================================================
// Spec discovery (ported from v0; readdir results sorted for determinism)
// ============================================================================

interface SpecFile {
  service: string;
  provider: string;
  subService?: string;
  apiVersion: string;
  filePath: string;
  versionDir: string;
}

function compareVersions(a: string, b: string): number {
  return a.localeCompare(b);
}

function discoverSpecs(): SpecFile[] {
  const specs: SpecFile[] = [];

  if (!fs.existsSync(specsRoot)) {
    console.error("Azure specs not found. Run `pnpm run specs:fetch` first.");
    process.exit(1);
  }

  for (const service of fs.readdirSync(specsRoot).sort()) {
    if (service === "common-types" || service.endsWith(".yaml")) continue;
    const svcPath = path.join(specsRoot, service);
    if (!fs.statSync(svcPath).isDirectory()) continue;

    const rmPath = path.join(svcPath, "resource-manager");
    if (!fs.existsSync(rmPath) || !fs.statSync(rmPath).isDirectory()) continue;

    for (const provider of fs.readdirSync(rmPath).sort()) {
      if (!provider.startsWith("Microsoft.") && !provider.startsWith("microsoft.")) {
        continue;
      }
      const providerPath = path.join(rmPath, provider);
      if (!fs.statSync(providerPath).isDirectory()) continue;

      // Pattern A: flat stable/
      const stablePath = path.join(providerPath, "stable");
      if (fs.existsSync(stablePath) && fs.statSync(stablePath).isDirectory()) {
        specs.push(...findLatestStableSpecs(stablePath, service, provider, undefined));
      }

      // Pattern B: nested sub-service dirs
      for (const sub of fs.readdirSync(providerPath).sort()) {
        if (sub === "stable" || sub === "preview") continue;
        const subPath = path.join(providerPath, sub);
        if (!fs.statSync(subPath).isDirectory()) continue;

        const subStablePath = path.join(subPath, "stable");
        if (fs.existsSync(subStablePath) && fs.statSync(subStablePath).isDirectory()) {
          specs.push(...findLatestStableSpecs(subStablePath, service, provider, sub));
        }
      }
    }
  }

  return specs;
}

function findLatestStableSpecs(
  stablePath: string,
  service: string,
  provider: string,
  subService: string | undefined,
): SpecFile[] {
  const versions = fs
    .readdirSync(stablePath)
    .filter((v) => {
      const vPath = path.join(stablePath, v);
      return fs.statSync(vPath).isDirectory() && /^\d{4}-\d{2}-\d{2}/.test(v);
    })
    .sort(compareVersions);

  if (versions.length === 0) return [];

  const latestVersion = versions[versions.length - 1]!;
  const versionDir = path.join(stablePath, latestVersion);

  const jsonFiles = fs
    .readdirSync(versionDir)
    .filter((f) => f.endsWith(".json") && !f.startsWith("examples") && f !== "examples")
    .sort();

  const results: SpecFile[] = [];
  for (const jsonFile of jsonFiles) {
    const filePath = path.join(versionDir, jsonFile);
    if (filePath.includes("/examples/") || filePath.includes("\\examples\\")) {
      continue;
    }

    try {
      const content = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(content);
      if (!parsed.swagger && !parsed.openapi) continue;
      if (!parsed.paths || Object.keys(parsed.paths).length === 0) continue;
    } catch {
      continue;
    }

    results.push({
      service,
      provider,
      subService,
      apiVersion: latestVersion,
      filePath,
      versionDir,
    });
  }

  return results;
}

// ============================================================================
// Per-service model merging
// ============================================================================

const local = (id: string): string => id.split("#")[1] ?? id;

const sanitizeNsSegment = (s: string): string => {
  let out = s.toLowerCase().replace(/[^a-z0-9_]/g, "_");
  if (/^[0-9]/.test(out)) out = `_${out}`;
  return out || "_";
};

const pascal = (s: string): string => {
  const parts = s.split(/[^A-Za-z0-9]+/).filter(Boolean);
  let out = parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join("");
  if (out === "") out = "Shape";
  if (/^[0-9]/.test(out)) out = `_${out}`;
  return out;
};

/** All shape ids a shape definition references (non-prelude). */
function shapeRefs(def: any): string[] {
  const out: string[] = [];
  const push = (t: unknown) => {
    if (typeof t === "string" && !t.startsWith("smithy.api#")) out.push(t);
  };
  switch (def?.type) {
    case "structure":
    case "union":
    case "enum":
      for (const m of Object.values(def.members ?? {})) push((m as any).target);
      break;
    case "list":
      push(def.member?.target);
      break;
    case "map":
      push(def.key?.target);
      push(def.value?.target);
      break;
    case "operation":
      push(def.input?.target);
      push(def.output?.target);
      for (const e of def.errors ?? []) push((e as any).target);
      break;
  }
  return out;
}

/**
 * Structural (graph) equality of two shapes across two models: definitions
 * must match member-for-member and trait-for-trait, with references compared
 * by recursing into the referenced shapes (cycles assumed equal — standard
 * bisimulation). Used to deduplicate the common-types shapes every ARM spec
 * inlines (Resource, TrackedResource, Sku, systemData, …).
 */
function graphEq(
  shapesA: Record<string, any>,
  idA: string,
  shapesB: Record<string, any>,
  idB: string,
  visited: Set<string>,
): boolean {
  if (idA.startsWith("smithy.api#") || idB.startsWith("smithy.api#")) {
    return idA === idB;
  }
  const key = `${idA}|${idB}`;
  if (visited.has(key)) return true;
  visited.add(key);
  const a = shapesA[idA];
  const b = shapesB[idB];
  if (!a || !b || a.type !== b.type) return false;

  const eqJson = (x: unknown, y: unknown): boolean =>
    JSON.stringify(x ?? null) === JSON.stringify(y ?? null);
  if (!eqJson(a.traits, b.traits)) return false;

  const eqMemberBag = (ma: any, mb: any): boolean => {
    const ka = Object.keys(ma ?? {});
    const kb = Object.keys(mb ?? {});
    if (ka.length !== kb.length) return false;
    for (let i = 0; i < ka.length; i++) {
      if (ka[i] !== kb[i]) return false;
      const va = ma[ka[i]!];
      const vb = mb[kb[i]!];
      if (!eqJson(va.traits, vb.traits)) return false;
      if (!graphEq(shapesA, va.target, shapesB, vb.target, visited)) {
        return false;
      }
    }
    return true;
  };

  switch (a.type) {
    case "structure":
    case "union":
    case "enum":
      return eqMemberBag(a.members, b.members);
    case "list":
      return graphEq(shapesA, a.member?.target, shapesB, b.member?.target, visited);
    case "map":
      return (
        graphEq(shapesA, a.key?.target, shapesB, b.key?.target, visited) &&
        graphEq(shapesA, a.value?.target, shapesB, b.value?.target, visited)
      );
    default:
      return eqJson(a, b);
  }
}

interface MergedService {
  /** Merged shapes (operations included), keyed by shape id. */
  shapes: Record<string, any>;
  /** Local names already taken in the merged model. */
  taken: Set<string>;
  /** Operation shape ids, in merge order. */
  ops: string[];
  skippedOps: number;
  /**
   * Merged shape id → the upstream id it came from (its spec's
   * deferred-naming map), so the written model can carry upstream names.
   */
  upstream: Map<string, string>;
}

/**
 * Merge one converted spec model into the service's accumulated model.
 *
 * v0 collision semantics: an operation whose export symbols
 * (name/Request/Response) are already taken is skipped — first spec
 * processed wins. Non-operation shapes that collide are structurally
 * deduplicated when graph-equal, renamed (`Name_2`, `Name_3`, …) otherwise.
 */
function mergeSpecModel(
  merged: MergedService,
  model: SmithyModel,
  upstreamOf: ReadonlyMap<string, string>,
): void {
  const shapes = model.shapes;

  // The converter's per-spec service shape is dropped; the merged service
  // shape is rebuilt at write time.
  const specOps: string[] = [];
  for (const [id, def] of Object.entries(shapes)) {
    if (def.type === "service") delete shapes[id];
    else if (def.type === "operation") specOps.push(id);
  }

  // 1. Keep/skip operations (v0 seenSymbols semantics).
  const keptOps: string[] = [];
  for (const opId of specOps) {
    const opName = local(opId);
    const inputName = local(shapes[opId].input?.target ?? "");
    const outputName = local(shapes[opId].output?.target ?? "");
    if (
      merged.taken.has(opName) ||
      (inputName === `${opName}Request` && merged.taken.has(inputName)) ||
      (outputName === `${opName}Response` && merged.taken.has(outputName))
    ) {
      merged.skippedOps++;
      continue;
    }
    keptOps.push(opId);
  }
  if (keptOps.length === 0) return;

  // 2. Reachable shapes from the kept operations.
  const reachable = new Set<string>();
  const stack = [...keptOps];
  while (stack.length) {
    const id = stack.pop()!;
    if (reachable.has(id) || !shapes[id]) continue;
    reachable.add(id);
    for (const ref of shapeRefs(shapes[id])) stack.push(ref);
  }

  // 3. Resolve name collisions: graph-equal shapes dedupe onto the merged
  //    shape; different shapes rename with a numeric suffix. Operations are
  //    never renamed (their names were cleared in step 1).
  const renameMap = new Map<string, string>(); // spec id → merged id
  const specNames = new Set(Object.keys(shapes).map(local));
  for (const id of reachable) {
    const def = shapes[id];
    const name = local(id);
    if (def.type === "operation") continue;
    if (!merged.taken.has(name)) continue;
    const mergedId = id; // same namespace — ids align by local name
    if (merged.shapes[mergedId] && graphEq(shapes, id, merged.shapes, mergedId, new Set())) {
      renameMap.set(id, mergedId); // dedupe
      continue;
    }
    let n = 2;
    let fresh = `${name}_${n}`;
    while (merged.taken.has(fresh) || specNames.has(fresh)) {
      fresh = `${name}_${++n}`;
    }
    specNames.add(fresh);
    renameMap.set(id, `${id.split("#")[0]}#${fresh}`);
  }

  // 4. Copy reachable shapes into the merged model, rewriting refs.
  const mapRef = (t: string): string => renameMap.get(t) ?? t;
  const rewrite = (def: any): any => {
    const d = { ...def };
    if (d.members) {
      d.members = Object.fromEntries(
        Object.entries(d.members).map(([k, m]: [string, any]) => [
          k,
          { ...m, target: mapRef(m.target) },
        ]),
      );
    }
    if (d.member) d.member = { ...d.member, target: mapRef(d.member.target) };
    if (d.key) d.key = { ...d.key, target: mapRef(d.key.target) };
    if (d.value) d.value = { ...d.value, target: mapRef(d.value.target) };
    if (d.input) d.input = { target: mapRef(d.input.target) };
    if (d.output) d.output = { target: mapRef(d.output.target) };
    if (d.errors) {
      d.errors = d.errors.map((e: any) => ({ target: mapRef(e.target) }));
    }
    return d;
  };

  for (const id of reachable) {
    const target = renameMap.get(id) ?? id;
    if (merged.shapes[target]) continue; // deduplicated
    merged.shapes[target] = rewrite(shapes[id]);
    merged.upstream.set(target, upstreamOf.get(id) ?? id);
    merged.taken.add(local(target));
    if (shapes[id].type === "operation") merged.ops.push(target);
  }
}

/**
 * The merged model under upstream names, its final names deferred to
 * finalizeConvert (`metadata[RENAME_METADATA_KEY]`) so patches target the
 * names the specs give. A shape keeps its final name when its upstream one
 * is taken in the merged model. Throws unless renaming the result gives
 * back exactly `model`.
 */
function withUpstreamNames(model: SmithyModel, upstream: ReadonlyMap<string, string>): SmithyModel {
  const ids = Object.keys(model.shapes);
  const taken = new Set(ids.filter((id) => (upstream.get(id) ?? id) === id));
  const toUpstream = new Map<string, string>();
  for (const id of ids) {
    const want = upstream.get(id) ?? id;
    if (want === id) continue;
    if (taken.has(want)) {
      taken.add(id);
      continue;
    }
    taken.add(want);
    toUpstream.set(id, want);
  }
  const out: SmithyModel = structuredClone(model);
  renameShapes(out, toUpstream);
  const deferred = Object.fromEntries([...toUpstream].map(([to, from]) => [from, to]));
  if (toUpstream.size > 0) out.metadata = { ...out.metadata, [RENAME_METADATA_KEY]: deferred };
  const check = structuredClone(out);
  delete check.metadata[RENAME_METADATA_KEY];
  renameShapes(check, new Map(Object.entries(deferred)));
  if (JSON.stringify(check) !== JSON.stringify(model)) {
    throw new Error("upstream-named merged model does not rename back to the merged model");
  }
  return out;
}

/**
 * Fold the converter's `com.distilled.openapi#apiVersion` operation trait
 * into the op's `smithy.api#http` trait, so the generated `T.Http({...})`
 * carries `apiVersion` and the protocol can inject `?api-version=`.
 */
function foldApiVersion(model: SmithyModel): void {
  for (const def of Object.values(model.shapes)) {
    if (def.type !== "operation") continue;
    const apiVersion = def.traits?.[API_VERSION_TRAIT];
    const http = def.traits?.["smithy.api#http"];
    if (typeof apiVersion === "string" && http && !http.apiVersion) {
      http.apiVersion = apiVersion;
    }
  }
}

// ============================================================================
// Spec loading (shared by the ARM and data-plane passes)
// ============================================================================

/**
 * Read one swagger document and make it self-contained: sibling
 * definitions merged, external `$ref`s inlined, dangling `#/definitions/`
 * refs transplanted from the file cache.
 */
function loadResolvedSpec(filePath: string, versionDir: string): any {
  const specContent = fs.readFileSync(filePath, "utf-8");
  const specObj = JSON.parse(specContent);
  const specDir = path.dirname(filePath);

  // Merge sibling definitions
  mergeSiblingDefinitions(specObj, versionDir);

  // Resolve external $refs, transplanting missing definitions from
  // common-types
  const ctx: ExternalRefContext = {
    mainSpec: specObj,
    transplanting: new Set(),
  };
  const resolved = resolveExternalRefs(specObj, specDir, new Set(), ctx);

  // Copy transplanted definitions into the resolved spec
  // (resolveExternalRefs returns a new object tree, but
  // transplantMissingDefinitions adds definitions to ctx.mainSpec which
  // is the original specObj)
  if (specObj.definitions) {
    if (!resolved.definitions) resolved.definitions = {};
    for (const [name, def] of Object.entries(specObj.definitions)) {
      if (!resolved.definitions[name]) {
        resolved.definitions[name] = JSON.parse(JSON.stringify(def));
      }
    }
  }
  if (specObj.parameters) {
    if (!resolved.parameters) resolved.parameters = {};
    for (const [name, param] of Object.entries(specObj.parameters)) {
      if (!resolved.parameters[name]) {
        resolved.parameters[name] = JSON.parse(JSON.stringify(param));
      }
    }
  }

  // Second pass: find any remaining dangling #/definitions/ refs that
  // weren't caught during the first resolve pass
  collectMissingDefinitions(resolved, specDir, resolved);
  return resolved;
}

/** Apply the converter's deferred names; returns final id → upstream id. */
function applyDeferredNames(model: SmithyModel): Map<string, string> {
  const rename: Record<string, string> = model.metadata?.[RENAME_METADATA_KEY] ?? {};
  delete model.metadata?.[RENAME_METADATA_KEY];
  renameShapes(model, new Map(Object.entries(rename)));
  return new Map(Object.entries(rename).map(([from, to]) => [to, from]));
}

const newMergedService = (): MergedService => ({
  shapes: {},
  taken: new Set(),
  ops: [],
  skippedOps: 0,
  upstream: new Map(),
});

/** Add the merged service shape and write `.generated-specs/<file>.json`. */
function writeMergedModel(
  file: string,
  ns: string,
  serviceName: string,
  merged: MergedService,
  traits: Record<string, unknown>,
): void {
  const serviceId = `${ns}#${
    merged.taken.has(serviceName) ? `${serviceName}Service` : serviceName
  }`;
  merged.shapes[serviceId] = {
    type: "service",
    version: "1.0",
    operations: merged.ops.map((target) => ({ target })),
    traits,
  };

  const model: SmithyModel = {
    smithy: "2.0",
    metadata: {
      suppressions: [
        { id: "HttpUriConflict", namespace: "*" },
        { id: "HttpMethodSemantics", namespace: "*" },
        { id: "UnreferencedShape", namespace: "*" },
      ],
    },
    shapes: merged.shapes,
  };
  const upstreamModel = withUpstreamNames(model, merged.upstream);

  writeModel(path.join(outDir, `${file}.json`), upstreamModel);
}

// ============================================================================
// Data planes
// ============================================================================
//
// specification/<service>/data-plane/<group>/[<sub>/]stable/<version>/*.json
//
// Every in-scope group becomes its own module `<service>-<group-kebab>`
// (`keyvault-secrets`, `storage-blob`, `appconfiguration-data`). ARM module
// names never contain `-`, so the two can never collide (checked anyway).
//
// Data-plane swagger differs from ARM in where a request goes, not in how
// its body looks. So the spec is rewritten into something the shared
// converter handles (prepareDataPlaneSpec), and the converted model is
// stamped with what the protocol needs (stampDataPlaneModel):
//
//   host      `x-ms-parameterized-host` (`{vaultBaseUrl}`,
//             `https://{dpsName}.azure-devices-provisioning.net`, …), OpenAPI 3
//             `servers[0]`, or a fixed `host` + `basePath`. Its parameters
//             become input members carrying HOST_LABEL_TRAIT (not path
//             labels, query, or body); the template goes on the operation's
//             `smithy.api#http` trait as `host`, and the protocol builds the
//             base URL from it instead of `apiBaseUrl`. A host parameter
//             with exactly one allowed value is baked into the template; one
//             with a spec default is optional and falls back to it.
//   version   `api-version` (query) or Storage's `x-ms-version` (header) is
//             dropped from the input and pinned per operation as
//             `apiVersion` (+ `apiVersionHeader` for the header form), so
//             callers never pass it.
//   constants required query/header parameters with a single allowed value
//             (Storage's `comp=list`, `restype=container`) become the
//             operation's constant `query` / `headers`. The query string of
//             an `x-ms-paths` key (`/{containerName}?restype=container&comp=list`,
//             `?_overload=…`) only makes the key unique and is never sent.
//   audience  the AAD scope the spec's security scheme declares, recorded
//             as the service-level AUDIENCE_TRAIT; generate.ts folds it into
//             every operation's http trait and the protocol asks Credentials
//             for a token for it. A spec that declares none, or the wrong
//             one, gets its audience from a patch
//             (`patches/<module>/audience.json`), as do a token exchange
//             (`#tokenExchange`), an unauthenticated service (`#anonymous`),
//             per-host audiences (`#audienceByHost`) and constant headers
//             (`#headers`).

/** Member trait: the member fills a `{placeholder}` of the operation's host template. */
const HOST_LABEL_TRAIT = "com.azure.protocols#hostLabel";
/** Service trait: the AAD token audience (`https://vault.azure.net/.default`). */
const AUDIENCE_TRAIT = "com.azure.protocols#audience";
/** Service trait: the host template and its parameters. */
const HOST_TRAIT = "com.azure.protocols#host";

/**
 * Data planes name their version directories freely: dates (`2025-07-01`,
 * `2021-05`, `2024-07-01.20.0`), dotted numbers (`7.6`, `1.0`) and
 * `v`-prefixed ones (`v3.2`, `v1`). A group that moved from numbered to
 * dated versions (Key Vault `7.6` → `2025-07-01`) is newest on its dates, so
 * a dated version ranks above any other; within a kind, versions compare
 * numerically. Mirrors `compareDataPlaneVersions` in the spec mirror's
 * `.meta/fetch-specs.ts` — keep the two in step.
 */
const DATED_VERSION = /^\d{4}-\d{2}/;
const compareDataPlaneVersions = (a: string, b: string): number => {
  const rank = (v: string) => (DATED_VERSION.test(v) ? 1 : 0);
  return rank(a) - rank(b) || a.localeCompare(b, "en", { numeric: true });
};

/**
 * Groups out of scope (`<service>/*` for a whole service), with the reason
 * the Azure factory audit gives.
 */
const DATA_PLANE_SKIP: Readonly<Record<string, string>> = {
  "contosowidgetmanager/*": "TypeSpec sample service",
  "widget/*": "TypeSpec sample service",
  "datalake-analytics/*": "Data Lake Analytics is retired",
  "datalake-store/*": "Data Lake Storage Gen1 is retired",
  "timeseriesinsights/*": "Time Series Insights is retired",
  "keyvault/Legacy": "superseded by the per-area Key Vault groups",
  "keyvault/SecretsStorage": "internal Key Vault storage API",
  "imds/*": "VM-local Instance Metadata Service, not a cloud endpoint",
  "machinelearningservices/*": "out of scope per the audit",
  "purview/*": "out of scope per the audit",
  "marketplacecatalog/*": "out of scope per the audit",
  "servicefabric/*": "cluster-local Service Fabric API",
  "cognitiveservices/LUISAuthoring": "LUIS is retired",
  "cognitiveservices/LUISRuntime": "LUIS is retired",
  "cognitiveservices/Personalizer": "Personalizer is retired",
  "cognitiveservices/AnomalyDetector": "Anomaly Detector is retired",
  "cognitiveservices/MetricsAdvisor": "Metrics Advisor is retired",
  "cognitiveservices/ContentModerator": "Content Moderator is retired",
  "cognitiveservices/FormRecognizer": "retired; superseded by ai/DocumentIntelligence",
  "cognitiveservices/ComputerVision": "retired; superseded by ai/ImageAnalysis",
  "cognitiveservices/TextAnalytics": "retired; superseded by LanguageAnalyzeText",
  "cognitiveservices/Face": "retired; superseded by ai/Face",
};

/** Module names that the generic rule would not produce. */
const DATA_PLANE_MODULE_NAMES: Readonly<Record<string, string>> = {
  "containerregistry/Registry": "containerregistry-data",
  "cosmos-db/Tables": "cosmos-tables",
  "loadtestservice/loadtesting": "loadtesting-data",
  "monitor/Ingestion": "monitor-ingestion",
  "storage/DataLakeStorage": "storage-datalake",
};

/** Module-name prefix for services whose directory name reads badly. */
const DATA_PLANE_SERVICE_PREFIX: Readonly<Record<string, string>> = {
  "cosmos-db": "cosmos",
  deviceprovisioningservices: "deviceprovisioning",
  loadtestservice: "loadtesting",
};

/** `secret-name` → `secretName`, `Endpoint` → `endpoint`. */
const camelIdent = (s: string): string => {
  const parts = s.split(/[^A-Za-z0-9]+/).filter(Boolean);
  if (parts.length === 0) return "_";
  let out = parts
    .map((p, i) =>
      i === 0 ? p.charAt(0).toLowerCase() + p.slice(1) : p.charAt(0).toUpperCase() + p.slice(1),
    )
    .join("");
  if (/^[0-9]/.test(out)) out = `_${out}`;
  return out;
};

/** `LanguageAnalyzeText` → `[language, analyze, text]`, `OpenAIInference` → `[openai, inference]`. */
const words = (s: string): string[] =>
  s
    .replace(/OpenAI/g, "Openai")
    .replace(/IoT/g, "Iot")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((w) => w.toLowerCase());

/**
 * `<service>/<group>` → module name. An explicit entry wins. Otherwise the
 * group's last path segment, without a `Microsoft.` prefix and without the
 * service name at either end (`EventGridNamespace` → `namespace`,
 * `BlobStorage` → `blob`), kebab-cased; a group that is just the service
 * (`DevCenter` under `devcenter`) becomes `data`.
 */
function dataPlaneModuleName(service: string, group: string): string {
  const explicit = DATA_PLANE_MODULE_NAMES[`${service}/${group}`];
  if (explicit) return explicit;
  const prefix = DATA_PLANE_SERVICE_PREFIX[service] ?? service;
  const svc = service.toLowerCase().replace(/[^a-z0-9]/g, "");
  let w = words(
    group
      .split("/")
      .at(-1)!
      .replace(/^Microsoft\./i, ""),
  );
  for (let i = 1; i <= w.length; i++) {
    if (w.slice(0, i).join("") === svc || w.slice(0, i).join("") === `${svc}services`) {
      w = w.slice(i);
      break;
    }
  }
  for (let i = 1; i <= w.length; i++) {
    if (w.slice(-i).join("") === svc) {
      w = w.slice(0, -i);
      break;
    }
  }
  return `${prefix}-${w.length === 0 ? "data" : w.join("-")}`;
}

interface DataPlaneGroup {
  service: string;
  /** Path below `data-plane/`, e.g. `Secrets` or `duiothub/Microsoft.DeviceUpdate`. */
  group: string;
  module: string;
  apiVersion: string;
  versionDir: string;
  files: string[];
}

interface DataPlaneSkip {
  label: string;
  reason: string;
}

const isDir = (p: string): boolean => fs.existsSync(p) && fs.statSync(p).isDirectory();

const hasOperations = (filePath: string): boolean => {
  try {
    const parsed = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    if (!parsed.swagger && !parsed.openapi) return false;
    return (
      Object.keys(parsed.paths ?? {}).length > 0 ||
      Object.keys(parsed["x-ms-paths"] ?? {}).length > 0
    );
  } catch {
    return false;
  }
};

function discoverDataPlanes(): { groups: DataPlaneGroup[]; skipped: DataPlaneSkip[] } {
  const groups: DataPlaneGroup[] = [];
  const skipped: DataPlaneSkip[] = [];
  for (const service of fs.readdirSync(specsRoot).sort()) {
    if (service === "common-types") continue;
    const dpPath = path.join(specsRoot, service, "data-plane");
    if (!isDir(dpPath)) continue;

    // <group>/stable or <group>/<sub>/stable
    const candidates: string[] = [];
    for (const g of fs.readdirSync(dpPath).sort()) {
      const gPath = path.join(dpPath, g);
      if (!isDir(gPath)) continue;
      if (isDir(path.join(gPath, "stable"))) candidates.push(g);
      for (const sub of fs.readdirSync(gPath).sort()) {
        if (sub === "stable" || sub === "preview") continue;
        if (isDir(path.join(gPath, sub, "stable"))) candidates.push(`${g}/${sub}`);
      }
    }

    for (const group of candidates) {
      const label = `${service}/${group}`;
      const reason = DATA_PLANE_SKIP[label] ?? DATA_PLANE_SKIP[`${service}/*`];
      if (reason) {
        skipped.push({ label, reason });
        continue;
      }
      const stablePath = path.join(dpPath, group, "stable");
      const versions = fs
        .readdirSync(stablePath)
        .filter((v) => isDir(path.join(stablePath, v)) && !v.includes("preview"))
        .sort(compareDataPlaneVersions);
      if (versions.length === 0) {
        skipped.push({ label, reason: "no stable api-version" });
        continue;
      }
      const apiVersion = versions.at(-1)!;
      const versionDir = path.join(stablePath, apiVersion);
      let files = fs
        .readdirSync(versionDir)
        .filter((f) => f.endsWith(".json") && !f.startsWith("examples"))
        .sort()
        .map((f) => path.join(versionDir, f))
        .filter(hasOperations);
      // Storage ships the hand-maintained swagger next to a TypeSpec export
      // of the same API (`blob.json` + `generated_blob.json`). Keep the
      // hand-maintained one: it carries the XML metadata the SDKs use.
      if (files.some((f) => !path.basename(f).startsWith("generated_"))) {
        files = files.filter((f) => !path.basename(f).startsWith("generated_"));
      }
      if (files.length === 0) {
        skipped.push({ label, reason: `no operations in ${apiVersion}` });
        continue;
      }
      groups.push({
        service,
        group,
        module: dataPlaneModuleName(service, group),
        apiVersion,
        versionDir,
        files,
      });
    }
  }
  return { groups, skipped };
}

/** Per-operation facts the rewritten spec cannot carry through the converter. */
interface DataPlaneOp {
  apiVersion?: string;
  apiVersionHeader?: string;
  query: Record<string, string>;
  headers: Record<string, string>;
  /** Path labels marked `x-ms-skip-url-encoding` (Key Vault's RBAC `{scope}`): kept greedy. */
  greedy: string[];
  /** Storage only: bodies, header maps and response headers (see stampStorageOp). */
  storage?: StorageOp;
}

/**
 * What a Storage operation sends and returns beyond JSON members, read from
 * the swagger: XML bodies (`xml: { name, wrapped, attribute }`), raw bytes
 * (`format: file`), `x-ms-meta-*` header collections, and response headers.
 */
interface StorageOp {
  /** Request body: XML under `root` (described by `schema`), or raw bytes. */
  body?: { kind: "xml"; root: string; schema: any } | { kind: "binary" };
  /** Success body: XML described by `schema`, or raw bytes. JSON bodies stay with the converter. */
  response?: { kind: "xml"; schema: any } | { kind: "binary" };
  /** Request headers sent as one header per map key (`x-ms-meta` → `x-ms-meta-<key>`). */
  prefixParams: StorageHeader[];
  /** Headers the success responses declare, first declaration wins. */
  responseHeaders: StorageHeader[];
}

interface StorageHeader {
  /** Wire name as the spec declares it (`x-ms-meta`, `Content-Length`). */
  name: string;
  /** Collections only: the per-key header prefix (`x-ms-meta-`). */
  prefix?: string;
  /** Collections only: the member name (`metadata`). */
  member?: string;
  type: "string" | "integer" | "boolean";
  description?: string;
}

/** Data planes that speak Storage's XML / header / raw-bytes REST dialect. */
const STORAGE_DATA_PLANES: ReadonlySet<string> = new Set([
  "storage-blob",
  "storage-queue",
  "storage-file",
  "storage-datalake",
]);

/** The schema is raw bytes (`{ type: object, format: file }`, `format: binary`). */
const isFileSchema = (s: any): boolean =>
  s !== null && typeof s === "object" && (s.format === "file" || s.format === "binary");

/** The header declares a key → value collection under a prefix (`x-ms-meta-*`). */
const headerCollection = (p: any): { prefix: string; member: string } | undefined => {
  const prefix =
    typeof p?.["x-ms-header-collection-prefix"] === "string"
      ? p["x-ms-header-collection-prefix"]
      : // Queue_Create's `x-ms-meta` omits the extension; the wire format is the same.
        p?.name === "x-ms-meta"
        ? "x-ms-meta-"
        : undefined;
  if (prefix === undefined) return undefined;
  const clientName = typeof p["x-ms-client-name"] === "string" ? p["x-ms-client-name"] : undefined;
  return { prefix, member: camelIdent(clientName ?? prefix.replace(/-+$/, "")) };
};

const headerType = (s: any): StorageHeader["type"] =>
  s?.type === "integer" ? "integer" : s?.type === "boolean" ? "boolean" : "string";

/** Read a Storage operation's body, response and header facts from its swagger. */
function storageOpFacts(
  deref: (x: any) => any,
  doc: any,
  op: any,
  params: Iterable<any>,
): StorageOp {
  const consumes: string[] = op.consumes ?? doc.consumes ?? [];
  const produces: string[] = op.produces ?? doc.produces ?? [];
  const facts: StorageOp = { prefixParams: [], responseHeaders: [] };
  for (const p of params) {
    if (p.in === "header") {
      const collection = headerCollection(p);
      if (collection) facts.prefixParams.push({ name: p.name, type: "string", ...collection });
    }
    if (p.in !== "body") continue;
    const schema = deref(p.schema);
    if (isFileSchema(schema)) {
      facts.body = { kind: "binary" };
    } else if (consumes.some((c) => c.includes("xml")) && schema && typeof schema === "object") {
      const refName =
        typeof p.schema?.$ref === "string" ? p.schema.$ref.split("/").pop() : undefined;
      facts.body = { kind: "xml", root: schema.xml?.name ?? refName ?? p.name, schema: p.schema };
    }
  }
  const seen = new Set<string>();
  for (const code of Object.keys(op.responses ?? {}).sort()) {
    if (!/^2\d\d$/.test(code)) continue;
    const resp = deref(op.responses[code]);
    if (!resp || typeof resp !== "object") continue;
    if (facts.response === undefined && resp.schema !== undefined) {
      const schema = deref(resp.schema);
      if (isFileSchema(schema)) facts.response = { kind: "binary" };
      else if (produces.some((c) => c.includes("xml"))) {
        facts.response = { kind: "xml", schema: resp.schema };
      }
    }
    for (const [name, raw] of Object.entries<any>(resp.headers ?? {})) {
      const lower = name.toLowerCase();
      if (seen.has(lower)) continue;
      seen.add(lower);
      const header = deref(raw);
      facts.responseHeaders.push({
        name,
        type: headerType(header),
        ...(typeof header?.description === "string" ? { description: header.description } : {}),
        ...headerCollection({ ...header, name }),
      });
    }
  }
  return facts;
}

interface HostMember {
  ident: string;
  /** `x-ms-skip-url-encoding`: the value is a URL inserted verbatim. */
  raw: boolean;
  default?: string;
  description?: string;
}

interface DataPlaneHost {
  /** Template with member placeholders: `{vaultBaseUrl}`, `https://{dpsName}.x.net`. */
  template: string;
  members: HostMember[];
}

const OP_MARKER = "__dpop_";
const HTTP_METHOD_KEYS = ["get", "put", "post", "patch", "delete", "head"] as const;

/** The single value a parameter allows (one-value `enum`), if any. */
const soleValue = (p: any): string | undefined => {
  const values = Array.isArray(p?.enum) ? p.enum : p?.schema?.enum;
  return Array.isArray(values) && values.length === 1 && typeof values[0] === "string"
    ? values[0]
    : undefined;
};

/**
 * Rewrite a resolved data-plane spec so the shared converter produces the
 * right members, and collect what it cannot carry (see the section comment).
 *
 * Every operation gets its own path key: a marker label `/{__dpop_<n>}`
 * (stripped again in stampDataPlaneModel, it matches the converted operation
 * back to its facts), one label per host member, then the operation's path
 * with its labels camel-cased (`{secret-name}` → `{secretName}`).
 */
function prepareDataPlaneSpec(
  doc: any,
  dirVersion: string,
  storage = false,
): { host: DataPlaneHost; ops: DataPlaneOp[] } {
  const deref = (x: any): any => {
    let cur = x;
    for (let i = 0; i < 10 && typeof cur?.$ref === "string" && cur.$ref.startsWith("#/"); i++) {
      cur = resolvePointer(doc, cur.$ref);
    }
    return cur;
  };

  // ---- host ----
  let template: string;
  const hostParams: any[] = [];
  let fromServers = false;
  const ph = doc["x-ms-parameterized-host"];
  if (typeof doc.openapi === "string" && typeof doc.servers?.[0]?.url === "string") {
    // OpenAPI 3 server variables must carry a default; it is a placeholder
    // (`your-resource-name.openai.azure.com`), not a usable value.
    template = doc.servers[0].url;
    fromServers = true;
    for (const [name, v] of Object.entries<any>(doc.servers[0].variables ?? {})) {
      hostParams.push({ name, type: "string", enum: v?.enum, description: v?.description });
    }
  } else if (ph && typeof ph.hostTemplate === "string") {
    template = ph.hostTemplate;
    if (ph.useSchemePrefix !== false && !/^[a-z]+:\/\//i.test(template)) {
      template = `https://${template}`;
    }
    for (const raw of ph.parameters ?? []) {
      const p = deref(raw);
      if (p && typeof p.name === "string") hostParams.push(p);
    }
  } else if (typeof doc.host === "string" && doc.host.includes(".")) {
    template = `https://${doc.host}`;
  } else {
    // No usable host (TypeSpec exports without one, a `digitaltwins-hostname`
    // placeholder): the caller passes the endpoint URL.
    template = "{endpoint}";
    hostParams.push({
      name: "endpoint",
      type: "string",
      "x-ms-skip-url-encoding": true,
      description: "The service endpoint URL.",
    });
  }
  if (!fromServers && typeof doc.basePath === "string" && doc.basePath !== "/") {
    template += doc.basePath.replace(/\/+$/, "");
  }
  const members: HostMember[] = [];
  for (const p of hostParams) {
    const placeholder = `{${p.name}}`;
    if (!template.includes(placeholder)) continue;
    const fixed = soleValue(p);
    if (fixed !== undefined) {
      template = template.split(placeholder).join(fixed);
      continue;
    }
    const ident = camelIdent(p.name);
    template = template.split(placeholder).join(`{${ident}}`);
    if (members.some((m) => m.ident === ident)) continue;
    members.push({
      ident,
      raw: p["x-ms-skip-url-encoding"] === true,
      default: !fromServers && typeof p.default === "string" ? p.default : undefined,
      description: typeof p.description === "string" ? p.description : undefined,
    });
  }
  template = template.replace(/\/+$/, "");

  // ---- operations ----
  const infoVersion = typeof doc.info?.version === "string" ? doc.info.version : undefined;
  const all: Array<[string, any]> = [
    ...Object.entries<any>(doc.paths ?? {}),
    ...Object.entries<any>(doc["x-ms-paths"] ?? {}),
  ];
  const ops: DataPlaneOp[] = [];
  const paths: Record<string, any> = {};
  const hostSegments = members.map((m) => `/{${m.ident}}`).join("");
  const hostLabelParams = members.map((m) => ({
    name: m.ident,
    in: "path",
    required: true,
    type: "string",
    ...(m.description ? { description: m.description } : {}),
  }));

  for (const [rawKey, item] of all) {
    if (!item || typeof item !== "object") continue;
    let pathPart = rawKey.split("?")[0]!;
    if (!pathPart.startsWith("/")) pathPart = `/${pathPart}`;
    const pathLevel = (Array.isArray(item.parameters) ? item.parameters : []).map(deref);

    for (const method of HTTP_METHOD_KEYS) {
      const op = item[method];
      if (!op || typeof op !== "object") continue;

      // Path-level parameters first; an op-level one with the same
      // (in, name) overrides it.
      const byKey = new Map<string, any>();
      for (const p of [
        ...pathLevel,
        ...(Array.isArray(op.parameters) ? op.parameters : []).map(deref),
      ]) {
        if (p && typeof p.name === "string") byKey.set(`${p.in}${p.name}`, p);
      }

      const facts: DataPlaneOp = { query: {}, headers: {}, greedy: [] };
      if (storage) facts.storage = storageOpFacts(deref, doc, op, byKey.values());
      const kept: any[] = [];
      const labelRenames = new Map<string, string>();
      for (const p of byKey.values()) {
        if (p.in === "query" && p.name === "api-version") {
          facts.apiVersion = soleValue(p) ?? p.default ?? infoVersion ?? dirVersion;
          continue;
        }
        if (p.in === "header" && p.name.toLowerCase() === "x-ms-version") {
          facts.apiVersion = soleValue(p) ?? p.default ?? infoVersion ?? dirVersion;
          facts.apiVersionHeader = p.name;
          continue;
        }
        if ((p.in === "query" || p.in === "header") && p.required === true) {
          const fixed = soleValue(p);
          if (fixed !== undefined) {
            if (p.in === "query") facts.query[p.name] = fixed;
            else facts.headers[p.name] = fixed;
            continue;
          }
        }
        // The protocol and the HTTP client own authentication, content
        // negotiation and framing.
        if (p.in === "header" && /^(authorization|accept|content-length)$/i.test(p.name)) {
          continue;
        }
        if (p.in === "path") {
          const ident = camelIdent(p.name);
          labelRenames.set(p.name, ident);
          if (p["x-ms-skip-url-encoding"] === true) facts.greedy.push(ident);
          kept.push({ ...p, name: ident });
          continue;
        }
        // A raw-bytes body converts as a string payload; stampStorageOp
        // retargets it to bytes.
        if (p.in === "body" && facts.storage?.body?.kind === "binary") {
          kept.push({ ...p, schema: { type: "string" } });
          continue;
        }
        kept.push(p);
      }

      const opPath = pathPart.replace(
        /\{([^}]+)\}/g,
        (_m, name: string) => `{${labelRenames.get(name) ?? camelIdent(name)}}`,
      );
      const marker = `${OP_MARKER}${ops.length}`;
      ops.push(facts);
      paths[`/{${marker}}${hostSegments}${opPath}`] = {
        [method]: {
          ...op,
          parameters: [
            { name: marker, in: "path", required: true, type: "string" },
            ...hostLabelParams,
            ...kept,
          ],
        },
      };
    }
  }
  doc.paths = paths;
  delete doc["x-ms-paths"];
  delete doc["x-ms-parameterized-host"];
  return { host: { template, members }, ops };
}

/**
 * Strip the marker and host labels back out of every converted operation,
 * turn the host labels into HOST_LABEL_TRAIT members, and stamp the
 * operation's http trait with the host, api-version and constants.
 */
function stampDataPlaneModel(
  model: SmithyModel,
  host: DataPlaneHost,
  ops: DataPlaneOp[],
  doc?: any,
): void {
  const markerRe = new RegExp(`^/\\{${OP_MARKER}(\\d+)\\}`);
  const raw = host.members.filter((hm) => hm.raw).map((hm) => hm.ident);
  const defaults = Object.fromEntries(
    host.members.flatMap((hm) => (hm.default !== undefined ? [[hm.ident, hm.default]] : [])),
  );
  for (const [opId, def] of Object.entries<any>(model.shapes)) {
    if (def.type !== "operation") continue;
    const http = def.traits?.["smithy.api#http"];
    const m = typeof http?.uri === "string" ? markerRe.exec(http.uri) : null;
    if (!m) throw new Error(`data-plane operation without its marker: ${http?.uri}`);
    const facts = ops[Number(m[1])]!;
    let uri: string = http.uri.slice(m[0].length);
    for (const hm of host.members) {
      const seg = `/{${hm.ident}}`;
      if (!uri.startsWith(seg)) throw new Error(`host label ${hm.ident} missing from ${http.uri}`);
      uri = uri.slice(seg.length);
    }
    for (const label of facts.greedy) uri = uri.split(`{${label}}`).join(`{${label}+}`);
    http.uri = uri === "" ? "/" : uri;
    http.host = host.template;
    if (raw.length > 0) http.hostRaw = raw;
    if (Object.keys(defaults).length > 0) http.hostDefaults = defaults;
    if (facts.apiVersion !== undefined) http.apiVersion = facts.apiVersion;
    if (facts.apiVersionHeader !== undefined) http.apiVersionHeader = facts.apiVersionHeader;
    if (Object.keys(facts.query).length > 0) http.query = facts.query;
    if (Object.keys(facts.headers).length > 0) http.headers = facts.headers;

    const input = model.shapes[def.input?.target];
    if (!input?.members) throw new Error(`data-plane operation without an input: ${http.uri}`);
    delete input.members[`${OP_MARKER}${m[1]}`];
    for (const hm of host.members) {
      const member = input.members[hm.ident];
      if (!member) continue;
      const traits = { ...member.traits };
      delete traits["smithy.api#httpLabel"];
      if (hm.default !== undefined) delete traits["smithy.api#required"];
      traits[HOST_LABEL_TRAIT] = {};
      member.traits = traits;
    }
    if (facts.storage !== undefined && doc !== undefined) {
      stampStorageOp(model, doc, opId, def, http, facts.storage);
    }
  }
}

// ---- Storage (XML bodies, header maps, raw bytes) ----

/** Member trait: the member is the text content of its parent XML element. */
const XML_TEXT_TRAIT = "com.azure.protocols#xmlText";
/** Member trait: the element name of each item of a wrapped XML list. */
const XML_ITEM_NAME_TRAIT = "com.azure.protocols#xmlItemName";
const HTTP_PREFIX_HEADERS_TRAIT = "smithy.api#httpPrefixHeaders";
/** The string → string map every header collection targets. */
const HEADER_MAP_SHAPE = "HeaderCollection";

const PRELUDE_FOR_HEADER: Record<StorageHeader["type"], string> = {
  string: "smithy.api#String",
  integer: "smithy.api#Integer",
  boolean: "smithy.api#Boolean",
};

/**
 * Stamp one Storage operation: raw-bytes bodies become `smithy.api#Blob`
 * payloads, header collections become `httpPrefixHeaders` string maps, the
 * success response gets its declared headers (and a bytes `body` payload
 * for downloads), and XML bodies get the swagger's `xml` metadata as
 * `xmlName` / `xmlAttribute` / `xmlFlattened` / xmlText / xmlItemName
 * member traits (the request's root element goes on the http trait).
 */
function stampStorageOp(
  model: SmithyModel,
  doc: any,
  opId: string,
  op: any,
  http: any,
  facts: StorageOp,
): void {
  const [ns, opLocal] = opId.split("#") as [string, string];
  http.storage = true;
  const deref = (x: any): any => {
    let cur = x;
    for (let i = 0; i < 10 && typeof cur?.$ref === "string" && cur.$ref.startsWith("#/"); i++) {
      cur = resolvePointer(doc, cur.$ref);
    }
    return cur;
  };
  const headerMap = (): string => {
    const id = `${ns}#${HEADER_MAP_SHAPE}`;
    model.shapes[id] ??= {
      type: "map",
      key: { target: "smithy.api#String" },
      value: { target: "smithy.api#String" },
    };
    return id;
  };

  // ---- input ----
  const input = model.shapes[op.input?.target];
  const inMembers: Record<string, any> = input?.members ?? {};
  for (const p of facts.prefixParams) {
    const entry = Object.entries<any>(inMembers).find(
      ([, m]) => m.traits?.["smithy.api#httpHeader"]?.toLowerCase() === p.name.toLowerCase(),
    );
    if (!entry) continue;
    const [name, m] = entry;
    const traits = { ...m.traits };
    delete traits["smithy.api#httpHeader"];
    traits[HTTP_PREFIX_HEADERS_TRAIT] = p.prefix;
    delete inMembers[name];
    inMembers[p.member ?? name] = { target: headerMap(), traits };
  }
  if (facts.body?.kind === "binary") {
    const payload = Object.values<any>(inMembers).find(
      (m) => m.traits?.["smithy.api#httpPayload"] !== undefined,
    );
    if (payload) payload.target = "smithy.api#Blob";
  } else if (facts.body?.kind === "xml") {
    http.xmlRoot = facts.body.root;
    const schema = deref(facts.body.schema);
    const payload = Object.entries<any>(inMembers).find(
      ([, m]) => m.traits?.["smithy.api#httpPayload"] !== undefined,
    );
    if (payload) {
      // A bare list body (`<SignedIdentifiers><SignedIdentifier/>…`).
      stampXmlMember(model, deref, payload[1], facts.body.schema, facts.body.root, new Set());
    } else if (input) {
      stampXmlStruct(model, deref, schema, input, new Set());
    }
  }

  // ---- output ----
  const outId: string | undefined = op.output?.target;
  let output = outId !== undefined ? model.shapes[outId] : undefined;
  const isRawRoot = (shape: any) =>
    Object.values<any>(shape?.members ?? {}).some(
      (m) => m.traits?.["com.distilled.openapi#rawResponse"] !== undefined,
    );
  if (facts.response?.kind === "xml" && output !== undefined) {
    const schema = deref(facts.response.schema);
    if (isRawRoot(output)) {
      // A bare list response (`<QueueMessagesList><QueueMessage/>…`).
      const [body] = Object.values<any>(output.members);
      stampXmlMember(model, deref, body, facts.response.schema, undefined, new Set());
    } else if (output.type === "structure") {
      stampXmlStruct(model, deref, schema, output, new Set());
    }
  }
  const binary = facts.response?.kind === "binary";
  if (facts.responseHeaders.length === 0 && !binary) return;
  // A bare list response has no object to carry headers.
  if (!binary && output !== undefined && isRawRoot(output)) return;

  // The operation gets its own output structure, so headers never leak
  // into another operation sharing a named component.
  const ownName = `${ns}#${opLocal}Response`;
  let members: Record<string, any>;
  if (binary) {
    members = {
      body: {
        target: "smithy.api#Blob",
        traits: { "smithy.api#httpPayload": {}, "smithy.api#required": {} },
      },
    };
  } else if (output !== undefined && output.type === "structure") {
    members = { ...output.members };
  } else {
    members = {};
  }
  const taken = new Set(Object.keys(members));
  const wired = new Set(
    Object.values<any>(members)
      .map((m) => m.traits?.["smithy.api#httpHeader"]?.toLowerCase())
      .filter(Boolean),
  );
  for (const h of facts.responseHeaders) {
    if (wired.has(h.name.toLowerCase())) continue;
    let name = h.member ?? camelIdent(h.name);
    if (taken.has(name)) name = `${name}Header`;
    if (taken.has(name)) continue;
    taken.add(name);
    members[name] =
      h.prefix !== undefined
        ? {
            target: headerMap(),
            traits: {
              [HTTP_PREFIX_HEADERS_TRAIT]: h.prefix,
              ...(h.description ? { "smithy.api#documentation": h.description } : {}),
            },
          }
        : {
            target: PRELUDE_FOR_HEADER[h.type],
            traits: {
              "smithy.api#httpHeader": h.name,
              ...(h.description ? { "smithy.api#documentation": h.description } : {}),
            },
          };
  }
  output = {
    type: "structure",
    members,
    traits: { ...(output?.type === "structure" ? output.traits : {}), "smithy.api#output": {} },
  };
  let id = ownName;
  for (let k = 2; model.shapes[id] !== undefined && id !== outId; k++) id = `${ownName}${k}`;
  model.shapes[id] = output;
  op.output = { target: id };
}

/** The `xml` object of a property: its own, else the one of the schema it references. */
const xmlOf = (prop: any, deref: (x: any) => any): any => prop?.xml ?? deref(prop)?.xml ?? {};

/** Stamp the members of a structure shape from the swagger object schema it came from. */
function stampXmlStruct(
  model: SmithyModel,
  deref: (x: any) => any,
  schema: any,
  shape: any,
  seen: Set<any>,
): void {
  if (seen.has(shape) || shape?.type !== "structure") return;
  seen.add(shape);
  const props: Record<string, any> = {};
  const collect = (s: any, depth = 0): void => {
    const r = deref(s);
    if (!r || typeof r !== "object" || depth > 8) return;
    for (const part of r.allOf ?? []) collect(part, depth + 1);
    Object.assign(props, r.properties ?? {});
  };
  collect(schema);
  for (const [name, member] of Object.entries<any>(shape.members ?? {})) {
    const wire = member.traits?.["smithy.api#jsonName"] ?? name;
    const prop = props[wire];
    if (prop === undefined) continue;
    stampXmlMember(model, deref, member, prop, wire, seen);
  }
}

/**
 * Stamp one member from its swagger property: element/attribute name, text
 * content, list wrapping and item names; then recurse into its structure
 * (or its list's item structure).
 */
function stampXmlMember(
  model: SmithyModel,
  deref: (x: any) => any,
  member: any,
  prop: any,
  wire: string | undefined,
  seen: Set<any>,
): void {
  const resolved = deref(prop);
  if (!resolved || typeof resolved !== "object") return;
  const xml = xmlOf(prop, deref);
  const traits: Record<string, any> = { ...member.traits };
  const setName = (name: string | undefined) => {
    if (name !== undefined && name !== wire) traits["smithy.api#xmlName"] = name;
  };
  if (xml["x-ms-text"] === true) traits[XML_TEXT_TRAIT] = {};
  if (xml.attribute === true) traits["smithy.api#xmlAttribute"] = {};
  const isList = resolved.type === "array" || resolved.items !== undefined;
  if (isList) {
    const items = resolved.items;
    const itemName: string | undefined =
      items?.xml?.name ??
      deref(items)?.xml?.name ??
      (typeof items?.$ref === "string" ? items.$ref.split("/").pop() : undefined);
    if (xml.wrapped === true) {
      setName(xml.name ?? wire);
      if (itemName !== undefined) traits[XML_ITEM_NAME_TRAIT] = itemName;
    } else {
      traits["smithy.api#xmlFlattened"] = {};
      setName(itemName ?? xml.name ?? wire);
    }
  } else {
    // A referenced schema's own name wins (`Segment` → `<Blobs>`).
    setName(xml.name);
  }
  member.traits = traits;

  const target = model.shapes[member.target];
  if (target?.type === "structure") {
    stampXmlStruct(model, deref, resolved, target, seen);
  } else if (target?.type === "list" && isList) {
    const item = model.shapes[target.member?.target];
    if (item?.type === "structure") stampXmlStruct(model, deref, resolved.items, item, seen);
  }
}

/** The first `https://…` OAuth2 scope the spec's security definitions declare. */
function specAudience(doc: any): string | undefined {
  const schemes = {
    ...doc.securityDefinitions,
    ...doc.components?.securitySchemes,
  };
  for (const scheme of Object.values<any>(schemes)) {
    if (scheme?.type !== "oauth2") continue;
    const scopes = [
      ...Object.keys(scheme.scopes ?? {}),
      ...Object.values<any>(scheme.flows ?? {}).flatMap((f) => Object.keys(f?.scopes ?? {})),
    ];
    const scope = scopes.find((s) => s.startsWith("https://"));
    // Batch declares `https://batch.core.windows.net//.default`.
    if (scope) return scope.replace(/\/\/\.default$/, "/.default");
  }
  return undefined;
}

// ============================================================================
// Pagination (`x-ms-pageable`)
// ============================================================================
//
// Azure lists answer `{ value: [...], nextLink?: "<absolute url>" }` and the
// swagger marks the operation `x-ms-pageable: { nextLinkName, itemName }`
// (`itemName` defaults to `value`; `nextLinkName: null` is a single page).
// The converter drops vendor extensions, so markPageableOps tags each
// pageable swagger operation with a marker query parameter, and
// stampPageable finds it on the converted input again and turns it into:
//
//   nextLink  `smithy.api#paginated { mode: "cursor", inputToken: "nextLink",
//             outputToken: <nextLink member>, items }` plus an input member
//             `nextLink` named by the http trait's `nextLink`. The protocol
//             GETs that absolute URL as-is (it already carries
//             `api-version` and skip tokens) with the operation's auth.
//   marker    Storage's `NextMarker` fed back as the `marker` query
//             parameter: a plain cursor, no URL override.
//   single    `nextLinkName: null`: `{ mode: "single", items }`.
//
// A pageable operation whose next page is another operation
// (`operationName`, a POST) or whose response has no items list stays a
// plain operation.

const PAGEABLE_MARKER = "__distilled_pageable_";
const PAGINATED_TRAIT = "smithy.api#paginated";
/** The input member the protocol reads the next page's URL from. */
const NEXT_LINK_MEMBER = "nextLink";

interface PageableOp {
  readonly nextLinkName: string | null;
  readonly itemName: string;
  readonly operationName?: string;
}

/** Mirrors the shared converter's member naming (`@odata.nextLink` → `_odata_nextLink`). */
const pageMemberIdent = (name: string): string => {
  let out = name.replace(/[^A-Za-z0-9_]/g, "_");
  if (/^[0-9]/.test(out)) out = `_${out}`;
  return out || "_";
};

/** Tag every `x-ms-pageable` operation of a swagger document; returns their facts by marker index. */
function markPageableOps(doc: any): PageableOp[] {
  const facts: PageableOp[] = [];
  const items: Array<[string, any]> = [
    ...Object.entries<any>(doc.paths ?? {}),
    ...Object.entries<any>(doc["x-ms-paths"] ?? {}),
  ];
  for (const [, item] of items) {
    if (!item || typeof item !== "object") continue;
    for (const method of HTTP_METHOD_KEYS) {
      const op = item[method];
      const pageable = op?.["x-ms-pageable"];
      if (!pageable || typeof pageable !== "object") continue;
      const nextLinkName = typeof pageable.nextLinkName === "string" ? pageable.nextLinkName : null;
      const itemName = typeof pageable.itemName === "string" ? pageable.itemName : "value";
      const operationName =
        typeof pageable.operationName === "string" ? pageable.operationName : undefined;
      op.parameters = [
        ...(Array.isArray(op.parameters) ? op.parameters : []),
        { name: `${PAGEABLE_MARKER}${facts.length}`, in: "query", type: "string" },
      ];
      facts.push({ nextLinkName, itemName, ...(operationName ? { operationName } : {}) });
    }
  }
  return facts;
}

/** The member of `shape` whose key or wire name is `wire`. */
const memberByWire = (shape: any, wire: string): string | undefined =>
  Object.entries<any>(shape?.members ?? {}).find(
    ([key, m]) => key === wire || m?.traits?.["smithy.api#jsonName"] === wire,
  )?.[0];

/**
 * The items path of a page: the `itemName` member, or (Storage, whose specs
 * leave `itemName` at its `value` default) the first list member at the
 * top level or one struct below (`Segment.BlobItems`).
 */
function pageItemsPath(model: SmithyModel, output: any, itemName: string): string | undefined {
  const isList = (m: any) => model.shapes[m?.target]?.type === "list";
  const named = memberByWire(output, itemName);
  if (named !== undefined) return isList(output.members[named]) ? named : undefined;
  const members = Object.entries<any>(output.members ?? {});
  const top = members.find(([, m]) => isList(m));
  if (top) return top[0];
  for (const [key, m] of members) {
    const inner = model.shapes[m?.target];
    if (inner?.type !== "structure") continue;
    const lists = Object.entries<any>(inner.members ?? {}).filter(([, im]) => isList(im));
    const pick = lists.find(([k]) => k.endsWith("Items")) ?? lists[0];
    if (pick) return `${key}.${pick[0]}`;
  }
  return undefined;
}

/** Counts of how each marked operation was stamped, for the convert summary. */
const pageableStats = { nextLink: 0, marker: 0, single: 0, skipped: [] as string[] };

/**
 * Replace every converted operation's pageable marker with its pagination
 * (see the section comment). Runs after the data-plane stamp, so Storage's
 * XML outputs are in their final shape.
 */
function stampPageable(model: SmithyModel, facts: readonly PageableOp[]): void {
  for (const [opId, def] of Object.entries<any>(model.shapes)) {
    if (def.type !== "operation") continue;
    const input = model.shapes[def.input?.target];
    const entry = Object.entries<any>(input?.members ?? {}).find(
      ([, m]) =>
        typeof m?.traits?.["smithy.api#httpQuery"] === "string" &&
        m.traits["smithy.api#httpQuery"].startsWith(PAGEABLE_MARKER),
    );
    if (!entry) continue;
    const [markerKey, marker] = entry;
    delete input.members[markerKey];
    const page = facts[Number(marker.traits["smithy.api#httpQuery"].slice(PAGEABLE_MARKER.length))];
    const output = model.shapes[def.output?.target];
    const http = def.traits?.["smithy.api#http"];
    if (!page || !http) throw new Error(`pageable marker without its facts on ${opId}`);
    if (page.operationName !== undefined) {
      pageableStats.skipped.push(`${local(opId)}: next page is ${page.operationName}`);
      continue;
    }
    const items =
      output?.type === "structure" ? pageItemsPath(model, output, page.itemName) : undefined;
    if (items === undefined) {
      pageableStats.skipped.push(`${local(opId)}: no ${page.itemName} list in the response`);
      continue;
    }
    if (page.nextLinkName === null) {
      def.traits[PAGINATED_TRAIT] = { mode: "single", items };
      pageableStats.single++;
      continue;
    }
    let outputToken = memberByWire(output, page.nextLinkName);
    if (outputToken === undefined) {
      // Many list schemas leave the next link out; the service still sends it.
      outputToken = pageMemberIdent(page.nextLinkName);
      if (outputToken in output.members) {
        pageableStats.skipped.push(`${local(opId)}: ${outputToken} is not the next link`);
        continue;
      }
      output.members[outputToken] = {
        target: "smithy.api#String",
        traits: {
          "smithy.api#documentation": "The URL to get the next page of results, if any.",
          ...(outputToken !== page.nextLinkName
            ? { "smithy.api#jsonName": page.nextLinkName }
            : {}),
        },
      };
    }
    // Storage: `NextMarker` goes back as the `marker` query parameter.
    const markerInput = Object.entries<any>(input.members).find(
      ([, m]) => m?.traits?.["smithy.api#httpQuery"] === "marker",
    )?.[0];
    if (page.nextLinkName === "NextMarker" && markerInput !== undefined) {
      def.traits[PAGINATED_TRAIT] = {
        mode: "cursor",
        inputToken: markerInput,
        outputToken,
        items,
      };
      pageableStats.marker++;
      continue;
    }
    if (NEXT_LINK_MEMBER in input.members) {
      pageableStats.skipped.push(`${local(opId)}: input already has ${NEXT_LINK_MEMBER}`);
      continue;
    }
    input.members[NEXT_LINK_MEMBER] = {
      target: "smithy.api#String",
      traits: {
        "smithy.api#documentation":
          "The absolute URL of a page returned by a previous call; when set, every other member is ignored.",
      },
    };
    http.nextLink = NEXT_LINK_MEMBER;
    def.traits[PAGINATED_TRAIT] = {
      mode: "cursor",
      inputToken: NEXT_LINK_MEMBER,
      outputToken,
      items,
    };
    pageableStats.nextLink++;
  }
}

// ============================================================================
// Main
// ============================================================================

// ============================================================================
// Manual specs
// ============================================================================
//
// manual-specs/<module>.json are hand-authored Smithy models for Azure APIs
// that publish no Swagger (Service Bus / Event Hubs messaging, the Cosmos DB
// SQL API, Kudu). They join `.generated-specs` before finalizeConvert, so
// `patches/<module>/` applies to them like to any converted model, and
// generate compiles them through the same path. A manual model must not
// shadow a converted one: if Azure publishes the spec, delete the manual one.

const manualSpecsDir = path.join(rootDir, "manual-specs");

function copyManualSpecs(): number {
  if (!isDir(manualSpecsDir)) return 0;
  let count = 0;
  for (const file of fs.readdirSync(manualSpecsDir).sort()) {
    if (!file.endsWith(".json")) continue;
    const target = path.join(outDir, file);
    if (modelExists(target)) {
      throw new Error(`manual-specs/${file} shadows a converted model — rename or delete it`);
    }
    writeModelText(target, fs.readFileSync(path.join(manualSpecsDir, file), "utf8"));
    console.log(`📦 ${file} (manual)`);
    count++;
  }
  return count;
}

async function main() {
  const started = Date.now();
  console.log("🛠️  azure specs → smithy");
  console.log("   Discovering Azure REST API specs...");
  const specs = discoverSpecs();
  console.log(`   Found ${specs.length} spec files across Azure services.\n`);

  if (specs.length === 0) {
    console.error("No specs found. Ensure the submodule is fetched:");
    console.error("  pnpm run specs:fetch");
    process.exit(1);
  }

  clearModels(outDir);

  // Group by service, preserving discovery order.
  const byService = new Map<string, SpecFile[]>();
  for (const spec of specs) {
    let list = byService.get(spec.service);
    if (!list) byService.set(spec.service, (list = []));
    list.push(spec);
  }

  let specSuccessCount = 0;
  let specErrorCount = 0;
  let serviceCount = 0;
  let totalOps = 0;
  let totalSkipped = 0;
  const armModules = new Set<string>();

  for (const [service, serviceSpecs] of byService) {
    const ns = `com.azure.${sanitizeNsSegment(service)}`;
    const merged = newMergedService();

    for (const spec of serviceSpecs) {
      const label = spec.subService
        ? `${spec.service}/${spec.provider}/${spec.subService} (${spec.apiVersion})`
        : `${spec.service}/${spec.provider} (${spec.apiVersion})`;

      try {
        const resolved = loadResolvedSpec(spec.filePath, spec.versionDir);
        const pageable = markPageableOps(resolved);

        // Merging resolves collisions by final name (v0 semantics), so name
        // first and keep the way back to the upstream names.
        const model = convertOpenApiToSmithy(resolved, {
          deferNaming: true,
          namespace: ns,
          serviceName: pascal(service),
          // v0 parity: includeOperationErrors=false — no per-op error
          // classes; Azure errors are matched entirely by the protocol.
          statusToErrorClass: {},
          skipDeprecated: true,
          // Bake the resolved api-version into each operation (ARM requires
          // `?api-version=` on every call). Drops the api-version query
          // param from the user-facing input schema.
          apiVersion: spec.apiVersion,
          // ARM answers long-running operations with 202 and the status
          // monitor in `Azure-AsyncOperation` / `Location`; expose them so
          // callers can follow the operation (distilled does not poll).
          responseHeaders: ["Azure-AsyncOperation", "Location", "Retry-After"],
        });
        const upstreamOf = applyDeferredNames(model);
        foldApiVersion(model);
        stampPageable(model, pageable);
        mergeSpecModel(merged, model, upstreamOf);

        specSuccessCount++;
      } catch (error: any) {
        specErrorCount++;
        console.error(`❌ ${label}: ${error.message}`);
      }
    }

    if (merged.ops.length === 0) continue;

    // Merged service shape carrying every kept operation.
    const serviceName = pascal(service);
    writeMergedModel(sanitizeNsSegment(service), ns, serviceName, merged, {
      "smithy.api#title": `Azure ${serviceName}`,
      "smithy.api#documentation":
        `Azure ${serviceName} API — merged from the ${service} ` +
        "resource-manager specs (latest stable api-version per resource provider).",
    });
    armModules.add(sanitizeNsSegment(service));
    serviceCount++;
    totalOps += merged.ops.length;
    totalSkipped += merged.skippedOps;
    console.log(
      `📦 ${sanitizeNsSegment(service)}.json (${merged.ops.length} operations` +
        (merged.skippedOps ? `, ${merged.skippedOps} colliding skipped` : "") +
        `)`,
    );
  }

  // ---- data planes ----
  const { groups, skipped } = discoverDataPlanes();
  const dataPlaneFiles = groups.reduce((n, g) => n + g.files.length, 0);
  console.log(`\n   Found ${groups.length} data-plane groups (${skipped.length} skipped).`);
  const dataPlaneModules = new Map<string, string>();
  let dataPlaneCount = 0;
  let dataPlaneOps = 0;
  for (const g of groups) {
    const label = `${g.service}/data-plane/${g.group} (${g.apiVersion})`;
    const nsSegment = sanitizeNsSegment(g.module);
    if (armModules.has(g.module) || armModules.has(nsSegment)) {
      throw new Error(`data-plane module ${g.module} (${label}) collides with an ARM module`);
    }
    const clash = dataPlaneModules.get(g.module);
    if (clash) throw new Error(`data-plane module ${g.module}: ${clash} and ${label}`);
    dataPlaneModules.set(g.module, label);

    const ns = `com.azure.${nsSegment}`;
    const serviceName = pascal(g.module);
    const merged = newMergedService();
    let audience: string | undefined;
    let hostRecord: DataPlaneHost | undefined;
    for (const filePath of g.files) {
      try {
        const resolved = loadResolvedSpec(filePath, g.versionDir);
        audience ??= specAudience(resolved);
        const pageable = markPageableOps(resolved);
        const { host, ops } = prepareDataPlaneSpec(
          resolved,
          g.apiVersion,
          STORAGE_DATA_PLANES.has(g.module),
        );
        hostRecord ??= host;
        const model = convertOpenApiToSmithy(resolved, {
          deferNaming: true,
          namespace: ns,
          serviceName,
          statusToErrorClass: {},
          skipDeprecated: true,
          // Data-plane headers are real inputs (Storage's `x-ms-blob-type`,
          // App Configuration's `Sync-Token`); the protocol-owned ones were
          // dropped or pinned by prepareDataPlaneSpec.
          headerParams: true,
          extraHttpMethods: ["head"],
          responseHeaders: [
            "Azure-AsyncOperation",
            "Operation-Location",
            "Location",
            "Retry-After",
            "ETag",
          ],
        });
        const upstreamOf = applyDeferredNames(model);
        stampDataPlaneModel(model, host, ops, resolved);
        stampPageable(model, pageable);
        mergeSpecModel(merged, model, upstreamOf);
        specSuccessCount++;
      } catch (error: any) {
        specErrorCount++;
        console.error(`❌ ${label} ${path.basename(filePath)}: ${error.message}`);
      }
    }
    if (merged.ops.length === 0) continue;

    const traits: Record<string, unknown> = {
      "smithy.api#title": `Azure ${g.group.split("/").at(-1)} data plane`,
      "smithy.api#documentation":
        `Azure ${g.service} data plane — ${g.service}/data-plane/${g.group} ` +
        `(latest stable api-version ${g.apiVersion}).`,
    };
    if (hostRecord) {
      traits[HOST_TRAIT] = {
        template: hostRecord.template,
        parameters: hostRecord.members.map((m) => ({
          name: m.ident,
          ...(m.raw ? { skipUrlEncoding: true } : {}),
          ...(m.default !== undefined ? { default: m.default } : {}),
        })),
      };
    }
    if (audience) traits[AUDIENCE_TRAIT] = audience;

    writeMergedModel(g.module, ns, serviceName, merged, traits);
    dataPlaneCount++;
    dataPlaneOps += merged.ops.length;
    totalSkipped += merged.skippedOps;
    console.log(
      `📦 ${g.module}.json (${merged.ops.length} operations` +
        (merged.skippedOps ? `, ${merged.skippedOps} colliding skipped` : "") +
        `, spec audience ${audience ?? "none"})`,
    );
  }
  for (const s of skipped) console.log(`   ⏭  ${s.label}: ${s.reason}`);

  const manualCount = copyManualSpecs();

  console.log(`\n${"=".repeat(60)}`);
  console.log(`Azure spec conversion complete.`);
  console.log(`  Specs processed: ${specSuccessCount}/${specs.length + dataPlaneFiles}`);
  console.log(`  Errors: ${specErrorCount}`);
  console.log(
    `  Service models: ${serviceCount} ARM + ${dataPlaneCount} data-plane + ${manualCount} manual`,
  );
  console.log(`  Total operations: ${totalOps} ARM + ${dataPlaneOps} data-plane`);
  console.log(`  Colliding operations skipped (first spec wins): ${totalSkipped}`);
  console.log(
    `  Pageable operations: ${pageableStats.nextLink} nextLink, ${pageableStats.marker} marker, ` +
      `${pageableStats.single} single page, ${pageableStats.skipped.length} left unpaginated`,
  );
  for (const s of pageableStats.skipped) console.log(`   ⏭  ${s}`);
  console.log(`  Elapsed: ${((Date.now() - started) / 1000).toFixed(1)}s`);
  console.log(`  Output: ${outDir}`);
  // patches/<service>/*.json are Smithy ops on upstream names; finalize
  // applies them, then the deferred verbNoun names.
  await finalizeConvert({ root: rootDir });
}

await main();
