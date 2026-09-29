#!/usr/bin/env bun
/**
 * convert-graphql — GitHub's GraphQL schema → the GraphQL client model in
 * .generated-graphql/github.json.
 *
 * The mirror carries the SDL GitHub publishes for its docs site
 * (`schema.docs.graphql`), not an introspection result. It is built with
 * `assumeValid` because GitHub's own schema breaks one of graphql-js's
 * rules — some implementations deprecate a field their interface does not —
 * which would otherwise stop `introspectionFromSchema`. The result matches
 * a live introspection of api.github.com type for type, minus the Apollo
 * federation internals `_Any` and `_Entity`.
 *
 * Error contracts are RFC-6902 patches in patches/graphql/, applied here to
 * the model — never to the generated TypeScript.
 */
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { buildASTSchema, introspectionFromSchema, parse } from "graphql";
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
  "specs/spec-mirror-github/specs/schema.docs.graphql",
);
const schema = buildASTSchema(parse(await fs.readFile(source, "utf8")), {
  assumeValid: true,
  assumeValidSDL: true,
});
const model = convertGraphQLClient(introspectionFromSchema(schema), {
  scalars: {
    Base64String: "string",
    BigInt: "string",
    CustomPropertyValue: "unknown",
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
validateGraphQLModel(model);
const output = path.join(root, ".generated-graphql/github.json");
await fs.mkdir(path.dirname(output), { recursive: true });
await fs.writeFile(output, JSON.stringify(model, null, 2) + "\n");
console.log(
  `GraphQL: ${Object.keys(model.types).length} complete types; ${patches.applied} patches → ${output}`,
);
