/**
 * Supabase SDK Code Generator
 *
 * Uses the shared OpenAPI generator from sdk-core to generate operations
 * from the Supabase Management API OpenAPI 3.0 spec.
 */
import * as path from "path";
import { generateFromOpenAPI } from "@distilled.cloud/core/openapi/generate";

const rootDir = path.join(import.meta.dir, "..");

generateFromOpenAPI({
  specPath: path.join(
    rootDir,
    "specs/distilled-spec-supabase/specs/openapi.json",
  ),
  patchDir: path.join(rootDir, "patches"),
  outputDir: path.join(rootDir, "src/operations"),
  importPrefix: "..",
  clientImport: "../client",
  traitsImport: "../traits",
  sensitiveImport: "../sensitive",
  errorsImport: "../errors",
  includeOperationErrors: false, // Supabase handles errors globally by HTTP status
  skipDeprecated: true,
});
