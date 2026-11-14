#!/usr/bin/env node
import { mkdirSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import YAML from "yaml";

const OPENAPI_SPEC_URL = "https://api.tailscale.com/api/v2?outputOpenApiSchema=true";

mkdirSync("../specs", { recursive: true });

const response = await fetch(OPENAPI_SPEC_URL, {
  headers: { "user-agent": "distilled.cloud-tailscale-spec-mirror" },
});
if (!response.ok) {
  throw new Error(`${response.status} ${response.statusText}`);
}

const spec = YAML.parse(await response.text()) as Record<string, unknown>;
if (typeof spec.openapi !== "string" || spec.paths === undefined) {
  throw new Error("not an OpenAPI document");
}

await writeFile("../specs/openapi.json", JSON.stringify(spec, null, 2) + "\n");
