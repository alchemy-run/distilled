# @distilled.cloud/planetscale

Effect-native PlanetScale SDK generated from the [PlanetScale OpenAPI specification](https://api-docs.planetscale.com/). Manage MySQL and PostgreSQL databases, branches, deploy requests, passwords, and more with exhaustive error typing.

## Installation

```bash
npm install @distilled.cloud/planetscale effect
```

## Quick Start

```typescript
import { Effect, Layer } from "effect";
import * as Stream from "effect/Stream";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import { listDatabases } from "@distilled.cloud/planetscale/Operations";
import { CredentialsFromEnv, Credentials } from "@distilled.cloud/planetscale";

const program = Effect.gen(function* () {
  const { organization } = yield* Credentials;
  const databases = yield* listDatabases({ organization });
  return databases.data;
});

const PlanetScaleLive = Layer.mergeAll(FetchHttpClient.layer, CredentialsFromEnv);

program.pipe(Effect.provide(PlanetScaleLive), Effect.runPromise);
```

## Configuration

Set the following environment variables:

```bash
PLANETSCALE_API_TOKEN=your-service-token
PLANETSCALE_ORGANIZATION=my-org-name
```

Create a service token in the [PlanetScale dashboard](https://app.planetscale.com/) under **Settings > Service tokens**. Grant the token access to the databases and permissions it needs. `PLANETSCALE_ORGANIZATION` is your organization's URL slug.

## Error Handling

```typescript
import { getDatabase } from "@distilled.cloud/planetscale/Operations";

getDatabase({ organization: "my-org", database: "missing" }).pipe(
  Effect.catchTags({
    NotFound: () => Effect.succeed(null),
    UnknownPlanetScaleError: (e) => Effect.fail(new Error(`Unknown: ${e.message}`)),
  }),
);
```

## License

MIT
