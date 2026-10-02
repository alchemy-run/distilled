#!/usr/bin/env bun
/**
 * Generate the GitHub GraphQL Query SDK from the complete GraphQL model.
 *
 * Input:  .generated-graphql/github.json  (convert-graphql.ts)
 * Output: src/graphql.ts — TypeMeta + GitHubGraphQL.viewer / .enterprise / …
 */
import * as fs from "node:fs/promises";
import * as path from "node:path";
import {
  generateGraphQLClient,
  type GraphQLModel,
} from "../../core/src/codegen/graphql-client.ts";

const root = path.resolve(import.meta.dir, "..");
const model: GraphQLModel = JSON.parse(
  await fs.readFile(path.join(root, ".generated-graphql/github.json"), "utf8"),
);
const code = generateGraphQLClient(model, {
  transportImport: "./graphql-transport.ts",
  requirementsImport: "./graphql-transport.ts",
  requirementsType: "GraphQLRequirements",
  sdkName: "GitHubGraphQL",
});
await fs.writeFile(path.join(root, "src/graphql.ts"), code);
console.log(
  `GraphQL: generated Query SDK (${Object.keys(model.types).length} types) → src/graphql.ts`,
);
