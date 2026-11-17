# @distilled.cloud/boxd

Effect-native [boxd](https://boxd.sh) SDK, generated from boxd's public gRPC
API, [`proto/api.proto`](https://github.com/boxd-sh/sdk/blob/main/proto/api.proto)
in [boxd-sh/sdk](https://github.com/boxd-sh/sdk): machines, snapshots,
checkpoints, disks, files, ports, proxies, env vars and secrets, orgs, teams,
API keys and billing.

## Installation

```bash
npm install @distilled.cloud/boxd effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Boxd from "@distilled.cloud/boxd";

const program = Effect.gen(function* () {
  const { vmId } = yield* Boxd.createVm({ name: "my-machine" });
  const machine = yield* Boxd.getVm({ vmId });
  yield* Boxd.destroyVm({ vmId });
  return machine.status;
});

const Live = Layer.mergeAll(FetchHttpClient.layer, Boxd.CredentialsFromEnv, Boxd.BoxdProtocol);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

`BOXD_API_KEY` (or `BOXD_TOKEN`) is sent as `authorization: Bearer`.
`BOXD_BASE_URL` (or its deprecated alias `BOXD_API_URL`) sets another
endpoint; the default is `https://boxd.sh:9443`. These are the official
SDKs' variables. In code:

```ts
import * as Redacted from "effect/Redacted";

Boxd.credentials({ token: Redacted.make("bxd_..."), apiBaseUrl: "https://boxd.sh:9443" });
```

## Wire

Each operation is the gRPC method `POST /boxd.api.v1.BoxdApi/<Method>`. The
SDK sends it as gRPC-Web (`application/grpc-web+proto`), which boxd answers
over HTTP/1.1, so plain `fetch` works in Node, Bun, Cloudflare Workers and
browsers. A non-OK gRPC status becomes a typed error: `NOT_FOUND` is
`NotFound`, `UNAUTHENTICATED` is `Unauthorized`, `UNAVAILABLE` is
`ServiceUnavailable` (retried), and so on.

Server-streaming RPCs (`StreamLogs`, `DownloadFileStream`, `FsRead`,
`FsList`) collect the stream into `{ items }` when called, and emit each
message with `.stream(input)`:

```ts
import * as Stream from "effect/Stream";

Boxd.streamLogs.stream({ vmId }).pipe(Stream.runForEach(Effect.log));
```

Not in this SDK yet:

- The client- and bidi-streaming RPCs: `Exec`, `UploadFileStream`, `FsWrite`
  and `DesktopTunnel`. Use `uploadFile` for a file that fits in one message.
- Region routing. A call goes to the base URL. To use a machine in another
  region, set `BOXD_BASE_URL` to that region's endpoint
  (`https://<region>.boxd.sh:9443`).
- In-machine credentials from the boxd metadata service.
