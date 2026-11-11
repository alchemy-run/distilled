#!/usr/bin/env node
/**
 * Fetches Fly.io's API descriptions to ../specs/.
 *
 *   ../specs/openapi.json   Machines API (OpenAPI 3.1), including Managed
 *                           Postgres under /v1/postgres
 *                           https://docs.fly.io/api/machines/openapi.json
 *   ../specs/sprites.json   Sprites API (OpenAPI 3.1)
 *                           https://api.sprites.dev/openapi.json
 *   ../specs/graphql.json   Fly GraphQL API, the standard introspection
 *                           result from https://api.fly.io/graphql (open to
 *                           unauthenticated introspection)
 *   ../specs/mpg.json       Managed Postgres through Fly's internal
 *                           /api/v1/organizations/{org}/postgresv2 endpoints,
 *                           which have no published description: hand-written
 *                           in alchemy-run/distilled at
 *                           stacks/distilled-submodules/spec-repos/fly-io/models/,
 *                           deployed to .meta/models/ and copied here
 *
 * Usage:
 *   node fetch-specs.ts
 */

import { copyFileSync, mkdirSync } from "fs";
import { writeFile } from "fs/promises";

const SPECS_DIR = "../specs";
const USER_AGENT = "distilled.cloud-fly-io-spec-mirror";

const INTROSPECTION_QUERY = `query IntrospectionQuery {
  __schema {
    queryType { name }
    mutationType { name }
    subscriptionType { name }
    types { ...FullType }
    directives { name description locations args { ...InputValue } }
  }
}
fragment FullType on __Type {
  kind name description
  fields(includeDeprecated: true) {
    name description args { ...InputValue } type { ...TypeRef }
    isDeprecated deprecationReason
  }
  inputFields { ...InputValue }
  interfaces { ...TypeRef }
  enumValues(includeDeprecated: true) { name description isDeprecated deprecationReason }
  possibleTypes { ...TypeRef }
}
fragment InputValue on __InputValue { name description type { ...TypeRef } defaultValue }
fragment TypeRef on __Type {
  kind name
  ofType { kind name ofType { kind name ofType { kind name ofType { kind name
    ofType { kind name ofType { kind name ofType { kind name } } } } } } }
}`;

async function fetchJson(url: string, init: RequestInit = {}): Promise<any> {
  const res = await fetch(url, {
    ...init,
    headers: { accept: "application/json", "user-agent": USER_AGENT, ...init.headers },
  });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  return res.json();
}

function assertOpenApi(url: string, doc: any) {
  if (typeof doc?.openapi !== "string" || typeof doc.paths !== "object") {
    throw new Error(`${url} returned JSON without \`openapi\`/\`paths\` — not an OpenAPI document`);
  }
}

const save = (file: string, json: unknown) =>
  writeFile(`${SPECS_DIR}/${file}`, JSON.stringify(json, null, 2) + "\n");

async function main() {
  mkdirSync(SPECS_DIR, { recursive: true });

  for (const [file, url] of [
    ["openapi.json", "https://docs.fly.io/api/machines/openapi.json"],
    ["sprites.json", "https://api.sprites.dev/openapi.json"],
  ] as const) {
    console.log(`Fetching ${url}...`);
    const doc = await fetchJson(url);
    assertOpenApi(url, doc);
    await save(file, doc);
  }

  const graphqlUrl = "https://api.fly.io/graphql";
  console.log(`Introspecting ${graphqlUrl}...`);
  const result = await fetchJson(graphqlUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query: INTROSPECTION_QUERY }),
  });
  if (result.errors || !Array.isArray(result.data?.__schema?.types)) {
    throw new Error(
      `${graphqlUrl} introspection failed: ${JSON.stringify(result.errors ?? result).slice(0, 500)}`,
    );
  }
  await save("graphql.json", result.data);

  copyFileSync("models/mpg.json", `${SPECS_DIR}/mpg.json`);
  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
