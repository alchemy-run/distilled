# @distilled.cloud/tinybird

Effect-native Tinybird SDK, generated from the [Tinybird API reference](https://www.tinybird.co/docs/api-reference).

## Installation

```bash
npm install @distilled.cloud/tinybird effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Tinybird from "@distilled.cloud/tinybird";
import * as Events from "@distilled.cloud/tinybird/events";
import * as Query from "@distilled.cloud/tinybird/query";

const program = Effect.gen(function* () {
  const ingested = yield* Events.sendEvents({
    name: "events",
    wait: true,
    body: '{"timestamp":"2026-11-17 00:00:00","city":"Chicago","amount":3}\n',
  });
  const bytes = yield* Query.querySql({
    q: "SELECT city, sum(amount) AS total FROM events GROUP BY city FORMAT JSON",
  });
  const { data } = JSON.parse(new TextDecoder().decode(bytes));
  return { ingested, data };
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Tinybird.CredentialsFromEnv,
  Tinybird.TinybirdProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise).then(console.log);
```

## Auth

`TINYBIRD_TOKEN` as `Authorization: Bearer`: a workspace token with the scopes the call needs
(`DATASOURCES:APPEND:<name>` for `sendEvents`, `PIPES:READ:<pipe>` for `queryPipe`, `ADMIN`, ...).
Optional `TINYBIRD_API_BASE_URL`, the API host of the workspace's
[region](https://www.tinybird.co/docs/api-reference#regions-and-endpoints) -- default
`https://api.tinybird.co`. Or provide them yourself:

```ts
import * as Redacted from "effect/Redacted";

Tinybird.credentials({
  token: Redacted.make(token),
  apiBaseUrl: "https://api.us-east.tinybird.co",
});
```

## Services

One module per reference page, each imported from its subpath:

| Module | Operations |
| --- | --- |
| `datasource` | `listDatasources`, `getDatasource`, `createDatasource` (create, append, replace; `csv`/`ndjson` file parts), `alterDatasource`, `updateDatasource`, `truncateDatasource`, `deleteDatasourceRows`, `deleteDatasource` |
| `events` | `sendEvents` |
| `query` | `querySql`, `querySqlWithBody` |
| `pipe` | `listPipes`, `getPipe`, `createPipe`, `updatePipe`, `deletePipe`, `getPipeByFileName`, `updatePipeByFileName`, `deletePipeByFileName`, `queryPipe`, `queryPipeWithBody`, `createPipeNode`, `updatePipeNode`, `deletePipeNode`, `explainPipe`, `explainPipeNode` |
| `api_endpoints` | `createPipeNodeEndpoint`, `deletePipeNodeEndpoint` |
| `copy_pipes` | `createPipeNodeCopy`, `updatePipeNodeCopy`, `deletePipeNodeCopy`, `runPipeCopy`, `pausePipeCopy`, `resumePipeCopy`, `cancelPipeCopy` |
| `materialized_views` | `createPipeNodeMaterialization`, `deletePipeNodeMaterialization`, `populatePipeNode` |
| `sink_pipes` | `createPipeNodeSink`, `deletePipeNodeSink`, `triggerPipeSink`, `getS3Settings`, `getS3TrustPolicy`, `getS3WriteAccessPolicy` |
| `token` | `listTokens`, `getToken`, `createToken`, `updateToken`, `refreshToken`, `deleteToken` |
| `environment_variables` | `listVariables`, `getVariable`, `createVariable`, `updateVariable`, `deleteVariable` |
| `jobs` | `listJobs`, `getJob`, `cancelJob` |
| `analyze` | `analyzeData` |
| `organizations` | `listOrganizationClusters`, `getOrganizationClustersConfiguration`, `updateOrganizationClusterWeights`, `addOrganizationClusterReplica`, `addOrganizationClusterReplicaByName`, `removeOrganizationClusterReplica`, `removeOrganizationClusterReplicaByName` |

## Bodies and formats

- `queryPipe`, `queryPipeWithBody`, `querySql` and `querySqlWithBody` answer in the format you ask for
  (`format: "csv" | "json" | "ndjson" | "parquet" | "prometheus"`, or `FORMAT <name>` in the SQL), so they
  return the response bytes as a `Uint8Array`. Decode JSON or text yourself; Parquet stays intact.
- `getPipeByFileName` returns the Pipe's datafile as a `string`.
- `sendEvents` sends `body` verbatim as NDJSON; `createPipeNode` sends its SQL `body` as text.
- `createDatasource` and `analyzeData` upload files as multipart parts (`csv`, `ndjson`, `file`) given as
  `Uint8Array`.
- Template parameters are caller-named. Pass them as extra keys to `querySqlWithBody` and
  `queryPipeWithBody`, which send them in the JSON body. `queryPipe` and `querySql` are `GET`s and only send
  the parameters they model (see below).
- `createToken` makes a static token from `scope`, or a JWT when you give `expiration_time` (Unix seconds)
  and `scopes`. Each JWT scope can pin template parameters with `fixed_params`. Every query made with that
  JWT uses them, which is how one token serves one tenant:

  ```ts
  const { token } = yield* Token.createToken({
    name: "tenant_42",
    expiration_time: Math.floor(Date.now() / 1000) + 3600,
    scopes: [{ type: "PIPES:READ", resource: "events_by_city", fixed_params: { tenant_id: 42 } }],
  });
  ```
- The reference types most JSON responses by example only, so those outputs are open objects. Token
  responses are modeled, and their `token` values come back `Redacted`.

## Not covered yet

Some parameters have names the caller picks, and the reference documents them as a family. They need
query-parameter maps, which distilled core does not have yet, so these calls cannot send them:

| Operation | Parameters it cannot send | It does send |
| --- | --- | --- |
| `querySql`, `queryPipe` (`GET`) | template parameters | the modeled parameters; use `querySqlWithBody` / `queryPipeWithBody` for templates |
| `createDatasource` | `engine_*` other than `engine_sorting_key`, `engine_ver`, `engine_settings` | `engine` and those three |
| `createPipeNode`, `createPipeNodeMaterialization` | `engine_*` settings of the target Data Source | `engine` |
| `triggerPipeSink` | `{key}` template variables for the sink query | `file_template`, `format`, `compression`, `write_strategy` |

`engine_*` settings only apply when a Data Source is created. In Tinybird Forward that happens through
deployments, not these calls (see below), so the `engine_*` rows only affect Classic workspaces.

## Errors

Failures are typed by status: `BadRequest`, `Unauthorized`, `Forbidden`, `NotFound`, `Conflict`,
`UnprocessableEntity`, `TooManyRequests` (retried), `InternalServerError` and other 5xx (retried); any other
status is `UnknownTinybirdError`. `message` is Tinybird's `error`. A missing `TINYBIRD_TOKEN` is a
`ConfigError`.

## Tinybird Forward and Classic

The reference covers both. In a Tinybird Forward workspace, Pipes, Data Sources, Copy and Materialized
nodes, Sinks and resource-scoped tokens are created and changed through deployments, so the API answers
`Forbidden` ("can only be done via deployments") to `createPipe`, `createPipeNode`, `createDatasource`
with `mode: "create"`, `alterDatasource` and the rest. Ingestion, queries, jobs, copies, tokens without
a resource, and environment variables work in both.
