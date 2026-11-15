#!/usr/bin/env -S node --conditions=bun
/**
 * Compile the complete mirrored EAS GraphQL schema, then apply error contracts.
 *
 * Input:  specs/spec-mirror-expo-eas/specs/graphql.schema.json (the
 *         `__schema` introspection JSON shipped with eas-cli)
 * Output: .generated-graphql/expo-eas.json
 *
 * Most top-level EAS fields are namespaces (`account: AccountQuery`) whose
 * fields take the arguments (`byId(accountId)`); the Query SDK selects
 * through them as ordinary nested fields: `Eas.account().byId({ accountId })`.
 */
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
const source = resolveSpecPath(root, "specs/spec-mirror-expo-eas/specs/graphql.schema.json");
const model = convertGraphQLClient(JSON.parse(await fs.readFile(source, "utf8")), {
  scalars: {
    ByteSize: "number",
    DateTime: "string",
    DevDomainName: "string",
    EnvironmentVariableEnvironment: "string",
    SubmissionAndroidTrack: "string",
    WorkerDeploymentIdentifier: "string",
    WorkerDeploymentRequestID: "string",
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
const output = path.join(root, ".generated-graphql/expo-eas.json");
writeModel(output, model);
console.log(
  `GraphQL: ${Object.keys(model.types).length} complete types; ${patches.applied} patches → ${output}`,
);
