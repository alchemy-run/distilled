#!/usr/bin/env -S node --conditions=bun
/** Compile GitHub's public GraphQL schema, then apply field error contracts. */
import * as fs from "node:fs/promises";
import * as path from "node:path";
import {
  convertGraphQLClient,
  validateGraphQLModel,
} from "../../dev/src/codegen/graphql-client.ts";
import { writeModel } from "../../dev/src/codegen/models.ts";
import { applyRfc6902Files, listRfc6902PatchFiles } from "../../dev/src/codegen/patches.ts";
import { resolveSpecPath } from "../../dev/src/codegen/spec-path.ts";
import { applyGraphQLTelemetry, providerDefaults } from "../../dev/src/codegen/telemetry.ts";

const root = path.resolve(import.meta.dirname, "..");
const source = resolveSpecPath(root, "specs/spec-mirror-github/specs/graphql.json");
const model = convertGraphQLClient(JSON.parse(await fs.readFile(source, "utf8")), {
  scalars: {
    Base64String: "string",
    BigInt: "string",
    Date: "string",
    DateTime: "string",
    GitObjectID: "string",
    GitRefname: "string",
    GitSSHRemote: "string",
    GitTimestamp: "string",
    HTML: "string",
    PreciseDateTime: "string",
    URI: "string",
    X509Certificate: "string",
  },
});
const patches = await applyRfc6902Files(
  model,
  await listRfc6902PatchFiles(path.join(root, "patches/graphql")),
);
if (patches.errors.length) throw new Error(patches.errors.join("\n"));
// Telemetry last, so a patch's `telemetry` fields win.
applyGraphQLTelemetry(model, providerDefaults(root));
validateGraphQLModel(model);
const output = path.join(root, ".generated-graphql/github.json");
writeModel(output, model);
console.log(
  `GraphQL: ${Object.keys(model.types).length} complete types; ${patches.applied} patches → ${output}`,
);
