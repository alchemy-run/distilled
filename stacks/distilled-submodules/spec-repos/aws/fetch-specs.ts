#!/usr/bin/env node
/**
 * Mirrors the AWS Smithy service models into ../specs/.
 *
 * The distilled aws generator reads exactly two things:
 *
 *   - `models/<service>/service/<version>/<service>-<version>.json` — one
 *     Smithy model per AWS service, from aws/api-models-aws
 *   - `partitions.json` — the endpoint rules engine's region → partition
 *     table, from smithy-lang/smithy
 *   - `iam/<prefix>.json` — AWS's Service Authorization Reference, one file
 *     per IAM service prefix: which actions each API operation is authorized
 *     as, which resource types each action can be scoped to (`*`-suffixed when
 *     required), and their ARN formats. Codegen gives every operation its
 *     `iam` from it.
 *
 * The models are pulled with a blobless, sparse, depth-1 clone: git downloads
 * the commit and its trees, we narrow the working tree to `models/` BEFORE
 * any checkout happens, and only then are blobs fetched. The gradle build,
 * the docs and the entire history are never transferred. `partitions.json` is
 * a single file, so it is fetched straight from raw.githubusercontent.com.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/models/<service>/service/<version>/<service>-<version>.json
 *   ../specs/partitions.json
 *   ../specs/iam/<prefix>.json
 */

import { spawn } from "child_process";
import { once } from "events";
import { mkdtempSync, rmSync } from "fs";
import { cp, mkdir, rm, writeFile } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";

const MODELS_REPO = "https://github.com/aws/api-models-aws.git";
const MODELS_REF = "main";

/** The one directory of {@link MODELS_REPO} the generator reads. */
const MODELS_DIR = "models";

const PARTITIONS_URL =
  "https://raw.githubusercontent.com/smithy-lang/smithy/main/smithy-aws-endpoints/src/main/resources/software/amazon/smithy/rulesengine/aws/language/functions/partition/partitions.json";

const SPECS_DIR = "../specs";

const git = async (cwd: string, ...args: string[]) => {
  const proc = spawn("git", args, { cwd, stdio: ["ignore", "inherit", "inherit"] });
  const [code] = await once(proc, "close");
  if (code !== 0) {
    throw new Error(`git ${args.join(" ")} failed with exit code ${code}`);
  }
};

async function fetchModels() {
  const workdir = mkdtempSync(join(tmpdir(), "spec-mirror-aws-"));
  try {
    console.log(`Cloning ${MODELS_REPO} (blobless, sparse, depth 1)...`);
    // --no-checkout + --sparse: nothing lands in the working tree until the
    // sparse patterns below are set, so the blobs outside models/ are never
    // fetched at all.
    await git(
      workdir,
      "clone",
      "--filter=blob:none",
      "--no-checkout",
      "--sparse",
      "--depth=1",
      "--branch",
      MODELS_REF,
      MODELS_REPO,
      "repo",
    );

    const repo = join(workdir, "repo");
    console.log(`Narrowing the checkout to ${MODELS_DIR}/...`);
    await git(repo, "sparse-checkout", "set", "--cone", MODELS_DIR);
    await git(repo, "checkout", MODELS_REF);

    const dest = `${SPECS_DIR}/${MODELS_DIR}`;
    console.log(`Writing ${dest}/...`);
    // Replace rather than merge, so a service Amazon removed upstream also
    // disappears from the mirror.
    await rm(dest, { recursive: true, force: true });
    await mkdir(SPECS_DIR, { recursive: true });
    await cp(join(repo, MODELS_DIR), dest, { recursive: true });
  } finally {
    rmSync(workdir, { recursive: true, force: true });
  }
}

