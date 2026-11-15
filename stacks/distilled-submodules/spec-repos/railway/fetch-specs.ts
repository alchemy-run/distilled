#!/usr/bin/env node
/**
 * Fetches the Railway API spec(s) to ../specs/.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * Sources may be OpenAPI documents (fetched via GET) or GraphQL endpoints
 * (introspected via POST). Either way a single JSON file is written.
 *
 * If a source requires authentication, set SPEC_API_TOKEN in the environment
 * — it will be sent as `Authorization: Bearer <token>`.
 */

import { existsSync, mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import YAML from "yaml";

interface SpecSource {
  url: string;
  type: "openapi" | "graphql";
  output: string;
}

const SOURCES: SpecSource[] = [
  {
    url: "https://backboard.railway.com/graphql/v2",
    type: "graphql",
    output: "schema",
  },
];
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

if (!existsSync(SPECS_DIR)) {
  mkdirSync(SPECS_DIR, { recursive: true });
}

function parseSpec(body: string): unknown {
  try {
    return JSON.parse(body);
  } catch {
    return YAML.parse(body);
  }
}

function authHeaders(): Record<string, string> {
  const token = process.env.SPEC_API_TOKEN;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function fetchOpenApi(src: SpecSource) {
  console.log(`Fetching OpenAPI spec from ${src.url}...`);
  const response = await fetch(src.url, { headers: authHeaders() });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${src.url}: ${response.status} ${response.statusText}`);
  }
  const spec = parseSpec(await response.text());
  const outputPath = `${SPECS_DIR}/${src.output}.json`;
  console.log(`Writing ${outputPath}...`);
  await writeFile(outputPath, JSON.stringify(spec, null, 2));
}

async function fetchGraphQL(src: SpecSource) {
  console.log(`Introspecting GraphQL endpoint ${src.url}...`);
  const response = await fetch(src.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify({ query: INTROSPECTION_QUERY }),
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Failed to introspect ${src.url}: ${response.status} ${response.statusText} - ${body}`,
    );
  }
  const payload = (await response.json()) as {
    data?: { __schema?: { types?: unknown } };
    errors?: unknown;
  };
  if (payload.errors || !Array.isArray(payload.data?.__schema?.types)) {
    throw new Error(`GraphQL introspection errors: ${JSON.stringify(payload.errors)}`);
  }
  const introspection = payload.data;
  const jsonPath = `${SPECS_DIR}/${src.output}.json`;
  console.log(`Writing ${jsonPath}...`);
  await writeFile(jsonPath, JSON.stringify(introspection, null, 2));
}

async function main() {
  for (const src of SOURCES) {
    if (src.type === "graphql") {
      await fetchGraphQL(src);
    } else {
      await fetchOpenApi(src);
    }
  }
  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
