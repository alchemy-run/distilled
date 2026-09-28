# @distilled.cloud/grafana

Effect-native SDK for [grafana](https://www.npmjs.com/package/@distilled.cloud/grafana).

## Installation

```bash
npm install @distilled.cloud/grafana effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Grafana from "@distilled.cloud/grafana";

const program = Effect.gen(function* () {
  const result = yield* Grafana.getDataSources({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Grafana.CredentialsFromEnv,
  Grafana.GrafanaProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `GRAFANA_ORG_ID`, `GRAFANA_TOKEN`. Optional: `GRAFANA_URL`. Sent as `Authorization: Bearer`.
