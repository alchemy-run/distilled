/**
 * Kubernetes SDK Code Generator
 *
 * Generates Effect operations from the Kubernetes OpenAPI 2.0 (Swagger) spec
 * located in the `kubernetes/kubernetes` git submodule.
 *
 * Operations are grouped by Kubernetes API group (core, apps, batch, etc.)
 * and written as single service files under `src/services/`, matching the
 * pattern used by the Cloudflare, GCP, and AWS SDKs.
 *
 * Usage:
 *   bun run generate          # from packages/kubernetes/
 *   bun run specs:fetch       # fetch the submodule first if needed
 */
import * as fs from "fs";
import * as path from "path";
import { generateFromOpenAPI } from "@distilled.cloud/core/openapi/generate";

const rootDir = path.join(import.meta.dir, "..");
const servicesDir = path.join(rootDir, "src/services");
const tempDir = path.join(rootDir, ".gen-tmp");

// ============================================================================
// Step 1: Generate individual operation files into a temp directory
// ============================================================================

// Clean temp dir
if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true });
}

generateFromOpenAPI({
  specPath: path.join(
    rootDir,
    "specs/kubernetes/api/openapi-spec/swagger.json",
  ),
  patchDir: path.join(rootDir, "patches"),
  outputDir: tempDir,
  importPrefix: "..",
  clientImport: "../client/api",
  traitsImport: "../traits",
  sensitiveImport: "../sensitive",
  errorsImport: "../errors",
  skipDeprecated: true,
});

// ============================================================================
// Step 2: Group operations by Kubernetes API group
// ============================================================================

/**
 * Extract the Kubernetes API group from an operation function name.
 *
 * Operation names follow the pattern: {verb}{ApiGroup}{Version}{Resource}
 * e.g. "listCoreV1NamespacedPod" → "core"
 *      "createAppsV1NamespacedDeployment" → "apps"
 *      "watchRbacAuthorizationV1ClusterRole" → "rbac-authorization"
 */

// Map from PascalCase API group to kebab-case service file name
const API_GROUP_MAP: Record<string, string> = {
  Admissionregistration: "admissionregistration",
  Apiextensions: "apiextensions",
  Apiregistration: "apiregistration",
  Apps: "apps",
  Authentication: "authentication",
  Authorization: "authorization",
  Autoscaling: "autoscaling",
  Batch: "batch",
  Certificates: "certificates",
  Coordination: "coordination",
  Core: "core",
  Discovery: "discovery",
  Events: "events",
  FlowcontrolApiserver: "flowcontrol-apiserver",
  InternalApiserver: "internal-apiserver",
  Networking: "networking",
  Node: "node",
  Policy: "policy",
  RbacAuthorization: "rbac-authorization",
  Resource: "resource",
  Scheduling: "scheduling",
  // Storage must come after Storagemigration to avoid false prefix match
  Storagemigration: "storagemigration",
  Storage: "storage",
};

// Build a sorted list of group prefixes (longer first for correct matching)
const GROUP_PREFIXES = Object.keys(API_GROUP_MAP).sort(
  (a, b) => b.length - a.length,
);

// Verbs that prefix operation names
const VERBS =
  /^(connect|create|delete|get|list|log|patch|read|replace|watch)/;

function getApiGroup(functionName: string): string {
  // Strip the verb prefix to get the API group + version + resource
  const withoutVerb = functionName.replace(VERBS, "");

  for (const prefix of GROUP_PREFIXES) {
    if (withoutVerb.startsWith(prefix)) {
      return API_GROUP_MAP[prefix];
    }
  }

  // Fallback: misc operations go into "core"
  return "core";
}

// Human-readable names for JSDoc headers
const GROUP_DISPLAY_NAMES: Record<string, string> = {
  admissionregistration: "Admission Registration",
  apiextensions: "API Extensions",
  apiregistration: "API Registration",
  apps: "Apps",
  authentication: "Authentication",
  authorization: "Authorization",
  autoscaling: "Autoscaling",
  batch: "Batch",
  certificates: "Certificates",
  coordination: "Coordination",
  core: "Core",
  discovery: "Discovery",
  events: "Events",
  "flowcontrol-apiserver": "Flow Control API Server",
  "internal-apiserver": "Internal API Server",
  networking: "Networking",
  node: "Node",
  policy: "Policy",
  "rbac-authorization": "RBAC Authorization",
  resource: "Resource",
  scheduling: "Scheduling",
  storage: "Storage",
  storagemigration: "Storage Migration",
};

// Read generated operation files (skip index.ts)
const opFiles = fs
  .readdirSync(tempDir)
  .filter((f) => f.endsWith(".ts") && f !== "index.ts")
  .sort();

// Group files by API group
const groups = new Map<string, { functionName: string; code: string }[]>();

