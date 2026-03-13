# @distilled.cloud/prisma-postgres

Effect-native Prisma Postgres SDK generated from the [Prisma Postgres Management API specification](https://www.prisma.io/docs/postgres). Manage projects, databases, connections, backups, integrations, and workspaces with exhaustive error typing.

## Installation

```bash
npm install @distilled.cloud/prisma-postgres effect
```

## Quick Start

```typescript
import { Effect, Layer } from "effect";
import * as Stream from "effect/Stream";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import { getV1Databases } from "@distilled.cloud/prisma-postgres/Operations";
import { CredentialsFromEnv } from "@distilled.cloud/prisma-postgres";

const program = Effect.gen(function* () {
  const databases = yield* getV1Databases({});
  return databases.data;
});

const PrismaPostgresLive = Layer.mergeAll(
  FetchHttpClient.layer,
  CredentialsFromEnv,
);

program.pipe(Effect.provide(PrismaPostgresLive), Effect.runPromise);
```

## Configuration

Set the following environment variable:

```bash
PRISMA_POSTGRES_API_TOKEN=your-api-token
```

Generate an API token in the [Prisma Data Platform](https://console.prisma.io/) under your workspace settings.

## Error Handling

```typescript
import { getV1ProjectsById } from "@distilled.cloud/prisma-postgres/Operations";

getV1ProjectsById({ id: "missing" }).pipe(
  Effect.catchTags({
    NotFound: () => Effect.succeed(null),
    UnknownPrismaPostgresError: (e) =>
      Effect.fail(new Error(`Unknown: ${e.message}`)),
  }),
);
```

## License

MIT
