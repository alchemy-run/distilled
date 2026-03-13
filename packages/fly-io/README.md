# @distilled.cloud/fly-io

Effect-native Fly.io SDK generated from the [Fly.io OpenAPI specification](https://docs.machines.dev). Manage apps, machines, volumes, secrets, certificates, and more with exhaustive error typing.

## Installation

```bash
npm install @distilled.cloud/fly-io effect
```

## Quick Start

```typescript
import { Effect, Layer } from "effect";
import * as Stream from "effect/Stream";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import { AppsList } from "@distilled.cloud/fly-io/Operations";
import { CredentialsFromEnv } from "@distilled.cloud/fly-io";

const program = Effect.gen(function* () {
  const apps = yield* AppsList({ org_slug: "my-org" });
  return apps;
});

const FlyLive = Layer.mergeAll(FetchHttpClient.layer, CredentialsFromEnv);

program.pipe(Effect.provide(FlyLive), Effect.runPromise);
```

## Configuration

Set the following environment variable:

```bash
FLY_IO_API_KEY=your-api-token
```

Create a personal access token with `flyctl tokens create` or in the [Fly.io dashboard](https://fly.io/dashboard/) under **Account > Access Tokens**. For deploy tokens scoped to a single app, use `flyctl tokens create deploy`.

## Error Handling

```typescript
import { AppsShow } from "@distilled.cloud/fly-io/Operations";

AppsShow({ app_name: "missing-app" }).pipe(
  Effect.catchTags({
    NotFound: () => Effect.succeed(null),
    UnknownFlyIoError: (e) => Effect.fail(new Error(`Unknown: ${e.message}`)),
  }),
);
```

## Services

Key operation areas include:

- **Apps** -- list, create, show, delete, deploy tokens
- **Machines** -- full lifecycle (create, start, stop, suspend, restart, signal, exec, wait), plus metadata, leases, memory management, events, and versions
- **Volumes** -- create, list, update, delete, extend, snapshots
- **Secrets** -- create, list, get, delete, update
- **Secret Keys** -- generate, encrypt, decrypt, sign, verify (KMS)
- **Certificates** -- ACME and custom TLS certificates
- **IP Assignments** -- allocate and release IP addresses
- **Tokens** -- OIDC and KMS token requests
- **Platform** -- regions and placement queries

## License

MIT
