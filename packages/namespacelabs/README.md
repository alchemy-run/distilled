# @distilled.cloud/namespacelabs

Effect-native [Namespace](https://namespace.so) SDK, generated from the
protobuf API Namespace publishes at
[buf.build/namespace/cloud](https://buf.build/namespace/cloud).

## Spec source

Namespace does not publish OpenAPI. Its API is defined in protobuf and served
over gRPC and Connect, and the Buf Schema Registry module is what the `nsc`
CLI, the Go SDK and the official TypeScript SDK are generated from. The module's
own files (`proto/namespace/**`) are mirrored; its one dependency, Bazel's
build-event protos, is not read by anything the generator converts.

Convert writes one Smithy model per proto service and maps each unary RPC to
`POST /<package>.<Service>/<Method>` with a proto3 JSON body (camelCase
fields, 64-bit integers as strings, `bytes` as base64). Streaming RPCs are
skipped; most have a polling or `*Sync` counterpart. Five services in the
module answer 404 on every `namespaceapis.com` host (`ManagementService`,
the devbox `AgentService` and `DevBoxExtraService`, `private.instance` and
`experimental.remote.ExecutionService`) and are not generated.

The package is `namespacelabs` (Namespace's GitHub org and npm scope) rather
than `namespace`, so it does not shadow Alchemy's own `Namespace` export when
both are imported.

## Services

Every service is `v1beta`. The barrel export is the proto package plus the
service, so `ComputeService` is `compute`, `CommandService` is
`computeCommand`, `TokenService` is `iamToken` and the devbox API is
`privateDevbox`.

| Host | Services |
| --- | --- |
| `https://<region>.compute.namespaceapis.com` | `compute`, `computeCommand`, `computeStorage`, `computeUsage`, `computeObservability`, `builder`, `experimentalComputeReservation` |
| `https://<region>.storage.namespaceapis.com` | `artifacts` |
| `https://global.namespaceapis.com` | `iamTenant`, `iamTenantMembership`, `iamToken`, `registry`, `vault`, `image`, `egress`, `bazel`, `bazelCache`, `gradleCache`, `httpcache`, `buildkiteJobs`, `buildkiteQueue`, `testing`, `audit`, `experimentalRemoteResults` |
| `https://private-api.global.namespaceapis.com` | `privateDevbox`, `privateUserSessions`, `githubProfile`, `githubJobs`, `githubImage` |

The protocol picks the host from the operation's proto package. The
`namespace.private.*` services are in the public module and used by the
official SDKs, but Namespace lists them under no stability promise.

## Installation

```bash
npm install @distilled.cloud/namespacelabs effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as NamespaceLabs from "@distilled.cloud/namespacelabs";

const program = Effect.gen(function* () {
  const created = yield* NamespaceLabs.compute.createInstance({
    shape: { virtualCpu: 2, memoryMegabytes: 4096, os: "linux", machineArch: "amd64" },
    deadline: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
  });
  const instanceId = created.metadata?.instanceId;
  if (instanceId === undefined) return undefined;
  const instance = yield* NamespaceLabs.compute.describeInstance({ instanceId });
  yield* NamespaceLabs.compute.destroyInstance({ instanceId });
  return instance.metadata?.status;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  NamespaceLabs.CredentialsFromEnv,
  NamespaceLabs.NamespaceLabsProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

`CredentialsFromEnv` sends `NSC_TOKEN` as `Authorization: Bearer`. Mint one
with `nsc auth generate-dev-token`, `nsc token create --grant ...`, or
`iamToken.issueTenantTokenWithOIDC` from a CI identity token.

Inside a Namespace instance, devbox or GitHub runner the workload token is a
file instead: `CredentialsFromTokenFile` reads `bearer_token` from
`NSC_TOKEN_FILE` (default `/var/run/nsc/token.json`) on every call, because
Namespace refreshes it. The layer needs a `FileSystem`, for example
`NodeFileSystem.layer` from `@effect/platform-node`. A session token from
`nsc login` is not a bearer token; exchange it with
`privateUserSessions.issueTenantTokenFromSession`.

Both layers read `NSC_REGION` (default `us`) for the compute and storage hosts
and `NSC_COMPUTE_URL` (or `NSC_ENDPOINT`, which Namespace sets inside an
instance), `NSC_STORAGE_URL`, `NSC_GLOBAL_URL` and `NSC_PRIVATE_API_URL` to
override a host. `credentials({ token, region })`, `fromToken(token)` and
`fromTokenFile(path)` build the same layers in code.

## Errors

Every operation declares the Connect error codes as typed errors, matched on
the HTTP status and, where one status covers several codes, on the body's
`code`: `InvalidArgument`, `FailedPrecondition`, `OutOfRange`,
`Unauthenticated`, `PermissionDenied`, `NotFound`, `AlreadyExists`, `Aborted`,
`ResourceExhausted`, `Canceled` and `Unimplemented`. Each carries `message`
and the Connect `body` (`code`, `message`, `details` with the request id).
Anything else is `UnknownNamespaceLabsError` with `code` and `details`.

```ts
NamespaceLabs.compute.describeInstance({ instanceId }).pipe(
  Effect.catchTag("NotFound", () => Effect.succeed(undefined)),
);
```

## Pagination

List operations whose request and response carry a cursor (`listInstances`,
`privateDevbox.list`, `githubJobs.listJobs`, `audit.listEntries`, the registry
lists, ...) expose `.pages(input)` and `.items(input)` streams that follow
`paginationCursor` until the last page.

Tokens, vault values, issued private keys and the third-party API keys a
devbox template carries are `Redacted` in responses and accepted as
`string | Redacted<string>` in requests.
