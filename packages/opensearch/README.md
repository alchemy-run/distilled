# @distilled.cloud/opensearch

Effect-native SDK for the OpenSearch cluster REST API: search, documents,
bulk, indices, point in time, ISM, k-NN, ML Commons, the security plugin and
the rest of the API. Generated from the official
[OpenSearch API specification](https://github.com/opensearch-project/opensearch-api-specification)
(OpenAPI 3.1), the same description the official clients are generated from.

It works with self-hosted clusters, Amazon OpenSearch Service and Amazon
OpenSearch Serverless. The control plane of the AWS services (creating
domains and collections) is in `@distilled.cloud/aws/opensearch` and
`@distilled.cloud/aws/opensearchserverless`.

## Installation

```bash
npm install @distilled.cloud/opensearch effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as OpenSearch from "@distilled.cloud/opensearch";

const program = Effect.gen(function* () {
  yield* OpenSearch.index({ index: "logs", refresh: "true", document: { message: "hello" } });

  const result = yield* OpenSearch.searchByIndex({
    index: "logs",
    query: { match: { message: "hello" } },
  });
  return result.hits.hits;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  OpenSearch.CredentialsFromEnv,
  OpenSearch.OpenSearchProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Operation names

The spec groups the paths of one API call (`search` is `/_search` and
`/{index}/_search`). Each path is one operation, named after its group as in
the official clients, plus `By<Label>` for each path label that tells the
paths apart:

| Call | Path |
| --- | --- |
| `search` | `POST /_search` |
| `searchByIndex` | `POST /{index}/_search` |
| `index` | `POST /{index}/_doc` |
| `indexById` | `POST /{index}/_doc/{id}` |
| `indicesCreate` | `PUT /{index}` |
| `indicesPutMapping` | `POST /{index}/_mapping` |
| `createPit` | `POST /{index}/_search/point_in_time` |

Where a path accepts GET and POST (or POST and PUT), the SDK sends POST: the
server treats them alike.

## Bulk and multi-search

`bulk`, `bulkByIndex`, `msearch`, `msearchByIndex` and the template and stream
variants take newline-delimited JSON (`application/x-ndjson`) as a string in
`body`:

```ts
const lines = [{ index: { _id: "1" } }, { message: "first" }, { delete: { _id: "2" } }];

const result = yield* OpenSearch.bulkByIndex({
  index: "logs",
  body: lines.map((line) => JSON.stringify(line)).join("\n") + "\n",
});
```

## Auth

`CredentialsFromEnv` reads the environment on every request:

- `OPENSEARCH_URL`: the endpoint. Default `http://localhost:9200`.
- `OPENSEARCH_AWS_SERVICE` set to `es` (Amazon OpenSearch Service) or `aoss`
  (OpenSearch Serverless): sign every request with AWS SigV4, using
  `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_SESSION_TOKEN` and
  `AWS_REGION` (or `AWS_DEFAULT_REGION`).
- Else `OPENSEARCH_TOKEN`: `Authorization: Bearer <token>` (the security
  plugin's JWT authentication).
- Else `OPENSEARCH_USERNAME` and `OPENSEARCH_PASSWORD`: HTTP basic auth.
- Else no `Authorization` header.

Or build the credentials in code:

```ts
import * as Redacted from "effect/Redacted";

OpenSearch.fromBasicAuth({
  endpoint: "https://localhost:9200",
  username: "admin",
  password: Redacted.make(process.env.OPENSEARCH_PASSWORD!),
});

OpenSearch.fromSigV4({
  endpoint: "https://search-logs-abc123.us-east-1.es.amazonaws.com",
  region: "us-east-1",
  service: "es", // or "aoss" for OpenSearch Serverless
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: Redacted.make(process.env.AWS_SECRET_ACCESS_KEY!),
  },
});
```

`fromSigV4` also accepts an `Effect` that returns the keys. It runs on every
request, so it can return refreshed temporary credentials.
