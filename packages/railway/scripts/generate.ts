#!/usr/bin/env -S node --conditions=bun
/**
 * Generate the Railway Query SDK from the complete GraphQL model.
 *
 * Input:  the GraphQL model scripts/convert.ts converts (in memory)
 * Output: src/graphql.ts — TypeMeta + Railway.me / Railway.project / …
 */
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { stampGeneratedAt } from "../../dev/src/codegen/generated-at.ts";
import { generateGraphQLClient, type GraphQLModel } from "../../dev/src/codegen/graphql-client.ts";
import { toLatin1 } from "../../dev/src/codegen/latin1.ts";
import { collectModels } from "../../dev/src/codegen/models.ts";

const root = path.resolve(import.meta.dirname, "..");
const models = await collectModels(() => import("./convert.ts"));
const modelText = models.get(path.join(root, ".generated-graphql/railway.json"));
if (modelText === undefined) throw new Error("convert.ts wrote no .generated-graphql/railway.json");
const model: GraphQLModel = JSON.parse(modelText);
const code = generateGraphQLClient(model, {
  transportImport: "./graphql-transport.ts",
  requirementsImport: "./graphql-transport.ts",
  requirementsType: "GraphQLRequirements",
  sdkName: "Railway",
});
await fs.writeFile(path.join(root, "src/graphql.ts"), toLatin1(code, "graphql.ts"));
stampGeneratedAt(root);
console.log(
  `GraphQL: generated Query SDK (${Object.keys(model.types).length} types) → src/graphql.ts`,
);
