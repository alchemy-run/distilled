/**
 * Azure SDK Code Generator
 *
 * Discovers all Azure Resource Manager (ARM) Swagger 2.0 specs from the
 * azure-rest-api-specs submodule, resolves cross-file $ref references,
 * and generates Effect operations grouped by Azure service.
 *
 * Operations are grouped into service files under `src/services/`, matching
 * the pattern used by the Kubernetes, Cloudflare, GCP, and AWS SDKs.
 *
 * For example:
 *   - `src/services/compute.ts` — Virtual Machines, Disks, Images, etc.
 *   - `src/services/storage.ts` — Storage Accounts, Blob Containers, etc.
 *   - `src/services/network.ts` — Virtual Networks, NSGs, Load Balancers, etc.
 *
 * Usage:
 *   bun run generate                    # Generate all services
 *   bun run scripts/generate.ts         # Same
 */
import * as fs from "fs";
import * as path from "path";
import { generateFromOpenAPI } from "@distilled.cloud/core/openapi/generate";

const rootDir = path.join(import.meta.dir, "..");
const specsRoot = path.join(
  rootDir,
  "specs/azure-rest-api-specs/specification",
);
const servicesDir = path.join(rootDir, "src/services");
const patchDir = path.join(rootDir, "patches");
const tempDir = path.join(rootDir, ".gen-tmp");

// ============================================================================
// External $ref resolution
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

function resolveExternalRefs(
  obj: any,
  specDir: string,
  visited: Set<string> = new Set(),
): any {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj !== "object") return obj;

  if (Array.isArray(obj)) {
    return obj.map((item) => resolveExternalRefs(item, specDir, visited));
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
    return resolveExternalRefs(
      JSON.parse(JSON.stringify(resolved)),
      externalDir,
      new Set([...visited, ref]),
    );
  }

  const result: any = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = resolveExternalRefs(value, specDir, visited);
  }
  return result;
}

// ============================================================================
// Sibling spec merging
// ============================================================================

