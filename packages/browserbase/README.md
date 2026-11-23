# @distilled.cloud/browserbase

Effect-native [Browserbase](https://www.browserbase.com) SDK, generated from Browserbase's
[OpenAPI description](https://docs.browserbase.com/reference/api/openapi.v1.yaml).

## Installation

```bash
npm install @distilled.cloud/browserbase effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Redacted from "effect/Redacted";
import * as Browserbase from "@distilled.cloud/browserbase";

const program = Effect.gen(function* () {
  // A session is a remote browser you drive over CDP: hand `connectUrl` to
  // Playwright or Puppeteer.
  const session = yield* Browserbase.createSession({
    browserSettings: { viewport: { width: 1280, height: 720 } },
  });

  // Release it when you are done, rather than waiting for the timeout.
  yield* Browserbase.updateSession({ id: session.id, status: "REQUEST_RELEASE" });

  return session.connectUrl;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Browserbase.CredentialsFromEnv,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

`BROWSERBASE_API_KEY` is sent as the `X-BB-API-Key` header. `BROWSERBASE_BASE_URL` is optional
and defaults to `https://api.browserbase.com`. To pass the key directly, use
`Browserbase.fromApiKey({ apiKey: Redacted.make(key) })`.

## Pagination

List operations are plain calls (one page) and also expose streams that fetch more pages as you
consume them:

```ts
import * as Stream from "effect/Stream";

// cursor-paged: agents, runs, run messages, labels, secrets, webhooks, function secrets
const labels = Browserbase.listLabels.items({ limit: 100 });

// offset-paged: downloads, functions, builds, versions, invocations
const functions = Browserbase.listFunctions.items({}).pipe(Stream.take(50), Stream.runCollect);
```

## Uploads and secrets

Session files, extensions and CA certificates upload as `multipart/form-data`; the `file` member
takes a `Blob`, `Uint8Array` or `ArrayBuffer`.

```ts
yield* Browserbase.uploadSessionFile({ id: session.id, file: new File([bytes], "data.csv") });
```

Webhook signing secrets (`createWebhook`, `rotateWebhookSecret`) and session `signingKey`s come
back as `Redacted` values, so they print as `<redacted>` in logs and errors; `Redacted.value` unwraps
one where you need it.

## Errors

Each operation's declared statuses are typed errors (`BadRequest`, `NotFound`, `Conflict`,
`PaymentRequired`, `Gone`, …). Throttling (429) and 5xx responses are retried by the default policy;
`Browserbase.Retry.none` turns retries off.
