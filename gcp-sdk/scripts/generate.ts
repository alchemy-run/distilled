/**
 * GCP SDK Code Generator
 *
 * Generates from GCP Discovery Documents (not OpenAPI).
 * Each Discovery Document describes one GCP API service with its schemas,
 * resources, and methods.
 *
 * This is a GCP-specific generator since Discovery Documents have a
 * different structure from OpenAPI specs.
 */
import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import { applyAllPatches } from "@distilled.cloud/sdk-core/json-patch";

// ============================================================================
// Types
// ============================================================================

interface DiscoveryDoc {
  name: string;
  version: string;
  title: string;
  description?: string;
  rootUrl: string;
  servicePath: string;
  schemas?: Record<string, DiscoverySchema>;
  resources?: Record<string, DiscoveryResource>;
  parameters?: Record<string, DiscoveryParam>;
}

interface DiscoverySchema {
  id?: string;
  type?: string;
  description?: string;
  properties?: Record<string, DiscoverySchemaProperty>;
  items?: DiscoverySchemaProperty;
  enum?: string[];
  enumDescriptions?: string[];
  $ref?: string;
  additionalProperties?: DiscoverySchemaProperty;
  required?: string[];
}

interface DiscoverySchemaProperty {
  type?: string;
  description?: string;
  format?: string;
  $ref?: string;
  items?: DiscoverySchemaProperty;
  properties?: Record<string, DiscoverySchemaProperty>;
  enum?: string[];
  enumDescriptions?: string[];
  default?: string;
  required?: boolean;
  additionalProperties?: DiscoverySchemaProperty;
}

interface DiscoveryResource {
  methods?: Record<string, DiscoveryMethod>;
  resources?: Record<string, DiscoveryResource>;
}

interface DiscoveryMethod {
  id: string;
  description?: string;
  httpMethod: string;
  path: string;
  parameters?: Record<string, DiscoveryParam>;
  parameterOrder?: string[];
  request?: { $ref: string };
  response?: { $ref: string };
  scopes?: string[];
  supportsMediaUpload?: boolean;
}

interface DiscoveryParam {
  type: string;
  description?: string;
  required?: boolean;
  location: "path" | "query";
  enum?: string[];
  enumDescriptions?: string[];
  default?: string;
  format?: string;
  pattern?: string;
  repeated?: boolean;
}

// ============================================================================
// Utility Functions
// ============================================================================

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function toCamelCase(s: string): string {
  return s.replace(/[._-]([a-z])/g, (_, c) => c.toUpperCase());
}

function toPascalCase(s: string): string {
  return capitalize(toCamelCase(s));
}

// ============================================================================
// Schema Generation
// ============================================================================

function discoveryTypeToEffectSchema(
  prop: DiscoverySchemaProperty,
  schemas: Record<string, DiscoverySchema>,
  indent: string = "",
  seenRefs: Set<string> = new Set(),
): string {
  // Handle $ref
  if (prop.$ref) {
    if (seenRefs.has(prop.$ref)) {
      return "Schema.Unknown";
    }
    const resolved = schemas[prop.$ref];
    if (!resolved) return "Schema.Unknown";
    return discoveryTypeToEffectSchema(
      resolved as DiscoverySchemaProperty,
      schemas,
      indent,
      new Set([...seenRefs, prop.$ref]),
    );
  }

  // Handle enum
  if (prop.enum && prop.enum.length > 0) {
    const literals = prop.enum.map((v) => `"${v}"`).join(", ");
    return `Schema.Literals([${literals}])`;
  }

  switch (prop.type) {
    case "string":
      return "Schema.String";
    case "integer":
      return "Schema.Number";
    case "number":
      return "Schema.Number";
    case "boolean":
      return "Schema.Boolean";
    case "array":
      if (prop.items) {
        const itemSchema = discoveryTypeToEffectSchema(
          prop.items,
          schemas,
          indent,
          seenRefs,
        );
        return `Schema.Array(${itemSchema})`;
      }
      return "Schema.Array(Schema.Unknown)";
    case "object":
      if (prop.properties) {
        return generateDiscoveryStructSchema(prop, schemas, indent, seenRefs);
      }
      if (prop.additionalProperties) {
        const valueSchema = discoveryTypeToEffectSchema(
          prop.additionalProperties,
          schemas,
          indent,
          seenRefs,
        );
        return `Schema.Record(Schema.String, ${valueSchema})`;
      }
      return "Schema.Record(Schema.String, Schema.Unknown)";
    default:
      return "Schema.Unknown";
  }
}

