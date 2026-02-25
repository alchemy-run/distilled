#!/usr/bin/env bun
/**
 * Delete every D1 database in a Cloudflare account.
 *
 * Usage:
 *   bun scripts/delete-all-d1.ts                  # Dry run (list only)
 *   bun scripts/delete-all-d1.ts --confirm        # Actually delete
 *   bun scripts/delete-all-d1.ts --confirm --force # Skip interactive prompt
 */

import { NodeRuntime, NodeServices } from "@effect/platform-node";
import { Console, Effect, Layer, Logger, Redacted } from "effect";
import { MinimumLogLevel } from "effect/References";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import * as Auth from "../src/auth.ts";
import { deleteDatabase } from "../src/services/d1.ts";
import * as Retry from "../src/retry.ts";

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------

const args = new Set(process.argv.slice(2));
const confirm = args.has("--confirm");
const force = args.has("--force");

// ---------------------------------------------------------------------------
// Cloudflare list databases (not in generated SDK yet)
// ---------------------------------------------------------------------------

const CLOUDFLARE_API_BASE = "https://api.cloudflare.com/client/v4";

interface D1Database {
  uuid: string;
  name: string;
  version: string;
  created_at: string;
  num_tables: number;
  file_size: number;
  running_in_region?: string;
  primary_in_region?: string;
  primary_in_region_since?: string;
  read_replication?: {
    mode: "auto" | "disabled";
  };
}

interface CloudflareListResponse {
  success: boolean;
  errors: { code: number; message: string }[];
  messages: { code: number; message: string }[];
  result: D1Database[];
  result_info?: {
    page: number;
    per_page: number;
    count: number;
    total_count: number;
  };
}

/**
 * List all D1 databases in the account, paginating through all pages.
 */
const listAllDatabases = Effect.gen(function* () {
  const client = yield* HttpClient.HttpClient;
  const auth = yield* Auth.ApiToken;
  const accountId = getAccountId();

  const databases: D1Database[] = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const url = `${CLOUDFLARE_API_BASE}/accounts/${accountId}/d1/database?page=${page}&per_page=${perPage}`;

    const headers: Record<string, string> = {};
    if (auth.auth.type === "token") {
      headers["Authorization"] = `Bearer ${Redacted.value(auth.auth.token)}`;
    } else if (auth.auth.type === "oauth") {
      headers["Authorization"] =
        `Bearer ${Redacted.value(auth.auth.accessToken)}`;
    } else {
      headers["X-Auth-Key"] = Redacted.value(auth.auth.apiKey);
      headers["X-Auth-Email"] = auth.auth.email;
    }

    const request = HttpClientRequest.get(url).pipe(
      HttpClientRequest.setHeaders(headers),
    );

    const response = yield* client.execute(request);
    const json = (yield* response.json) as CloudflareListResponse;

    if (!json.success) {
      yield* Effect.fail(
        new Error(`Cloudflare API error: ${JSON.stringify(json.errors)}`),
      );
    }

    databases.push(...json.result);

    // Check if there are more pages (D1 API doesn't return total_pages)
    const info = json.result_info;
    // If we got fewer results than per_page, we're on the last page
    if (!info || json.result.length < perPage) {
      break;
    }
    page++;
  }

  return databases;
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const getAccountId = (): string => {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  if (!accountId) {
    throw new Error("CLOUDFLARE_ACCOUNT_ID environment variable is not set");
  }
  return accountId;
};

/**
 * Prompt the user for confirmation on stdin.
 */
const promptConfirm = (message: string) =>
  Effect.callback<boolean>((resume) => {
    process.stdout.write(`${message} [y/N] `);
    process.stdin.setEncoding("utf8");
    process.stdin.resume();
    process.stdin.once("data", (data: string) => {
      process.stdin.pause();
      process.stdin.unref();
      const answer = data.toString().trim().toLowerCase();
      resume(Effect.succeed(answer === "y" || answer === "yes"));
    });
  });

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const program = Effect.gen(function* () {
  const accountId = getAccountId();
  yield* Console.log(`Account: ${accountId}`);
  yield* Console.log("Fetching all D1 databases...\n");

  const databases = yield* listAllDatabases;

  if (databases.length === 0) {
    yield* Console.log("No D1 databases found. Nothing to delete.");
    return;
  }

  yield* Console.log(`Found ${databases.length} D1 database(s):\n`);
  for (const db of databases) {
    yield* Console.log(`  - ${db.name} (${db.uuid})`);
  }
  yield* Console.log("");

  if (!confirm) {
    yield* Console.log(
      "Dry run — pass --confirm to actually delete these databases.",
    );
    return;
  }

  // Interactive safety prompt unless --force is passed
  if (!force) {
    const yes = yield* promptConfirm(
      `Are you sure you want to delete all ${databases.length} D1 database(s)?`,
    );
    if (!yes) {
      yield* Console.log("Aborted.");
      return;
    }
  }

  yield* Console.log(`\nDeleting ${databases.length} database(s)...`);

  let deleted = 0;
  let failed = 0;

  yield* Effect.forEach(
    databases,
    (db) =>
      deleteDatabase({ databaseId: db.uuid, accountId }).pipe(
        Effect.tap(() =>
          Effect.sync(() => {
            deleted++;
          }),
        ),
        Effect.tap(() => Console.log(`  ✓ Deleted: ${db.name} (${db.uuid})`)),
        Effect.catch((error: any) =>
          Effect.gen(function* () {
            failed++;
            yield* Console.error(
              `  ✗ Failed:  ${db.name} (${db.uuid}) — ${error._tag}: ${error.message}`,
            );
          }),
        ),
      ),
    { concurrency: 5 },
  );

  yield* Console.log(
    `\nDone. Deleted: ${deleted}, Failed: ${failed}, Total: ${databases.length}`,
  );
});

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

const MainLayer = Layer.mergeAll(
  NodeServices.layer,
  FetchHttpClient.layer,
  Logger.layer([Logger.consolePretty()]),
  Auth.fromEnv(),
);

program.pipe(
  Retry.transient,
  Effect.provideService(MinimumLogLevel, process.env.DEBUG ? "Debug" : "Info"),
  Effect.provide(MainLayer),
  NodeRuntime.runMain,
);
