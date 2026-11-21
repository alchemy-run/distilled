# @distilled.cloud/hydradb

Effect-native HydraDB SDK, generated from the v2 OpenAPI document HydraDB publishes at [`https://docs.hydradb.com/api-reference/v2/openapi.json`](https://docs.hydradb.com/api-reference/v2/openapi.json).

## Installation

```bash
npm install @distilled.cloud/hydradb effect
```

## Quick start

Wait until a database is ready, then query it.

```ts
import { Effect, Layer, Schedule } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as HydraDB from "@distilled.cloud/hydradb";

const program = Effect.gen(function* () {
  yield* HydraDB.getDatabaseStatus({ database: "acme_corp" }).pipe(
    Effect.repeat({
      until: ({ infra }) => infra?.ready_for_ingestion === true,
      schedule: Schedule.spaced("5 seconds"),
    }),
  );

  const result = yield* HydraDB.query({
    database: "acme_corp",
    query: "What pricing tiers did product agree on?",
    type: "knowledge",
    query_by: "hybrid",
  });
  return typeof result === "string" ? result : (result.chunks ?? []);
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  HydraDB.CredentialsFromEnv,
  HydraDB.HydraDBProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise).then(console.log);
```

Ingest is `multipart/form-data`, as the API takes it. `memories`,
`app_knowledge`, `document_metadata` and `graph_payload` are JSON strings;
poll `getContextStatus` with the returned IDs until `indexing_status` is
`completed`:

```ts
const ingest = HydraDB.ingestContext({
  database: "acme_corp",
  collection: "user_alex",
  type: "memory",
  memories: JSON.stringify([
    { id: "alex_pref_001", text: "Alex prefers concise technical answers.", infer: true },
  ]),
});
```

Files go in `documents` (`File`, `Blob`, `Uint8Array` or `ArrayBuffer`), one
`documents` part each. HydraDB reads a file's type from its filename's
extension, so pass a `File` with its real name, and one
`document_metadata` item per file, in the same order:

```ts
const upload = HydraDB.ingestContext({
  database: "acme_corp",
  type: "knowledge",
  documents: [new File([pdfBytes], "policy.pdf", { type: "application/pdf" })],
  document_metadata: JSON.stringify([{ metadata: { department: "support" } }]),
});
```

Each file of the list is sent under `documents` by core's multipart
encoder as of `fix(core): send each file of a multipart list under the
member's wire name`; this package depends on that change.

## Operations

All 45 operations of the v2 API, exported from the package root and named
after the official SDK's methods: databases (`createDatabase`,
`getDatabaseStatus`, `listDatabases`, `getDatabaseStats`, `listCollections`,
`deleteCollection`, `getMetadataSchema`, `updateMetadataSchema`,
`deleteDatabase`), context (`ingestContext`, `getContextStatus`,
`listContext`, `inspectContext`, `updateContextMetadata`,
`listContextRelations`, `getContextSubgraph`, `getContextSubgraphById`,
`deleteContext`), `query` and `submitFeedback`, connectors
(`listConnectorProviders`, `createConnector`, `discoverConnectorResources`,
`configureConnector`, `getConnectorStatus`, `syncConnector`, …) and the
indexing webhook (`registerWebhook`, `getWebhook`, `testWebhook`,
`listWebhookDeliveries`, `setWebhookSigningSecret`, …).

Operations return the `data` of the API's `{ success, data, error, meta }`
envelope. The connector operations and `updateMetadataSchema`, which the API
answers without the envelope, return the body as sent. Database creation and
indexing are asynchronous on the server: `createDatabase` and `ingestContext`
return once the work is accepted, and `getDatabaseStatus` /
`getContextStatus` report progress.

Failures are typed by status (core's `BadRequest`, `NotFound`, `Conflict`,
`UnprocessableEntity`, `TooManyRequests`, …) with the envelope's
`error.message` as the message. Codes a caller acts on have their own error:
`DatabaseNotFound` (`404` `DATABASE_NOT_FOUND`), `DatabaseAlreadyExists`
(`createDatabase`, `409` `DATABASE_ALREADY_EXISTS`) and `DatabaseNotReady`
(`ingestContext` and `query`, `422` `TENANT_INFRA_NOT_READY`: poll
`getDatabaseStatus`, then call again). `ingestContext` also fails with
`ContentTooLarge` (`413`) and `UnsupportedMediaType` (`415`). Anything else is
`UnknownHydraDBError`, carrying the status, the envelope's `error.code` and the
whole body (with `meta.request_id`, which HydraDB support asks for).

Webhook signing secrets and `inspectContext`'s `presigned_url` come back as
`Redacted`.

## Auth

`HYDRADB_API_KEY` as `Authorization: Bearer`; every request also sends
`API-Version: 2`. Optional: `HYDRADB_API_URL` (default
`https://api.hydradb.com`), the origin of an on-premises or self-hosted
HydraDB deployment. Or build the layer yourself:

```ts
import * as Redacted from "effect/Redacted";
import * as HydraDB from "@distilled.cloud/hydradb";

const Credentials = HydraDB.credentials({
  apiKey: Redacted.make(process.env.HYDRADB_API_KEY!),
  apiBaseUrl: "https://hydradb.internal.example",
});
```

`429`, `500`, `502` and `503` are retried by the default policy with backoff,
honoring `Retry-After`.
