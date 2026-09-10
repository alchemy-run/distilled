#!/usr/bin/env bun
/**
 * Download Whop's two OpenAPI descriptions.
 *
 * Whop documents ONE HTTP API (`https://api.whop.com/api/v1`, one bearer
 * key, one error envelope) through TWO reference surfaces, and publishes a
 * separate OpenAPI 3.1 document behind each:
 *
 *   • VERSIONED — https://docs.whop.com/api-reference/beta/overview
 *     served from `/openapi/api-v1-native.json`. "The default reference for
 *     new integrations."
 *   • LEGACY — https://docs.whop.com/developer/api/getting-started
 *     served from `/openapi/api-v1-stable.json`. "Fully supported, and
 *     marked with a pointer wherever a successor exists" in the versioned
 *     reference.
 *
 * Neither document is a superset of the other: the versioned one is the only
 * home of cards, payouts, transfers, bounties and ads; the legacy one is the
 * only home of courses, forums, messages, invoices, refunds and affiliates.
 * `scripts/convert.ts` merges them — versioned wins every route both
 * describe — so BOTH are downloaded here and committed under `specs/`.
 *
 * There is no git repo or release tag to add as a submodule (the way
 * `github`/`stripe`/`neon` vendor their spec repos), so this follows the
 * huggingface/vercel/cloudflare pattern: fetch from the live docs host and
 * commit the result. Regenerating is a two-step:
 *
 *   bun run spec:download   # refresh specs/*.json from upstream
 *   bun run generate        # convert + compile (see scripts/convert.ts)
 *
 * Each document is re-serialized with 2-space indent + a trailing newline
 * rather than saved verbatim, so a whitespace-only change upstream produces
 * no diff and a malformed download fails HERE instead of in convert.
 *
 * Usage:
 *   bun scripts/download-spec.ts
 *   bun scripts/download-spec.ts --out specs
 *   bun scripts/download-spec.ts --origin https://docs.whop.com
 */

import { BunRuntime, BunServices } from "@effect/platform-bun";
import { Console, Data, Effect } from "effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import { Command, Flag } from "effect/unstable/cli";

const ORIGIN = "https://docs.whop.com";

/**
 * The two documents, and the local name each is committed under. `surface`
 * is the vocabulary `scripts/convert.ts` reports the merge in.
 */
const DOCUMENTS = [
  {
    surface: "versioned",
    remote: "/openapi/api-v1-native.json",
    file: "api-v1-native.json",
    reference: "https://docs.whop.com/api-reference/beta/overview",
  },
  {
    surface: "legacy",
    remote: "/openapi/api-v1-stable.json",
    file: "api-v1-stable.json",
    reference: "https://docs.whop.com/developer/api/getting-started",
  },
] as const;

// ============================================================================
// Errors
// ============================================================================

class FetchError extends Data.TaggedError("FetchError")<{
  readonly url: string;
  readonly status?: number;
  readonly cause?: unknown;
}> {}

class InvalidSpecError extends Data.TaggedError("InvalidSpecError")<{
  readonly url: string;
  readonly reason: string;
}> {}

class VersionMismatchError extends Data.TaggedError("VersionMismatchError")<{
  readonly dates: Readonly<Record<string, string>>;
}> {}

// ============================================================================
// Fetch
// ============================================================================

/** Fetch a URL as text, failing with FetchError on a network error or non-2xx. */
const fetchText = (url: string): Effect.Effect<string, FetchError> =>
  Effect.tryPromise({
    try: async () => {
      const res = await fetch(url, {
        headers: {
          accept: "application/json",
          "user-agent": "distilled.cloud-whop-spec-downloader",
        },
      });
      if (!res.ok) {
        throw new FetchError({ url, status: res.status });
      }
      return await res.text();
    },
    catch: (cause) =>
      cause instanceof FetchError ? cause : new FetchError({ url, cause }),
  });

// ============================================================================
// Census
// ============================================================================

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

interface Census {
  readonly paths: number;
  readonly operations: number;
  readonly tags: number;
  readonly schemas: number;
  readonly webhooks: number;
}

