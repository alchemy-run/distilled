#!/usr/bin/env node
/**
 * Fetches the Linear GraphQL schema to ../specs/.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * Linear serves introspection without authentication, so no token is sent.
 * A single introspection JSON file is written.
 *
 * The SDL in linear/linear (`packages/sdk/src/schema.graphql`) is not used:
 * it merges in Linear's separate webhooks graph, whose types the API does
 * not serve.
 */

import { existsSync, mkdirSync } from "fs";
import { writeFile } from "fs/promises";

const ENDPOINT = "https://api.linear.app/graphql";
const SPECS_DIR = "../specs";

/**
 * The query `graphql-js` 16.14's `getIntrospectionQuery()` builds with its
 * default options, spelled out so the mirror needs no `graphql` dependency.
 */
const INTROSPECTION_QUERY = `query IntrospectionQuery {
  __schema {
    queryType { name kind }
    mutationType { name kind }
    subscriptionType { name kind }
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
  ofType { name kind ofType { name kind ofType { name kind ofType { name kind ofType { name kind
    ofType { name kind ofType { name kind ofType { name kind ofType { name kind } } } } } } } } }
}`;

interface IntrospectionType {
  readonly name: string;
  readonly fields?: ReadonlyArray<{ readonly name: string }> | null;
}

interface Introspection {
  readonly __schema: {
    readonly queryType: { readonly name: string } | null;
    readonly mutationType: { readonly name: string } | null;
    readonly types: ReadonlyArray<IntrospectionType>;
  };
}

const rootFields = (introspection: Introspection, root: { readonly name: string } | null) =>
  (introspection.__schema.types.find((type) => type.name === root?.name)?.fields ?? []).map(
    (field) => field.name,
  );

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
    body: JSON.stringify({ query: INTROSPECTION_QUERY }),
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Failed to introspect ${ENDPOINT}: ${response.status} ${response.statusText} - ${body}`,
    );
  }
  const payload = (await response.json()) as {
    data?: Introspection;
    errors?: unknown;
  };
  if (payload.errors || !Array.isArray(payload.data?.__schema?.types)) {
    throw new Error(`GraphQL introspection errors: ${JSON.stringify(payload.errors)}`);
  }
  const introspection = payload.data;
  const queries = rootFields(introspection, introspection.__schema.queryType);
  const mutations = rootFields(introspection, introspection.__schema.mutationType);
  if (!queries.includes("viewer") || !mutations.includes("teamCreate")) {
    throw new Error(
      `${ENDPOINT} did not return the Linear schema (${queries.length} queries, ${mutations.length} mutations)`,
    );
  }

  const jsonPath = `${SPECS_DIR}/schema.json`;
  console.log(`Writing ${jsonPath}...`);
  await writeFile(jsonPath, JSON.stringify(introspection, null, 2) + "\n");

  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
