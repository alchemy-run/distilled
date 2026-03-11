# @distilled.cloud/planetscale

Effect-native PlanetScale SDK generated from the [PlanetScale OpenAPI specification](https://api-docs.planetscale.com/). Manage MySQL and PostgreSQL databases, branches, deploy requests, passwords, and more with exhaustive error typing.

## Installation

```bash
npm install @distilled.cloud/planetscale effect
```

## Quick Start

```typescript
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import { listDatabases, CredentialsFromEnv, Credentials } from "@distilled.cloud/planetscale";

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
# Format: SERVICE_TOKEN_ID:SERVICE_TOKEN
PLANETSCALE_API_TOKEN=pscale_tkn_xxxxx:pscale_tok_xxxxx
PLANETSCALE_ORGANIZATION=my-org-name
```

## Error Handling

```typescript
import { getDatabase } from "@distilled.cloud/planetscale";

getDatabase({ organization: "my-org", database: "missing" }).pipe(
  Effect.catchTags({
    NotFound: () => Effect.succeed(null),
    UnknownPlanetScaleError: (e) => Effect.fail(new Error(`Unknown: ${e.message}`)),
  }),
);
```

## License

MIT
