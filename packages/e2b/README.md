# @distilled.cloud/e2b

Effect-native SDK for [E2B](https://e2b.dev), generated from E2B's published API descriptions in [`e2b-dev/E2B/spec`](https://github.com/e2b-dev/E2B/tree/main/spec): the control plane, volume content, and the in-sandbox daemon (envd).

## Installation

```bash
npm install @distilled.cloud/e2b effect
```

## Quick start

Create a sandbox, run a command in it through envd, and kill it.

```ts
import { Effect, Layer, Stream } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as E2B from "@distilled.cloud/e2b";

const program = Effect.gen(function* () {
  const sandbox = yield* E2B.sandboxes.createSandbox({ templateID: "base", timeout: 60 });

  // envd calls address one sandbox with its own access token.
  const output = yield* E2B.process.startProcess({
    process: { cmd: "echo", args: ["hello from e2b"] },
  }).pipe(
    Stream.filter((event) => event._tag === "Stdout"),
    Stream.map((event) => new TextDecoder().decode(event.data)),
    Stream.mkString,
    Effect.provide(E2B.sandboxConnectionFor(sandbox)),
  );

  yield* E2B.sandboxes.deleteSandbox({ sandboxID: sandbox.sandboxID });
  return output;
});

const Live = Layer.mergeAll(FetchHttpClient.layer, E2B.CredentialsFromEnv);

program.pipe(Effect.provide(Live), Effect.runPromise).then(console.log);
```

## Services

| Module | Host | Credential |
| --- | --- | --- |
| `sandboxes`, `templates`, `tags`, `volumes`, `secrets`, `snapshots`, `events`, `webhooks`, `auth`, `health`, `unstable` | `https://api.e2b.app` | team API key (`X-API-Key`) |
| `apiKeys` | `https://api.e2b.app` | access token (`Authorization: Bearer`) + team id (`X-Team-ID`) |
| `envd`, `process`, `filesystem` | `https://sandbox.e2b.app` | the sandbox's envd access token — `sandboxConnection(...)` |
| `volumeContent` | `https://api.e2b.app/volumecontent` | the volume's token — `volumeConnection(...)` |

`process.startProcess`, `process.connectProcess` and `filesystem.watchDir`
are envd's server-streaming RPCs, returned as `Stream`s. Every other envd RPC
is a generated unary operation (`process.sendProcessInput`,
`filesystem.listDir`, …). The data-plane protocols never send the team API key.

## Auth

`E2B_API_KEY` as `X-API-Key`. Optional: `E2B_ACCESS_TOKEN` (`Authorization: Bearer`) and `E2B_TEAM_ID` (`X-Team-ID`) for `apiKeys` and `auth`, `E2B_DOMAIN` (default `e2b.app`), `E2B_API_URL` (default `https://api.<domain>`).
