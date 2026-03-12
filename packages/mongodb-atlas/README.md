# @distilled.cloud/mongodb-atlas

Effect-native MongoDB Atlas SDK generated from the [MongoDB Atlas Administration API specification](https://www.mongodb.com/docs/atlas/reference/api-resources-spec/v2/). Manage clusters, database users, projects, organizations, backups, and 390+ operations with exhaustive error typing.

## Installation

```bash
npm install @distilled.cloud/mongodb-atlas effect
```

## Quick Start

```typescript
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import { listClusters } from "@distilled.cloud/mongodb-atlas/operations";
import { CredentialsFromEnv } from "@distilled.cloud/mongodb-atlas";

const program = Effect.gen(function* () {
  const clusters = yield* listClusters({ groupId: "my-project-id" });
  return clusters;
});

const AtlasLive = Layer.mergeAll(FetchHttpClient.layer, CredentialsFromEnv);

program.pipe(Effect.provide(AtlasLive), Effect.runPromise);
```

## Configuration

Set the following environment variable:

```bash
MONGODB_ATLAS_API_KEY=your-api-key
```

## Error Handling

```typescript
import { getCluster } from "@distilled.cloud/mongodb-atlas/operations";

getCluster({ groupId: "my-project", clusterName: "missing" }).pipe(
  Effect.catchTags({
    NotFound: () => Effect.succeed(null),
    UnknownMongodbAtlasError: (e) => Effect.fail(new Error(`Unknown: ${e.message}`)),
  }),
);
```

## Services

Key operation areas include:

- **Clusters** -- create, update, delete, status, process args, global writes, performance advisor
- **Flex Clusters** -- create, update, delete, backups, restore, upgrade
- **Database Users** -- CRUD, certificates
- **Groups (Projects)** -- CRUD, settings, limits, events, teams, users, API keys
- **Organizations** -- CRUD, settings, billing, invoices, federation, teams, users
- **Backups** -- compliance policies, snapshots, restore jobs, export buckets, schedules
- **Network** -- VPC peering, containers, private endpoints, encryption at rest
- **Search** -- Atlas Search indexes and deployments
- **Streams** -- Atlas Stream Processing workspaces, connections, processors
- **Data Federation** -- create, update, query logs, limits
- **Alerts** -- alert configurations, acknowledgment
- **Live Migrations** -- create, validate, cutover
- **Integrations** -- third-party and log integrations
- **Auditing** -- audit log configuration

## License

MIT
