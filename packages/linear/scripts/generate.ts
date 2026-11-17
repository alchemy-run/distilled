#!/usr/bin/env -S node --conditions=bun
/**
 * Generate the Linear Query SDK from the complete GraphQL model.
 *
 * Input:  the GraphQL model scripts/convert.ts converts (in memory)
 * Output: src/graphql.ts — TypeMeta + Linear.viewer / Linear.teams / …
 *         src/graphql-telemetry.ts — the model's span facts (TELEMETRY)
 */
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { stampGeneratedAt } from "../../dev/src/codegen/generated-at.ts";
import { generateGraphQLClient, type GraphQLModel } from "../../dev/src/codegen/graphql-client.ts";
import { toLatin1 } from "../../dev/src/codegen/latin1.ts";
import { collectModels } from "../../dev/src/codegen/models.ts";
import { generateGraphQLTelemetry } from "../../dev/src/codegen/telemetry.ts";

const root = path.resolve(import.meta.dirname, "..");
const models = await collectModels(() => import("./convert.ts"));
const modelText = models.get(path.join(root, ".generated-graphql/linear.json"));
if (modelText === undefined) throw new Error("convert.ts wrote no .generated-graphql/linear.json");
const model: GraphQLModel = JSON.parse(modelText);
const code = generateGraphQLClient(model, {
  transportImport: "./graphql-transport.ts",
  requirementsImport: "./graphql-transport.ts",
  requirementsType: "GraphQLRequirements",
  sdkName: "Linear",
});
await fs.writeFile(path.join(root, "src/graphql.ts"), toLatin1(code, "graphql.ts"));
await fs.writeFile(path.join(root, "src/graphql-telemetry.ts"), generateGraphQLTelemetry(model));
stampGeneratedAt(root);
console.log(
  `GraphQL: generated Query SDK (${Object.keys(model.types).length} types) → src/graphql.ts`,
);
