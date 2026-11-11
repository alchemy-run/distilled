# @distilled.cloud/iceberg

Effect-native SDK for the [Apache Iceberg REST Catalog API](https://github.com/apache/iceberg/blob/main/open-api/rest-catalog-open-api.yaml), generated from the Apache Iceberg OpenAPI spec. One client for every Iceberg REST catalog: Cloudflare Basin Catalog, Apache Polaris, Nessie, Unity Catalog, the Iceberg endpoints of AWS Glue and S3 Tables, and the reference REST catalog.

## Installation

```bash
npm install @distilled.cloud/iceberg effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Iceberg from "@distilled.cloud/iceberg";

const program = Effect.gen(function* () {
  yield* Iceberg.createNamespace({ namespace: ["analytics"] });

  const table = yield* Iceberg.createTable({
    namespace: "analytics",
    name: "page_views",
    schema: {
      type: "struct",
      fields: [
        { id: 1, name: "user_id", type: "string", required: true },
        { id: 2, name: "path", type: "string", required: true },
        { id: 3, name: "at", type: "timestamptz", required: true },
      ],
    },
  });

  return table.metadata_location;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Iceberg.CredentialsFromEnv,
  Iceberg.IcebergProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

Operations are exported at the package root: `createNamespace`, `listNamespaces`, `createTable`, `loadTable`, `updateTable`, `commitTransaction`, `dropTable`, views, scan planning, and the rest of the spec's 34 routes. List operations stream every page with `.pages()` and `.items()`:

```ts
const tables = yield* Iceberg.listTables.items({ namespace: "analytics" }).pipe(Stream.runCollect);
```

## Errors

Each operation's error channel names the exceptions the spec documents for it, matched on the response's `error.type`:

```ts
yield* Iceberg.loadTable({ namespace: "analytics", table: "page_views" }).pipe(
  Effect.catchTag("NoSuchTableException", () => Effect.succeed(undefined)),
);
```

A commit (`updateTable`, `commitTransaction`, `replaceView`) answered with 500, 502 or 504 fails with `CommitStateUnknownException`: the commit may or may not have been applied, so it is never retried automatically. Reload the table before deciding what to do.

## Auth and catalog configuration

| Variable | Required | Meaning |
| --- | --- | --- |
| `ICEBERG_CATALOG_URI` | yes | The catalog's REST endpoint, without `/v1`. |
| `ICEBERG_TOKEN` | no | Sent as `Authorization: Bearer <token>`. |
| `ICEBERG_PREFIX` | no | The warehouse prefix every catalog route is scoped to. |

Catalogs scope their routes to a warehouse prefix that they return from `GET /v1/config`. `fromCatalogConfig` resolves it from a warehouse name, the way Iceberg clients do. For Cloudflare Basin Catalog:

```ts
const Catalog = Iceberg.fromCatalogConfig({
  uri: "https://catalog.cloudflarestorage.com/<account_id>/<bucket>",
  warehouse: "<account_id>_<bucket>",
  token: Redacted.make(process.env.CLOUDFLARE_API_TOKEN!),
});

program.pipe(
  Effect.provide(Iceberg.IcebergProtocol),
  Effect.provide(Catalog),
  Effect.provide(FetchHttpClient.layer),
  Effect.runPromise,
);
```

Multipart namespaces are one string in route parameters, with parts separated by the unit separator (`"accounting\u001ftax"`), and an array in request bodies (`["accounting", "tax"]`).
