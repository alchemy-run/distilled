#!/usr/bin/env bun
/**
 * Fetches the Railway API spec(s) to ../specs/.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Sources may be OpenAPI documents (fetched via GET) or GraphQL endpoints
 * (introspected via POST). For GraphQL, both an introspection JSON and an
 * SDL file are written.
 *
 * If a source requires authentication, set SPEC_API_TOKEN in the environment
 * — it will be sent as `Authorization: Bearer <token>`.
 */

import { existsSync, mkdirSync } from "fs";
import YAML from "yaml";
import {
  buildClientSchema,
  getIntrospectionQuery,
  printSchema,
  type IntrospectionQuery,
} from "graphql";

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
    throw new Error(
      `Failed to fetch ${src.url}: ${response.status} ${response.statusText}`,
    );
  }
  const spec = parseSpec(await response.text());
  const outputPath = `${SPECS_DIR}/${src.output}.json`;
  console.log(`Writing ${outputPath}...`);
  await Bun.write(outputPath, JSON.stringify(spec, null, 2));
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
    body: JSON.stringify({ query: getIntrospectionQuery() }),
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Failed to introspect ${src.url}: ${response.status} ${response.statusText} - ${body}`,
    );
  }
  const payload = (await response.json()) as {
    data?: IntrospectionQuery;
    errors?: unknown;
  };
  if (payload.errors || !payload.data) {
    throw new Error(
      `GraphQL introspection errors: ${JSON.stringify(payload.errors)}`,
    );
  }
  const introspection = payload.data;
  const jsonPath = `${SPECS_DIR}/${src.output}.json`;
  console.log(`Writing ${jsonPath}...`);
  await Bun.write(jsonPath, JSON.stringify(introspection, null, 2));

  const schema = buildClientSchema(introspection);
  const sdlPath = `${SPECS_DIR}/${src.output}.graphql`;
  console.log(`Writing ${sdlPath}...`);
  await Bun.write(sdlPath, printSchema(schema));
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
