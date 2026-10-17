#!/usr/bin/env -S node --conditions=bun
/**
 * Generate the Linear Query SDK from the complete GraphQL model.
 *
 * Input:  .generated-graphql/linear.json  (convert.ts)
 * Output: src/graphql.ts — TypeMeta + Linear.viewer / Linear.teams / …
 */
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { stampGeneratedAt } from "../../core/src/codegen/generated-at.ts";
import { generateGraphQLClient, type GraphQLModel } from "../../core/src/codegen/graphql-client.ts";

const root = path.resolve(import.meta.dirname, "..");
const model: GraphQLModel = JSON.parse(
  await fs.readFile(path.join(root, ".generated-graphql/linear.json"), "utf8"),
);
const code = generateGraphQLClient(model, {
  transportImport: "./graphql-transport.ts",
  requirementsImport: "./graphql-transport.ts",
  requirementsType: "GraphQLRequirements",
  sdkName: "Linear",
});
await fs.writeFile(path.join(root, "src/graphql.ts"), code);
stampGeneratedAt(root);
console.log(
  `GraphQL: generated Query SDK (${Object.keys(model.types).length} types) → src/graphql.ts`,
);
