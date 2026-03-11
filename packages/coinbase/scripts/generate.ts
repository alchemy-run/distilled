/**
 * Coinbase SDK Code Generator
 *
 * Uses the shared OpenAPI generator from sdk-core to generate operations
 * from the Coinbase CDP OpenAPI spec.
 *
 * The CDP spec is in YAML format, so we convert it to JSON before passing
 * it to the shared generator which expects JSON.
 */
import * as fs from "fs";
import * as path from "path";
import YAML from "yaml";
import { generateFromOpenAPI } from "@distilled.cloud/core/openapi/generate";

const rootDir = path.join(import.meta.dir, "..");

// Convert YAML spec to JSON for the generator
const yamlPath = path.join(rootDir, "specs/cdp-sdk/openapi.yaml");
const jsonPath = path.join(rootDir, "specs/cdp-sdk/openapi.json");
const yamlContent = fs.readFileSync(yamlPath, "utf-8");
const spec = YAML.parse(yamlContent);
fs.writeFileSync(jsonPath, JSON.stringify(spec, null, 2));

generateFromOpenAPI({
  specPath: jsonPath,
  patchDir: path.join(rootDir, "patches"),
  outputDir: path.join(rootDir, "src/operations"),
  importPrefix: "..",
  clientImport: "../client",
  traitsImport: "../traits",
  sensitiveImport: "../sensitive",
  errorsImport: "../errors",
  includeOperationErrors: false, // Coinbase handles errors globally by HTTP status
  skipDeprecated: true,
});

// Clean up temporary JSON file
fs.unlinkSync(jsonPath);
