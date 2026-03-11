# Distilled

Effect-native SDKs for cloud providers with exhaustive error typing, retry policies, and streaming pagination.

```typescript
import * as S3 from "@distilled.cloud/aws/s3"

const bucket = yield* S3.getBucket({
  Bucket: "my-bucket"
}).pipe(
  Effect.catchTag("NoSuchBucket", () =>
    Effect.void
  )
)
```

## Packages

| Package | Description |
|---------|-------------|
| [`@distilled.cloud/sdk-core`](./packages/core) | Shared client, traits, errors, and categories |
| [`@distilled.cloud/aws`](./packages/aws) | AWS SDK from Smithy models (S3, Lambda, DynamoDB, 200+ services) |
| [`@distilled.cloud/cloudflare`](./packages/cloudflare) | Cloudflare SDK (Workers, R2, KV, D1, Queues, DNS) |
| [`@distilled.cloud/gcp`](./packages/gcp) | GCP SDK from Discovery Documents |
| [`@distilled.cloud/neon`](./packages/neon) | Neon serverless Postgres SDK from OpenAPI spec |
| [`@distilled.cloud/planetscale`](./packages/planetscale) | PlanetScale MySQL SDK from OpenAPI spec |

## Getting Started

```bash
# Clone with submodules (needed for aws tests and code generation)
git clone --recurse-submodules https://github.com/alchemy-run/distilled.git

# Or if already cloned without submodules
git submodule update --init --recursive

# Install dependencies
bun install

# Build (core first, then all packages)
bun run build

# Run all tests
bun run test
```

## Git Config for Submodules

These settings make working with submodules much less painful:

```bash
# Automatically fetch submodules when pulling/cloning
git config submodule.recurse true

# Automatically push submodule changes when pushing
git config push.recurseSubmodules on-demand
```

## Submodules

Vendor API specifications are stored as git submodules under each package's `specs/` directory. They are **not needed for building or typechecking** — only for code generation (`bun run generate`). The exception is `aws`, which also needs submodules for testing.

```bash
# Fetch specs for a specific package
bun run specs:fetch    # run inside a package directory

# Update specs to latest upstream
bun run specs:update   # run inside a package directory
```

| Package | Submodules |
|---------|-----------|
| `aws` | `api-models-aws`, `aws-sdk-js-v3`, `smithy`, `smithy-typescript` |
| `cloudflare` | `cloudflare-typescript` |
| `gcp` | `distilled-spec-gcp` |
| `neon` | `distilled-spec-neon` |
| `planetscale` | `distilled-spec-planetscale` |

## Scripts

| Script | Description |
|--------|-------------|
| `bun run build` | Build core, then all packages |
| `bun run typecheck` | Type check all packages |
| `bun run check` | Full check (types + lint + format) |
| `bun run test` | Run all tests |
| `bun run fmt` | Format all packages |
| `bun run lint` | Lint all packages |
| `bun run generate` | Regenerate all SDKs from specs |

## Deployment

### Preview Packages

Preview packages are automatically published on every PR and push to `main` via [pkg-pr-new](https://github.com/nicolo-ribaudo/pkg-pr-new) (`.github/workflows/pkg-pr.yml`).

### NPM Releases

To publish a release to npm, manually trigger the **Release NPM Packages** workflow from the [GitHub Actions UI](../../actions/workflows/release.yml):

1. Go to **Actions** → **Release NPM Packages** → **Run workflow**
2. Choose a bump type (`patch` or `minor`) or provide an exact version override
3. The workflow will bump all package versions, commit, tag, create a GitHub release, build, and publish to npm

The release workflow uses npm's OIDC trusted publishing — no npm tokens needed.

### CI

The CI workflow (`.github/workflows/test.yml`) runs typecheck + lint + format + tests for each package that has changed files.

## Contributing

The TDD workflow for discovering and patching missing errors:

1. Write a test that triggers an error
2. Run with `DEBUG=1` to see the raw response
3. Add the error to the patch file (see package READMEs for format)
4. Regenerate: `bun run generate`
5. Import the typed error and handle it

See [AGENTS.md](./AGENTS.md) for detailed development guidelines.

## License

MIT
