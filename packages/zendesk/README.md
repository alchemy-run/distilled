# @distilled.cloud/zendesk

Effect-native SDK for [zendesk](https://www.npmjs.com/package/@distilled.cloud/zendesk).

## Installation

```bash
npm install @distilled.cloud/zendesk effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Zendesk from "@distilled.cloud/zendesk";

const program = Effect.gen(function* () {
  const result = yield* Zendesk.listTickets({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Zendesk.CredentialsFromEnv,
  Zendesk.ZendeskProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `ZENDESK_ACCESS_TOKEN`, `ZENDESK_API_TOKEN`, `ZENDESK_EMAIL`, `ZENDESK_SUBDOMAIN`. Optional: `ZENDESK_API_BASE_URL`. Sent as `Authorization: Bearer`.
