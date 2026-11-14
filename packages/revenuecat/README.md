# @distilled.cloud/revenuecat

Effect-native RevenueCat SDK, generated from the [REST API v2 OpenAPI spec](https://www.revenuecat.com/docs/redocusaurus/openapi-v2-beta.yaml).

## Installation

```bash
npm install @distilled.cloud/revenuecat effect
```

## Quick start

```ts
import { Effect, Layer, Stream } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as RevenueCat from "@distilled.cloud/revenuecat";

const program = Effect.gen(function* () {
  const { items: projects } = yield* RevenueCat.listProjects({});
  const project_id = projects[0]!.id;

  const entitlement = yield* RevenueCat.createEntitlement({
    project_id,
    lookup_key: "pro",
    display_name: "Pro",
  });

  const offerings = yield* RevenueCat.listOfferings
    .items({ project_id })
    .pipe(Stream.runCollect);

  return { entitlement, offerings };
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  RevenueCat.CredentialsFromEnv,
  RevenueCat.RevenueCatProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

List operations follow `next_page` with `.pages()` and `.items()`.

## Auth

`REVENUECAT_API_KEY`, a v2 secret API key, sent as `Authorization: Bearer`. Optional `REVENUECAT_API_BASE_URL` (default `https://api.revenuecat.com/v2`).
