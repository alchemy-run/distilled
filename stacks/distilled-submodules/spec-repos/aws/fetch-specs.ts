#!/usr/bin/env node
/**
 * Mirrors the AWS Smithy service models into ../specs/.
 *
 * The distilled aws generator reads exactly three things:
 *
 *   - `models/<service>/service/<version>/<service>-<version>.json` — one
 *     Smithy model per AWS service, from aws/api-models-aws
 *   - `partitions.json` — the endpoint rules engine's region → partition
 *     table, from smithy-lang/smithy
 *   - `event-schemas/aws.events/<schema>.json` — the OpenAPI 3 schema of each
 *     event an AWS service sends (an SES bounce or complaint, for example),
 *     from the EventBridge schema registry's AWS-managed `aws.events` registry
 *
 * The models are pulled with a blobless, sparse, depth-1 clone: git downloads
 * the commit and its trees, we narrow the working tree to `models/` BEFORE
 * any checkout happens, and only then are blobs fetched. The gradle build,
 * the docs and the entire history are never transferred. `partitions.json` is
 * a single file, so it is fetched straight from raw.githubusercontent.com.
 *
 * The event schemas exist nowhere else in machine-readable form, and the
 * registry is an AWS API: every request is SigV4-signed, so this step needs
 * AWS credentials. In the mirror's workflow they are the repository's
 * `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` Actions secrets, minted by
 * `stacks/distilled-monorepo` for a user that can only read schemas. Locally,
 * any credentials work (`AWS_PROFILE=<profile> pnpm specs:local aws`); with
 * none set, the step is skipped and the event schemas already on disk stay.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/models/<service>/service/<version>/<service>-<version>.json
 *   ../specs/partitions.json
 *   ../specs/event-schemas/aws.events/<schema>.json
 */

import { spawn } from "child_process";
import { once } from "events";
import { mkdtempSync, rmSync } from "fs";
import { cp, mkdir, rm, writeFile } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { Credentials, Region } from "@distilled.cloud/aws";
import * as Schemas from "@distilled.cloud/aws/schemas";
import * as Effect from "effect/Effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Layer from "effect/Layer";
import * as Stream from "effect/Stream";

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

/** The AWS-managed registry that holds the events AWS services send. */
const EVENT_REGISTRY = "aws.events";

/**
 * Which schemas of {@link EVENT_REGISTRY} the mirror keeps, by name prefix.
 * A schema is named `<source>@<DetailType>`, e.g. `aws.ses@EmailBounced`.
 */
const EVENT_SCHEMA_PREFIXES = ["aws.ses@"];

/**
 * The registry is regional, and `aws.events` holds the same AWS-managed
 * schemas in every commercial region.
 */
const EVENT_REGISTRY_REGION = "us-east-1";

const EVENT_SCHEMAS_DIR = `${SPECS_DIR}/event-schemas/${EVENT_REGISTRY}`;

const env = (name: string) => {
  const value = process.env[name];
  return value === undefined || value === "" ? undefined : value;
};

/**
 * In the mirror's workflow the credentials are the repository's Actions
 * secrets, and a missing one is a broken mirror: fail. Anywhere else, use the
 * standard chain when the environment names credentials, and skip otherwise.
 */
const eventSchemaCredentials = () => {
  if (process.env.GITHUB_ACTIONS === "true") return Credentials.fromEnv();
  const named =
    env("AWS_PROFILE") !== undefined ||
    (env("AWS_ACCESS_KEY_ID") !== undefined && env("AWS_SECRET_ACCESS_KEY") !== undefined);
  return named ? Credentials.fromChain() : undefined;
};

const listEventSchemas = Effect.forEach(EVENT_SCHEMA_PREFIXES, (prefix) =>
  Schemas.listSchemas.items({ RegistryName: EVENT_REGISTRY, SchemaNamePrefix: prefix }).pipe(
    Stream.runCollect,
    Effect.map((summaries) => summaries.flatMap((summary) => summary.SchemaName ?? [])),
  ),
).pipe(Effect.map((names) => [...new Set(names.flat())].sort()));

const describeEventSchema = (name: string) =>
  Schemas.describeSchema({ RegistryName: EVENT_REGISTRY, SchemaName: name }).pipe(
    Effect.flatMap((schema) =>
      schema.Content === undefined
        ? Effect.fail(new Error(`${EVENT_REGISTRY}/${name} has no content`))
        : Effect.succeed([name, schema.Content] as const),
    ),
  );

async function fetchEventSchemas() {
  const credentials = eventSchemaCredentials();
  if (credentials === undefined) {
    console.log(
      `Skipping ${EVENT_REGISTRY} event schemas: no AWS credentials in the environment ` +
        `(set AWS_PROFILE or AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY). ` +
        `${EVENT_SCHEMAS_DIR}/ is left as it is.`,
    );
    return;
  }

  console.log(`Fetching ${EVENT_REGISTRY} schemas ${EVENT_SCHEMA_PREFIXES.join(", ")}*...`);
  const schemas = await listEventSchemas.pipe(
    Effect.flatMap((names) => Effect.forEach(names, describeEventSchema, { concurrency: 4 })),
    Effect.provide(
      Layer.mergeAll(FetchHttpClient.layer, Region.of(EVENT_REGISTRY_REGION), credentials),
    ),
    Effect.runPromise,
  );
  if (schemas.length === 0) {
    throw new Error(
      `${EVENT_REGISTRY} returned no schemas for ${EVENT_SCHEMA_PREFIXES.join(", ")}`,
    );
  }

  // Everything is in memory before the directory is replaced, so a failed run
  // never leaves half a set behind, and a schema AWS removed disappears.
  console.log(`Writing ${schemas.length} schemas to ${EVENT_SCHEMAS_DIR}/...`);
  await rm(EVENT_SCHEMAS_DIR, { recursive: true, force: true });
  await mkdir(EVENT_SCHEMAS_DIR, { recursive: true });
  for (const [name, content] of schemas) {
    const pretty = `${JSON.stringify(JSON.parse(content), null, 2)}\n`;
    await writeFile(join(EVENT_SCHEMAS_DIR, `${name}.json`), pretty);
  }
}

async function main() {
  await fetchModels();
  await fetchPartitions();
  await fetchEventSchemas();
  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
