# @distilled.cloud/freestyle

Effect-native SDK for the [Freestyle v5 HTTP API](https://www.freestyle.sh/docs),
generated from [api.freestyle.sh/openapi.json](https://api.freestyle.sh/openapi.json).

## Installation

```bash
npm install @distilled.cloud/freestyle effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Freestyle from "@distilled.cloud/freestyle";

const program = Effect.gen(function* () {
  const vm = yield* Freestyle.vms.createVm({
    firewall: { rules: [] },
  });
  const { stdout } = yield* Freestyle.vms.execVm({
    vmIdOrSlug: vm.id,
    command: "uname -a",
  });

  const pty = yield* Freestyle.connectPty({
    vmIdOrSlug: vm.id,
    cols: 120,
    rows: 30,
  });
  pty.write("echo hello\n");
  pty.detach();

  yield* Freestyle.vms.deleteVm({ vmIdOrSlug: vm.id });
  return stdout;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Freestyle.CredentialsFromEnv,
  Freestyle.FreestyleProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `FREESTYLE_API_KEY` (or `FREESTYLE_IDENTITY_ACCESS_TOKEN` on exec/PTY
routes). Optional: `FREESTYLE_API_BASE_URL` (default `https://api.freestyle.sh`).
Sent as `Authorization: Bearer`.

Generated `openPty` / `attachPty` are REST stubs — PTY is a WebSocket upgrade.
Use `connectPty` / `reconnectPty`. Binary frames are terminal I/O; text frames
are `resize` / `signal` in and `exited` / `error` out.