function generateDiscoveryStructSchema(
  schema: DiscoverySchemaProperty,
  schemas: Record<string, DiscoverySchema>,
  indent: string = "",
  seenRefs: Set<string> = new Set(),
): string {
  if (!schema.properties) return "Schema.Unknown";

  const lines: string[] = [];
  for (const [key, value] of Object.entries(schema.properties)) {
    const fieldSchema = discoveryTypeToEffectSchema(
      value,
      schemas,
      indent + "  ",
      seenRefs,
    );
    // Discovery docs don't have "required" arrays on schemas typically
    // Treat all fields as optional unless explicitly required
    const isRequired = value.required === true;
    if (isRequired) {
      lines.push(`${indent}  ${key}: ${fieldSchema},`);
    } else {
      lines.push(`${indent}  ${key}: Schema.optional(${fieldSchema}),`);
    }
  }

  return `Schema.Struct({\n${lines.join("\n")}\n${indent}})`;
}

// ============================================================================
// Operation Collection
// ============================================================================

interface CollectedOperation {
  id: string;
  methodName: string;
  description?: string;
  httpMethod: string;
  path: string;
  parameters?: Record<string, DiscoveryParam>;
  parameterOrder?: string[];
  requestRef?: string;
  responseRef?: string;
  resourcePath: string[];
}

function collectOperations(
  resources: Record<string, DiscoveryResource>,
  parentPath: string[] = [],
): CollectedOperation[] {
  const ops: CollectedOperation[] = [];

  for (const [resourceName, resource] of Object.entries(resources)) {
    const currentPath = [...parentPath, resourceName];

    if (resource.methods) {
      for (const [methodName, method] of Object.entries(resource.methods)) {
        ops.push({
          id: method.id,
          methodName: `${methodName}${currentPath.map(toPascalCase).join("")}`,
          description: method.description,
          httpMethod: method.httpMethod,
          path: method.path,
          parameters: method.parameters,
          parameterOrder: method.parameterOrder,
          requestRef: method.request?.$ref,
          responseRef: method.response?.$ref,
          resourcePath: currentPath,
        });
      }
    }

    if (resource.resources) {
      ops.push(...collectOperations(resource.resources, currentPath));
    }
  }

  return ops;
}

// ============================================================================
// Code Generation
// ============================================================================

function generateServiceFile(
  doc: DiscoveryDoc,
  operations: CollectedOperation[],
): string {
  const schemas = doc.schemas ?? {};
  const serviceName = doc.name;
  const serviceVersion = doc.version;
  const baseUrl = doc.rootUrl + doc.servicePath;

  const lines: string[] = [];

  // Imports
  lines.push(`import * as Schema from "effect/Schema";`);
  lines.push(`import { API } from "../client";`);
  lines.push(`import * as T from "../traits";`);
  lines.push(``);

  // Service metadata comment
  lines.push(`// Service: ${doc.title}`);
  lines.push(`// Version: ${serviceVersion}`);
  lines.push(`// Base URL: ${baseUrl}`);
  lines.push(``);

  // Generate schemas for referenced types
  const referencedSchemas = new Set<string>();
  for (const op of operations) {
    if (op.requestRef) referencedSchemas.add(op.requestRef);
    if (op.responseRef) referencedSchemas.add(op.responseRef);
  }

  // Emit referenced schemas
  for (const schemaName of referencedSchemas) {
    const schema = schemas[schemaName];
    if (!schema) continue;

    const schemaCode = discoveryTypeToEffectSchema(
      schema as DiscoverySchemaProperty,
      schemas,
    );
    lines.push(`export const ${schemaName} = ${schemaCode};`);
    lines.push(`export type ${schemaName} = typeof ${schemaName}.Type;`);
    lines.push(``);
  }

  // Generate operations
  for (const op of operations) {
    const inputSchemaName = `${toPascalCase(op.methodName)}Input`;
    const outputSchemaName = `${toPascalCase(op.methodName)}Output`;

    // Build input schema fields
    const fields: string[] = [];
    const allParams = { ...op.parameters };

    for (const [paramName, param] of Object.entries(allParams)) {
      const baseSchema =
        param.type === "integer" || param.type === "number"
          ? "Schema.Number"
          : param.type === "boolean"
            ? "Schema.Boolean"
            : param.enum
              ? `Schema.Literals([${param.enum.map((v) => `"${v}"`).join(", ")}])`
              : "Schema.String";

      const withTrait =
        param.location === "path"
          ? `${baseSchema}.pipe(T.PathParam())`
          : baseSchema;

      if (param.required) {
        fields.push(`  ${paramName}: ${withTrait},`);
      } else {
        fields.push(
          `  ${paramName}: Schema.optional(${param.location === "path" ? baseSchema : withTrait}),`,
        );
      }
    }

    // Build the full path with baseUrl
    const fullPath = `${baseUrl}${op.path}`;

    // Input schema
    lines.push(`export const ${inputSchemaName} = Schema.Struct({`);
    lines.push(fields.join("\n"));
    lines.push(
      `}).pipe(T.Http({ method: "${op.httpMethod}", path: "${fullPath}" }));`,
    );
    lines.push(
      `export type ${inputSchemaName} = typeof ${inputSchemaName}.Type;`,
    );
    lines.push(``);

    // Output schema
    if (op.responseRef && schemas[op.responseRef]) {
      lines.push(`export const ${outputSchemaName} = ${op.responseRef};`);
    } else {
      lines.push(`export const ${outputSchemaName} = Schema.Void;`);
    }
    lines.push(
      `export type ${outputSchemaName} = typeof ${outputSchemaName}.Type;`,
    );
    lines.push(``);

    // JSDoc
    if (op.description) {
      lines.push(`/**`);
      lines.push(` * ${op.description.split("\n")[0]}`);
      lines.push(` */`);
    }

    // Operation
    lines.push(
      `export const ${toCamelCase(op.methodName)} = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({`,
    );
    lines.push(`  inputSchema: ${inputSchemaName},`);
    lines.push(`  outputSchema: ${outputSchemaName},`);
    lines.push(`}));`);
    lines.push(``);
  }

  return lines.join("\n");
}