/**
 * A quick count, so a truncated or gutted upstream response is obvious at the
 * point of download rather than three steps later.
 */
const census = (spec: any): Census => {
  const tags = new Set<string>();
  let operations = 0;
  for (const item of Object.values<any>(spec.paths)) {
    for (const method of HTTP_METHODS) {
      const op = item?.[method];
      if (!op) continue;
      operations++;
      tags.add(op.tags?.[0] ?? "(untagged)");
    }
  }
  return {
    paths: Object.keys(spec.paths).length,
    operations,
    tags: tags.size,
    schemas: Object.keys(spec.components?.schemas ?? {}).length,
    webhooks: Object.keys(spec.webhooks ?? {}).length,
  };
};

// ============================================================================
// CLI command
// ============================================================================

const downloadSpec = Command.make(
  "download-spec",
  {
    origin: Flag.String("origin").pipe(
      Flag.withDefault(ORIGIN),
      Flag.withDescription("Docs host serving the OpenAPI documents"),
    ),
    out: Flag.String("out").pipe(
      Flag.withDefault("specs"),
      Flag.withDescription(
        "Where to write the specs (relative to the whop package root)",
      ),
    ),
  },
  (config) =>
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;

      // The whop/ folder is the parent of this scripts/ dir.
      const root = path.resolve(import.meta.dir, "..");
      const outDir = path.resolve(root, config.out);

      yield* Console.log("🛒 Whop OpenAPI spec downloader");
      yield* Console.log(`   Source: ${config.origin}`);
      yield* Console.log(`   Output: ${outDir}\n`);

      yield* fs.makeDirectory(outDir, { recursive: true });

      /** Surface → the `x-api-version-date` its document declares. */
      const versionDates: Record<string, string> = {};

      for (const doc of DOCUMENTS) {
        const url = `${config.origin}${doc.remote}`;
        const text = yield* fetchText(url);

        const spec = yield* Effect.try({
          try: () => JSON.parse(text) as Record<string, any>,
          catch: (cause) =>
            new InvalidSpecError({ url, reason: `not valid JSON (${cause})` }),
        });

        if (typeof spec.openapi !== "string" || spec.paths === undefined) {
          return yield* new InvalidSpecError({
            url,
            reason: "no `openapi` version / `paths` — not an OpenAPI document",
          });
        }

        const date = spec.info?.["x-api-version-date"];
        if (typeof date !== "string") {
          // The pin the protocol sends on every request comes from here (see
          // scripts/convert.ts) — a document without one would silently ship
          // an SDK pinned to nothing.
          return yield* new InvalidSpecError({
            url,
            reason: "no `info.x-api-version-date` — nothing to pin the SDK to",
          });
        }
        versionDates[doc.surface] = date;

        const outPath = path.join(outDir, doc.file);
        yield* fs.writeFileString(
          outPath,
          JSON.stringify(spec, null, 2) + "\n",
        );

        const c = census(spec);
        yield* Console.log(
          `✅ ${doc.surface.padEnd(9)} ${doc.file} — OpenAPI ${spec.openapi}, ` +
            `api-version-date ${date}`,
        );
        yield* Console.log(
          `   ${c.paths} paths, ${c.operations} operations, ${c.tags} tags, ` +
            `${c.schemas} schemas, ${c.webhooks} webhook events`,
        );
        yield* Console.log(`   reference: ${doc.reference}\n`);
      }

      // The merged SDK sends ONE `Api-Version-Date` header for every call,
      // versioned and legacy alike. Upstream has always stamped both
      // documents with the same date; if that stops being true the merge no
      // longer has one pin to send and the split has to be modeled instead
      // of assumed.
      const distinct = new Set(Object.values(versionDates));
      if (distinct.size > 1) {
        return yield* new VersionMismatchError({ dates: versionDates });
      }

      yield* Console.log(`   Next: bun run generate`);
    }),
).pipe(
  Command.withDescription(
    "Download Whop's versioned + legacy OpenAPI documents into ./specs",
  ),
);

// ============================================================================
// Entry point
// ============================================================================

const program = Command.run(downloadSpec, { version: "1.0.0" });

BunRuntime.runMain(Effect.provide(program, BunServices.layer));