for (const file of opFiles) {
  const functionName = file.replace(".ts", "");
  const code = fs.readFileSync(path.join(tempDir, file), "utf-8");
  const group = getApiGroup(functionName);

  if (!groups.has(group)) {
    groups.set(group, []);
  }
  groups.get(group)!.push({ functionName, code });
}

// ============================================================================
// Step 3: Merge operations into service files
// ============================================================================

// Clean services dir (remove old generated files, keep hand-written ones if any)
if (fs.existsSync(servicesDir)) {
  fs.rmSync(servicesDir, { recursive: true });
}
fs.mkdirSync(servicesDir, { recursive: true });

/**
 * Strip the import lines from a generated operation file and return just
 * the schemas + operation code. Also adjusts the import style:
 * the per-file generator uses `import { API } from "../client/api"` but
 * the service file uses `import * as API from "../client/api.ts"`.
 */
function extractBody(code: string): string {
  const lines = code.split("\n");
  const bodyLines: string[] = [];
  let pastImports = false;

  for (const line of lines) {
    if (!pastImports) {
      if (
        line.startsWith("import ") ||
        line.trim() === ""
      ) {
        continue;
      }
      pastImports = true;
    }
    bodyLines.push(line);
  }

  return bodyLines.join("\n").trim();
}

/**
 * Collect unique non-Schema/API/T imports (errors, sensitive) from all
 * operation files in a group.
 */
function collectExtraImports(
  ops: { code: string }[],
): { errors: Set<string>; sensitive: Set<string> } {
  const errors = new Set<string>();
  const sensitive = new Set<string>();

  for (const op of ops) {
    for (const line of op.code.split("\n")) {
      // Match error imports: import { BadRequest, NotFound } from "../errors";
      const errorMatch = line.match(
        /^import \{ (.+) \} from ["']\.\.\/errors/,
      );
      if (errorMatch) {
        for (const name of errorMatch[1].split(",").map((s) => s.trim())) {
          errors.add(name);
        }
      }

      // Match sensitive imports
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

for (const [group, ops] of groups) {
  const displayName = GROUP_DISPLAY_NAMES[group] ?? group;
  const { errors, sensitive } = collectExtraImports(ops);

  // Build imports — use namespace import for API (like Cloudflare services do)
  let imports = `/**
 * Kubernetes ${displayName} API
 *
 * Generated from the Kubernetes OpenAPI spec.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";`;

  if (errors.size > 0) {
    imports += `\nimport { ${[...errors].sort().join(", ")} } from "../errors.ts";`;
  }
  if (sensitive.size > 0) {
    imports += `\nimport { ${[...sensitive].sort().join(", ")} } from "../sensitive.ts";`;
  }

  // Concatenate all operation bodies
  const bodies = ops.map((op) => extractBody(op.code));

  const content = [imports, "", ...bodies, ""].join("\n");

  const filePath = path.join(servicesDir, `${group}.ts`);
  fs.writeFileSync(filePath, content);
  console.log(
    `📦 ${group}.ts (${ops.length} operations)`,
  );
}

// Write services index.ts
const indexContent =
  [...groups.keys()]
    .sort()
    .map((group) => {
      // Convert kebab-case to PascalCase for the namespace export
      const namespace = group
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join("");
      return `export * as ${namespace} from "./${group}.ts";`;
    })
    .join("\n") + "\n";

fs.writeFileSync(path.join(servicesDir, "index.ts"), indexContent);

// ============================================================================
// Step 4: Post-process — quote invalid property names
// ============================================================================

/**
 * The Kubernetes OpenAPI spec includes properties like `x-kubernetes-embedded-resource`
 * inside the JSONSchemaProps definition. The core generator emits these bare,
 * which is a syntax error. This step wraps them in quotes so TypeScript is happy.
 */
const INVALID_PROP_RE = /^(\s+)(x-[a-zA-Z0-9-]+)(:\s)/;

for (const file of fs.readdirSync(servicesDir)) {
  if (!file.endsWith(".ts") || file === "index.ts") continue;
  const filePath = path.join(servicesDir, file);
  const content = fs.readFileSync(filePath, "utf-8");
  if (!content.includes("x-kubernetes")) continue;

  const fixed = content
    .split("\n")
    .map((line) => line.replace(INVALID_PROP_RE, '$1"$2"$3'))
    .join("\n");

  if (fixed !== content) {
    fs.writeFileSync(filePath, fixed);
    console.log(`  🔧 Quoted invalid identifiers in ${file}`);
  }
}

// ============================================================================
// Step 5: Clean up
// ============================================================================

// Remove temp directory
fs.rmSync(tempDir, { recursive: true });

// Remove old operations directory if it exists
const oldOpsDir = path.join(rootDir, "src/operations");
if (fs.existsSync(oldOpsDir)) {
  fs.rmSync(oldOpsDir, { recursive: true });
  console.log("🗑️  Removed old src/operations/ directory");
}

console.log(`\n✅ Generated ${groups.size} service files`);
