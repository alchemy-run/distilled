# @distilled.cloud/celld

Effect SDK generated from a source-derived Smithy description of Celld v0.5.0.

```ts
import { getNodeState } from "@distilled.cloud/celld/node";
import * as Endpoint from "@distilled.cloud/celld/Endpoint";
import * as Effect from "effect/Effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";

const state = await Effect.runPromise(
  getNodeState({}).pipe(
    Effect.provide(Endpoint.of("http://127.0.0.1:8081")),
    Effect.provide(FetchHttpClient.layer),
  ),
);
console.log(state.deployment);
```

Use the port configured for your node's internal listener, not its public Worker
listener.

## Spec source

Celld does not publish a machine-readable API description. The models in
`specs/` describe the implementation at
[`12d5b6333fe52717325addcfe1e99e9fd4f77bcd`](https://github.com/denoland/celld/tree/12d5b6333fe52717325addcfe1e99e9fd4f77bcd).
These are Distilled-maintained contracts, not an official Celld specification.

## Scope

The specification models administrative HTTP endpoints, the signed operator
requests used for D1, KV, and Queues, and deployment artifact data structures.
Worker bindings are JavaScript runtime APIs rather than administrative HTTP
endpoints; they are not generated as HTTP operations.

Deployment publication uses an object store rather than a Celld REST endpoint.
The package describes its artifacts without inventing a `deploy` HTTP operation.
It does not include a deployment orchestrator, object-storage adapter, node
discovery, bundler, or CLI wrapper. Use the existing storage-provider SDK for
object-store requests.

## Security and authentication

Configure `Endpoint` with the trusted internal listener of the intended node.
Some administrative endpoints are unauthenticated and can stop a node or alter
its operation. Keep this listener on loopback or an explicitly trusted private
network. The public Worker listener is a different endpoint.

Reserved-resource operations require Celld's peer-authentication headers. Those
headers are explicit inputs in the specification. This package does not compute
HMAC signatures: the caller must sign the exact encoded method, path, body, target
node session, timestamp, and nonce. A retry needs a new signature and nonce; an
ambiguous failure is not permission to repeat a non-idempotent operation.

Automatic retries are disabled. Explicit peer-version, target-session, and replay
rejections are typed errors; other HTTP failures use the shared REST error types
or `UnknownCelldError`. Operator application errors return HTTP 400. The node
state endpoint can instead return HTTP 200 with `error: "actor_stopped"`; callers
must check that modeled response field.

## Regeneration

From the repository root:

```sh
pnpm generate celld
```

`convert` validates and finalizes the committed Smithy source, and `generate`
uses `@distilled.cloud/core/codegen`. Update the specification rather than
editing `src/services/`. Regeneration requires neither a Celld deployment command
nor an upstream checkout.

The mirror registry records this provider as blocked on an upstream API spec;
there is no speculative mirror repository or runtime code scraper.

## Validation

```sh
bun test packages/celld/test/sdk.test.ts
pnpm exec tsc -b packages/celld/tsconfig.json packages/celld/tsconfig.scripts.json --noCheck false
pnpm exec tsc -p packages/celld/tsconfig.test.json
```

See [the local integration fixture](test/README.md) to exercise the generated
clients against a real v0.5.0 server. Live tests skip unless explicitly enabled.

## Compatibility

This package targets v0.5.0, not arbitrary future Celld releases. Celld's
administrative protocol is alpha. Review upstream route handlers, request/reply
structures, and authentication rules before changing the pinned contract.

Authoritative upstream sources include:

- [`main.rs`](https://github.com/denoland/celld/blob/v0.5.0/crates/celld/main.rs): HTTP routes.
- [`peer_auth.rs`](https://github.com/denoland/celld/blob/v0.5.0/crates/celld/peer_auth.rs): authentication headers and signing contract.
- [`operator_cell.rs`](https://github.com/denoland/celld/blob/v0.5.0/crates/celld/operator_cell.rs): reserved-resource operator transport.
- [`protocol.rs`](https://github.com/denoland/celld/blob/v0.5.0/crates/celld/protocol.rs): deployment artifacts.
- [`deploy.rs`](https://github.com/denoland/celld/blob/v0.5.0/crates/celld/deploy.rs): deployment normalization and publication.
