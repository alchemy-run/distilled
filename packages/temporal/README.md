# @distilled.cloud/temporal

Effect-native SDK for Temporal's two HTTP APIs:

- **WorkflowService** — start, signal and query workflows. Every Temporal
  server serves it, self-hosted or Temporal Cloud. Its operations are
  exported from the package root (`Temporal.listWorkflowExecutions`).
- **Cloud Ops API** — manage Temporal Cloud namespaces, users, groups,
  service accounts, API keys, projects, Nexus endpoints and sinks. Only
  Temporal Cloud serves it, at `https://saas-api.tmprl.cloud`. Its
  operations live under `Temporal.cloud`.

One protocol serves both: each call goes to the host for its API.

## Installation

```bash
npm install @distilled.cloud/temporal effect
```

## Quick start

```ts
import { Effect, Layer, Stream } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Temporal from "@distilled.cloud/temporal";

const program = Effect.gen(function* () {
  // Cloud Ops API: every namespace in the account, across all pages.
  const namespaces = yield* Temporal.cloud.listNamespaces
    .items({})
    .pipe(Stream.runCollect);

  // WorkflowService: running workflows in one namespace.
  const running = yield* Temporal.listWorkflowExecutions({
    namespace: "orders",
    query: "ExecutionStatus = 'Running'",
  });

  return { namespaces, running: running.executions };
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Temporal.CredentialsFromEnv,
  Temporal.TemporalProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

Most mutating Cloud Ops calls are asynchronous: they answer with an
`asyncOperation`. Poll `Temporal.cloud.getAsyncOperation` with its `id` until
`state` is `fulfilled` or `failed`.

## Auth

Required: `TEMPORAL_API_KEY`, sent as `Authorization: Bearer` to both APIs.

Optional:

- `TEMPORAL_API_BASE_URL` — WorkflowService HTTP origin. Defaults to
  `http://localhost:7243`.
- `TEMPORAL_CLOUD_API_BASE_URL` — Cloud Ops API origin. Defaults to
  `https://saas-api.tmprl.cloud`.
- `TEMPORAL_CLOUD_API_VERSION` — sent as the `temporal-cloud-api-version`
  header (for example `v0.22.0`). Without it the Cloud Ops API answers with
  its latest version.
