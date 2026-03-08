/**
 * AWS SDK Code Generator
 *
 * Generates Effect-native AWS service clients from Smithy JSON models.
 * This is the most complex generator - handles Smithy traits, multiple
 * AWS protocols, endpoint resolution, and streaming.
 *
 * The generated output shape matches the original distilled-aws SDK:
 * - One file per service in src/services/
 * - Each file contains all schemas, error classes, and operations
 * - Operations are typed Effect functions with pagination support
 *
 * NOTE: This is a scaffold. The full Smithy model parser from the original
 * distilled-aws/scripts/generate-clients.ts (~3300 lines) needs to be
 * ported here. The structure is set up to match the original output.
 */
import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import { applyAllPatches } from "@distilled.cloud/sdk-core/json-patch";

// ============================================================================
// Smithy Model Types
// ============================================================================

interface SmithyModel {
  smithy: string;
  shapes: Record<string, SmithyShape>;
}

interface SmithyShape {
  type: string;
  traits?: Record<string, unknown>;
  members?: Record<string, SmithyMember>;
  member?: SmithyMember;
  key?: SmithyMember;
  value?: SmithyMember;
  errors?: Array<{ target: string }>;
  input?: { target: string };
  output?: { target: string };
  operations?: Array<{ target: string }>;
  resources?: Array<{ target: string }>;
  mixins?: Array<{ target: string }>;
  target?: string;
  // Enum values
  enum?: Array<{ value: string; name?: string }>;
}

interface SmithyMember {
  target: string;
  traits?: Record<string, unknown>;
}

// ============================================================================
// Utility Functions
// ============================================================================

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function getShortName(fullName: string): string {
  const hash = fullName.lastIndexOf("#");
  return hash >= 0 ? fullName.slice(hash + 1) : fullName;
}