// ============================================================================
// Main
// ============================================================================

async function main() {
  const rootDir = path.join(import.meta.dir, "..");
  const specsDir = path.join(rootDir, "specs/distilled-spec-gcp/specs");
  const patchDir = path.join(rootDir, "patches");
  const servicesDir = path.join(rootDir, "src/services");

  // Check if specs directory exists
  if (!fs.existsSync(specsDir)) {
    console.error(
      `Specs directory not found: ${specsDir}\nRun 'bun run specs:fetch' first.`,
    );
    process.exit(1);
  }

  // Create services directory
  if (!fs.existsSync(servicesDir)) {
    fs.mkdirSync(servicesDir, { recursive: true });
  }

  // Find all discovery document files
  const specFiles = fs
    .readdirSync(specsDir)
    .filter(
      (f) => f.endsWith(".json") && !f.startsWith("_") && !f.startsWith("."),
    );

  console.log(`Found ${specFiles.length} discovery documents`);

  // Optional: filter by --service flag
  const serviceFilter = process.argv.find((a) => a.startsWith("--service="));
  const filterName = serviceFilter?.split("=")[1];

  let generated = 0;

  for (const specFile of specFiles) {
    const specPath = path.join(specsDir, specFile);
    const doc: DiscoveryDoc = JSON.parse(fs.readFileSync(specPath, "utf-8"));

    if (filterName && doc.name !== filterName) continue;

    // Collect operations
    if (!doc.resources) continue;
    const operations = collectOperations(doc.resources);
    if (operations.length === 0) continue;

    // Apply patches if available
    const servicePatchDir = path.join(patchDir, doc.name);
    if (fs.existsSync(servicePatchDir)) {
      const { applied, errors } = applyAllPatches(doc, servicePatchDir);
      for (const msg of applied) {
        console.log(`  ✓ ${doc.name}: ${msg}`);
      }
      if (errors.length > 0) {
        for (const msg of errors) {
          console.log(`  ✗ ${doc.name}: ${msg}`);
        }
      }
    }

    // Generate service file
    const fileName = `${doc.name}-${doc.version}.ts`;
    console.log(`Generating ${fileName} (${operations.length} operations)...`);
    const code = generateServiceFile(doc, operations);
    fs.writeFileSync(path.join(servicesDir, fileName), code);
    generated++;
  }

  // Write barrel file
  console.log("\nWriting barrel file...");
  const serviceFiles = fs
    .readdirSync(servicesDir)
    .filter((f) => f.endsWith(".ts") && f !== "index.ts");
  const barrelContent =
    serviceFiles
      .map((f) => {
        const moduleName = f.replace(".ts", "");
        return `export * as ${toPascalCase(moduleName.replace(/-/g, "_"))} from "./${moduleName}";`;
      })
      .join("\n") + "\n";
  fs.writeFileSync(path.join(servicesDir, "index.ts"), barrelContent);

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
