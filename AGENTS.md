# Distilled

Effect-native SDKs with exhaustive error typing. We use a TDD-driven approach to discover, document, and patch missing API behavior from vendor specifications.

## Directory Structure

```
distilled/
├── packages/
│   ├── core/             # @distilled.cloud/sdk-core — shared client, traits, errors, categories
│   ├── aws/              # @distilled.cloud/aws — AWS SDK from Smithy models
│   ├── cloudflare/       # @distilled.cloud/cloudflare — Cloudflare SDK from TypeScript SDK
│   ├── coinbase/         # @distilled.cloud/coinbase — Coinbase CDP SDK from OpenAPI spec
│   ├── fly-io/           # @distilled.cloud/fly-io — Fly.io SDK from OpenAPI spec
│   ├── gcp/              # @distilled.cloud/gcp — GCP SDK from Discovery Documents
│   ├── mongodb-atlas/    # @distilled.cloud/mongodb-atlas — MongoDB Atlas SDK from OpenAPI spec
│   ├── neon/             # @distilled.cloud/neon — Neon SDK from OpenAPI spec
│   ├── planetscale/      # @distilled.cloud/planetscale — PlanetScale SDK from OpenAPI spec
│   ├── prisma-postgres/  # @distilled.cloud/prisma-postgres — Prisma Postgres SDK from OpenAPI spec
│   ├── stripe/           # @distilled.cloud/stripe — Stripe SDK from OpenAPI spec
│   ├── supabase/         # @distilled.cloud/supabase — Supabase SDK from OpenAPI spec
│   └── turso/            # @distilled.cloud/turso — Turso SDK from OpenAPI spec
├── scripts/              # Root-level scripts (create-sdk.ts, bump.ts, etc.)
├── .github/workflows/    # CI (test.yml) and preview publishing (pkg-pr.yml)
└── AGENTS.md             # This file
```

### Package Layout (each package)

```
packages/{name}/
├── src/                  # Source code (generated + hand-written)
│   ├── client.ts         # API.make/makePaginated factory
│   ├── traits.ts         # HTTP trait annotations (PathParam, Http, etc.)
│   ├── errors.ts         # Typed error classes
│   ├── category.ts       # Error categories (re-exported from core)
│   └── operations/       # Generated operations (DO NOT HAND-EDIT)
├── tests/                # Tests
├── specs/                # Git submodules with vendor specs (see below)
├── scripts/              # Code generation scripts
├── lib/                  # Build output (gitignored) — .js, .d.ts, .js.map, .d.ts.map
├── package.json
└── tsconfig.json
```

### Core Package

`packages/core` (`@distilled.cloud/sdk-core`) contains shared infrastructure used by all SDKs:

- `client.ts` — `API.make()` and `API.makePaginated()` factories that create Effect operations from annotated schemas
- `traits.ts` — Schema annotations for HTTP bindings (`T.Http`, `T.PathParam`, `T.HttpHeader`, `T.JsonName`, etc.)
- `errors.ts` — Base error classes (`NotFound`, `Unauthorized`, `Forbidden`, etc.) with error code matching
- `category.ts` — Error categories (`AuthError`, `ThrottlingError`, `ServerError`, etc.) for retry logic and semantic grouping
- `pagination.ts` — `paginatePages`/`paginateItems` stream utilities
- `retry.ts` — Retry policy configuration
- `sensitive.ts` — Sensitive data schemas
- `json-patch.ts` — JSON Patch (RFC 6902) implementation for spec patching

All other packages depend on core via `@distilled.cloud/sdk-core` workspace dependency.

## Tools

| Tool | Purpose | Command |
|------|---------|---------|
| **Bun** | Runtime, package manager, test runner | `bun install`, `bun run ...` |
| **tsgo** | Type checking (native TypeScript compiler) | `tsgo` (check), `tsgo -b` (build) |
| **oxlint** | Linter | `oxlint --fix src` |
| **oxfmt** | Formatter | `oxfmt --write src`, `oxfmt --check src` |
| **vitest** | Test framework | `bunx vitest run test` |
| **Effect** | Core framework | All operations return `Effect<A, E, R>` |

### Per-Package Scripts

Every package has these scripts:

| Script | Command | Description |
|--------|---------|-------------|
| `typecheck` | `tsgo` | Type check only (no emit) |
| `build` | `tsgo -b` | Build to `lib/` (.js + .d.ts + source maps) |
| `check` | `tsgo && oxlint src && oxfmt --check src` | Full check (types + lint + format) |
| `fmt` | `oxfmt --write src` | Format source |
| `lint` | `oxlint --fix src` | Lint + autofix |
| `test` | `bunx vitest run test` | Run tests |
| `generate` | `bun run scripts/generate.ts && oxlint --fix src && oxfmt --write src && oxfmt --write src` | Regenerate from spec |

### Root Build

```bash
bun run build  # Builds core first, then all packages in parallel
```

