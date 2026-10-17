#!/usr/bin/env node
/**
 * Fetches the Linear GraphQL schema to ../specs/.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * Linear serves introspection without authentication, so no token is sent.
 * Both an introspection JSON and an SDL file are written.
 *
 * The SDL in linear/linear (`packages/sdk/src/schema.graphql`) is not used:
 * it merges in Linear's separate webhooks graph, whose types the API does
 * not serve.
 */

import { existsSync, mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import {
  buildClientSchema,
  getIntrospectionQuery,
  printSchema,
  type IntrospectionQuery,
} from "graphql";

const ENDPOINT = "https://api.linear.app/graphql";
const SPECS_DIR = "../specs";

if (!existsSync(SPECS_DIR)) {
  mkdirSync(SPECS_DIR, { recursive: true });
}

async function main() {
  console.log(`Introspecting GraphQL endpoint ${ENDPOINT}...`);
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query: getIntrospectionQuery() }),
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Failed to introspect ${ENDPOINT}: ${response.status} ${response.statusText} - ${body}`,
    );
  }
  const payload = (await response.json()) as {
    data?: IntrospectionQuery;
    errors?: unknown;
  };
  if (payload.errors || !payload.data) {
    throw new Error(`GraphQL introspection errors: ${JSON.stringify(payload.errors)}`);
  }
  const introspection = payload.data;
  const schema = buildClientSchema(introspection);
  const queries = Object.keys(schema.getQueryType()?.getFields() ?? {});
  const mutations = Object.keys(schema.getMutationType()?.getFields() ?? {});
  if (!queries.includes("viewer") || !mutations.includes("teamCreate")) {
    throw new Error(
      `${ENDPOINT} did not return the Linear schema (${queries.length} queries, ${mutations.length} mutations)`,
    );
  }

  const jsonPath = `${SPECS_DIR}/schema.json`;
  console.log(`Writing ${jsonPath}...`);
  await writeFile(jsonPath, JSON.stringify(introspection, null, 2) + "\n");

  const sdlPath = `${SPECS_DIR}/schema.graphql`;
  console.log(`Writing ${sdlPath}...`);
  await writeFile(sdlPath, printSchema(schema) + "\n");

  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
