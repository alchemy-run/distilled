#!/usr/bin/env bun
/** Generate GraphQL-native API from committed complete graph + field contracts. */
import * as fs from "node:fs/promises";
import * as path from "node:path";
import {
  generateGraphQLClient,
  type GraphQLModel,
} from "../../core/src/codegen/graphql-client.ts";
import { toVerbNoun } from "../../core/src/codegen/rewrite-operation-ids.ts";

const root = path.resolve(import.meta.dir, "..");
const model: GraphQLModel = JSON.parse(
  await fs.readFile(path.join(root, ".generated-graphql/railway.json"), "utf8"),
);
const operationNames = [model.queryType, model.mutationType].flatMap((name) =>
  Object.keys(model.types[name ?? ""]?.fields ?? {}),
);
const operationAliases = Object.fromEntries(
  operationNames.map((name) => [toVerbNoun(name), name]),
);
const code = generateGraphQLClient(model, {
  transportImport: "./graphql-transport.ts",
  requirementsImport: "./graphql-transport.ts",
  requirementsType: "GraphQLRequirements",
  operationAliases,
});
await fs.writeFile(path.join(root, "src/graphql.ts"), code);
console.log(
  `GraphQL: generated ${operationNames.length} selective operations → src/graphql.ts`,
);