Core must be built before other packages because they resolve `@distilled.cloud/sdk-core/*` via the `types` export condition pointing to `lib/*.d.ts`.

### Scaffolding a New SDK

Use `create-sdk` to scaffold a new SDK package with all boilerplate, submodule setup, and code generation:

```bash
bun run create-sdk <name> --specs <url-or-repo>... [--register-package]
```

Examples:
```bash
# OpenAPI spec URL → creates distilled-spec-* mirror repo
bun run create-sdk stripe --specs https://raw.githubusercontent.com/stripe/openapi/master/openapi/spec3.json

# Git repo → adds as direct submodule
bun run create-sdk stripe --specs https://github.com/stripe/openapi.git

# Publish a 0.0.0 placeholder to npm
bun run create-sdk foo --specs https://api.foo.com/openapi.json --register-package
```

After scaffolding, the `create-sdk` script automatically calls Claude to review the OpenAPI spec and update credentials, client error handling, and auth to match the actual API.

## Submodules and Specs

Each SDK package has vendor API specifications stored as git submodules under `specs/`:

| Package | Submodule(s) | Contents |
|---------|-------------|----------|
| `aws` | `specs/api-models-aws`, `specs/aws-sdk-js-v3`, `specs/smithy`, `specs/smithy-typescript` | Smithy models, reference SDK, Smithy spec |
| `cloudflare` | `specs/cloudflare-typescript` | Cloudflare TypeScript SDK source |
| `coinbase` | `specs/cdp-sdk` | Coinbase Developer Platform SDK |
| `fly-io` | `specs/distilled-spec-fly-io` | Fly.io OpenAPI spec |
| `gcp` | `specs/distilled-spec-gcp` | GCP Discovery Documents |
| `mongodb-atlas` | `specs/distilled-spec-mongodb-atlas` | MongoDB Atlas OpenAPI spec |
| `neon` | `specs/distilled-spec-neon` | Neon OpenAPI spec |
| `planetscale` | `specs/distilled-spec-planetscale` | PlanetScale OpenAPI spec |
| `prisma-postgres` | `specs/distilled-spec-prisma-postgres` | Prisma Postgres OpenAPI spec |
| `stripe` | `specs/stripe-openapi` | Stripe OpenAPI spec |
| `supabase` | `specs/distilled-spec-supabase` | Supabase OpenAPI spec |
| `turso` | `specs/turso-docs` | Turso API docs |

**Submodules are NOT needed for building or typechecking.** They're only needed for code generation (`bun run generate`), with the exception of `aws` which also needs its submodules for testing.

```bash
# Fetch specs for a package (only needed for generation)
bun run specs:fetch    # in a package directory

# Update specs to latest upstream
bun run specs:update   # in a package directory
```

## Writing Patches

Each SDK uses a patch system to fix vendor spec inaccuracies. When you encounter an untyped error (e.g. `UnknownCloudflareError`, `PlanetScaleApiError`):

1. Run the test with `DEBUG=1` to see the raw error response
2. Add the error to the appropriate patch file
3. Regenerate: `bun run generate`
4. Import the new typed error and update the test

### Patch Locations

| Package | Patch Format | Location |
|---------|-------------|----------|
| `aws` | Smithy error additions | `spec/{service}.json` |
| `cloudflare` | Expression DSL matchers | `patch/{service}/{operation}.json` |
| `gcp` | gRPC status matchers | `patch/{service}/{operation}.json` |
| `neon` | JSON Patch (RFC 6902) | `specs/*.patch.json` |
| `planetscale` | JSON Patch (RFC 6902) | `specs/*.patch.json` |
| `prisma-postgres` | JSON Patch (RFC 6902) | `specs/*.patch.json` |

## Effect 4 (IMPORTANT)

This project uses **Effect 4** (`effect@4.x`), which is unlikely to be in your training data. The API has significant breaking changes from Effect 3. **Do NOT rely on training data for Effect APIs — always reference the actual code in the codebase and `node_modules`.**

### How to verify APIs

1. **Check existing code first** — search tests and `src/` for usage patterns of whatever API you need (e.g. `grep` for `Effect.retry`, `Effect.catch`, `Schedule.spaced`, etc.)
2. **Check `node_modules`** — the Effect source is at `node_modules/.bun/effect@*/node_modules/effect/src/`. Read the actual type signatures when unsure.
3. **Do NOT guess** — if you're unsure whether a function exists or what its signature is, look it up in the codebase or node_modules first.

### Key Effect 4 API changes (non-exhaustive)

| Effect 3 (old) | Effect 4 (current) | Notes |
|---|---|---|
| `Effect.catchAll(fn)` | `Effect.catch(fn)` | `catchAll` does not exist |
| `Effect.catchTag("Tag", fn)` | `Effect.catch("Tag", fn)` | Catch by tag is via overload |
| `Effect.retry(schedule)` | `Effect.retry({ schedule })` | Takes options object, not bare schedule |
| `Effect.retry({ times: 3 })` | `Effect.retry({ schedule: Schedule.recurs(3) })` | Use `Schedule` for retry counts |

