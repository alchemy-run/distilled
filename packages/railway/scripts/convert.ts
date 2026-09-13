#!/usr/bin/env bun
/** Compile the complete mirrored GraphQL schema, then apply field error contracts. */
import * as fs from "node:fs/promises";
import * as path from "node:path";
import {
  convertGraphQLClient,
  validateGraphQLModel,
} from "../../core/src/codegen/graphql-client.ts";
import {
  applyRfc6902Files,
  listRfc6902PatchFiles,
} from "../../core/src/codegen/patches.ts";
import { resolveSpecPath } from "../../core/src/codegen/spec-path.ts";

const root = path.resolve(import.meta.dir, "..");
const source = resolveSpecPath(
  root,
  "specs/spec-mirror-railway/specs/schema.json",
);
const model = convertGraphQLClient(
  JSON.parse(await fs.readFile(source, "utf8")),
  {
    scalars: {
      DateTime: "string",
      BigInt: "string",
      SpendCommitmentFeatureId: "string",
    },
  },
);
const patches = await applyRfc6902Files(
  model,
  await listRfc6902PatchFiles(path.join(root, "patches/graphql")),
);
if (patches.errors.length) throw new Error(patches.errors.join("\n"));
validateGraphQLModel(model);
const output = path.join(root, ".generated-graphql/railway.json");
await fs.mkdir(path.dirname(output), { recursive: true });
await fs.writeFile(output, JSON.stringify(model, null, 2) + "\n");
console.log(
  `GraphQL: ${Object.keys(model.types).length} complete types; ${patches.applied} patches → ${output}`,
);
