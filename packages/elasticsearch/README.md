# @distilled.cloud/elasticsearch

Effect-native SDK for [elasticsearch](https://www.npmjs.com/package/@distilled.cloud/elasticsearch).

## Installation

```bash
npm install @distilled.cloud/elasticsearch effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Elasticsearch from "@distilled.cloud/elasticsearch";

const program = Effect.gen(function* () {
  const result = yield* Elasticsearch.info({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Elasticsearch.CredentialsFromEnv,
  Elasticsearch.ElasticsearchProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `ELASTICSEARCH_API_KEY`, `ELASTIC_API_KEY`. Optional: `ELASTICSEARCH_API_BASE_URL`. Sent as `Authorization: Bearer`.
