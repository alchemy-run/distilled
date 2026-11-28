# @distilled.cloud/elasticsearch

Effect-native SDK for [elasticsearch](https://www.npmjs.com/package/@distilled.cloud/elasticsearch).

## Installation

```bash
npm install @distilled.cloud/elasticsearch effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Elasticsearch from "@distilled.cloud/elasticsearch";

const program = Effect.gen(function* () {
  const result = yield* Elasticsearch.info({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Elasticsearch.CredentialsFromEnv,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Beta and experimental operations

Elastic marks some operations Beta or Experimental (`x-state`), for example
connectors, search applications and the task management API. They import from
`unstable/elasticsearch`; the package root exports only the generally
available operations:

```ts
import * as Elasticsearch from "@distilled.cloud/elasticsearch";
import * as Unstable from "@distilled.cloud/elasticsearch/unstable/elasticsearch";

const tasks = yield* Unstable.listTasks({});
```

## Auth

Required: `ELASTICSEARCH_API_KEY`, `ELASTIC_API_KEY`. Optional: `ELASTICSEARCH_API_BASE_URL`. Sent as `Authorization: Bearer`.