function mergeSiblingDefinitions(spec: any, versionDir: string): any {
  const jsonFiles = fs
    .readdirSync(versionDir)
    .filter(
      (f) =>
        f.endsWith(".json") &&
        !f.startsWith("examples") &&
        f !== "examples",
    );

  for (const jsonFile of jsonFiles) {
    const filePath = path.join(versionDir, jsonFile);
    if (
      filePath.includes(`${path.sep}examples${path.sep}`) ||
      filePath.includes("/examples/")
    )
      continue;

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
// Spec discovery
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
    console.error("Azure specs not found. Run `bun run specs:fetch` first.");
    process.exit(1);
  }

  for (const service of fs.readdirSync(specsRoot)) {
    if (service === "common-types" || service.endsWith(".yaml")) continue;
    const svcPath = path.join(specsRoot, service);
    if (!fs.statSync(svcPath).isDirectory()) continue;

    const rmPath = path.join(svcPath, "resource-manager");
    if (!fs.existsSync(rmPath) || !fs.statSync(rmPath).isDirectory()) continue;

    for (const provider of fs.readdirSync(rmPath)) {
      if (
        !provider.startsWith("Microsoft.") &&
        !provider.startsWith("microsoft.")
      )
        continue;
      const providerPath = path.join(rmPath, provider);
      if (!fs.statSync(providerPath).isDirectory()) continue;

      // Pattern A: flat stable/
      const stablePath = path.join(providerPath, "stable");
      if (fs.existsSync(stablePath) && fs.statSync(stablePath).isDirectory()) {
        specs.push(
          ...findLatestStableSpecs(stablePath, service, provider, undefined),
        );
      }

      // Pattern B: nested sub-service dirs
      for (const sub of fs.readdirSync(providerPath)) {
        if (sub === "stable" || sub === "preview") continue;
        const subPath = path.join(providerPath, sub);
        if (!fs.statSync(subPath).isDirectory()) continue;

        const subStablePath = path.join(subPath, "stable");
        if (
          fs.existsSync(subStablePath) &&
          fs.statSync(subStablePath).isDirectory()
        ) {
          specs.push(
            ...findLatestStableSpecs(subStablePath, service, provider, sub),
          );
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

  const latestVersion = versions[versions.length - 1];
  const versionDir = path.join(stablePath, latestVersion);

  const jsonFiles = fs
    .readdirSync(versionDir)
    .filter(
      (f) =>
        f.endsWith(".json") &&
        !f.startsWith("examples") &&
        f !== "examples",
    );

  const results: SpecFile[] = [];
  for (const jsonFile of jsonFiles) {
    const filePath = path.join(versionDir, jsonFile);
    if (filePath.includes("/examples/") || filePath.includes("\\examples\\"))
      continue;

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
// Service file merging (like Kubernetes pattern)
// ============================================================================

function extractBody(code: string): string {
  const lines = code.split("\n");
  const bodyLines: string[] = [];
  let pastImports = false;

  for (const line of lines) {
    if (!pastImports) {
      if (line.startsWith("import ") || line.trim() === "") {
        continue;
      }
      pastImports = true;
    }
    bodyLines.push(line);
  }

  return bodyLines.join("\n").trim();
}

function collectExtraImports(
  ops: { code: string }[],
): { errors: Set<string>; sensitive: Set<string> } {
  const errors = new Set<string>();
  const sensitive = new Set<string>();

  for (const op of ops) {
    for (const line of op.code.split("\n")) {
      const errorMatch = line.match(
        /^import \{ (.+) \} from ["']\.\.\/errors/,
      );
      if (errorMatch) {
        for (const name of errorMatch[1].split(",").map((s) => s.trim())) {
          errors.add(name);
        }
      }

      const sensitiveMatch = line.match(
        /^import \{ (.+) \} from ["']\.\.\/sensitive/,
      );
      if (sensitiveMatch) {
        for (const name of sensitiveMatch[1]
          .split(",")
          .map((s) => s.trim())) {
          sensitive.add(name);
        }
      }
    }
  }

  return { errors, sensitive };
}

/**
 * Convert a service name to a PascalCase namespace export name.
 * e.g. "container-service" → "ContainerService"
 *      "cosmos-db" → "CosmosDb"
 *      "sql" → "Sql"
 */
function toPascalCase(s: string): string {
  return s
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

// ============================================================================
// Main generation
// ============================================================================

function main() {
  console.log("Discovering Azure REST API specs...");
  const specs = discoverSpecs();
  console.log(`Found ${specs.length} spec files across Azure services.\n`);

  if (specs.length === 0) {
    console.error("No specs found. Ensure the submodule is fetched:");
    console.error("  bun run specs:fetch");
    process.exit(1);
  }

  // Clean temp and output
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true });
  }
  fs.mkdirSync(tempDir, { recursive: true });

  if (fs.existsSync(servicesDir)) {
    fs.rmSync(servicesDir, { recursive: true });
  }
  fs.mkdirSync(servicesDir, { recursive: true });

  // Step 1: Generate individual operation files per spec into temp
  let specSuccessCount = 0;
  let specErrorCount = 0;

  // Map: service name → list of { functionName, code }
  const serviceOps = new Map<
    string,
    { functionName: string; code: string }[]
  >();

  for (const spec of specs) {
    const label = spec.subService
      ? `${spec.service}/${spec.provider}/${spec.subService} (${spec.apiVersion})`
      : `${spec.service}/${spec.provider} (${spec.apiVersion})`;

    try {
      const specContent = fs.readFileSync(spec.filePath, "utf-8");
      const specObj = JSON.parse(specContent);
      const specDir = path.dirname(spec.filePath);

      // Merge sibling definitions
      mergeSiblingDefinitions(specObj, spec.versionDir);

      // Resolve external $refs
      const resolved = resolveExternalRefs(specObj, specDir);

      const specBaseName = path.basename(spec.filePath, ".json");
      const tempSpecName = `${spec.service}-${spec.provider}-${spec.subService ?? specBaseName}`;
      const tempSpecPath = path.join(tempDir, `${tempSpecName}.json`);
      fs.writeFileSync(tempSpecPath, JSON.stringify(resolved, null, 2));

      const specOutputDir = path.join(tempDir, `ops-${tempSpecName}`);

      generateFromOpenAPI({
        specPath: tempSpecPath,
        patchDir,
        outputDir: specOutputDir,
        importPrefix: "..",
        clientImport: "../client",
        traitsImport: "../traits",
        sensitiveImport: "../sensitive",
        errorsImport: "../errors",
        includeOperationErrors: false,
        skipDeprecated: true,
      });

      // Read generated files and group by service
      if (fs.existsSync(specOutputDir)) {
        if (!serviceOps.has(spec.service)) {
          serviceOps.set(spec.service, []);
        }
        const ops = serviceOps.get(spec.service)!;

        // Track ALL exported symbol names (function + Input/Output types) to prevent collisions
        const seenSymbols = new Set<string>();
        for (const o of ops) {
          seenSymbols.add(o.functionName);
          seenSymbols.add(`${o.functionName}Input`);
          seenSymbols.add(`${o.functionName}Output`);
        }

        for (const file of fs.readdirSync(specOutputDir)) {
          if (file === "index.ts" || !file.endsWith(".ts")) continue;
          const functionName = file.replace(".ts", "");
          const inputName = `${functionName}Input`;
          const outputName = `${functionName}Output`;

          // Skip if function name OR its schema names collide with existing symbols
          if (
            seenSymbols.has(functionName) ||
            seenSymbols.has(inputName) ||
            seenSymbols.has(outputName)
          ) continue;

          seenSymbols.add(functionName);
          seenSymbols.add(inputName);
          seenSymbols.add(outputName);

          const code = fs.readFileSync(
            path.join(specOutputDir, file),
            "utf-8",
          );
          ops.push({ functionName, code });
        }
      }

      specSuccessCount++;
    } catch (error: any) {
      specErrorCount++;
      console.error(`❌ ${label}: ${error.message}`);
    }
  }

  // Step 2: Write merged service files
  let totalOps = 0;

  for (const [service, ops] of serviceOps) {
    if (ops.length === 0) continue;

    const displayName = toPascalCase(service);
    const { errors, sensitive } = collectExtraImports(ops);

    let imports = `/**
 * Azure ${displayName} API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";`;

    if (errors.size > 0) {
      imports += `\nimport { ${[...errors].sort().join(", ")} } from "../errors.ts";`;
    }
    if (sensitive.size > 0) {
      imports += `\nimport { ${[...sensitive].sort().join(", ")} } from "../sensitive.ts";`;
    }

    // Sort operations alphabetically for deterministic output
    ops.sort((a, b) => a.functionName.localeCompare(b.functionName));

    const bodies = ops.map((op) => extractBody(op.code));
    const content = [imports, "", ...bodies, ""].join("\n");

    const filePath = path.join(servicesDir, `${service}.ts`);
    fs.writeFileSync(filePath, content);
    totalOps += ops.length;

    console.log(`📦 ${service}.ts (${ops.length} operations)`);
  }

  // Step 2b: Post-process — quote invalid property names
  // Azure specs have properties like `api-version` and `certificate.name`
  // which are not valid JS identifiers. The core generator doesn't quote
  // parameter names, so we fix them here.
  const NEEDS_QUOTING_RE = /^(\s+)([a-zA-Z_$][\w$]*(?:[.-][\w$]*)+)(:\s)/gm;

  for (const file of fs.readdirSync(servicesDir)) {
    if (!file.endsWith(".ts") || file === "index.ts") continue;
    const filePath = path.join(servicesDir, file);
    const content = fs.readFileSync(filePath, "utf-8");

    const fixed = content.replace(NEEDS_QUOTING_RE, '$1"$2"$3');

    if (fixed !== content) {
      fs.writeFileSync(filePath, fixed);
    }
  }

  // Step 3: Write services index.ts with namespace re-exports
  const sortedServices = [...serviceOps.keys()]
    .filter((s) => (serviceOps.get(s)?.length ?? 0) > 0)
    .sort();

  const indexContent =
    sortedServices
      .map((service) => {
        const namespace = toPascalCase(service);
        return `export * as ${namespace} from "./${service}.ts";`;
      })
      .join("\n") + "\n";

  fs.writeFileSync(path.join(servicesDir, "index.ts"), indexContent);

  // Step 4: Clean up temp
  fs.rmSync(tempDir, { recursive: true, force: true });

  console.log(`\n${"=".repeat(60)}`);
  console.log(`Azure SDK generation complete.`);
  console.log(`  Specs processed: ${specSuccessCount}/${specs.length}`);
  console.log(`  Errors: ${specErrorCount}`);
  console.log(`  Service files: ${sortedServices.length}`);
  console.log(`  Total operations: ${totalOps}`);
  console.log(`  Output: ${servicesDir}`);
}

main();
