# @distilled.cloud/clickhouse-cloud

Effect-native ClickHouse Cloud SDK, generated from the OpenAPI document the API serves at [`https://api.clickhouse.cloud/v1`](https://api.clickhouse.cloud/v1).

## Installation

```bash
npm install @distilled.cloud/clickhouse-cloud effect
```

## Quick start

List the organization's services.

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as ClickHouseCloud from "@distilled.cloud/clickhouse-cloud";

const program = Effect.gen(function* () {
  const organizations = yield* ClickHouseCloud.organization.listOrganizations({});
  const organizationId = organizations.result[0]?.id;
  if (organizationId === undefined) return [];

  const services = yield* ClickHouseCloud.service.listServices({ organizationId });
  return services.map(({ name, state, region }) => ({ name, state, region }));
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  ClickHouseCloud.CredentialsFromEnv,
  ClickHouseCloud.ClickHouseCloudProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise).then(console.log);
```

Operations return the payload of ClickHouse's `{ status, requestId, result }`
response. Create a service, then stop and delete it (a service must be stopped
before it can be deleted, and both are asynchronous):

```ts
import { Effect, Schedule } from "effect";

const lifecycle = (organizationId: string) =>
  Effect.gen(function* () {
    const { service } = yield* ClickHouseCloud.service.createService({
      organizationId,
      name: "distilled-example",
      provider: "aws",
      region: "us-east-1",
      ipAccessList: [{ source: "0.0.0.0/0", description: "anywhere" }],
    });
    if (service?.id === undefined) return;
    const serviceId = service.id;

    yield* ClickHouseCloud.service.updateServiceState({
      organizationId,
      serviceId,
      command: "stop",
    });
    yield* ClickHouseCloud.service.getService({ organizationId, serviceId }).pipe(
      Effect.repeat({
        until: ({ state }) => state === "stopped",
        schedule: Schedule.spaced("15 seconds"),
      }),
    );
    yield* ClickHouseCloud.service.deleteService({ organizationId, serviceId });
  });
```

Some failures have their own error, told apart from other answers of the same
status by the envelope's `error` text: `DeletionProtectionEnabled` and
`ServiceNotTerminable` (`deleteService`, `409`), `InstanceLimitReached`
(`createService`, `409`), `ServiceNotIdle` (`updateServiceState`, `400`),
`DeletionProtectionNotEnabled` (`updatePostgresService`, `400`) and
`FeatureUnavailable` (a `403` for a feature the plan or organization lacks,
such as ClickStack that is not set up). Every other failure is the status's
class.

## Services

One module per API tag: `service`, `apiKeys`, `backup`, `snapshot`,
`clickPipes`, `clickStack`, `postgres`, `organization` (including BYOC
infrastructure), `roleManagement`, `userManagement`, `notifications`,
`billing`, `prometheus`, `queryApiEndpoints`, `savedQueries` and `udf`.
Many ClickStack, Postgres, BYOC and UDF operations are marked Beta upstream.

Operations return the `result` of the API's `{ status, requestId, result }`
envelope. A cursor-paginated list (`listApiKeys`, `listClickPipes`, `listUdfs`,
…) returns the page, `{ result, nextCursor }`, because the cursor rides beside
the `result`; its `.pages()` and `.items()` walk every page. The Prometheus
metrics operations and `postgres.getPostgresServiceCaCertificates`
return the response body as a `string`.

Secrets in responses come back as `Redacted`: the `keySecret` from
`apiKeys.createApiKey`, the service password from `service.createService` and
`service.updateServicePassword`, a Postgres service's `password` and
`connectionString`, an object-storage ClickPipe source's `connectionString`,
and every ClickStack webhook's `url` (for an incoming webhook the URL is the
credential; PagerDuty's fixed endpoint is redacted too, because all webhook
kinds share one response union). Secrets the API only accepts — the other
ClickPipes source credentials, backup bucket keys and connection strings,
password and key-secret hashes, a new Postgres password — are typed
`string | Redacted` and sent unwrapped. Key IDs (`accessKeyId`) stay plain
strings.

## Auth

HTTP Basic with an API key: `CLICKHOUSE_CLOUD_API_KEY_ID` as the username and
`CLICKHOUSE_CLOUD_API_KEY_SECRET` as the password. Optional:
`CLICKHOUSE_CLOUD_API_URL` (default `https://api.clickhouse.cloud`). Or build
the layer yourself:

```ts
import * as Redacted from "effect/Redacted";
import * as ClickHouseCloud from "@distilled.cloud/clickhouse-cloud";

const Credentials = ClickHouseCloud.credentials({
  keyId: "…",
  keySecret: Redacted.make(process.env.CLICKHOUSE_CLOUD_API_KEY_SECRET!),
});
```

Each key is limited to 10 requests per 10 seconds; a `429` surfaces as
`TooManyRequests`, which the default retry policy retries with backoff.
