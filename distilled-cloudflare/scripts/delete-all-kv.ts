#!/usr/bin/env bun
/**
 * Delete every KV namespace in a Cloudflare account.
 *
 * Usage:
 *   bun scripts/delete-all-kv.ts                  # Dry run (list only)
 *   bun scripts/delete-all-kv.ts --confirm         # Actually delete
 *   bun scripts/delete-all-kv.ts --confirm --force  # Skip interactive prompt
 */

import { FetchHttpClient, HttpClient, HttpClientRequest } from "@effect/platform";
import { NodeContext, NodeRuntime } from "@effect/platform-node";
import { Console, Effect, Layer, Logger, LogLevel, Redacted, Schema } from "effect";
import * as Auth from "../src/auth.ts";
import { deleteNamespace } from "../src/services/kv.ts";
import * as Retry from "../src/retry.ts";

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------

const args = new Set(process.argv.slice(2));
const confirm = args.has("--confirm");
const force = args.has("--force");

// ---------------------------------------------------------------------------
// Cloudflare list namespaces (not in generated SDK yet)
// ---------------------------------------------------------------------------

const CLOUDFLARE_API_BASE = "https://api.cloudflare.com/client/v4";

interface KvNamespace {
  id: string;
  title: string;
  supports_url_encoding?: boolean;
}

interface CloudflareListResponse {
  success: boolean;
  errors: { code: number; message: string }[];
  messages: { code: number; message: string }[];
  result: KvNamespace[];
  result_info?: {
    page: number;
    per_page: number;
    total_pages: number;
    count: number;
    total_count: number;
  };
}

/**
 * List all KV namespaces in the account, paginating through all pages.
 */
const listAllNamespaces = Effect.gen(function* () {
  const client = yield* HttpClient.HttpClient;
  const auth = yield* Auth.ApiToken;
  const accountId = getAccountId();

  const namespaces: KvNamespace[] = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const url = `${CLOUDFLARE_API_BASE}/accounts/${accountId}/storage/kv/namespaces?page=${page}&per_page=${perPage}`;

    const headers: Record<string, string> = {};
    if (auth.auth.type === "token") {
      headers["Authorization"] = `Bearer ${Redacted.value(auth.auth.token)}`;
    } else if (auth.auth.type === "oauth") {
      headers["Authorization"] = `Bearer ${Redacted.value(auth.auth.accessToken)}`;
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

    namespaces.push(...json.result);

    // Check if there are more pages
    const info = json.result_info;
    if (!info || page >= info.total_pages) {
      break;
    }
    page++;
  }

  return namespaces;
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
  Effect.async<boolean>((resume) => {
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
  yield* Console.log("Fetching all KV namespaces...\n");

  const namespaces = yield* listAllNamespaces;

  if (namespaces.length === 0) {
    yield* Console.log("No KV namespaces found. Nothing to delete.");
    return;
  }

  yield* Console.log(`Found ${namespaces.length} KV namespace(s):\n`);
  for (const ns of namespaces) {
    yield* Console.log(`  - ${ns.title} (${ns.id})`);
  }
  yield* Console.log("");

  if (!confirm) {
    yield* Console.log(
      "Dry run — pass --confirm to actually delete these namespaces.",
    );
    return;
  }

  // Interactive safety prompt unless --force is passed
  if (!force) {
    const yes = yield* promptConfirm(
      `Are you sure you want to delete all ${namespaces.length} KV namespace(s)?`,
    );
    if (!yes) {
      yield* Console.log("Aborted.");
      return;
    }
  }

  yield* Console.log(`\nDeleting ${namespaces.length} namespace(s)...`);

  let deleted = 0;
  let failed = 0;

  yield* Effect.forEach(
    namespaces,
    (ns) =>
      deleteNamespace({ namespaceId: ns.id, accountId }).pipe(
        Effect.tap(() =>
          Effect.sync(() => {
            deleted++;
          }),
        ),
        Effect.tap(() => Console.log(`  ✓ Deleted: ${ns.title} (${ns.id})`)),
        Effect.catchAll((error) =>
          Effect.gen(function* () {
            failed++;
            yield* Console.error(
              `  ✗ Failed:  ${ns.title} (${ns.id}) — ${error._tag}: ${error.message}`,
            );
          }),
        ),
      ),
    { concurrency: 5 },
  );

  yield* Console.log(
    `\nDone. Deleted: ${deleted}, Failed: ${failed}, Total: ${namespaces.length}`,
  );
});

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

const MainLayer = Layer.mergeAll(
  NodeContext.layer,
  FetchHttpClient.layer,
  Logger.pretty,
  Auth.fromEnv(),
);

program.pipe(
  Retry.transient,
  Logger.withMinimumLogLevel(
    process.env.DEBUG ? LogLevel.Debug : LogLevel.Info,
  ),
  Effect.provide(MainLayer),
  NodeRuntime.runMain,
);