async function fetchPartitions() {
  console.log(`Fetching ${PARTITIONS_URL}...`);
  const response = await fetch(PARTITIONS_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${PARTITIONS_URL}: ${response.status} ${response.statusText}`);
  }
  const outputPath = `${SPECS_DIR}/partitions.json`;
  console.log(`Writing ${outputPath}...`);
  await writeFile(outputPath, new Uint8Array(await response.arrayBuffer()));
}

const IAM_INDEX_URL = "https://servicereference.us-east-1.amazonaws.com/";
const IAM_HTML_BASE = "https://docs.aws.amazon.com/service-authorization/latest/reference/";

const fetchText = async (url: string) => {
  for (let attempt = 1; ; attempt++) {
    const response = await fetch(url);
    if (response.ok) return response.text();
    if (attempt === 4 || response.status < 500) {
      throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
    }
    await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
  }
};

/** Run `f` over `items`, `limit` at a time. */
const pool = async <A, B>(items: readonly A[], limit: number, f: (a: A) => Promise<B>) => {
  const results: B[] = [];
  let next = 0;
  await Promise.all(
    Array.from({ length: limit }, async () => {
      while (next < items.length) {
        const i = next++;
        results[i] = await f(items[i]!);
      }
    }),
  );
  return results;
};

interface ReferenceService {
  Actions?: { Name: string; Resources?: { Name: string }[] }[];
  Resources?: { Name: string; ARNFormats?: string[] }[];
  Operations?: {
    Name: string;
    AuthorizedActions?: { Name: string; Service: string }[];
    SDK?: { Name: string; Package: string }[];
  }[];
}

async function fetchIamReference() {
  console.log(`Fetching ${IAM_INDEX_URL}...`);
  const index = JSON.parse(await fetchText(IAM_INDEX_URL)) as { service: string; url: string }[];

  // Only the HTML reference marks which resource types an action requires
  // (`queue*`); the JSON lists the types alone.
  const toc = await fetchText(
    `${IAM_HTML_BASE}reference_policies_actions-resources-contextkeys.html`,
  );
  const pages = [
    ...new Set([...toc.matchAll(/href="\.\/(list_[a-z0-9-]+\.html)"/g)].map((m) => m[1]!)),
  ];
  console.log(`Reading which resource types are required from ${pages.length} pages...`);
  const required = new Map<string, Map<string, Set<string>>>();
  await pool(pages, 16, async (page) => {
    const html = await fetchText(`${IAM_HTML_BASE}${page}`);
    const prefix = /service prefix: <code[^>]*>([^<]+)<\/code>/.exec(html)?.[1]?.trim();
    if (!prefix) return;
    const id = page.slice(0, -5);
    const actionRow = new RegExp(`id="${id}-action-(\\w+)"`);
    const resourceLink = new RegExp(`href="#${id}-resource-[^"]*">([^<]+)</a>`, "g");
    const actions = new Map<string, Set<string>>();
    let current: Set<string> | undefined;
    for (const row of html.matchAll(/<tr>([\s\S]*?)<\/tr>/g)) {
      const action = actionRow.exec(row[1]!)?.[1];
      if (action) {
        current = new Set();
        actions.set(action, current);
      }
      if (!current) continue;
      for (const r of row[1]!.matchAll(resourceLink)) {
        const type = r[1]!.trim();
        if (type.endsWith("*")) current.add(type.slice(0, -1));
      }
    }
    // Several pages can share a prefix (Greengrass v1 and v2, SES v1 and
    // v2): merge them, never let the later page replace the earlier one.
    const merged = required.get(prefix) ?? new Map<string, Set<string>>();
    for (const [action, types] of actions) {
      merged.set(action, new Set([...(merged.get(action) ?? []), ...types]));
    }
    required.set(prefix, merged);
  });

  const dest = `${SPECS_DIR}/iam`;
  console.log(`Writing ${dest}/ (${index.length} services)...`);
  await rm(dest, { recursive: true, force: true });
  await mkdir(dest, { recursive: true });
  await pool(index, 16, async ({ service, url }) => {
    const doc = JSON.parse(await fetchText(url)) as ReferenceService;
    const req = required.get(service) ?? new Map<string, Set<string>>();
    const entry = {
      prefix: service,
      operations: Object.fromEntries(
        (doc.Operations ?? []).map((o) => [
          o.Name,
          {
            actions: (o.AuthorizedActions ?? []).map((a) => `${a.Service}:${a.Name}`),
            sdk: [
              ...new Set((o.SDK ?? []).filter((s) => s.Package === "Boto3").map((s) => s.Name)),
            ],
          },
        ]),
      ),
      actions: Object.fromEntries(
        (doc.Actions ?? []).map((a) => [
          a.Name,
          (a.Resources ?? []).map((r) => (req.get(a.Name)?.has(r.Name) ? `${r.Name}*` : r.Name)),
        ]),
      ),
      resources: Object.fromEntries((doc.Resources ?? []).map((r) => [r.Name, r.ARNFormats ?? []])),
    };
    await writeFile(`${dest}/${service}.json`, `${JSON.stringify(entry, null, 2)}\n`);
  });
}

async function main() {
  await fetchModels();
  await fetchPartitions();
  await fetchIamReference();
  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
