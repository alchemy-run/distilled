import * as fs from "fs";
import * as path from "path";

// ============================================================================
// JSON Patch (RFC 6902) Implementation
// ============================================================================

interface JsonPatchOperation {
  op: "add" | "remove" | "replace" | "move" | "copy" | "test";
  path: string;
  value?: unknown;
  from?: string;
}

type JsonPatch = JsonPatchOperation[];

interface PatchFile {
  description: string;
  patches: JsonPatch;
}

/**
 * Parse a JSON Pointer (RFC 6901) path into segments
 */
function parseJsonPointer(pointer: string): string[] {
  if (pointer === "") return [];
  if (!pointer.startsWith("/")) {
    throw new Error(`Invalid JSON Pointer: ${pointer}`);
  }
  return pointer
    .slice(1)
    .split("/")
    .map((segment) => segment.replace(/~1/g, "/").replace(/~0/g, "~"));
}

/**
 * Get a value at a JSON Pointer path
 */
function getValueAtPath(obj: unknown, pointer: string): unknown {
  const segments = parseJsonPointer(pointer);
  let current: unknown = obj;

  for (const segment of segments) {
    if (current === null || typeof current !== "object") {
      throw new Error(`Cannot traverse path ${pointer}: not an object`);
    }
    if (Array.isArray(current)) {
      const index = segment === "-" ? current.length : parseInt(segment, 10);
      current = current[index];
    } else {
      current = (current as Record<string, unknown>)[segment];
    }
  }

  return current;
}

/**
 * Set a value at a JSON Pointer path
 */
function setValueAtPath(obj: unknown, pointer: string, value: unknown): void {
  const segments = parseJsonPointer(pointer);
  if (segments.length === 0) {
    throw new Error("Cannot set value at root path");
  }

  let current: unknown = obj;

  for (let i = 0; i < segments.length - 1; i++) {
    const segment = segments[i]!;
    if (current === null || typeof current !== "object") {
      throw new Error(`Cannot traverse path ${pointer}: not an object`);
    }
    if (Array.isArray(current)) {
      const index = parseInt(segment, 10);
      current = current[index];
    } else {
      current = (current as Record<string, unknown>)[segment];
    }
  }

  const lastSegment = segments[segments.length - 1]!;
  if (current === null || typeof current !== "object") {
    throw new Error(
      `Cannot set value at path ${pointer}: parent is not an object`,
    );
  }

  if (Array.isArray(current)) {
    const index =
      lastSegment === "-" ? current.length : parseInt(lastSegment, 10);
    if (lastSegment === "-") {
      current.push(value);
    } else {
      current[index] = value;
    }
  } else {
    (current as Record<string, unknown>)[lastSegment] = value;
  }
}

/**
 * Remove a value at a JSON Pointer path
 */
function removeValueAtPath(obj: unknown, pointer: string): void {
  const segments = parseJsonPointer(pointer);
  if (segments.length === 0) {
    throw new Error("Cannot remove root");
  }

  let current: unknown = obj;

  for (let i = 0; i < segments.length - 1; i++) {
    const segment = segments[i]!;
    if (current === null || typeof current !== "object") {
      throw new Error(`Cannot traverse path ${pointer}: not an object`);
    }
    if (Array.isArray(current)) {
      current = current[parseInt(segment, 10)];
    } else {
      current = (current as Record<string, unknown>)[segment];
    }
  }

  const lastSegment = segments[segments.length - 1]!;
  if (current === null || typeof current !== "object") {
    throw new Error(
      `Cannot remove at path ${pointer}: parent is not an object`,
    );
  }

  if (Array.isArray(current)) {
    current.splice(parseInt(lastSegment, 10), 1);
  } else {
    delete (current as Record<string, unknown>)[lastSegment];
  }
}

/**
 * Apply a single JSON Patch operation
 */
function applyOperation(obj: unknown, operation: JsonPatchOperation): void {
  switch (operation.op) {
    case "add":
      setValueAtPath(obj, operation.path, operation.value);
      break;
    case "remove":
      removeValueAtPath(obj, operation.path);
      break;
    case "replace":
      // For replace, the path must exist
      getValueAtPath(obj, operation.path); // throws if doesn't exist
      setValueAtPath(obj, operation.path, operation.value);
      break;
    case "move": {
      if (!operation.from) throw new Error("move operation requires 'from'");
      const moveValue = getValueAtPath(obj, operation.from);
      removeValueAtPath(obj, operation.from);
      setValueAtPath(obj, operation.path, moveValue);
      break;
    }
    case "copy": {
      if (!operation.from) throw new Error("copy operation requires 'from'");
      const copyValue = getValueAtPath(obj, operation.from);
      setValueAtPath(
        obj,
        operation.path,
        JSON.parse(JSON.stringify(copyValue)),
      );
      break;
    }
    case "test": {
      const testValue = getValueAtPath(obj, operation.path);
      if (JSON.stringify(testValue) !== JSON.stringify(operation.value)) {
        throw new Error(
          `Test operation failed at ${operation.path}: expected ${JSON.stringify(operation.value)}, got ${JSON.stringify(testValue)}`,
        );
      }
      break;
    }
    default:
      throw new Error(`Unknown operation: ${(operation as { op: string }).op}`);
  }
}

/**
 * Apply a JSON Patch to an object (mutates in place)
 */
export function applyPatch(obj: unknown, patch: JsonPatch): void {
  for (const operation of patch) {
    applyOperation(obj, operation);
  }
}

/**
 * Load and apply all patches from the specs directory
 */
export function applyAllPatches(
  spec: unknown,
  specsDir: string,
): { applied: string[]; errors: string[] } {
  const applied: string[] = [];
  const errors: string[] = [];

  // Find all .patch.json files
  const files = fs
    .readdirSync(specsDir)
    .filter((f) => f.endsWith(".patch.json"));

  for (const file of files) {
    const filePath = path.join(specsDir, file);
    try {
      const content = fs.readFileSync(filePath, "utf-8");
      const patchFile: PatchFile = JSON.parse(content);
      applyPatch(spec, patchFile.patches);
      applied.push(`${file}: ${patchFile.description}`);
    } catch (error) {
      errors.push(
        `${file}: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  return { applied, errors };
}

// ============================================================================
// CLI: Run standalone to test patches
// ============================================================================

if (import.meta.main) {
  const specsDir = path.join(process.cwd(), "specs");
  const specPath = path.join(specsDir, "openapi.json");

  console.log("Loading OpenAPI spec...");
  const specContent = fs.readFileSync(specPath, "utf-8");
  const spec = JSON.parse(specContent);

  console.log("Applying patches...\n");
  const { applied, errors } = applyAllPatches(spec, specsDir);

  if (applied.length > 0) {
    console.log("Applied patches:");
    for (const msg of applied) {
      console.log(`  ✓ ${msg}`);
    }
  }

  if (errors.length > 0) {
    console.log("\nErrors:");
    for (const msg of errors) {
      console.log(`  ✗ ${msg}`);
    }
    process.exit(1);
  }

  console.log(`\nSuccessfully applied ${applied.length} patch(es).`);
}
