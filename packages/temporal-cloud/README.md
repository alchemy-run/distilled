# @distilled.cloud/temporal-cloud

Effect-native SDK for the [Temporal Cloud Ops API](https://docs.temporal.io/ops):
namespaces, users, groups, service accounts, API keys, projects, Nexus
endpoints, connectivity rules, export and audit-log sinks.

For the Temporal Server WorkflowService HTTP API (start and query workflow
executions), use [`@distilled.cloud/temporal`](../temporal).

## Installation

```bash
npm install @distilled.cloud/temporal-cloud effect
```

## Quick start

```ts
import { Effect, Layer, Stream } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as TemporalCloud from "@distilled.cloud/temporal-cloud";

const program = Effect.gen(function* () {
  // Every namespace in the account, across all pages.
  const namespaces = yield* TemporalCloud.listNamespaces
    .items({})
    .pipe(Stream.runCollect);

  // Create an API key for a service account. The token is only returned
  // here, as a Redacted value.
  const created = yield* TemporalCloud.createApiKey({
    spec: {
      ownerId: "<service-account-id>",
      ownerType: "OWNER_TYPE_SERVICE_ACCOUNT",
      displayName: "ci",
      expiryTime: new Date(Date.now() + 30 * 86_400_000).toISOString(),
    },
  });

  // Mutations are asynchronous; poll the operation until it settles.
  const operation = yield* TemporalCloud.getAsyncOperation({
    asyncOperationId: created.asyncOperation!.id!,
  });

  return { namespaces, keyId: created.keyId, state: operation.asyncOperation?.state };
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  TemporalCloud.CredentialsFromEnv,
  TemporalCloud.TemporalCloudProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `TEMPORAL_CLOUD_API_KEY` — a Temporal Cloud API key, sent as
`Authorization: Bearer`.

Optional:

- `TEMPORAL_CLOUD_API_BASE_URL` — defaults to `https://saas-api.tmprl.cloud`.
- `TEMPORAL_CLOUD_API_VERSION` — sent as the `temporal-cloud-api-version`
  header (for example `v0.22.0`). Without it the API answers with its latest
  version.