The `while` option on `Effect.retry` is useful for retrying only specific errors:

```typescript
Effect.retry({
  while: (err) => err === "not ready yet",
  schedule: Schedule.spaced("1 second").pipe(
    Schedule.both(Schedule.recurs(10)),
  ),
})
```

### Common patterns in this codebase

```typescript
// Error catching (Effect 4 — use Effect.catch, NOT Effect.catchAll)
someOperation().pipe(
  Effect.catch(() => Effect.succeed(fallback)),
);

// Retry with schedule
someOperation().pipe(
  Effect.retry({
    schedule: Schedule.spaced("1 second").pipe(
      Schedule.both(Schedule.recurs(10)),
    ),
  }),
);

// Retry only specific errors
someOperation().pipe(
  Effect.retry({
    while: (err) => err._tag === "ThrottlingException",
    schedule: Schedule.exponential("1 second"),
  }),
);
```

## Writing Tests

### Structure

Tests are organized by API operation:

```typescript
describe("ServiceName", () => {
  describe("operationName", () => {
    test("happy path - returns expected data", () => ...);
    test("error - NotFound for non-existent resource", () => ...);
  });
});
```

### Resource Naming

**Test resource names MUST be unique per test run** to prevent collisions when multiple CI runs (or local runs) execute in parallel. Every package's test support file (`test.ts` or `setup.ts`) exports a `testRunId` — an 8-character random hex string generated once per process via `crypto.randomUUID()`.

The naming convention is: `distilled-{service}-{testname}-{testRunId}`

#### Cloudflare pattern — name helper per file

Each Cloudflare test file defines a name helper that incorporates `testRunId`:

```typescript
import { test, testRunId } from "./test.ts";

const bucketName = (name: string) => `distilled-cf-r2-${name}-${testRunId}`;
```

#### AWS pattern — `withXxx` helpers resolve names

AWS test helpers like `withBucket`, `withQueue`, `withTopic` etc. automatically append `testRunId` to the resource name before creating it:

```typescript
import { test, testRunId } from "../test.ts";

const withBucket = <A, E, R>(name: string, testFn: (bucket: string) => Effect.Effect<A, E, R>) =>
  Effect.gen(function* () {
    const bucket = `${name}-${testRunId}`;
    yield* cleanupBucket(bucket);
    yield* createBucket({ Bucket: bucket });
    return yield* testFn(bucket).pipe(Effect.ensuring(cleanupBucket(bucket)));
  });
```

#### Neon / PlanetScale pattern — setup includes `testRunId`

The shared `setup.ts` includes `testRunId` in the project/database name:

```typescript
export const testRunId: string = crypto.randomUUID().replace(/-/g, "").slice(0, 8);

const getProjectName = (suffix?: string): string =>
  suffix ? `${TEST_PROJECT_PREFIX}-${suffix}-${testRunId}` : `${TEST_PROJECT_PREFIX}-${testRunId}`;
```

Sub-resources within a shared project/database also use `testRunId`:

```typescript
import { testRunId } from "./setup.ts";

const branchName = `test-branch-${testRunId}`;
```

### Resource Cleanup

**Tests MUST always clean up resources they create**, even on failure. Use `Effect.ensuring` or try/finally:

```typescript
it.effect("creates and cleans up resource", () =>
  Effect.gen(function* () {
    const resource = yield* createResource({ name: `test-resource-${testRunId}` });
    expect(resource.id).toBeDefined();
  }).pipe(
    Effect.ensuring(
      deleteResource({ name: `test-resource-${testRunId}` }).pipe(Effect.ignore)
    )
  )
);
```

### Error Testing

```typescript
// Flip the effect to get the error channel
someOperation({ id: "non-existent" }).pipe(
  Effect.flip,
  Effect.map((e) => expect(e._tag).toBe("NotFound")),
);

// Or use matchEffect for more control
someOperation({ id: "non-existent" }).pipe(
  Effect.matchEffect({
    onFailure: (e) => Effect.succeed(e),
    onSuccess: () => Effect.succeed(null),
  }),
);
```

### AI-WORKSPACE

There is `.ai-workspace` in the git ignore, this is designed as a workspace for ai agents to write files and try things without polluting the workspace.

### Key Rules

- **Always clean up** — use `Effect.ensuring` or try/finally with `Effect.ignore` on cleanup
- **Unique names per run** — always include `testRunId` in resource names to prevent collisions between parallel test runs. Use the pattern `distilled-{service}-{testname}-${testRunId}`. Never use bare deterministic names without `testRunId`.
- **Increase timeouts** for tests hitting real APIs — `{ timeout: 30_000 }`
- **Use `DEBUG=1`** to see raw HTTP request/response logs when debugging failures
- **DO NOT modify generated files** in `src/operations/` — fix the generator or patch instead
