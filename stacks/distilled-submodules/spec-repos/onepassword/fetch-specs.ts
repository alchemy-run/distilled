#!/usr/bin/env node
/**
 * Fetches 1Password's published OpenAPI specs and vendor docs to ../specs/.
 *
 * 1Password publishes one OpenAPI document per API:
 *
 *   Connect      self-hosted Connect server (vaults, items, files)
 *                1Password/connect repository, OpenAPI 3.0.2
 *   Events       audit events, item usages, sign-in attempts
 *                1password.dev, OpenAPI 3.0.0
 *   Users        list / suspend / reactivate users (OAuth 2.0 bearer)
 *                1password.dev, OpenAPI 3.1.0
 *   OAuth        token endpoint the Users API authorizes with
 *                1password.dev, OpenAPI 3.1.0
 *   Partnership  partner billing-account provisioning
 *                1password.dev, OpenAPI 3.0.0
 *
 * Each YAML document is parsed and written as JSON. Vendor docs pages are
 * snapshotted next to them so generate never has to crawl 1password.dev live.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * Written to:
 *   ../specs/openapi.json       (Connect; the original file name is kept)
 *   ../specs/events.json
 *   ../specs/users.json
 *   ../specs/oauth.json
 *   ../specs/partnership.json
 *   ../specs/docs/*.md
 */

const SPECS: ReadonlyArray<{ url: string; output: string }> = [
  {
    url: "https://raw.githubusercontent.com/1Password/connect/main/docs/openapi/spec.yaml",
    output: "openapi.json",
  },
  {
    url: "https://www.1password.dev/openapi/events_api.yaml",
    output: "events.json",
  },
  {
    url: "https://www.1password.dev/openapi/users_api.yaml",
    output: "users.json",
  },
  {
    url: "https://www.1password.dev/openapi/oauth_api.yaml",
    output: "oauth.json",
  },
  {
    url: "https://www.1password.dev/openapi/partnership_api.yaml",
    output: "partnership.json",
  },
];

const SPECS_DIR = "../specs";

const DOCS: ReadonlyArray<{ url: string; output: string }> = [
  {
    url: "https://www.1password.dev/connect/api-reference.md",
    output: "docs/api-reference.md",
  },
  {
    url: "https://www.1password.dev/connect/get-started.md",
    output: "docs/get-started.md",
  },
  {
    url: "https://www.1password.dev/connect/overview.md",
    output: "docs/overview.md",
  },
  {
    url: "https://www.1password.dev/events-api/introduction.md",
    output: "docs/events-api-introduction.md",
  },
  {
    url: "https://www.1password.dev/events-api/reference.md",
    output: "docs/events-api-reference.md",
  },
  {
    url: "https://www.1password.dev/users-api.md",
    output: "docs/users-api-overview.md",
  },
  {
    url: "https://www.1password.dev/users-api/reference.md",
    output: "docs/users-api-reference.md",
  },
  {
    url: "https://www.1password.dev/partnership-api/reference.md",
    output: "docs/partnership-api-reference.md",
  },
];

import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import YAML from "yaml";

mkdirSync(SPECS_DIR, { recursive: true });
mkdirSync(`${SPECS_DIR}/docs`, { recursive: true });

const headers = {
  accept: "text/yaml, application/yaml, text/plain, text/markdown, */*",
  "user-agent": "distilled.cloud-onepassword-spec-mirror",
};

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  return await response.text();
}

async function main() {
  for (const { url, output } of SPECS) {
    console.log(`Fetching OpenAPI spec from ${url}...`);
    const spec = YAML.parse(await fetchText(url)) as Record<string, unknown> | null;

    // Fail here rather than three steps later in the generator: a login page
    // or a gutted response is still valid YAML, but it is not an OpenAPI
    // document.
    if (spec === null || typeof spec.openapi !== "string" || spec.paths === undefined) {
      throw new Error(
        `${url} returned YAML without \`openapi\`/\`paths\` — not an OpenAPI document`,
      );
    }

    const outputPath = `${SPECS_DIR}/${output}`;
    console.log(
      `Writing ${outputPath} (OpenAPI ${spec.openapi}, ${Object.keys(spec.paths as object).length} paths)...`,
    );
    await writeFile(outputPath, JSON.stringify(spec, null, 2) + "\n");
  }

  for (const doc of DOCS) {
    console.log(`Fetching ${doc.url}...`);
    const body = await fetchText(doc.url);
    if (body.trim().length === 0 || /^\s*<(!DOCTYPE|html)/i.test(body)) {
      throw new Error(`${doc.url} returned an empty or HTML body — not vendor docs`);
    }
    const outputPath = `${SPECS_DIR}/${doc.output}`;
    console.log(`Writing ${outputPath}...`);
    await writeFile(outputPath, body.endsWith("\n") ? body : body + "\n");
  }

  console.log(`Done! ${SPECS.length} OpenAPI documents, ${DOCS.length} docs pages`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
