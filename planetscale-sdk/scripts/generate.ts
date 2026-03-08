/**
 * PlanetScale SDK Code Generator
 *
 * Uses the shared OpenAPI generator from sdk-core to generate operations
 * from the PlanetScale OpenAPI 2.0 (Swagger) spec.
 */
import * as path from "path";
import { generateFromOpenAPI } from "@distilled.cloud/sdk-core/openapi/generate";

const rootDir = path.join(import.meta.dir, "..");

generateFromOpenAPI({
  specPath: path.join(
    rootDir,
    "specs/distilled-spec-planetscale/specs/openapi.json",
  ),
  patchDir: path.join(rootDir, "patches"),
  outputDir: path.join(rootDir, "src/operations"),
  importPrefix: "..",
  clientImport: "../client",
  traitsImport: "../traits",
  sensitiveImport: "../sensitive",
  errorsImport: "../errors",
  includeOperationErrors: true,
  statusToErrorClass: {
    "400": "BadRequest",
    "403": "Forbidden",
    "404": "NotFound",
    "409": "Conflict",
    "422": "UnprocessableEntity",
  },
  defaultErrorStatuses: new Set(["401", "429", "500", "503"]),
  formatCommand: "bunx oxfmt .",
});
