# distilled

Effect-native TypeScript SDKs for cloud providers. Every SDK is generated from
the provider's own published API description (OpenAPI, Smithy, Google
Discovery, GraphQL or protobuf), so each operation has a typed input, a typed
output and the errors it can return.

- **Typed errors.** An operation lists the errors it can fail with, and you
  handle them with `Effect.catchTag`.
- **Retries.** Throttling and transient failures retry by default, with a
  policy you can replace.
- **Pagination as a stream.** A paginated operation is also a `Stream` of its
  items, and pages load as you read them.
- **Small bundles.** Each service is its own import path, and a bundler keeps
  only the operations you call.

Browse the SDKs at [distilled.cloud](https://distilled.cloud).

> [!NOTE]
> distilled is in release candidates (`1.0.0-rc.*`). A release can still
> change a public type. A breaking commit has `!` in its title.

## Install

Install the provider's package and `effect`:

```bash
npm install @distilled.cloud/cloudflare effect
```

Each provider is one package: `@distilled.cloud/aws`, `@distilled.cloud/gcp`,
`@distilled.cloud/stripe`, `@distilled.cloud/neon` and the rest. The SDK's own
README, in `packages/<provider>/`, says which credentials it reads.

## Example

Get an R2 bucket, and create it when it does not exist:

```ts
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import { CredentialsFromEnv } from "@distilled.cloud/cloudflare/Credentials";
import * as R2 from "@distilled.cloud/cloudflare/r2";

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID!;

const program = R2.getBucket({ accountId, bucketName: "uploads" }).pipe(
  // NoSuchBucket is in getBucket's error type, so this handler type-checks.
  Effect.catchTag("NoSuchBucket", () => R2.createBucket({ accountId, name: "uploads" })),
);

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  CredentialsFromEnv, // CLOUDFLARE_API_TOKEN
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Repository layout

| Path | What it holds |
|---|---|
| `packages/core` | The shared runtime: protocols, errors, retries, pagination, credentials helpers |
| `packages/<provider>` | One SDK. `src/services/` is generated; `patches/` corrects the provider's spec |
| `packages/dev` | The code generator. It is private and never published |
| `website` | [distilled.cloud](https://distilled.cloud) |
| `stacks` | The [Alchemy](https://alchemy.run) stacks that run the repo's infrastructure |

## Contributing

Read [CONTRIBUTING.md](./CONTRIBUTING.md). Most fixes are a patch to the
provider's spec, followed by `pnpm generate <provider>`.

## Security

Report a vulnerability privately. [SECURITY.md](./SECURITY.md) says how.

## License

[Apache-2.0](./LICENSE)