function toCamelCase(s: string): string {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

// ============================================================================
// Service Discovery
// ============================================================================

function findServiceShape(
  model: SmithyModel,
): { name: string; shape: SmithyShape } | undefined {
  for (const [name, shape] of Object.entries(model.shapes)) {
    if (shape.type === "service") {
      return { name, shape };
    }
  }
  return undefined;
}

function findOperationShapes(
  model: SmithyModel,
  service: SmithyShape,
): Array<{ name: string; shape: SmithyShape }> {
  const ops: Array<{ name: string; shape: SmithyShape }> = [];
  for (const opRef of service.operations ?? []) {
    const shape = model.shapes[opRef.target];
    if (shape) {
      ops.push({ name: opRef.target, shape });
    }
  }
  // Also collect operations from resources
  for (const resRef of service.resources ?? []) {
    const resource = model.shapes[resRef.target];
    if (resource?.operations) {
      for (const opRef of resource.operations) {
        const shape = model.shapes[opRef.target];
        if (shape) {
          ops.push({ name: opRef.target, shape });
        }
      }
    }
  }
  return ops;
}

// ============================================================================
// Code Generation (scaffold)
// ============================================================================

function generateServiceFile(
  serviceName: string,
  model: SmithyModel,
  serviceShape: SmithyShape,
  operations: Array<{ name: string; shape: SmithyShape }>,
): string {
  const lines: string[] = [];

  // Imports
  lines.push(`import * as Schema from "effect/Schema";`);
  lines.push(`import * as Category from "../category";`);
  lines.push(`import * as T from "../traits";`);
  lines.push(``);

  // Get service metadata from traits
  const sdkId =
    (serviceShape.traits?.["aws.api#service"] as any)?.sdkId ?? serviceName;

  lines.push(`// Service: ${sdkId}`);
  lines.push(``);

  // Generate operations
  for (const { name, shape } of operations) {
    const opName = getShortName(name);
    const inputTarget = shape.input?.target;
    const outputTarget = shape.output?.target;

    // Generate input schema placeholder
    lines.push(`// Operation: ${opName}`);

    if (inputTarget) {
      const inputName = getShortName(inputTarget);
      lines.push(`export const ${inputName} = Schema.Struct({});`);
      lines.push(`export type ${inputName} = typeof ${inputName}.Type;`);
      lines.push(``);
    }

    if (outputTarget) {
      const outputName = getShortName(outputTarget);
      lines.push(`export const ${outputName} = Schema.Struct({});`);
      lines.push(`export type ${outputName} = typeof ${outputName}.Type;`);
      lines.push(``);
    }

    // Generate error classes for this operation
    for (const errRef of shape.errors ?? []) {
      const errShape = model.shapes[errRef.target];
      if (errShape) {
        const errName = getShortName(errRef.target);
        lines.push(
          `export class ${errName} extends Schema.TaggedErrorClass<${errName}>()("${errName}", {`,
        );
        lines.push(`  message: Schema.optional(Schema.String),`);
        lines.push(`}).pipe(Category.withServerError) {}`);
        lines.push(``);
      }
    }
  }

  return lines.join("\n");
}

// ============================================================================
// Main
// ============================================================================

async function main() {
  const rootDir = path.join(import.meta.dir, "..");
  const modelsDir = path.join(rootDir, "specs/api-models-aws");
  const patchDir = path.join(rootDir, "patches");
  const servicesDir = path.join(rootDir, "src/services");

  if (!fs.existsSync(modelsDir)) {
    console.error(
      `Models directory not found: ${modelsDir}\nRun 'bun run specs:fetch' first.`,
    );
    process.exit(1);
  }

  if (!fs.existsSync(servicesDir)) {
    fs.mkdirSync(servicesDir, { recursive: true });
  }

  // Optional: filter by --sdk flag
  const sdkFilter = process.argv.find((a) => a.startsWith("--sdk="));
  const filterName = sdkFilter?.split("=")[1];

  // Find all service model directories
  const serviceDirs = fs.readdirSync(modelsDir).filter((d) => {
    const fullPath = path.join(modelsDir, d);
    return (
      fs.statSync(fullPath).isDirectory() &&
      !d.startsWith(".") &&
      !d.startsWith("_")
    );
  });

  console.log(`Found ${serviceDirs.length} service model directories`);

  let generated = 0;

  for (const serviceDir of serviceDirs) {
    if (filterName && serviceDir !== filterName) continue;

    const modelDir = path.join(modelsDir, serviceDir);

    // Find the smithy model JSON files
    const modelFiles = fs
      .readdirSync(modelDir)
      .filter((f) => f.endsWith(".json"));

    if (modelFiles.length === 0) continue;

    // Use the first (or only) model file
    const modelPath = path.join(modelDir, modelFiles[0]);
    let model: SmithyModel;
    try {
      model = JSON.parse(fs.readFileSync(modelPath, "utf-8"));
    } catch {
      continue;
    }

    // Find service shape
    const service = findServiceShape(model);
    if (!service) continue;

    // Find operations
    const operations = findOperationShapes(model, service.shape);
    if (operations.length === 0) continue;

    // Get SDK ID for filename
    const sdkId =
      (service.shape.traits?.["aws.api#service"] as any)?.sdkId ?? serviceDir;
    const fileName = sdkId
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    // Apply patches
    const servicePatchDir = path.join(patchDir, fileName);
    if (fs.existsSync(servicePatchDir)) {
      const { applied, errors } = applyAllPatches(model, servicePatchDir);
      for (const msg of applied) console.log(`  ✓ ${fileName}: ${msg}`);
      if (errors.length > 0) {
        for (const msg of errors) console.log(`  ✗ ${fileName}: ${msg}`);
      }
    }

    console.log(
      `Generating ${fileName}.ts (${operations.length} operations)...`,
    );

    const code = generateServiceFile(sdkId, model, service.shape, operations);
    fs.writeFileSync(path.join(servicesDir, `${fileName}.ts`), code);
    generated++;
  }

  console.log(`\nGenerated ${generated} service files.`);

  // Format
  console.log("Formatting...");
  try {
    execSync("bunx oxfmt .", { stdio: "inherit", cwd: rootDir });
  } catch {
    console.log("Warning: formatting failed");
  }

  console.log("Done!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
