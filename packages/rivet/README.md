# @distilled.cloud/rivet

Effect-native SDK for the [Rivet](https://rivet.dev) engine API, generated from the engine's
[OpenAPI description](https://github.com/rivet-dev/rivet/blob/v3.0.0-preview.4/engine/artifacts/openapi.json).
The same API serves Rivet Cloud and every self-hosted control plane.

## Installation

```bash
npm install @distilled.cloud/rivet effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Rivet from "@distilled.cloud/rivet";

const program = Effect.gen(function* () {
  // Nodes can only join a pool that exists.
  const { pool } = yield* Rivet.pools.upsertPool({ pool: "default", namespace: "default" });
  const { nodes } = yield* Rivet.pools.listPoolNodes({ pool: pool.name, namespace: "default" });
  return nodes.filter((node) => node.connected).length;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Rivet.CredentialsFromEnv,
  Rivet.RivetProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

`RIVET_TOKEN` as `Authorization: Bearer`: the control plane's admin token, or a namespace
JWT from `auth.createAuthToken`. `RIVET_ENDPOINT` sets the control plane URL and defaults to
`https://api.rivet.dev`. It may carry the token in its userinfo instead
(`https://<namespace>:<token>@rivet.example.com`), the same form RivetKit nodes read.

## Errors

Rivet failures carry an `x-rivet-error: <group>.<code>` header. The ones callers act on are
typed per operation:

| Tag | Code | Raised by |
| --- | --- | --- |
| `PoolNotFound` | `pool.not_found` | `getPool`, `deletePool`, `listPoolNodes` |
| `NamespaceNotFound` | `namespace.not_found` | the `pools` operations, `createAuthToken` |
| `PoolNodesConnected` | `pool.nodes_connected` | `deletePool`, while nodes are still connected |
| `NamespaceAlreadyExists` | `namespace.name_not_unique` | `createNamespace` |

Everything else surfaces as the shared HTTP status classes or `UnknownRivetError`, whose `code`
is the `<group>.<code>` pair.
