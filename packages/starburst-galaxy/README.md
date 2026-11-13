# @distilled.cloud/starburst-galaxy

Effect-native Starburst Galaxy SDK, generated from the Galaxy public OpenAPI documents
[v1](https://galaxy.starburst.io/public/openapi/v1/json) and
[v2](https://galaxy.starburst.io/public/openapi/v2/json).

## Installation

```bash
npm install @distilled.cloud/starburst-galaxy effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as StarburstGalaxy from "@distilled.cloud/starburst-galaxy";

const program = Effect.gen(function* () {
  const { result } = yield* StarburstGalaxy.cluster.listClusters({});
  const [first] = result;
  if (first === undefined) return undefined;

  const cluster = yield* StarburstGalaxy.cluster.getCluster({ clusterId: first.clusterId });
  yield* Effect.log(`${cluster.name}: ${cluster.clusterState} at ${cluster.trinoUri}`);
  return cluster;
});

const Live = Layer.mergeAll(
  StarburstGalaxy.CredentialsFromEnv,
  StarburstGalaxy.StarburstGalaxyProtocol,
).pipe(Layer.provideMerge(FetchHttpClient.layer));

program.pipe(Effect.provide(Live), Effect.runPromise);
```

The credentials layer takes the same `HttpClient` the operations use, so the
token exchange is traced and testable like every other request.

List operations stream every page with `.items()` (or `.pages()`):

```ts
import { Effect, Stream } from "effect";
import * as StarburstGalaxy from "@distilled.cloud/starburst-galaxy";

const catalogs = Effect.gen(function* () {
  return yield* StarburstGalaxy.catalog.listCatalogs.items({}).pipe(Stream.runCollect);
});
```

Galaxy's polymorphic payloads are unions discriminated by one member: a
catalog's connection or metastore type (`connectionType`, `metastoreType`,
`authType`, `deploymentType`), a Kafka source's `authType`, a file source's
`credentialsType`, a live table's `typeKey`. Each arm carries its own
members, and a request whose whole body is such a union takes it as `body`:

```ts
import { Effect, Redacted } from "effect";
import * as StarburstGalaxy from "@distilled.cloud/starburst-galaxy";

const mysql = Effect.gen(function* () {
  return yield* StarburstGalaxy.catalog.createMySQLCatalog({
    body: {
      connectionType: "direct",
      name: "orders",
      readOnly: true,
      host: "orders.example.com",
      username: "galaxy",
      password: Redacted.make("…"),
    },
  });
});
```

## Auth

Galaxy serves the API from each account's own host and authenticates with
OAuth 2.0 client credentials from a service account.

| Variable | |
| --- | --- |
| `STARBURST_GALAXY_DOMAIN` | the account domain, e.g. `yourco.galaxy.starburst.io` |
| `STARBURST_GALAXY_CLIENT_ID` | the service account's client ID |
| `STARBURST_GALAXY_CLIENT_SECRET` | the service account's client secret |

`CredentialsFromEnv` reads them through the current `ConfigProvider` and
exchanges the client ID and secret at `POST https://<domain>/oauth/v2/token`
(HTTP Basic, `grant_type=client_credentials`) on first use, sends the token as
`Authorization: Bearer`, and exchanges again a minute before the token's
10-minute lifetime ends. Concurrent requests on a cold or expiring token share
one exchange, and the cache is rebuilt when any of the three variables changes.
`fromClientCredentials({ domain, clientId, clientSecret })` does the same from
values in code (`clientSecret` is a `Redacted`); both need an `HttpClient`.
`fromAccessToken({ domain, accessToken })` uses a token already held. The
domain must be HTTPS (plain `http://` only on the loopback interface), since
the client secret and every token are sent to it.

Secrets in catalog and ingest-source payloads (passwords, AWS secret keys, the
AstraDB token, BigQuery/GCS `credentialsKey`, the Snowflake private key and
passphrase) are `Redacted` wherever a response carries them and accept
`string | Redacted` in requests. Identifiers such as an AWS access key ID stay
plain strings.

## Errors

Statuses the spec documents per operation (400, 403, 404, 409, 412) are typed on
each operation and keep the response body as `body` (`fields` on a 400, `detail`
on a 412); any other failure maps through core's HTTP status classes, 412 to
`PreconditionFailed`, and the rest to `UnknownStarburstGalaxyError`. With
`ResponseValidation.strict` or `.additionalProperties`, a 2xx body that does not
match its schema fails with `StarburstGalaxyParseError`.
