# @distilled.cloud/steel

Effect-native SDK for the [Steel](https://steel.dev) browser API, generated from Steel's
[OpenAPI description](https://api.steel.dev/sdk-openapi.json) (linked from
`https://docs.steel.dev/openapi.json`), the one Steel's own SDKs are generated from.

## Installation

```bash
npm install @distilled.cloud/steel effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Steel from "@distilled.cloud/steel";

const program = Effect.gen(function* () {
  // A one-shot scrape runs in a throwaway browser.
  const page = yield* Steel.browserTools.scrape({ url: "https://example.com", format: ["markdown"] });

  // A session is a long-lived browser you drive over CDP: hand
  // `Redacted.value(session.websocketUrl)` to Playwright or Puppeteer.
  const session = yield* Steel.sessions.createSession({ blockAds: true });
  yield* Steel.sessions.releaseSession({ id: session.id });

  return { markdown: page.content.markdown, viewer: session.sessionViewerUrl };
});

const Live = Layer.mergeAll(FetchHttpClient.layer, Steel.CredentialsFromEnv, Steel.SteelProtocol);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

One module per API area: `sessions`, `browserTools`, `files`, `captchas`, `credentials`,
`extensions`, `profiles`, `projects`, `apiKeys` and `auth`.

`sessions.listSessions` pages by cursor, so `.pages()` and `.items()` stream every page:

```ts
import * as Stream from "effect/Stream";

const live = yield* Steel.sessions.listSessions.items({ status: "live" }).pipe(Stream.runCollect);
```

`websocketUrl` and `debugUrl` come back `Redacted`: the first carries a session token that grants
control of the browser, and the second opens the session player without an API key.

Downloads (`files.downloadFile`, `files.downloadArchive`, `extensions.downloadExtension`, …) return
the body as a `Uint8Array`. Uploads are multipart and take a `Blob`, `Uint8Array` or `ArrayBuffer`.

## Auth

`STEEL_API_KEY` as the `steel-api-key` header. `STEEL_BASE_URL` points it at a self-hosted Steel
browser and defaults to `https://api.steel.dev`. Both names match Steel's official clients. To pass
a key directly, use `Steel.fromApiKey({ apiKey: Redacted.make(key) })`.

## Errors

Steel errors carry a machine-readable `code`. The ones callers act on are typed per operation:

| Tag | Code | Raised by |
| --- | --- | --- |
| `SessionEnded` | `session_ended` (410) | `runCommands`, `getCommandExecution`, `cancelCommandExecution` on a released or timed-out session |
| `ProfileNotFound` | `profile_not_found` (404) | `createSession` with an unknown or expired `profileId` |

Everything else fails with the statuses the spec declares as typed classes (`NotFound`,
`Conflict`, `Gone`, `PayloadTooLarge`, …), then the shared HTTP status classes, then
`UnknownSteelError`, whose `code` is Steel's reason (`budget_exceeded`, `queue_full`, …).
